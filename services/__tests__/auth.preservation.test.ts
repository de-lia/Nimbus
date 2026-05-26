/**
 * Preservation Property Tests - Code Generation, Verification, Login, and Session Flows
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
 *
 * These tests capture the EXISTING correct behavior of the auth service
 * BEFORE any fix is applied. They must PASS on unfixed code and continue
 * to pass after the fix, ensuring no regressions.
 *
 * Observation-first methodology: each property encodes behavior observed
 * on the current unfixed codebase.
 */

import fc from "fast-check";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock expo-crypto
jest.mock("expo-crypto", () => ({
  digestStringAsync: jest.fn(
    (_algo: unknown, input: string) =>
      Promise.resolve("hashed_" + input)
  ),
  CryptoDigestAlgorithm: { SHA256: "SHA-256" },
  randomUUID: jest.fn(() => "test-uuid-1234"),
}));

// Mock emailService so it doesn't interfere (module may not exist yet)
jest.mock("../../services/emailService", () => ({
  sendVerificationEmail: jest.fn(() =>
    Promise.resolve({ success: true })
  ),
}));

import {
  generateVerificationCode,
  verifyEmail,
  login,
  logout,
  clearSession,
  signUp,
  getVerificationKey,
  SESSION_STORAGE_KEY,
  VERIFICATION_KEY_PREFIX,
} from "../auth";

const CURRENT_USER_KEY = "@nimbus_current_user";
const USERS_STORAGE_KEY = "@nimbus_users";

// Arbitrary for generating valid email addresses
const emailArb = fc
  .tuple(
    fc.stringMatching(/^[a-z]{3,10}$/),
    fc.stringMatching(/^[a-z]{3,8}$/),
    fc.constantFrom("com", "org", "net", "io")
  )
  .map(([user, domain, tld]) => `${user}@${domain}.${tld}`);

// Arbitrary for valid passwords (>= 6 chars)
const passwordArb = fc.stringMatching(/^[A-Za-z0-9]{6,20}$/);

// Arbitrary for valid names (>= 2 alpha chars)
const nameArb = fc.stringMatching(/^[A-Za-z]{2,20}$/);

// Arbitrary for incorrect 6-digit codes (always "000000" to guarantee mismatch)
const wrongCodeArb = fc.constant("000000");

beforeEach(async () => {
  jest.clearAllMocks();
  await AsyncStorage.clear();
});

/**
 * Helper: register a user and return the stored verification code.
 */
async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<{ code: string }> {
  await signUp(email, password, name);
  const key = getVerificationKey(email.toLowerCase());
  const entryData = await AsyncStorage.getItem(key);
  const entry = JSON.parse(entryData!);
  return { code: entry.code };
}

/**
 * Helper: register a user and verify their email so they can log in.
 */
async function registerAndVerifyUser(
  email: string,
  password: string,
  name: string
): Promise<void> {
  const { code } = await registerUser(email, password, name);
  await verifyEmail(email, code);
}

// ---------------------------------------------------------------------------
// Property 3: Preservation — Code Generation and Storage
// ---------------------------------------------------------------------------
describe("Preservation: Code Generation and Storage", () => {
  /**
   * For all valid emails, generateVerificationCode produces a 6-digit
   * numeric string (/^\d{6}$/) and stores a VerificationEntry in
   * AsyncStorage with expiresAt ~10 minutes in the future.
   *
   * **Validates: Requirements 3.1**
   */
  it("generateVerificationCode produces 6-digit code with 10-min expiry", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, async (email) => {
        await AsyncStorage.clear();

        const before = Date.now();
        const code = await generateVerificationCode(email);
        const after = Date.now();

        // Code must be a 6-digit numeric string
        expect(code).toMatch(/^\d{6}$/);

        // Verify stored entry
        const key = getVerificationKey(email.toLowerCase());
        const entryData = await AsyncStorage.getItem(key);
        expect(entryData).not.toBeNull();

        const entry = JSON.parse(entryData!);
        expect(entry.code).toBe(code);
        expect(entry.email).toBe(email.toLowerCase());

        // expiresAt should be ~10 minutes from now (within tolerance)
        const tenMinMs = 10 * 60 * 1000;
        expect(entry.expiresAt).toBeGreaterThanOrEqual(before + tenMinMs);
        expect(entry.expiresAt).toBeLessThanOrEqual(after + tenMinMs);
      }),
      { numRuns: 10 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: Preservation — Verification and Login Flow
// ---------------------------------------------------------------------------
describe("Preservation: Verification Flow", () => {
  /**
   * For all correct code inputs, verifyEmail marks user as verified
   * and returns { success: true }.
   *
   * **Validates: Requirements 3.2**
   */
  it("verifyEmail with correct code returns success and marks verified", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        await AsyncStorage.clear();

        const { code } = await registerUser(email, password, name);
        const result = await verifyEmail(email, code);

        expect(result.success).toBe(true);

        // Confirm user is now marked as verified in storage
        const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
        const users = JSON.parse(usersData!);
        const user = users.find(
          (u: any) => u.email === email.toLowerCase()
        );
        expect(user.emailVerified).toBe(true);
      }),
      { numRuns: 10 }
    );
  });

  /**
   * For all incorrect codes, verifyEmail returns
   * { success: false, error: "Invalid verification code" }.
   *
   * **Validates: Requirements 3.3**
   */
  it("verifyEmail with incorrect code returns error", async () => {
    await fc.assert(
      fc.asyncProperty(
        emailArb,
        passwordArb,
        nameArb,
        wrongCodeArb,
        async (email, password, name, wrongCode) => {
          await AsyncStorage.clear();

          const { code } = await registerUser(email, password, name);
          // Ensure the wrong code is actually different from the real code
          // "000000" is extremely unlikely to match a random 6-digit code
          if (wrongCode === code) return; // skip this rare case

          const result = await verifyEmail(email, wrongCode);

          expect(result.success).toBe(false);
          expect(result.error).toBe("Invalid verification code");
        }
      ),
      { numRuns: 10 }
    );
  });
});

describe("Preservation: Login Flow", () => {
  /**
   * For all valid credential inputs with verified email, login succeeds
   * and creates a session.
   *
   * **Validates: Requirements 3.4**
   */
  it("login with valid verified credentials returns success and creates session", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        await AsyncStorage.clear();

        await registerAndVerifyUser(email, password, name);
        const result = await login(email, password);

        expect(result.success).toBe(true);
        expect(result.user).toBeDefined();
        expect(result.user!.email).toBe(email.toLowerCase());

        // Session must be created in AsyncStorage
        const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        expect(sessionData).not.toBeNull();
        const session = JSON.parse(sessionData!);
        expect(session.token).toBeDefined();
        expect(session.userId).toBeDefined();
      }),
      { numRuns: 10 }
    );
  });

  /**
   * For unverified email, login is blocked with the appropriate error.
   *
   * **Validates: Requirements 3.5**
   */
  it("login with unverified email returns error", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        await AsyncStorage.clear();

        // Register but do NOT verify
        await registerUser(email, password, name);
        const result = await login(email, password);

        expect(result.success).toBe(false);
        expect(result.error).toBe(
          "Please verify your email before logging in"
        );
      }),
      { numRuns: 10 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4 (continued): Preservation — Session Management
// ---------------------------------------------------------------------------
describe("Preservation: Logout and Session Clearing", () => {
  /**
   * logout and clearSession always clear @nimbus_session and
   * @nimbus_current_user from AsyncStorage.
   *
   * **Validates: Requirements 3.6**
   */
  it("logout clears session token and current user from AsyncStorage", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        await AsyncStorage.clear();

        // Set up a logged-in user
        await registerAndVerifyUser(email, password, name);
        await login(email, password);

        // Confirm session exists before logout
        const sessionBefore = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        expect(sessionBefore).not.toBeNull();
        const userBefore = await AsyncStorage.getItem(CURRENT_USER_KEY);
        expect(userBefore).not.toBeNull();

        // Logout
        await logout();

        // Both keys must be cleared
        const sessionAfter = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        expect(sessionAfter).toBeNull();
        const userAfter = await AsyncStorage.getItem(CURRENT_USER_KEY);
        expect(userAfter).toBeNull();
      }),
      { numRuns: 10 }
    );
  });

  /**
   * clearSession directly clears the same keys.
   *
   * **Validates: Requirements 3.6**
   */
  it("clearSession clears session token and current user from AsyncStorage", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        await AsyncStorage.clear();

        await registerAndVerifyUser(email, password, name);
        await login(email, password);

        await clearSession();

        const sessionAfter = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        expect(sessionAfter).toBeNull();
        const userAfter = await AsyncStorage.getItem(CURRENT_USER_KEY);
        expect(userAfter).toBeNull();
      }),
      { numRuns: 10 }
    );
  });
});

/**
 * Bug Condition Exploration Test - Verification Code Email Delivery
 *
 * **Validates: Requirements 2.1, 2.2, 2.3**
 *
 * This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bug exists: verification codes are generated
 * but never sent to the user's email via sendVerificationEmail.
 *
 * DO NOT fix the code or the test when it fails.
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

// Mock the emailService module — on unfixed code this module doesn't exist,
// so we create it here. The mock lets us assert whether signUp / resendVerificationCode
// actually call sendVerificationEmail.
jest.mock("../../services/emailService", () => ({
  sendVerificationEmail: jest.fn(() =>
    Promise.resolve({ success: true })
  ),
}));

// We need to import AFTER mocks are set up
import { signUp, resendVerificationCode } from "../auth";

// Try to import the mocked sendVerificationEmail
let sendVerificationEmail: jest.Mock;
try {
  sendVerificationEmail = require("../../services/emailService").sendVerificationEmail;
} catch {
  // Module doesn't exist yet — tests will fail, which is expected
  sendVerificationEmail = jest.fn();
}

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

// Arbitrary for valid names (>= 2 alpha chars after trimming)
const nameArb = fc.stringMatching(/^[A-Za-z]{2,20}$/);

beforeEach(async () => {
  jest.clearAllMocks();
  await AsyncStorage.clear();
});

describe("Bug Condition Exploration: Verification Code Email Delivery", () => {
  /**
   * Property 1: Bug Condition — signUp must call sendVerificationEmail
   *
   * For any valid email, calling signUp(email, password, name) should result
   * in sendVerificationEmail being called with the user's email and a 6-digit code.
   *
   * On UNFIXED code this will FAIL because sendVerificationEmail is never imported
   * or called in auth.ts.
   */
  it("signUp calls sendVerificationEmail with email and 6-digit code", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        // Clear state between iterations
        jest.clearAllMocks();
        await AsyncStorage.clear();

        const result = await signUp(email, password, name);

        // signUp should succeed
        expect(result.success).toBe(true);

        // sendVerificationEmail MUST have been called
        expect(sendVerificationEmail).toHaveBeenCalledTimes(1);

        const [calledEmail, calledCode] = sendVerificationEmail.mock.calls[0];
        expect(calledEmail).toBe(email.toLowerCase());
        // Code must be a 6-digit numeric string
        expect(calledCode).toMatch(/^\d{6}$/);
      }),
      { numRuns: 5 }
    );
  });

  /**
   * Property 1 (continued): Bug Condition — resendVerificationCode must call sendVerificationEmail
   *
   * For any valid email, calling resendVerificationCode(email) should result
   * in sendVerificationEmail being called with the email and the new code.
   *
   * On UNFIXED code this will FAIL because resendVerificationCode never calls
   * sendVerificationEmail.
   */
  it("resendVerificationCode calls sendVerificationEmail with email and new code", async () => {
    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        jest.clearAllMocks();
        await AsyncStorage.clear();

        // First register the user so there's a verification entry
        await signUp(email, password, name);
        jest.clearAllMocks();

        const result = await resendVerificationCode(email);

        // sendVerificationEmail MUST have been called for the resend
        expect(sendVerificationEmail).toHaveBeenCalledTimes(1);

        const [calledEmail, calledCode] = sendVerificationEmail.mock.calls[0];
        expect(calledEmail).toBe(email.toLowerCase());
        expect(calledCode).toMatch(/^\d{6}$/);

        // The returned code should match what was passed to sendVerificationEmail
        // (on unfixed code, resendVerificationCode returns a string)
        const returnedCode = typeof result === "string" ? result : (result as any).code;
        expect(calledCode).toBe(returnedCode);
      }),
      { numRuns: 5 }
    );
  });

  /**
   * Property 2: Bug Condition — delivery failure handling
   *
   * When sendVerificationEmail returns { success: false }, signUp should
   * return { success: false, error: "Failed to send verification email. Please try again." }
   *
   * On UNFIXED code this will FAIL because there is no error handling for
   * email delivery failures.
   */
  it("signUp returns error when sendVerificationEmail fails", async () => {
    // Make sendVerificationEmail return failure
    sendVerificationEmail.mockResolvedValue({ success: false });

    await fc.assert(
      fc.asyncProperty(emailArb, passwordArb, nameArb, async (email, password, name) => {
        jest.clearAllMocks();
        await AsyncStorage.clear();
        sendVerificationEmail.mockResolvedValue({ success: false });

        const result = await signUp(email, password, name);

        expect(result.success).toBe(false);
        expect(result.error).toBe(
          "Failed to send verification email. Please try again."
        );
      }),
      { numRuns: 5 }
    );
  });
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { sendVerificationEmail } from "./emailService";

const USERS_STORAGE_KEY = "@nimbus_users";
const CURRENT_USER_KEY = "@nimbus_current_user";
export const SESSION_STORAGE_KEY = "@nimbus_session";
export const VERIFICATION_KEY_PREFIX = "@nimbus_verification_";

export const getVerificationKey = (email: string): string =>
  `${VERIFICATION_KEY_PREFIX}${email}`;

export interface StoredUser {
  userId: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface VerificationEntry {
  code: string;
  email: string;
  expiresAt: number;
}

export interface SessionData {
  token: string;
  userId: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  userId?: string;
}

// Hash password using SHA-256 via expo-crypto
export const hashPassword = async (password: string): Promise<string> => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hash;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 characters)
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Name validation
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Get all users
const getAllUsers = async (): Promise<StoredUser[]> => {
  try {
    const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

// Save all users
const saveAllUsers = async (users: StoredUser[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

// Sign up new user
export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; error?: string; userId?: string }> => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email address" };
  }
  if (!validatePassword(password)) {
    return { success: false, error: "Password must be at least 6 characters" };
  }
  if (!validateName(name)) {
    return { success: false, error: "Name must be at least 2 characters" };
  }

  // Check if user already exists
  const users = await getAllUsers();
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return { success: false, error: "Email already registered" };
  }

  // Hash password before storage
  const passwordHash = await hashPassword(password);

  const newUser: StoredUser = {
    userId: Date.now().toString(),
    email: email.toLowerCase(),
    passwordHash,
    name,
    createdAt: new Date().toISOString(),
    emailVerified: false,
  };

  users.push(newUser);
  await saveAllUsers(users);

  // Generate verification code for email verification
  const code = await generateVerificationCode(email.toLowerCase());

  // Log code for development debugging
  console.log(`[DEV] Verification code for ${email.toLowerCase()}: ${code}`);

  // Send verification email
  const emailResult = await sendVerificationEmail(email.toLowerCase(), code);
  if (!emailResult.success) {
    return { success: false, error: "Failed to send verification email. Please try again." };
  }

  return { success: true, userId: newUser.userId };
};

// Generate a 6-digit numeric verification code and store it with 10-minute expiry
export const generateVerificationCode = async (
  email: string
): Promise<string> => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const entry: VerificationEntry = {
    code,
    email: email.toLowerCase(),
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };
  await AsyncStorage.setItem(
    getVerificationKey(email.toLowerCase()),
    JSON.stringify(entry)
  );
  return code;
};

// Verify email with code
export const verifyEmail = async (
  email: string,
  code: string
): Promise<AuthResult> => {
  const normalizedEmail = email.toLowerCase();
  const key = getVerificationKey(normalizedEmail);
  const entryData = await AsyncStorage.getItem(key);

  if (!entryData) {
    return {
      success: false,
      error: "No verification code found. Please request a new one",
    };
  }

  const entry: VerificationEntry = JSON.parse(entryData);

  if (entry.expiresAt < Date.now()) {
    return {
      success: false,
      error: "Code expired. Please request a new one",
    };
  }

  if (entry.code !== code) {
    return { success: false, error: "Invalid verification code" };
  }

  // Mark user as verified
  const users = await getAllUsers();
  const userIndex = users.findIndex(
    (u) => u.email === normalizedEmail
  );
  if (userIndex !== -1) {
    users[userIndex].emailVerified = true;
    await saveAllUsers(users);
  }

  // Remove verification entry
  await AsyncStorage.removeItem(key);

  return { success: true };
};

// Resend verification code
export const resendVerificationCode = async (
  email: string
): Promise<{ success: boolean; code: string; error?: string }> => {
  const normalizedEmail = email.toLowerCase();
  // Remove old verification entry
  await AsyncStorage.removeItem(getVerificationKey(normalizedEmail));
  // Generate and store new code
  const code = await generateVerificationCode(normalizedEmail);

  // Send verification email
  const emailResult = await sendVerificationEmail(normalizedEmail, code);
  if (!emailResult.success) {
    return { success: false, code, error: "Failed to send verification email. Please try again." };
  }

  return { success: true, code };
};

// Create a session for the given user
export const createSession = async (userId: string): Promise<string> => {
  const token = Crypto.randomUUID();
  const sessionData: SessionData = { token, userId };
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  return token;
};

// Login user
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: StoredUser }> => {
  // Validate inputs
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const users = await getAllUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  // Hash input password and compare against stored hash
  const inputHash = await hashPassword(password);
  if (inputHash !== user.passwordHash) {
    return { success: false, error: "Invalid email or password" };
  }

  // Block login if email is not verified
  if (!user.emailVerified) {
    return {
      success: false,
      error: "Please verify your email before logging in",
    };
  }

  // Create session and store current user ID
  await createSession(user.userId);
  await AsyncStorage.setItem(CURRENT_USER_KEY, user.userId);

  return { success: true, user };
};

// Get current logged in user
export const getCurrentUser = async (): Promise<StoredUser | null> => {
  try {
    const userId = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;

    const users = await getAllUsers();
    return users.find((u) => u.userId === userId) || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Get session from AsyncStorage
export const getSession = async (): Promise<SessionData | null> => {
  try {
    const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

// Clear session and current user from AsyncStorage
export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};

// Logout
export const logout = async (): Promise<void> => {
  await clearSession();
};

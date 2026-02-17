import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_STORAGE_KEY = "@nimbus_users";
const CURRENT_USER_KEY = "@nimbus_current_user";

export interface StoredUser {
  userId: string;
  email: string;
  password: string; // In production, this should be hashed
  name: string;
  createdAt: string;
}

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

  // Create new user
  const newUser: StoredUser = {
    userId: Date.now().toString(),
    email: email.toLowerCase(),
    password, // In production, hash this!
    name,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveAllUsers(users);

  return { success: true, userId: newUser.userId };
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
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  // Store current user ID
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

// Logout
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Google Sign In (placeholder for future implementation)
export const signInWithGoogle = async (): Promise<{
  success: boolean;
  error?: string;
  userId?: string;
}> => {
  // This would integrate with Google OAuth
  return { success: false, error: "Google Sign-In not yet implemented" };
};

// Sign in or sign up with Google
export const signInOrSignUpWithGoogle = async (
  googleUserId: string,
  email: string,
  name: string,
  photoUrl?: string
): Promise<{ success: boolean; error?: string; userId?: string; isNewUser?: boolean }> => {
  try {
    const users = await getAllUsers();
    
    // Check if user exists with this Google ID or email
    let existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      // User exists, log them in
      await AsyncStorage.setItem(CURRENT_USER_KEY, existingUser.userId);
      return { 
        success: true, 
        userId: existingUser.userId,
        isNewUser: false 
      };
    }
    
    // New user, create account
    const newUser: StoredUser = {
      userId: `google_${googleUserId}`,
      email: email.toLowerCase(),
      password: '', // No password for Google sign-in
      name,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    await saveAllUsers(users);
    await AsyncStorage.setItem(CURRENT_USER_KEY, newUser.userId);
    
    return { 
      success: true, 
      userId: newUser.userId,
      isNewUser: true 
    };
  } catch (error) {
    console.error("Error with Google sign-in:", error);
    return { success: false, error: "Failed to sign in with Google" };
  }
};

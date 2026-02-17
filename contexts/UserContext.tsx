import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  mode: "role" | "service" | null;
  selectedRole?: string;
  selectedService?: string;
  level: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  boosters: {
    doubleXp: number;
    streakProtectors: number;
  };
  badges: string[];
  adventuresCompleted: string[];
  dailyGoal: number;
  notificationsEnabled: boolean;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  createUser: (userData: User) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  setLearningPath: (mode: "role" | "service", selection: string) => Promise<void>;
  loadUserProfile: (userId: string) => Promise<void>;
  clearUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = "@nimbus_user";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      console.log("Loading user data:", userData);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      console.log("Saving user:", userData);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      console.log("User saved successfully");
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const createUser = async (userData: User) => {
    await saveUser(userData);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) {
      // If no user exists, create one with the updates
      const newUser: User = {
        userId: Date.now().toString(),
        name: "Learner",
        email: "",
        mode: null,
        level: 1,
        xp: 0,
        streakDays: 0,
        lastActiveDate: new Date().toISOString(),
        boosters: { doubleXp: 0, streakProtectors: 1 },
        badges: [],
        adventuresCompleted: [],
        dailyGoal: 10,
        notificationsEnabled: true,
        ...updates,
      };
      await saveUser(newUser);
      return;
    }
    const updatedUser = { ...user, ...updates };
    await saveUser(updatedUser);
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.userId === userId) {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  };

  const addXP = async (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    await updateUser({ xp: newXP, level: newLevel });
  };

  const setLearningPath = async (mode: "role" | "service", selection: string) => {
    const updates: Partial<User> = { mode };
    if (mode === "role") {
      updates.selectedRole = selection;
    } else {
      updates.selectedService = selection;
    }
    await updateUser(updates);
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Failed to clear user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, createUser, updateUser, addXP, setLearningPath, loadUserProfile, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};

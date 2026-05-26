import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession, clearSession } from "../services/auth";

export type Badge = {
  level: number;
  name: string;
  receivedAt: string; // ISO 8601 timestamp
  xpEarned: number;
};

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
  badges: Badge[];
  adventuresCompleted: string[];
  dailyGoal: number;
  notificationsEnabled: boolean;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  initialRoute: string;
  isSessionLoading: boolean;
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
  const [initialRoute, setInitialRoute] = useState<string>("Onboarding");
  const [isSessionLoading, setIsSessionLoading] = useState(true);

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

        // Backfill badges for levels already earned before this feature existed
        const existingBadges: Badge[] = Array.isArray(parsedUser.badges) ? parsedUser.badges : [];
        let needsSave = false;
        const updatedBadges = [...existingBadges];
        if (parsedUser.level > 1) {
          for (let lvl = 2; lvl <= parsedUser.level; lvl++) {
            if (!updatedBadges.some((b: Badge) => b.level === lvl)) {
              updatedBadges.push({
                level: lvl,
                name: `Level ${lvl}`,
                receivedAt: new Date().toISOString(),
                xpEarned: parsedUser.xp,
              });
              needsSave = true;
            }
          }
        }
        if (needsSave) {
          parsedUser.badges = updatedBadges;
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(parsedUser));
        }

        setUser(parsedUser);
      } else {
        console.log("No user data found");
      }

      // Check for existing session
      const session = await getSession();
      if (session) {
        setInitialRoute("MainApp");
      } else {
        setInitialRoute("Onboarding");
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
      setIsSessionLoading(false);
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

  const calculateLevel = (xp: number): number => {
    let level = 1;
    while (xp >= Math.floor(100 * Math.pow(level, 1.5))) {
      level++;
    }
    return level;
  };

  const addXP = async (amount: number) => {
    if (!user) return;
    if (amount <= 0) return;

    const oldLevel = calculateLevel(user.xp);
    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);

    let updatedBadges = [...user.badges];

    if (newLevel > oldLevel) {
      for (let lvl = oldLevel + 1; lvl <= newLevel; lvl++) {
        const alreadyExists = updatedBadges.some((b) => b.level === lvl);
        if (!alreadyExists) {
          updatedBadges.push({
            level: lvl,
            name: `Level ${lvl}`,
            receivedAt: new Date().toISOString(),
            xpEarned: newXP,
          });
        }
      }
    }

    await updateUser({ xp: newXP, level: newLevel, badges: updatedBadges });
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
      await clearSession();
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Failed to clear user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, initialRoute, isSessionLoading, createUser, updateUser, addXP, setLearningPath, loadUserProfile, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};

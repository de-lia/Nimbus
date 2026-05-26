import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "dark" | "light";

export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  tabBar: string;
  tabBarBorder: string;
};

type ThemeContextType = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const darkColors: ThemeColors = {
  background: "#0D1B2A",
  card: "#1B263B",
  text: "#FFFFFF",
  textSecondary: "#AAB4BE",
  border: "#333333",
  accent: "#FF9900",
  tabBar: "#0D1B2A",
  tabBarBorder: "#1B263B",
};

const lightColors: ThemeColors = {
  background: "#F1F3F3",
  card: "#FFFFFF",
  text: "#232F3E",
  textSecondary: "#687078",
  border: "#D4DADA",
  accent: "#FF9900",
  tabBar: "#FFFFFF",
  tabBarBorder: "#D4DADA",
};

const THEME_STORAGE_KEY = "@nimbus_theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
      }
    } catch (error) {
      console.warn("Failed to load theme:", error);
    }
  };

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
    AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch((error) => {
      console.warn("Failed to persist theme:", error);
    });
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

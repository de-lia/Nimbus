import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, useTheme } from "../ThemeContext";

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.clearAllMocks();
});

describe("ThemeContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it("defaults to dark theme when no stored value exists", async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");
    expect(result.current.colors.background).toBe("#0D1B2A");
  });

  it("defaults to dark theme when stored value is invalid", async () => {
    await AsyncStorage.setItem("@nimbus_theme", "invalid");

    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => {
      expect(result.current.theme).toBe("dark");
    });
  });

  it("restores saved theme from AsyncStorage on mount", async () => {
    await AsyncStorage.setItem("@nimbus_theme", "light");

    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => {
      expect(result.current.theme).toBe("light");
      expect(result.current.colors.background).toBe("#F1F3F3");
    });
  });

  it("toggles from dark to light and persists", async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
    expect(result.current.colors.background).toBe("#F1F3F3");

    const stored = await AsyncStorage.getItem("@nimbus_theme");
    expect(stored).toBe("light");
  });

  it("toggles from light to dark and persists", async () => {
    await AsyncStorage.setItem("@nimbus_theme", "light");

    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => {
      expect(result.current.theme).toBe("light");
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
    expect(result.current.colors.background).toBe("#0D1B2A");

    const stored = await AsyncStorage.getItem("@nimbus_theme");
    expect(stored).toBe("dark");
  });

  it("provides correct dark mode colors", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.colors).toEqual({
      background: "#0D1B2A",
      card: "#1B263B",
      text: "#FFFFFF",
      textSecondary: "#AAB4BE",
      border: "#333333",
      accent: "#FF9900",
      tabBar: "#0D1B2A",
      tabBarBorder: "#1B263B",
    });
  });

  it("provides correct light mode colors after toggle", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.colors).toEqual({
      background: "#F1F3F3",
      card: "#FFFFFF",
      text: "#232F3E",
      textSecondary: "#687078",
      border: "#D4DADA",
      accent: "#FF9900",
      tabBar: "#FFFFFF",
      tabBarBorder: "#D4DADA",
    });
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used inside ThemeProvider");
  });
});

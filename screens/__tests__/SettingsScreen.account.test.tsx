import React from "react";
import { render } from "@testing-library/react-native";

const mockGoBack = jest.fn();

let mockUser: any = null;
let mockLoading = false;

jest.mock("../../contexts/UserContext", () => ({
  useUser: () => ({
    user: mockUser,
    loading: mockLoading,
  }),
}));

jest.mock("../../contexts/ThemeContext", () => ({
  useTheme: () => ({
    theme: "dark",
    colors: {
      background: "#0D1B2A",
      card: "#1B263B",
      text: "#FFFFFF",
      textSecondary: "#AAB4BE",
      border: "#333333",
      accent: "#FF9900",
      tabBar: "#0D1B2A",
      tabBarBorder: "#1B263B",
    },
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children, ...props }: any) => {
    const { View } = require("react-native");
    return <View {...props}>{children}</View>;
  },
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name, ...props }: any) => {
    const { Text } = require("react-native");
    return <Text {...props}>{name}</Text>;
  },
}));

import SettingsScreen from "../SettingsScreen";

describe("SettingsScreen - Account Section", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
    mockLoading = false;
  });

  it("shows loading indicator when user is loading", () => {
    mockLoading = true;
    const { getByTestId } = render(<SettingsScreen />);
    expect(getByTestId("account-loading")).toBeTruthy();
  });

  it("shows loading indicator when user is null", () => {
    mockUser = null;
    mockLoading = false;
    const { getByTestId } = render(<SettingsScreen />);
    expect(getByTestId("account-loading")).toBeTruthy();
  });

  it("displays user name and email when user is present", () => {
    mockUser = {
      userId: "u1",
      name: "Jane Doe",
      email: "jane@example.com",
      mode: "role" as const,
      level: 1,
      xp: 0,
      streakDays: 0,
      lastActiveDate: new Date().toISOString(),
      boosters: { doubleXp: 0, streakProtectors: 0 },
      badges: [],
      adventuresCompleted: [],
      dailyGoal: 10,
      notificationsEnabled: true,
    };

    const { getByTestId } = render(<SettingsScreen />);
    expect(getByTestId("account-name").props.children).toBe("Jane Doe");
    expect(getByTestId("account-email").props.children).toBe("jane@example.com");
  });

  it("shows placeholder avatar when avatarUrl is not set", () => {
    mockUser = {
      userId: "u1",
      name: "No Avatar User",
      email: "noavatar@example.com",
      mode: "role" as const,
      level: 1,
      xp: 0,
      streakDays: 0,
      lastActiveDate: new Date().toISOString(),
      boosters: { doubleXp: 0, streakProtectors: 0 },
      badges: [],
      adventuresCompleted: [],
      dailyGoal: 10,
      notificationsEnabled: true,
    };

    const { getByTestId } = render(<SettingsScreen />);
    const avatar = getByTestId("account-avatar");
    // Placeholder is a View (not an Image), so it should contain the Ionicons "person" icon
    expect(avatar).toBeTruthy();
  });

  it("shows Image when avatarUrl is set", () => {
    mockUser = {
      userId: "u1",
      name: "Avatar User",
      email: "avatar@example.com",
      avatarUrl: "https://example.com/avatar.png",
      mode: "role" as const,
      level: 1,
      xp: 0,
      streakDays: 0,
      lastActiveDate: new Date().toISOString(),
      boosters: { doubleXp: 0, streakProtectors: 0 },
      badges: [],
      adventuresCompleted: [],
      dailyGoal: 10,
      notificationsEnabled: true,
    };

    const { getByTestId, UNSAFE_getAllByType } = render(<SettingsScreen />);
    const { Image } = require("react-native");
    const images = UNSAFE_getAllByType(Image);
    const avatarImage = images.find(
      (img: any) => img.props.testID === "account-avatar"
    );
    expect(avatarImage).toBeTruthy();
    expect(avatarImage.props.source).toEqual({
      uri: "https://example.com/avatar.png",
    });
  });
});

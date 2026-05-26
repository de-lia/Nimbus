/**
 * Preservation Property Tests - Profile Picture Editor Bugfix
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 *
 * Property 2: Preservation - Non-Avatar Profile Behavior Unchanged
 *
 * These tests capture baseline behavior on UNFIXED code.
 * They MUST PASS on unfixed code to confirm the behavior we need to preserve.
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as fc from "fast-check";

// --- Mocks (same pattern as bugcondition test) ---

const mockClearUser = jest.fn().mockResolvedValue(undefined);
const mockUpdateUser = jest.fn().mockResolvedValue(undefined);
const mockNavigationReset = jest.fn();
const mockNavigate = jest.fn();

let mockUser: any = null;
jest.mock("../../contexts/UserContext", () => ({
  useUser: () => ({
    user: mockUser,
    loading: false,
    clearUser: mockClearUser,
    updateUser: mockUpdateUser,
  }),
}));

let mockSocialData: any = { followers: [], following: [] };
let mockFriends: string[] = [];
jest.mock("../../contexts/SocialContext", () => ({
  useSocial: () => ({
    socialData: mockSocialData,
    friends: mockFriends,
    loading: false,
  }),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    reset: mockNavigationReset,
    navigate: mockNavigate,
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

jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  launchCameraAsync: jest.fn().mockResolvedValue({ canceled: true, assets: [] }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ canceled: true, assets: [] }),
}));

import ProfileScreen from "../ProfileScreen";

// --- Generators ---

/** Generate a valid user object with randomized stats */
const userArbitrary = fc
  .record({
    userId: fc.string({ minLength: 1, maxLength: 10 }),
    name: fc.string({ minLength: 1, maxLength: 30 }),
    email: fc.emailAddress(),
    avatarUrl: fc.oneof(
      fc.constant(undefined),
      fc.constant(""),
      fc.constantFrom("avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"),
      fc.constant("file:///some/photo.jpg")
    ),
    mode: fc.constantFrom("role" as const, "service" as const),
    selectedRole: fc.constantFrom("developer", "architect", "devops"),
    selectedService: fc.constantFrom("S3", "EC2", "LAMBDA"),
    level: fc.integer({ min: 1, max: 100 }),
    xp: fc.integer({ min: 0, max: 100000 }),
    streakDays: fc.integer({ min: 0, max: 365 }),
    lastActiveDate: fc.constant(new Date().toISOString()),
    boosters: fc.record({
      doubleXp: fc.integer({ min: 0, max: 50 }),
      streakProtectors: fc.integer({ min: 0, max: 50 }),
    }),
    badges: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 0, maxLength: 20 }),
    adventuresCompleted: fc.array(fc.string(), { minLength: 0, maxLength: 5 }),
    dailyGoal: fc.integer({ min: 1, max: 50 }),
    notificationsEnabled: fc.boolean(),
  })
  .filter((u) => u.name.trim().length > 0);

/** Generate social data with random followers/following arrays */
const socialArbitrary = fc.record({
  followers: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 0, maxLength: 10 }),
  following: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 0, maxLength: 10 }),
});

describe("Preservation: Non-Avatar Profile Behavior Unchanged", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSocialData = { followers: [], following: [] };
    mockFriends = [];
  });

  /**
   * **Validates: Requirements 3.2**
   *
   * Property: For all user states, stats display matches user data
   * (XP, streak, badges count, followers, following).
   */
  it("should display correct stats for all generated user states", () => {
    fc.assert(
      fc.property(userArbitrary, socialArbitrary, (user, social) => {
        mockUser = user;
        mockSocialData = social;
        mockFriends = [];

        const { getAllByText, getByText, unmount } = render(<ProfileScreen />);

        // XP stat — use getAllByText since the same number may appear in multiple places
        const xpText = user.xp.toLocaleString();
        expect(getAllByText(xpText).length).toBeGreaterThanOrEqual(1);

        // Streak stat — unique format "N days"
        expect(getByText(`${user.streakDays} days`)).toBeTruthy();

        // Badges count
        expect(getAllByText(String(user.badges.length)).length).toBeGreaterThanOrEqual(1);

        // Followers count
        expect(getAllByText(String(social.followers.length)).length).toBeGreaterThanOrEqual(1);

        // Following count
        expect(getAllByText(String(social.following.length)).length).toBeGreaterThanOrEqual(1);

        unmount();
      }),
      { numRuns: 20 }
    );
  });

  /**
   * **Validates: Requirements 3.1**
   *
   * Property: For all user states where avatarUrl is undefined or empty,
   * the default avatar1.png is shown (which maps to "mocked-file" via jest moduleNameMapper).
   */
  it("should show default avatar when avatarUrl is undefined or empty", () => {
    fc.assert(
      fc.property(
        userArbitrary.filter((u) => u.avatarUrl === undefined || u.avatarUrl === ""),
        (user) => {
          mockUser = user;
          mockSocialData = { followers: [], following: [] };

          const { UNSAFE_getAllByType, unmount } = render(<ProfileScreen />);
          const { Image } = require("react-native");
          const images = UNSAFE_getAllByType(Image);

          // The first Image is the avatar. On unfixed code, it's always the
          // hardcoded require("../assets/avatars/avatar1.png") which resolves
          // to "mocked-file" via the jest moduleNameMapper.
          const avatarImage = images[0];
          expect(avatarImage.props.source).toBe("mocked-file");

          unmount();
        }
      ),
      { numRuns: 15 }
    );
  });

  /**
   * **Validates: Requirements 3.3**
   *
   * Logout triggers clearUser and navigates to Login screen.
   */
  it("should clear user and navigate to Login on logout", async () => {
    mockUser = {
      userId: "user-1",
      name: "Test User",
      email: "test@example.com",
      mode: "role" as const,
      selectedRole: "developer",
      level: 5,
      xp: 350,
      streakDays: 7,
      lastActiveDate: new Date().toISOString(),
      boosters: { doubleXp: 2, streakProtectors: 1 },
      badges: ["badge1"],
      adventuresCompleted: [],
      dailyGoal: 10,
      notificationsEnabled: true,
    };
    mockSocialData = { followers: [], following: [] };

    const { getByText } = render(<ProfileScreen />);

    // The logout icon renders as text "log-out-outline" via our Ionicons mock
    const logoutButton = getByText("log-out-outline");
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(mockClearUser).toHaveBeenCalledTimes(1);
      expect(mockNavigationReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
  });

  /**
   * **Validates: Requirements 3.2**
   *
   * Property: Boosters section displays correct values for all user states.
   */
  it("should display correct booster values for all generated user states", () => {
    fc.assert(
      fc.property(userArbitrary, (user) => {
        mockUser = user;
        mockSocialData = { followers: [], following: [] };

        const { getByText, getAllByText, unmount } = render(<ProfileScreen />);

        expect(getByText("Boosters")).toBeTruthy();
        expect(getAllByText(String(user.boosters.doubleXp)).length).toBeGreaterThanOrEqual(1);
        expect(getAllByText(String(user.boosters.streakProtectors)).length).toBeGreaterThanOrEqual(1);
        expect(getByText("Double XP")).toBeTruthy();
        expect(getByText("Streak Shields")).toBeTruthy();

        unmount();
      }),
      { numRuns: 20 }
    );
  });

  /**
   * **Validates: Requirements 3.2, 3.4**
   *
   * Navigation options all render correctly.
   */
  it("should render all navigation options", () => {
    mockUser = {
      userId: "user-1",
      name: "Nav Test User",
      email: "nav@test.com",
      mode: "role" as const,
      selectedRole: "developer",
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

    const { getByText } = render(<ProfileScreen />);

    expect(getByText("Achievements")).toBeTruthy();
    expect(getByText("Settings & Preferences")).toBeTruthy();
    expect(getByText("Help & Support")).toBeTruthy();
    expect(getByText("Invite Friends")).toBeTruthy();
  });

  /**
   * **Validates: Requirements 3.2**
   *
   * Friends list renders correctly: empty message when no friends,
   * friend IDs when friends exist.
   */
  it("should render empty friends message when no friends", () => {
    mockUser = {
      userId: "user-1",
      name: "Lonely User",
      email: "lonely@test.com",
      mode: "role" as const,
      selectedRole: "developer",
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
    mockFriends = [];

    const { getByText } = render(<ProfileScreen />);

    expect(
      getByText("No friends yet. Follow users and get followed back to see friends here.")
    ).toBeTruthy();
  });

  it("should render friend IDs when friends exist", () => {
    mockUser = {
      userId: "user-1",
      name: "Social User",
      email: "social@test.com",
      mode: "role" as const,
      selectedRole: "developer",
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
    mockFriends = ["friend-alice", "friend-bob"];

    const { getByText } = render(<ProfileScreen />);

    expect(getByText("friend-alice")).toBeTruthy();
    expect(getByText("friend-bob")).toBeTruthy();
  });
});

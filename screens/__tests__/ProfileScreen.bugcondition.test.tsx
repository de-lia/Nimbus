/**
 * Bug Condition Exploration Test - Profile Picture Editor
 *
 * **Validates: Requirements 1.1, 1.2, 2.1, 2.2**
 *
 * Property 1: Bug Condition - Edit Icon Non-Functional and Avatar Hardcoded
 *
 * This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bug exists:
 *   - The edit icon TouchableOpacity has no onPress handler
 *   - The avatar Image source is hardcoded to avatar1.png regardless of user.avatarUrl
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import * as fc from "fast-check";

// --- Mocks ---

const mockClearUser = jest.fn().mockResolvedValue(undefined);
const mockUpdateUser = jest.fn().mockResolvedValue(undefined);
const mockNavigationReset = jest.fn();

// Mock UserContext
let mockUser: any = null;
jest.mock("../../contexts/UserContext", () => ({
  useUser: () => ({
    user: mockUser,
    loading: false,
    clearUser: mockClearUser,
    updateUser: mockUpdateUser,
  }),
}));

// Mock SocialContext
jest.mock("../../contexts/SocialContext", () => ({
  useSocial: () => ({
    socialData: { followers: [], following: [] },
    friends: [],
    loading: false,
  }),
}));

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    reset: mockNavigationReset,
    navigate: jest.fn(),
  }),
}));

// Mock SafeAreaView
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children, ...props }: any) => {
    const { View } = require("react-native");
    return <View {...props}>{children}</View>;
  },
}));

// Mock Ionicons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name, ...props }: any) => {
    const { Text } = require("react-native");
    return <Text {...props}>{name}</Text>;
  },
}));

// Mock expo-image-picker
jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  launchCameraAsync: jest.fn().mockResolvedValue({ canceled: true, assets: [] }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ canceled: true, assets: [] }),
}));

import ProfileScreen from "../ProfileScreen";

function makeUser(overrides: Record<string, any> = {}) {
  return {
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
    ...overrides,
  };
}

describe("Bug Condition Exploration: Edit Icon Non-Functional and Avatar Hardcoded", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * **Validates: Requirements 1.2, 2.2**
   *
   * Concrete test: Render with avatarUrl set to a file URI and verify the Image source
   * uses { uri: ... } instead of the default require (mocked as "mocked-file").
   * On buggy code, the source will always be the hardcoded require regardless of avatarUrl.
   */
  it("should show different avatar image when avatarUrl is a file URI vs undefined", () => {
    // Render with no avatarUrl (should show default avatar1 require)
    mockUser = makeUser({ avatarUrl: undefined });
    const { UNSAFE_getAllByType: getAllDefault, unmount: unmountDefault } =
      render(<ProfileScreen />);
    const { Image } = require("react-native");
    const defaultImages = getAllDefault(Image);
    const defaultAvatarSource = defaultImages[0].props.source;
    unmountDefault();

    // Render with avatarUrl as a file URI (should show { uri: ... })
    const testUri = "file:///tmp/test-photo.jpg";
    mockUser = makeUser({ avatarUrl: testUri });
    const { UNSAFE_getAllByType: getAllCustom } = render(<ProfileScreen />);
    const customImages = getAllCustom(Image);
    const customAvatarSource = customImages[0].props.source;

    // The file URI source MUST be different from the default require source.
    // On buggy code, both will be the same hardcoded require("../assets/avatars/avatar1.png")
    expect(customAvatarSource).not.toEqual(defaultAvatarSource);
    // Additionally verify the source is a URI object
    expect(customAvatarSource).toEqual({ uri: testUri });
  });

  /**
   * **Validates: Requirements 1.1, 2.1**
   *
   * Property: The edit icon TouchableOpacity must have an onPress handler defined.
   * On unfixed code this WILL FAIL because onPress is undefined.
   */
  it("should have an onPress handler on the edit icon", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("avatar1", "avatar2", "avatar3"),
        (avatarId: string) => {
          mockUser = makeUser({ avatarUrl: avatarId });
          const { UNSAFE_getAllByType } = render(<ProfileScreen />);

          const { TouchableOpacity } = require("react-native");
          const touchables = UNSAFE_getAllByType(TouchableOpacity);

          // Find the edit icon touchable by its absolute positioning style
          const editIconTouchable = touchables.find((t: any) => {
            const style = t.props.style;
            if (Array.isArray(style)) {
              return style.some((s: any) => s?.position === "absolute");
            }
            return style?.position === "absolute";
          });

          expect(editIconTouchable).toBeDefined();
          // The critical assertion: onPress must be defined
          expect(editIconTouchable!.props.onPress).toBeDefined();
        }
      ),
      { numRuns: 3 }
    );
  });

  /**
   * **Validates: Requirements 1.1, 2.1**
   *
   * Property: Tapping the edit icon should cause a selection interface to appear
   * with options for taking a photo, choosing from camera roll, or choosing a built-in avatar.
   * On unfixed code this WILL FAIL because onPress is undefined so nothing happens.
   */
  it("should show selection interface with 3 options when edit icon is tapped", () => {
    mockUser = makeUser({ avatarUrl: "avatar1" });
    const { UNSAFE_getAllByType, queryByText } = render(<ProfileScreen />);

    const { TouchableOpacity } = require("react-native");
    const touchables = UNSAFE_getAllByType(TouchableOpacity);

    const editIconTouchable = touchables.find((t: any) => {
      const style = t.props.style;
      if (Array.isArray(style)) {
        return style.some((s: any) => s?.position === "absolute");
      }
      return style?.position === "absolute";
    });

    expect(editIconTouchable).toBeDefined();

    // Attempt to press the edit icon
    if (editIconTouchable?.props.onPress) {
      fireEvent.press(editIconTouchable);
    }

    // After tapping, a selection interface with 3 options should appear
    const takePhotoOption = queryByText(/take a photo/i);
    const cameraRollOption = queryByText(/choose from camera roll/i);
    const builtInOption = queryByText(/choose built-in avatar/i);

    expect(takePhotoOption).not.toBeNull();
    expect(cameraRollOption).not.toBeNull();
    expect(builtInOption).not.toBeNull();
  });
});

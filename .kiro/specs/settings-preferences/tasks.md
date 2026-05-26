# Implementation Plan: Settings & Preferences

## Overview

Implement a Settings & Preferences screen for the Nimbus app, including a new ThemeContext for dark/light mode, navigation from ProfileScreen, and a SettingsScreen with account info, appearance toggle, learning preferences, notifications, about section, and logout. Tasks are ordered so each builds on the previous, with testing sub-tasks alongside implementation.

## Tasks

- [x] 1. Create ThemeContext with persistence
  - [x] 1.1 Create `contexts/ThemeContext.tsx` with ThemeMode, ThemeColors types, dark/light color maps, and ThemeProvider
    - Implement `ThemeProvider` that reads theme from AsyncStorage (`@nimbus_theme`) on mount
    - Default to `"dark"` when no stored value or invalid value exists
    - Provide `theme`, `colors`, and `toggleTheme` via React context
    - Persist theme changes to AsyncStorage on toggle
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]* 1.2 Write property test for theme persistence round-trip
    - **Property 1: Theme persistence round-trip**
    - **Validates: Requirements 2.4, 2.5**

  - [x] 1.3 Wrap app with ThemeProvider in `App.tsx`
    - Add `ThemeProvider` above `UserProvider` so all components can access theme colors
    - _Requirements: 2.2, 2.3_

- [x] 2. Register Settings screen in navigation
  - [x] 2.1 Add `Settings: undefined` to `RootStackParamList` in `navigation/types.ts`
    - _Requirements: 1.1_

  - [x] 2.2 Register `Settings` stack screen in `navigation/index.tsx`
    - Import and add `<Stack.Screen name="Settings" component={SettingsScreen} />`
    - _Requirements: 1.1_

  - [x] 2.3 Update ProfileScreen to navigate to Settings
    - Make the "Settings & Preferences" option a `TouchableOpacity` that calls `navigation.navigate("Settings")`
    - _Requirements: 1.1, 1.2_

- [x] 3. Implement SettingsScreen with all sections
  - [x] 3.1 Create `screens/SettingsScreen.tsx` with header, back button, and scrollable layout
    - Display "Settings" title at top with a back button that returns to Profile
    - Use `ThemeContext` colors for all styling
    - _Requirements: 1.2, 1.3_

  - [x] 3.2 Implement Account section
    - Display user avatar, name, and email from `UserContext`
    - Handle missing user state (show loading or redirect)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 3.3 Write property test for account section rendering
    - **Property 5: Account section renders user info**
    - **Validates: Requirements 5.3, 5.4**

  - [x] 3.4 Implement Appearance section with theme toggle
    - Add a Switch component that reflects current theme from `ThemeContext`
    - Toggle calls `toggleTheme()` on change
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.5 Implement Notifications section with toggle
    - Add a Switch reflecting `user.notificationsEnabled` from `UserContext`
    - On toggle, call `updateUser({ notificationsEnabled: value })`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 3.6 Write property test for notification toggle
    - **Property 2: Notification toggle updates and reflects context**
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5**

  - [x] 3.7 Implement Learning section with Change Learning Path and Daily Goal
    - Display "Change Learning Path" with current path as subtitle (role name or service name)
    - Tapping navigates to `CreateProfileStep1` screen
    - Display "Daily Goal" with current value as subtitle (e.g., "10 min")
    - Tapping opens a modal with options: 5, 10, 15, 20 minutes
    - On selection, call `updateUser({ dailyGoal: value })` and close modal
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 8.1, 8.2, 8.3, 8.4_

  - [ ]* 3.8 Write property test for learning path subtitle
    - **Property 3: Learning path subtitle reflects user state**
    - **Validates: Requirements 4.2**

  - [ ]* 3.9 Write property test for daily goal round-trip
    - **Property 7: Daily goal round-trip**
    - **Validates: Requirements 8.2, 8.4**

  - [x] 3.10 Implement About section
    - Display app version number
    - Display "Terms of Service" and "Privacy Policy" options
    - Tapping each opens the respective content via `Linking.openURL`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 3.11 Implement Logout button with confirmation
    - Display "Log Out" button at the bottom
    - Tapping shows `Alert.alert` confirmation dialog
    - On confirm, call `clearUser()` and navigate to Login screen with reset
    - On cancel, dismiss the alert
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 3.12 Write property test for logout clearing user state
    - **Property 6: Logout clears user state**
    - **Validates: Requirements 7.3**

- [x] 4. Checkpoint - Verify core functionality
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Wire theme colors into SettingsScreen and verify integration
  - [x] 5.1 Apply ThemeContext colors throughout SettingsScreen
    - Replace all hardcoded color values with `colors` from `useTheme()`
    - Ensure toggle between dark/light mode visually updates the Settings screen
    - _Requirements: 2.2, 2.3_

  - [ ]* 5.2 Write property test for learning path update persistence
    - **Property 4: Learning path update persists correctly**
    - **Validates: Requirements 4.4**

- [x] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using `fast-check`
- The design uses TypeScript with React Native and Expo

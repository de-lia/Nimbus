# Implementation Plan: Level Badges

## Overview

Extend the Nimbus app with a badge reward system. Badges are created automatically on level-up, displayed on two new screens (BadgesScreen, BadgeDetailsScreen), surfaced via the ProfileScreen Achievements button, and announced through DashboardScreen notifications with deep-linking. All changes use TypeScript and follow existing patterns (UserContext, ThemeContext, React Navigation).

## Tasks

- [x] 1. Define Badge type and update UserContext
  - [x] 1.1 Add the `Badge` type and update the `User` type in `contexts/UserContext.tsx`
    - Define `Badge` type with `level`, `name`, `receivedAt`, and `xpEarned` fields
    - Change `badges: string[]` to `badges: Badge[]` in the `User` type
    - Update the default user creation in `updateUser` to initialize `badges` as `Badge[]`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.2 Modify `addXP` in `UserContext` to detect level-ups and create badges
    - Calculate `oldLevel` and `newLevel` after XP addition
    - If `newLevel > oldLevel`, iterate from `oldLevel + 1` to `newLevel` and create a `Badge` for each level gained
    - Guard against duplicate badges for the same level
    - Ignore calls with non-positive XP amounts
    - Persist the updated badges array via the existing `saveUser` mechanism
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 1.3 Write property test: Badge creation correctness (Property 1)
    - **Property 1: Badge creation correctness**
    - Generate random user states and XP amounts that trigger single level-ups
    - Assert the new badge has `name === "Level N"`, a valid ISO 8601 `receivedAt`, and `xpEarned` matching total XP
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**

  - [ ]* 1.4 Write property test: Multi-level jump (Property 2)
    - **Property 2: Multi-level jump creates one badge per level gained**
    - Generate random user states and large XP amounts triggering multi-level jumps
    - Assert the number of new badges equals levels gained and each level L+1 through L+K is represented exactly once
    - **Validates: Requirements 1.5**

- [x] 2. Register new screens in navigation
  - [x] 2.1 Add `Badges` and `BadgeDetails` to `RootStackParamList` in `navigation/types.ts`
    - Add `Badges: undefined` and `BadgeDetails: { badgeLevel: number }` entries
    - _Requirements: 6.1, 6.2_

  - [x] 2.2 Register `BadgesScreen` and `BadgeDetailsScreen` in `navigation/index.tsx`
    - Import both screen components
    - Add `<Stack.Screen>` entries for `Badges` and `BadgeDetails`
    - _Requirements: 6.1, 6.2_

- [x] 3. Implement BadgesScreen
  - [x] 3.1 Create `screens/BadgesScreen.tsx`
    - Display a `FlatList` of all earned badges sorted by `receivedAt` descending
    - Each row shows badge name, formatted date, and XP
    - Tapping a row navigates to `BadgeDetails` with the badge's level
    - Show empty state message when no badges exist
    - Use `useTheme()` colors for all visual elements
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 3.2 Write property test: Badge list ordering (Property 3)
    - **Property 3: Badge list ordering**
    - Generate random arrays of badges with random timestamps
    - Apply sorting logic and assert descending `receivedAt` order
    - **Validates: Requirements 2.1**

- [x] 4. Implement BadgeDetailsScreen
  - [x] 4.1 Create `screens/BadgeDetailsScreen.tsx`
    - Receive `badgeLevel` via route params
    - Look up matching badge from `user.badges`
    - Display badge name, formatted date/time, and XP earned
    - Show "Badge not found" fallback for non-existent badge levels
    - Provide back navigation
    - Use `useTheme()` colors for all visual elements
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 5. Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Activate Achievements button on ProfileScreen
  - [x] 6.1 Update the Achievements row in `screens/ProfileScreen.tsx`
    - Convert the Achievements `<View>` to a `<TouchableOpacity>`
    - When `user.badges.length > 0`, navigate to `"Badges"` on press
    - When `user.badges.length === 0`, render as visually inactive (no navigation)
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 6.2 Write property test: Achievements button activation state (Property 4)
    - **Property 4: Achievements button activation state**
    - Generate random badge arrays (including empty)
    - Assert button is active if and only if `badges.length > 0`
    - **Validates: Requirements 4.1, 4.3**

- [x] 7. Add badge notifications to DashboardScreen
  - [x] 7.1 Update `screens/DashboardScreen.tsx` with dynamic badge notifications
    - Generate level-up notifications from `user.badges` array
    - Each notification message: `"You earned a badge for completing Level N"`
    - Add `onPress` handler to navigate to `BadgeDetails` with the badge's level
    - Track read/unread state for badge notifications (local state or AsyncStorage)
    - Merge badge notifications with existing hardcoded notifications
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 7.2 Write property test: Level-up notification message format (Property 5)
    - **Property 5: Level-up notification message format**
    - Generate random level numbers
    - Assert notification message equals `"You earned a badge for completing Level N"`
    - **Validates: Requirements 5.1**

- [x] 8. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using `fast-check`
- All new screens follow existing patterns: `useUser()`, `useTheme()`, `SafeAreaView`, themed `StyleSheet`

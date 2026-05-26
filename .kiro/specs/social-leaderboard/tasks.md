# Implementation Plan: Social Leaderboard

## Overview

Implement the social leaderboard feature in three phases: (1) create the SocialContext for followers/following/friends with AsyncStorage persistence, (2) update LeaderboardContext and mock data to use real user XP/name and support friends filtering, (3) update screens (LeaderBoardScreen, ProfileScreen) and create UserProfileScreen with navigation wiring.

## Tasks

- [x] 1. Create SocialContext with AsyncStorage persistence
  - [x] 1.1 Create `contexts/SocialContext.tsx` with SocialData interface, SocialContextType, and SocialProvider
    - Implement `SocialData` interface with `followers: string[]` and `following: string[]`
    - Implement `loadSocialData` to read from AsyncStorage key `@nimbus_social_{userId}`, initializing empty arrays if no data or parse error
    - Implement `followUser(targetUserId)` that adds to current user's following and target's followers, persists both to AsyncStorage before updating state, and silently ignores self-follow
    - Implement `unfollowUser(targetUserId)` as the inverse, persists before updating state, no-op if not following
    - Implement computed `friends` as set intersection of followers and following
    - Implement `isFollowing(targetUserId)` check
    - Implement `getFollowersCount(userId)` and `getFollowingCount(userId)` that read from AsyncStorage for any user
    - Load social data on mount when user is available
    - _Requirements: 4.1, 4.2, 4.3, 4.6, 5.1, 5.2, 5.4, 6.1, 6.2, 6.3, 6.4_

  - [ ]* 1.2 Write property test: Social data persistence round trip
    - **Property 5: Social data persistence round trip**
    - **Validates: Requirements 4.1, 6.1**

  - [ ]* 1.3 Write property test: Follow adds to both lists
    - **Property 6: Follow adds to both lists**
    - **Validates: Requirements 4.2**

  - [ ]* 1.4 Write property test: Unfollow removes from both lists
    - **Property 7: Unfollow removes from both lists**
    - **Validates: Requirements 4.3**

  - [ ]* 1.5 Write property test: Friends equals intersection of followers and following
    - **Property 8: Friends equals intersection of followers and following**
    - **Validates: Requirements 5.1, 5.2, 5.4**

  - [ ]* 1.6 Write unit tests for SocialContext edge cases
    - Test self-follow attempt is silently ignored
    - Test unfollow a user not currently followed is a no-op
    - Test corrupted AsyncStorage JSON falls back to empty data
    - Test empty social data on first load initializes empty arrays
    - Test storage key format follows `@nimbus_social_{userId}` pattern
    - _Requirements: 5.4, 6.1, 6.3_

- [x] 2. Wrap app with SocialProvider
  - Add `SocialProvider` to the provider hierarchy in `App.tsx` (or wherever providers are composed), wrapping it around components that need social data
  - _Requirements: 4.6, 6.2_

- [x] 3. Update LeaderboardContext and mock data for real XP and friends filtering
  - [x] 3.1 Update `data/leaderboardMock.ts` to accept current user's real name and XP
    - Modify `getMockLeaderboardData` to accept `{ userId, name, xp }` for the current user
    - Use the real name and XP for the current user's entry instead of hardcoding `"You"` and random XP
    - Compute score as `xpEarned + (adventureBonus * 2)` for all entries
    - _Requirements: 1.1, 1.2, 2.1_

  - [x] 3.2 Update `contexts/LeaderboardContext.tsx` to source real XP from UserContext and filter by friends
    - Pass `user.name` and `user.xp` to the mock generator for the current user's entry
    - Import and use `useSocial` from SocialContext
    - When `currentPeriod === "friends"`, filter entries to only include userIds in the friends list
    - Sort entries by score descending, assign sequential ranks starting at 1
    - Exclude current user's entry if their score is lower than all other entries
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.5_

  - [ ]* 3.3 Write property test: Current user entry reflects real user data
    - **Property 1: Current user entry reflects real user data**
    - **Validates: Requirements 1.1, 2.1**

  - [ ]* 3.4 Write property test: Score calculation formula
    - **Property 2: Score calculation formula**
    - **Validates: Requirements 1.2**

  - [ ]* 3.5 Write property test: Ranking produces correct descending order
    - **Property 3: Ranking produces correct descending order**
    - **Validates: Requirements 1.3, 1.4, 1.5**

  - [ ]* 3.6 Write property test: Friends period filters to friends only
    - **Property 9: Friends period filters to friends only**
    - **Validates: Requirements 5.5**

  - [ ]* 3.7 Write unit tests for leaderboard edge cases
    - Test current user excluded when score is lower than all others
    - Test current user included when score ties with another entry
    - Test LeaderboardContext reads real XP from UserContext for current user entry
    - _Requirements: 1.4, 1.5_

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Create UserProfileScreen and update navigation
  - [x] 5.1 Add `UserProfile` route params to navigation types
    - Define `UserProfileParams` type with `userId`, `name`, `avatarUrl`, `level`, `xp`, `streakDays`, `badgesCount`
    - Add `UserProfile: UserProfileParams` to the root stack param list
    - _Requirements: 3.3_

  - [x] 5.2 Create `screens/UserProfileScreen.tsx`
    - Read route params for the viewed user's data
    - Display avatar, name, level, XP, streak days, badges count
    - Display followers count and following count using `SocialContext.getFollowersCount` / `getFollowingCount`
    - Show follow/unfollow button based on `SocialContext.isFollowing` status
    - Follow button calls `SocialContext.followUser`, unfollow calls `SocialContext.unfollowUser`
    - Include a back button that navigates back to the previous screen
    - Show fallback "User not found" message if required params are missing
    - _Requirements: 3.3, 3.4, 3.5, 4.2, 4.3, 4.5_

  - [x] 5.3 Register `UserProfileScreen` in `navigation/index.tsx`
    - Add `<Stack.Screen name="UserProfile" component={UserProfileScreen} />` to the root stack navigator
    - _Requirements: 3.4_

- [x] 6. Update LeaderBoardScreen for name display and clickable entries
  - [x] 6.1 Update `screens/LeaderBoardScreen.tsx` to make entries clickable
    - Wrap each entry in `TouchableOpacity`
    - On press: if `entry.userId === user.userId`, navigate to `Profile` tab; otherwise navigate to `UserProfileScreen` with entry data as params
    - Display current user's entry as `{user.name} (You)` using real name from UserContext
    - Display other entries with just their name, no suffix
    - _Requirements: 2.2, 2.3, 3.1, 3.2_

  - [ ]* 6.2 Write property test: Name display formatting
    - **Property 4: Name display formatting**
    - **Validates: Requirements 2.2, 2.3**

- [x] 7. Update ProfileScreen with social counts and friends section
  - [x] 7.1 Update `screens/ProfileScreen.tsx` to show social stats and friends
    - Import and use `useSocial` from SocialContext
    - Add Followers count and Following count to the stats row
    - Add a "Friends" section below boosters showing mutual follows with name and avatar
    - _Requirements: 4.4, 5.3_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All data persists via AsyncStorage with no backend dependency

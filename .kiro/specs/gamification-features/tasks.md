# Implementation Plan: Gamification Features

## Overview

This implementation plan breaks down the gamification features (Leaderboard, Streak Tracking, and Adventures) into discrete, incremental coding tasks. Each task builds on previous work and includes testing sub-tasks to validate correctness early. The plan follows the existing React Native/TypeScript architecture and integrates with UserContext and AsyncStorage patterns.

## Tasks

- [x] 1. Set up type definitions and data structures
  - Create types/adventure.ts with Adventure, AdventureStep, and AdventureProgress interfaces
  - Create types/leaderboard.ts with LeaderboardPeriod, LeaderboardEntry, and LeaderboardData types
  - Update User type in contexts/UserContext.tsx to add adventuresCompleted: string[] property
  - _Requirements: 5.1, 5.2, 8.1_

- [x] 2. Implement date utility functions
  - [x] 2.1 Create utils/dateUtils.ts with UTC date handling functions
    - Implement getUTCDateString(date: Date): string
    - Implement daysBetweenUTC(date1: string, date2: string): number
    - Implement isSameUTCDay(date1: string, date2: string): boolean
    - _Requirements: 9.2, 9.3, 9.5_
  
  - [ ]* 2.2 Write property tests for date utilities
    - **Property 13: UTC Date Comparison**
    - **Validates: Requirements 9.2, 9.3, 9.5**
    - Test that same UTC day with different times are considered equal
    - Test that day difference calculation is accurate
    - Test that ISO string and Date object parsing works correctly

- [x] 3. Implement streak calculation logic
  - [x] 3.1 Create utils/streakUtils.ts with streak validation
    - Define StreakUpdateResult interface
    - Implement validateAndUpdateStreak function with all streak logic
    - Handle same day, next day, missed day with protector, and streak break cases
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 3.2 Write property tests for streak logic
    - **Property 4: Streak Update Logic**
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5**
    - **Property 5: Streak Protector Logic**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**
  
  - [ ]* 3.3 Write unit tests for streak edge cases
    - Test invalid date formats default to current date
    - Test future dates reset to current date
    - Test missing lastActiveDate initializes correctly
    - _Requirements: 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4_

- [x] 4. Update UserContext with streak integration
  - [x] 4.1 Add streak update logic to UserContext
    - Import validateAndUpdateStreak from streakUtils
    - Create updateStreakOnLessonComplete method
    - Update addXP or create new method to trigger streak updates
    - Ensure lastActiveDate updates on lesson completion
    - _Requirements: 3.5, 4.2_
  
  - [ ]* 4.2 Write integration tests for UserContext streak updates
    - Test lesson completion triggers streak update
    - Test streak protector consumption
    - Test lastActiveDate persistence
    - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [x] 5. Checkpoint - Ensure streak tracking works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement leaderboard utilities
  - [x] 6.1 Create utils/leaderboardUtils.ts
    - Implement calculateLeaderboardScore(xpEarned, adventureBonus): number
    - Implement sortLeaderboardEntries(entries): LeaderboardEntry[]
    - Implement assignRanks(entries): LeaderboardEntry[]
    - _Requirements: 2.1, 2.3, 2.4_
  
  - [ ]* 6.2 Write property tests for leaderboard calculations
    - **Property 1: Leaderboard Score Calculation**
    - **Validates: Requirements 2.1**
    - **Property 2: Leaderboard Sorting Order**
    - **Validates: Requirements 2.3**
    - **Property 3: Stable Sort Preservation**
    - **Validates: Requirements 2.4**

- [x] 7. Create mock leaderboard data
  - [x] 7.1 Create data/leaderboardMock.ts
    - Generate mock data for weekly, monthly, and friends periods
    - Include at least 20 entries per period with realistic names and avatars
    - Ensure current user is included in mock data
    - Vary data between periods
    - _Requirements: 10.1, 10.3, 10.4_
  
  - [ ]* 7.2 Write unit tests for mock data validation
    - Test that each period has at least 20 entries
    - Test that current user is present in all periods
    - Test that periods have different data
    - _Requirements: 10.1, 10.3, 10.4_

- [x] 8. Implement LeaderboardContext
  - [x] 8.1 Create contexts/LeaderboardContext.tsx
    - Define LeaderboardContextType interface
    - Implement state management for leaderboard data and current period
    - Implement setPeriod method to switch between weekly/monthly/friends
    - Implement refreshLeaderboard method to load mock data
    - Calculate scores using leaderboardUtils
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 2.3_
  
  - [ ]* 8.2 Write unit tests for LeaderboardContext
    - Test period switching updates data
    - Test score calculation integration
    - Test sorting and ranking
    - _Requirements: 1.4, 2.1, 2.3_

- [x] 9. Update LeaderboardScreen UI
  - [x] 9.1 Update screens/LeaderboardScreen.tsx
    - Integrate LeaderboardContext
    - Add period selector (tabs or buttons for weekly/monthly/friends)
    - Display leaderboard entries with avatar, name, XP, and rank
    - Highlight current user's entry
    - Handle loading and empty states
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ]* 9.2 Write property test for leaderboard entry display
    - **Property 16: Leaderboard Entry Display Information**
    - **Validates: Requirements 1.2**

- [x] 10. Checkpoint - Ensure leaderboard system works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Create adventure data
  - [x] 11.1 Create data/adventures.ts
    - Define adventures array with at least 3 sample adventures
    - Include adventures for different services (S3, EC2, Lambda)
    - Each adventure should have 4-6 steps
    - Set xpReward to 400 for all adventures
    - Add helper functions: getAdventureById, getAdventuresByService, getAdventuresByRole
    - _Requirements: 5.1, 5.2, 5.4, 5.5_
  
  - [ ]* 11.2 Write property tests for adventure structure
    - **Property 6: Adventure Structure Validation**
    - **Validates: Requirements 5.1, 5.2**

- [x] 12. Implement AdventureContext
  - [x] 12.1 Create contexts/AdventureContext.tsx
    - Define AdventureContextType interface
    - Load adventures from data/adventures.ts
    - Implement progress tracking with AsyncStorage (key: @nimbus_adventure_progress)
    - Implement getAdventureById and getAdventureProgress methods
    - Implement markStepComplete method
    - Implement checkAndCompleteAdventure method
    - _Requirements: 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 12.2 Write property tests for adventure completion
    - **Property 7: Step Completion Persistence**
    - **Validates: Requirements 6.2, 6.3**
    - **Property 8: Step Completion Order Independence**
    - **Validates: Requirements 6.4**
    - **Property 9: Adventure Completion Rewards**
    - **Validates: Requirements 7.1, 7.2, 7.3**
    - **Property 11: Duplicate Completion Prevention**
    - **Validates: Requirements 7.5**
  
  - [ ]* 12.3 Write unit tests for adventure edge cases
    - Test missing steps array prevents completion
    - Test invalid step ID is ignored
    - Test AsyncStorage failure handling
    - _Requirements: 6.2, 7.1_

- [ ] 13. Update UserContext to add adventuresCompleted property
  - [ ] 13.1 Add adventuresCompleted to User type definition
    - Add adventuresCompleted: string[] to User type in contexts/UserContext.tsx
    - Update createUser to initialize adventuresCompleted as empty array
    - Update updateUser default user object to include adventuresCompleted: []
    - _Requirements: 8.1, 8.2, 8.5_
  
  - [ ]* 13.2 Write property test for user data persistence
    - **Property 12: User Data Persistence Round-Trip**
    - **Validates: Requirements 8.3**

- [x] 14. Update AdventureScreen UI
  - [x] 14.1 Update screens/AdventureScreen.tsx
    - Integrate AdventureContext
    - Display adventure title, description, and XP reward
    - Render step checklist with completion status
    - Implement step completion toggle
    - Show completion celebration when all steps done
    - Display earned badge on completion
    - _Requirements: 6.1, 6.2, 6.5, 7.1, 7.2_
  
  - [ ]* 14.2 Write integration tests for adventure screen
    - Test step marking updates UI
    - Test completion triggers rewards
    - Test duplicate completion prevention
    - _Requirements: 6.2, 7.1, 7.5_

- [x] 15. Add AdventureContext and LeaderboardContext to app providers
  - [x] 15.1 Update App.tsx or root component
    - Wrap app with AdventureProvider
    - Wrap app with LeaderboardProvider
    - Ensure providers are in correct order (UserProvider should be outermost)
    - _Requirements: 1.1, 6.1_

- [ ] 16. Set up testing infrastructure
  - [ ] 16.1 Install testing dependencies
    - Install Jest and React Native Testing Library
    - Install fast-check for property-based testing
    - Install @testing-library/react-hooks for context testing
    - Configure Jest for React Native
    - _Requirements: All testing requirements_
  
  - [ ] 16.2 Create test configuration files
    - Create jest.config.js with React Native preset
    - Create test setup file for mocking AsyncStorage
    - Add test scripts to package.json
    - _Requirements: All testing requirements_

- [ ] 17. Final checkpoint - End-to-end integration testing
  - Ensure all tests pass, ask the user if questions arise.
  - Test complete user flow: lesson completion → streak update → adventure completion → leaderboard display
  - Verify AsyncStorage persistence across app restarts
  - Test error handling for all edge cases

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation integrates with existing UserContext and AsyncStorage patterns
- Mock data is used for leaderboard to enable MVP delivery without backend

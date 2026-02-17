# Requirements Document

## Introduction

This document specifies the requirements for implementing three gamification features in the Nimbus AWS learning app: a Leaderboard System, Streak Tracking System, and Adventures System. These features will enhance user engagement through competitive elements, habit formation mechanics, and structured learning challenges. The implementation will use mock data where appropriate for MVP delivery and integrate with the existing UserContext and AsyncStorage persistence layer.

## Glossary

- **System**: The Nimbus AWS learning application
- **User**: A person using the Nimbus app to learn AWS concepts
- **Leaderboard**: A ranked list of users based on XP earned within a time period
- **Streak**: A consecutive sequence of days where a user completes at least one lesson
- **Streak_Shield**: A booster item that prevents streak loss when a user misses one day
- **Adventure**: A structured learning challenge consisting of multiple steps that awards bonus XP and badges upon completion
- **Adventure_Step**: An individual task within an adventure that can be marked complete
- **XP**: Experience points earned by completing lessons and adventures
- **UTC_Date**: A date represented in Coordinated Universal Time format
- **Leaderboard_Period**: A time window for calculating leaderboard rankings (weekly, monthly, or friends-only)
- **Adventure_Bonus**: Bonus XP awarded for completing an adventure (base value: 400 XP)
- **Last_Active_Date**: The most recent date when a user completed a lesson, stored in ISO string format
- **Leaderboard_Score**: Calculated value for ranking users: total XP gained in period + (adventureBonus * 2)

## Requirements

### Requirement 1: Leaderboard Display

**User Story:** As a user, I want to view leaderboards showing top performers, so that I can see how I rank against other learners and stay motivated.

#### Acceptance Criteria

1. WHEN a user navigates to the Leaderboard screen, THE System SHALL display a leaderboard with user rankings
2. WHEN displaying leaderboard entries, THE System SHALL show user avatar, name, XP earned in period, and rank position for each entry
3. THE System SHALL support three leaderboard period types: weekly, monthly, and friends-only
4. WHEN a user selects a leaderboard period, THE System SHALL display rankings for that specific period
5. THE System SHALL use mock data for leaderboard entries in the MVP implementation

### Requirement 2: Leaderboard Score Calculation

**User Story:** As a user, I want my leaderboard score to reflect both lesson XP and adventure bonuses, so that completing adventures gives me a competitive advantage.

#### Acceptance Criteria

1. WHEN calculating leaderboard score, THE System SHALL use the formula: total XP gained in period + (adventureBonus * 2)
2. WHEN a user completes an adventure within the leaderboard period, THE System SHALL include the adventure bonus multiplied by 2 in the leaderboard score
3. WHEN ranking users on the leaderboard, THE System SHALL sort by leaderboard score in descending order
4. WHEN two users have the same leaderboard score, THE System SHALL maintain stable sort order

### Requirement 3: Daily Streak Tracking

**User Story:** As a user, I want my daily learning streak to be tracked, so that I can build a consistent learning habit.

#### Acceptance Criteria

1. WHEN a user completes a lesson, THE System SHALL check if the completion occurred on a different UTC date than the last active date
2. WHEN a lesson is completed on the day immediately following the last active date, THE System SHALL increment the streak counter by 1
3. WHEN a lesson is completed on the same UTC date as the last active date, THE System SHALL maintain the current streak count
4. WHEN more than one day has passed since the last active date, THE System SHALL reset the streak counter to 1
5. WHEN a user completes any lesson, THE System SHALL update the last active date to the current UTC date

### Requirement 4: Streak Shield Booster

**User Story:** As a user, I want to use a streak protector to save my streak when I miss a day, so that occasional missed days don't destroy my progress.

#### Acceptance Criteria

1. WHEN a user has at least one streak shield available, THE System SHALL allow one missed day per week without breaking the streak
2. WHEN a streak protector is used to prevent streak loss, THE System SHALL decrement the streak protector count by 1
3. WHEN a user misses a day and has no streak protectors available, THE System SHALL reset the streak to 1 on the next lesson completion
4. WHEN a user misses more than one consecutive day, THE System SHALL reset the streak regardless of streak protector availability
5. THE System SHALL initialize new users with 1 streak protector in their booster inventory

### Requirement 5: Adventure Data Structure

**User Story:** As a developer, I want adventures to have a clear data structure similar to lessons, so that they can be easily managed and displayed.

#### Acceptance Criteria

1. THE System SHALL define adventures with the following properties: adventureId, title, description, service, roles, steps array, xpReward, and badge
2. WHEN defining adventure steps, THE System SHALL include stepId, description, and completed status for each step
3. THE System SHALL store adventures in a data file similar to the lessons data structure
4. THE System SHALL provide helper functions to retrieve adventures by ID, service, and role
5. THE System SHALL set the base adventure XP reward to 400 XP

### Requirement 6: Adventure Step Completion

**User Story:** As a user, I want to mark individual adventure steps as complete, so that I can track my progress through multi-step challenges.

#### Acceptance Criteria

1. WHEN a user views an adventure, THE System SHALL display all steps with their completion status
2. WHEN a user marks a step as complete, THE System SHALL update the step's completed status to true
3. WHEN a user marks a step as complete, THE System SHALL persist the updated adventure state to AsyncStorage
4. THE System SHALL allow users to mark steps complete in any order
5. WHEN displaying adventure steps, THE System SHALL visually distinguish completed steps from incomplete steps

### Requirement 7: Adventure Completion and Rewards

**User Story:** As a user, I want to receive bonus XP and badges when I complete all steps of an adventure, so that I feel rewarded for completing challenging tasks.

#### Acceptance Criteria

1. WHEN all steps of an adventure are marked complete, THE System SHALL award the adventure's XP reward to the user
2. WHEN an adventure is completed, THE System SHALL add the adventure's badge to the user's badge collection
3. WHEN an adventure is completed, THE System SHALL add the adventure ID to the user's adventuresCompleted array
4. WHEN calculating XP for adventure completion, THE System SHALL apply the same difficulty and booster multipliers as lesson XP
5. WHEN an adventure is already in the user's adventuresCompleted array, THE System SHALL prevent duplicate completion rewards

### Requirement 8: Adventure Tracking in User Profile

**User Story:** As a user, I want my completed adventures tracked in my profile, so that I can see my achievement history.

#### Acceptance Criteria

1. THE System SHALL add an adventuresCompleted array property to the User type
2. WHEN a user completes an adventure, THE System SHALL append the adventure ID to the adventuresCompleted array
3. WHEN retrieving user data, THE System SHALL include the adventuresCompleted array
4. THE System SHALL persist the adventuresCompleted array to AsyncStorage along with other user data
5. THE System SHALL initialize the adventuresCompleted array as empty for new users

### Requirement 9: Date Validation for Streak Logic

**User Story:** As a developer, I want streak calculations to use UTC dates consistently, so that streak tracking works correctly across time zones.

#### Acceptance Criteria

1. WHEN comparing dates for streak validation, THE System SHALL convert all dates to UTC format
2. WHEN extracting the date portion for comparison, THE System SHALL use only the year, month, and day components
3. WHEN calculating the difference between dates, THE System SHALL compute the number of days between UTC dates
4. THE System SHALL store lastActiveDate in ISO 8601 string format
5. WHEN parsing lastActiveDate, THE System SHALL handle both ISO string format and Date objects

### Requirement 10: Mock Leaderboard Data

**User Story:** As a developer, I want to use mock leaderboard data for the MVP, so that the leaderboard UI can be implemented and tested without a backend.

#### Acceptance Criteria

1. THE System SHALL generate mock leaderboard data with at least 20 user entries
2. WHEN generating mock data, THE System SHALL include realistic user names, avatar URLs, XP values, and ranks
3. THE System SHALL include the current user in the mock leaderboard data
4. WHEN displaying mock leaderboard data, THE System SHALL vary the data based on the selected period (weekly, monthly, friends)
5. THE System SHALL store mock leaderboard data in a separate data file for easy replacement with real data later

# Requirements Document

## Introduction

This feature enhances the Nimbus learning app's social experience by fixing leaderboard display issues (XP accuracy, name formatting), adding interactive profile navigation from the leaderboard, and introducing a Followers/Following social system with a mutual-follow Friends feature. All data is persisted via AsyncStorage with no backend dependency.

## Glossary

- **Leaderboard_Screen**: The screen at `screens/LeaderBoardScreen.tsx` that displays ranked user entries by XP score across weekly, monthly, and friends periods.
- **Dashboard_Screen**: The screen at `screens/DashboardScreen.tsx` that shows the current user's stats, courses, and daily lessons.
- **Profile_Screen**: The screen at `screens/ProfileScreen.tsx` that displays a user's profile details, stats, boosters, and settings.
- **User_Profile_View**: A read-only view of another user's profile accessible by tapping a leaderboard entry. Displays that user's name, avatar, level, XP, streak, badges, and social counts.
- **Leaderboard_Context**: The React context at `contexts/LeaderboardContext.tsx` that manages leaderboard data, period selection, and refresh logic.
- **User_Context**: The React context at `contexts/UserContext.tsx` that manages the current user's profile, XP, level, and persistence via AsyncStorage.
- **Social_Context**: A new React context responsible for managing followers, following, and friends data persisted in AsyncStorage.
- **Current_User**: The authenticated user of the app whose profile is stored in User_Context.
- **Leaderboard_Entry**: A single row on the leaderboard representing a user's rank, name, avatar, XP earned, adventure bonus, and calculated score.
- **XP**: Experience points earned by completing lessons and adventures, used for ranking on the leaderboard.
- **Score**: The calculated ranking value for a Leaderboard_Entry, defined as `xpEarned + (adventureBonus * 2)`.
- **Follower**: A user who has chosen to follow another user.
- **Following**: A user that the Current_User has chosen to follow.
- **Friend**: A pair of users who mutually follow each other.
- **AsyncStorage**: The local key-value storage mechanism used by the app for all data persistence.

## Requirements

### Requirement 1: Leaderboard XP Accuracy

**User Story:** As a learner, I want the leaderboard to reflect my actual XP so that my ranking accurately represents my learning progress.

#### Acceptance Criteria

1. WHEN the Leaderboard_Screen loads, THE Leaderboard_Context SHALL retrieve the Current_User's XP from User_Context and use that value as the `xpEarned` field for the Current_User's Leaderboard_Entry.
2. WHEN the Current_User earns XP through lessons or adventures, THE Leaderboard_Context SHALL recalculate the Current_User's Score using the formula `xpEarned + (adventureBonus * 2)`.
3. WHEN the leaderboard entries are sorted by Score in descending order, THE Leaderboard_Context SHALL assign rank values starting from 1 based on the sorted position.
4. WHEN the Current_User's Score is lower than the Score of the last-ranked entry among the other users on the leaderboard, THE Leaderboard_Screen SHALL exclude the Current_User's Leaderboard_Entry from the displayed list.
5. WHEN the Current_User's Score is equal to or higher than the Score of at least one other entry, THE Leaderboard_Screen SHALL display the Current_User's Leaderboard_Entry at the correct rank position.

### Requirement 2: Leaderboard Name Display

**User Story:** As a learner, I want to see my full name on the leaderboard so that my entry looks correct and identifiable.

#### Acceptance Criteria

1. WHEN generating the Current_User's Leaderboard_Entry, THE Leaderboard_Context SHALL set the `name` field to the Current_User's full name from User_Context instead of the string "You".
2. WHEN rendering the Current_User's Leaderboard_Entry, THE Leaderboard_Screen SHALL display the text as `{Full Name} (You)` where `{Full Name}` is the Current_User's name from User_Context.
3. WHEN rendering a Leaderboard_Entry that does not belong to the Current_User, THE Leaderboard_Screen SHALL display only the entry's name without any suffix.

### Requirement 3: Clickable Leaderboard Profiles

**User Story:** As a learner, I want to tap on other users in the leaderboard to view their profiles so that I can learn about fellow learners.

#### Acceptance Criteria

1. WHEN the Current_User taps on a Leaderboard_Entry that belongs to another user, THE Leaderboard_Screen SHALL navigate to the User_Profile_View for that user.
2. WHEN the Current_User taps on their own Leaderboard_Entry, THE Leaderboard_Screen SHALL navigate to the Profile_Screen.
3. THE User_Profile_View SHALL display the selected user's name, avatar, level, XP, streak days, badges count, followers count, and following count.
4. THE User_Profile_View SHALL include a back button that returns the Current_User to the Leaderboard_Screen.
5. THE User_Profile_View SHALL display a follow or unfollow button based on the Current_User's current follow status with the viewed user.

### Requirement 4: Followers and Following System

**User Story:** As a learner, I want to follow other users and see who follows me so that I can build a learning community.

#### Acceptance Criteria

1. THE Social_Context SHALL persist the Current_User's followers list and following list in AsyncStorage.
2. WHEN the Current_User taps the follow button on a User_Profile_View, THE Social_Context SHALL add the viewed user's ID to the Current_User's following list and add the Current_User's ID to the viewed user's followers list in AsyncStorage.
3. WHEN the Current_User taps the unfollow button on a User_Profile_View, THE Social_Context SHALL remove the viewed user's ID from the Current_User's following list and remove the Current_User's ID from the viewed user's followers list in AsyncStorage.
4. THE Profile_Screen SHALL display the Current_User's followers count and following count.
5. THE User_Profile_View SHALL display the viewed user's followers count and following count.
6. WHEN the Social_Context loads, THE Social_Context SHALL read the followers and following lists from AsyncStorage and make the data available to consuming components.

### Requirement 5: Friends Feature (Mutual Follow)

**User Story:** As a learner, I want to see which users are my friends (mutual follows) so that I can connect with people who share my learning interests.

#### Acceptance Criteria

1. WHEN two users mutually follow each other, THE Social_Context SHALL identify the pair as Friends.
2. THE Social_Context SHALL compute the friends list by finding user IDs that appear in both the Current_User's followers list and following list.
3. THE Profile_Screen SHALL display a Friends section that shows only mutual follows with each friend's name and avatar.
4. WHEN the Current_User unfollows a Friend, THE Social_Context SHALL remove that user from the computed friends list.
5. WHEN the "friends" period is selected on the Leaderboard_Screen, THE Leaderboard_Context SHALL filter entries to show only users who are Friends of the Current_User.

### Requirement 6: Social Data Persistence

**User Story:** As a learner, I want my social connections to persist across app sessions so that I do not lose my followers, following, and friends data.

#### Acceptance Criteria

1. THE Social_Context SHALL store all social relationship data in AsyncStorage using a consistent key format (e.g., `@nimbus_social_{userId}`).
2. WHEN the app launches, THE Social_Context SHALL load the Current_User's social data from AsyncStorage before rendering social-dependent screens.
3. IF AsyncStorage returns no social data for the Current_User, THEN THE Social_Context SHALL initialize empty followers, following, and friends lists.
4. WHEN a follow or unfollow action completes, THE Social_Context SHALL persist the updated social data to AsyncStorage before updating the UI state.

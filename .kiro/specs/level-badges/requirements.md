# Requirements Document

## Introduction

Level Badges is a gamification feature for the Nimbus AWS learning app. When a user levels up by accumulating XP, the app awards a badge for the completed level. Users can view all earned badges on a dedicated Badges screen accessible from the Profile screen's Achievements button, and view individual badge details including name, date/time received, and XP earned. A notification is shown on level-up that deep-links to the new badge's details.

## Glossary

- **App**: The Nimbus React Native / Expo mobile application for learning AWS
- **Badge**: A reward object representing the completion of a specific level, containing a name, the date and time it was received, and the XP amount earned at that level
- **Badges_Screen**: A screen displaying a scrollable list of all badges the user has earned
- **BadgeDetails_Screen**: A screen displaying the full details of a single badge
- **Profile_Screen**: The existing user profile screen containing the Achievements button
- **Dashboard_Screen**: The existing main dashboard screen containing the notification modal
- **Notification_Modal**: The existing modal on the Dashboard_Screen that displays notifications to the user
- **User_Context**: The existing React context that manages user state including level, xp, and badges
- **Theme_Context**: The existing React context providing dark and light mode color values
- **Achievements_Button**: The existing button on the Profile_Screen labeled "Achievements", currently inactive

## Requirements

### Requirement 1: Badge Creation on Level Up

**User Story:** As a learner, I want to automatically earn a badge when I level up, so that I have a tangible record of my progress.

#### Acceptance Criteria

1. WHEN the user's level increases, THE App SHALL create a Badge with the name "Level N" where N is the completed level number
2. WHEN the user's level increases, THE App SHALL record the current date and time on the newly created Badge
3. WHEN the user's level increases, THE App SHALL record the XP amount the user had at the moment of leveling up on the newly created Badge
4. WHEN the user's level increases, THE App SHALL persist the new Badge in the User_Context badges data
5. IF the user's level increases by more than one level at once, THEN THE App SHALL create a Badge for each level gained

### Requirement 2: Badges Screen

**User Story:** As a learner, I want to see a list of all my earned badges, so that I can review my achievements over time.

#### Acceptance Criteria

1. THE Badges_Screen SHALL display a scrollable list of all Badges the user has earned, ordered by date received descending
2. WHEN the user has zero earned badges, THE Badges_Screen SHALL display an empty state message indicating no badges have been earned
3. THE Badges_Screen SHALL use Theme_Context colors for all visual elements to support dark and light mode
4. WHEN a Badge in the list is tapped, THE Badges_Screen SHALL navigate to the BadgeDetails_Screen for that Badge

### Requirement 3: Badge Details Screen

**User Story:** As a learner, I want to view the details of a specific badge, so that I can see when I earned it and how much XP I had.

#### Acceptance Criteria

1. THE BadgeDetails_Screen SHALL display the Badge name (e.g., "Level 1")
2. THE BadgeDetails_Screen SHALL display the date and time the Badge was received
3. THE BadgeDetails_Screen SHALL display the XP amount the user earned when reaching that level
4. THE BadgeDetails_Screen SHALL use Theme_Context colors for all visual elements to support dark and light mode
5. THE BadgeDetails_Screen SHALL provide a back navigation option to return to the Badges_Screen

### Requirement 4: Achievements Button Activation

**User Story:** As a learner, I want the Achievements button on my profile to take me to my badges, so that I can easily access my achievements.

#### Acceptance Criteria

1. WHEN the user has one or more earned badges, THE Achievements_Button SHALL be active and navigable
2. WHEN the Achievements_Button is tapped and the user has earned badges, THE Profile_Screen SHALL navigate to the Badges_Screen
3. WHEN the user has zero earned badges, THE Achievements_Button SHALL appear inactive and not navigate

### Requirement 5: Level-Up Notification with Badge Deep Link

**User Story:** As a learner, I want to be notified when I earn a new badge, so that I can immediately view it.

#### Acceptance Criteria

1. WHEN the user levels up, THE Notification_Modal SHALL include a notification with the message "You earned a badge for completing Level N" where N is the completed level number
2. WHEN the user taps the level-up badge notification, THE App SHALL navigate to the BadgeDetails_Screen for the corresponding Badge
3. THE App SHALL mark the level-up badge notification as unread until the user views the notification

### Requirement 6: Navigation Registration

**User Story:** As a developer, I want the new screens registered in the navigation stack, so that the app can route to them.

#### Acceptance Criteria

1. THE App SHALL register the Badges_Screen in the RootStackParamList navigation type
2. THE App SHALL register the BadgeDetails_Screen in the RootStackParamList navigation type with a parameter identifying which Badge to display

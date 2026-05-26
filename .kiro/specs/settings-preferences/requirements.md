# Requirements Document

## Introduction

The Settings and Preferences feature adds a dedicated screen to the Nimbus AWS learning app where users can manage their app experience. This includes toggling between dark and light themes, enabling or disabling push notifications, changing their learning path, viewing account information, accessing an about section, and logging out. The screen is accessible from the Profile screen's existing "Settings & Preferences" option.

## Glossary

- **Settings_Screen**: The dedicated screen that displays all user-configurable preferences and app information sections.
- **Theme_Toggle**: A switch control that allows the user to select between dark mode and light mode for the app's visual appearance.
- **Notification_Toggle**: A switch control that allows the user to enable or disable push notifications.
- **Learning_Path_Selector**: A navigation action that takes the user to the CreateProfileStep1 screen to re-select their learning path (role or service).
- **Account_Section**: A grouped area on the Settings_Screen displaying the user's name, email, and avatar.
- **About_Section**: A grouped area on the Settings_Screen displaying app version, terms of service link, and privacy policy link.
- **Theme_Context**: A React context that provides the current theme (dark or light) and a function to toggle the theme across the entire app.
- **User_Context**: The existing React context (UserContext) that manages user state including profile data, learning path, and notification preferences.

## Requirements

### Requirement 1: Navigate to Settings Screen

**User Story:** As a learner, I want to tap "Settings & Preferences" on my profile, so that I can access all app settings in one place.

#### Acceptance Criteria

1. WHEN the user taps the "Settings & Preferences" option on the Profile screen, THE Settings_Screen SHALL navigate the user to the Settings and Preferences screen.
2. THE Settings_Screen SHALL display a back button that returns the user to the Profile screen.
3. THE Settings_Screen SHALL display the title "Settings" at the top of the screen.

### Requirement 2: Dark Mode Toggle

**User Story:** As a learner, I want to toggle between dark and light themes, so that I can use the app comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display a Theme_Toggle switch in the Appearance section.
2. WHEN the user toggles the Theme_Toggle to light mode, THE Theme_Context SHALL update all screens to use light theme colors (light backgrounds, dark text).
3. WHEN the user toggles the Theme_Toggle to dark mode, THE Theme_Context SHALL update all screens to use dark theme colors (dark backgrounds, light text).
4. THE Theme_Context SHALL persist the selected theme preference to device storage using AsyncStorage.
5. WHEN the app launches, THE Theme_Context SHALL restore the previously saved theme preference from device storage.
6. IF no saved theme preference exists, THEN THE Theme_Context SHALL default to dark mode.

### Requirement 3: Notifications Toggle

**User Story:** As a learner, I want to enable or disable push notifications, so that I can control whether the app sends me reminders and updates.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display a Notification_Toggle switch in the Notifications section.
2. THE Notification_Toggle SHALL reflect the current value of the user's notificationsEnabled property from User_Context.
3. WHEN the user toggles the Notification_Toggle to enabled, THE Settings_Screen SHALL update the notificationsEnabled property in User_Context to true.
4. WHEN the user toggles the Notification_Toggle to disabled, THE Settings_Screen SHALL update the notificationsEnabled property in User_Context to false.
5. THE User_Context SHALL persist the updated notificationsEnabled value to device storage.

### Requirement 4: Change Learning Path

**User Story:** As a learner, I want to change my learning path from settings, so that I can switch between learning by job role and learning by service without creating a new account.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display a "Change Learning Path" option in the Learning section.
2. THE Settings_Screen SHALL display the user's current learning path (role name or service name) as subtitle text below the "Change Learning Path" label.
3. WHEN the user taps the "Change Learning Path" option, THE Settings_Screen SHALL navigate the user to the CreateProfileStep1 screen.
4. WHEN the user completes the learning path re-selection flow, THE User_Context SHALL update the user's mode, selectedRole, or selectedService accordingly.

### Requirement 5: Account Information

**User Story:** As a learner, I want to see my account details in settings, so that I can verify my profile information at a glance.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display an Account_Section at the top of the settings list.
2. THE Account_Section SHALL display the user's avatar image from User_Context.
3. THE Account_Section SHALL display the user's name from User_Context.
4. THE Account_Section SHALL display the user's email from User_Context.

### Requirement 6: About Section

**User Story:** As a learner, I want to access app information from settings, so that I can view the app version and legal documents.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display an About_Section grouped area.
2. THE About_Section SHALL display the current app version number.
3. THE About_Section SHALL display a "Terms of Service" option.
4. THE About_Section SHALL display a "Privacy Policy" option.
5. WHEN the user taps "Terms of Service", THE Settings_Screen SHALL open the terms of service content.
6. WHEN the user taps "Privacy Policy", THE Settings_Screen SHALL open the privacy policy content.

### Requirement 7: Logout

**User Story:** As a learner, I want to log out from the settings screen, so that I can sign out of my account securely.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display a "Log Out" button at the bottom of the settings list.
2. WHEN the user taps the "Log Out" button, THE Settings_Screen SHALL display a confirmation prompt asking the user to confirm the logout action.
3. WHEN the user confirms the logout, THE Settings_Screen SHALL clear the user session via User_Context and navigate to the Login screen.
4. WHEN the user cancels the logout confirmation, THE Settings_Screen SHALL dismiss the prompt and remain on the Settings_Screen.

### Requirement 8: Daily Goal Setting

**User Story:** As a learner, I want to adjust my daily learning goal, so that I can set a pace that fits my schedule.

#### Acceptance Criteria

1. THE Settings_Screen SHALL display a "Daily Goal" option in the Learning section.
2. THE Settings_Screen SHALL display the current daily goal value (in minutes) from User_Context as subtitle text.
3. WHEN the user taps the "Daily Goal" option, THE Settings_Screen SHALL present selectable goal options (5, 10, 15, 20 minutes).
4. WHEN the user selects a new daily goal value, THE User_Context SHALL update and persist the dailyGoal property.

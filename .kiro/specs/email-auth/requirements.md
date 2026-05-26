# Requirements Document

## Introduction

Nimbus is a React Native (Expo) learning app that currently uses local AsyncStorage for user data. The existing authentication stores passwords in plain text and includes a Google OAuth integration that has proven unreliable. This feature replaces the current auth approach with a secure, simple email/password authentication system that includes password hashing, email verification via a code, and persistent login sessions so users stay logged in between app launches.

## Glossary

- **Auth_Service**: The authentication service module (`services/auth.ts`) responsible for user registration, login, password hashing, session management, and verification logic.
- **Login_Screen**: The screen where existing users enter their email and password to authenticate.
- **SignUp_Screen**: The screen where new users enter their email, name, password, and confirm password to create an account.
- **Verification_Screen**: A new screen where users enter a 6-digit verification code sent to their email address.
- **User_Context**: The React context (`contexts/UserContext.tsx`) that manages the current user state and persists it via AsyncStorage.
- **Session_Token**: A unique string stored in AsyncStorage that identifies an authenticated user session and enables persistent login.
- **Verification_Code**: A 6-digit numeric code generated during sign-up and sent to the user's email for address verification.
- **Password_Hash**: The result of applying a one-way hash function (SHA-256 via expo-crypto) to a user's password before storage.

## Requirements

### Requirement 1: Secure Password Storage

**User Story:** As a user, I want my password to be stored securely, so that my credentials are protected even if local storage is compromised.

#### Acceptance Criteria

1. WHEN a user creates an account, THE Auth_Service SHALL hash the password using SHA-256 (via expo-crypto) before storing it in AsyncStorage.
2. WHEN a user logs in, THE Auth_Service SHALL hash the provided password and compare the hash against the stored Password_Hash.
3. THE Auth_Service SHALL store only the Password_Hash and SHALL NOT store the plain-text password at any point.

### Requirement 2: User Registration

**User Story:** As a new user, I want to create an account with my email, name, and password, so that I can access the Nimbus app.

#### Acceptance Criteria

1. WHEN a user submits the sign-up form, THE Auth_Service SHALL validate that the email matches a standard email format (contains `@` and a domain).
2. WHEN a user submits the sign-up form, THE Auth_Service SHALL validate that the password is at least 6 characters long.
3. WHEN a user submits the sign-up form, THE Auth_Service SHALL validate that the name is at least 2 characters long.
4. WHEN a user submits the sign-up form, THE Auth_Service SHALL validate that the password and confirm-password fields match.
5. WHEN a user submits a sign-up form with an email that is already registered, THE Auth_Service SHALL return an error message "Email already registered".
6. WHEN all validations pass, THE Auth_Service SHALL create a new user record with a unique userId, the lowercase email, the Password_Hash, the name, and a creation timestamp.
7. WHEN registration succeeds, THE SignUp_Screen SHALL navigate the user to the Verification_Screen.

### Requirement 3: Email Verification

**User Story:** As a new user, I want to verify my email address with a code, so that the app can confirm I own the email I registered with.

#### Acceptance Criteria

1. WHEN a user completes registration, THE Auth_Service SHALL generate a 6-digit numeric Verification_Code.
2. WHEN a Verification_Code is generated, THE Auth_Service SHALL store the code in AsyncStorage associated with the user's email, along with an expiration timestamp of 10 minutes from generation.
3. WHEN a user enters the correct Verification_Code on the Verification_Screen, THE Auth_Service SHALL mark the user's email as verified.
4. WHEN a user enters an incorrect Verification_Code, THE Auth_Service SHALL display an error message "Invalid verification code".
5. WHEN a Verification_Code has expired (older than 10 minutes), THE Auth_Service SHALL reject the code and display "Code expired. Please request a new one".
6. WHEN a user requests a new code, THE Auth_Service SHALL invalidate the previous code and generate a new 6-digit Verification_Code with a fresh 10-minute expiration.
7. THE Verification_Screen SHALL provide a "Resend Code" button that triggers a new Verification_Code generation.
8. WHEN email verification succeeds, THE Verification_Screen SHALL navigate the user to the CreateProfileStep1 screen.

### Requirement 4: User Login

**User Story:** As a returning user, I want to log in with my email and password, so that I can access my learning progress.

#### Acceptance Criteria

1. WHEN a user submits the login form with valid credentials, THE Auth_Service SHALL authenticate the user by comparing the hashed input password against the stored Password_Hash.
2. WHEN authentication succeeds, THE Auth_Service SHALL create a Session_Token and store it in AsyncStorage.
3. WHEN authentication succeeds, THE Login_Screen SHALL navigate the user to the MainApp screen and reset the navigation stack.
4. WHEN a user submits invalid credentials, THE Auth_Service SHALL return an error message "Invalid email or password".
5. WHEN a user attempts to log in with an unverified email, THE Auth_Service SHALL return an error message "Please verify your email before logging in" and navigate to the Verification_Screen.

### Requirement 5: Persistent Login Session

**User Story:** As a user, I want to stay logged in between app launches, so that I do not have to enter my credentials every time I open the app.

#### Acceptance Criteria

1. WHEN the app launches, THE User_Context SHALL check AsyncStorage for an existing Session_Token.
2. WHEN a valid Session_Token is found at app launch, THE User_Context SHALL load the associated user profile and navigate directly to the MainApp screen, bypassing the Onboarding, Login, and SignUp screens.
3. WHEN no Session_Token is found at app launch, THE User_Context SHALL display the Onboarding screen as the initial route.
4. WHEN the user logs out, THE Auth_Service SHALL remove the Session_Token from AsyncStorage.
5. WHEN the user logs out, THE User_Context SHALL clear the user state and navigate to the Login screen.

### Requirement 6: Logout

**User Story:** As a user, I want to log out of my account, so that I can secure my session or switch accounts.

#### Acceptance Criteria

1. WHEN the user triggers logout, THE Auth_Service SHALL remove the Session_Token from AsyncStorage.
2. WHEN the user triggers logout, THE Auth_Service SHALL remove the current user identifier from AsyncStorage.
3. WHEN logout completes, THE User_Context SHALL set the user state to null.
4. WHEN logout completes, THE User_Context SHALL navigate the user to the Login screen and reset the navigation stack.

### Requirement 7: Remove Google/Third-Party Auth Dependencies

**User Story:** As a developer, I want to remove the Google OAuth integration, so that the authentication flow is simplified and reliable.

#### Acceptance Criteria

1. THE SignUp_Screen SHALL remove the Google sign-up button and associated Google OAuth logic.
2. THE Login_Screen SHALL remove the Google login button and associated Google OAuth logic.
3. THE Auth_Service SHALL remove the `signInOrSignUpWithGoogle` function and any Google-specific authentication code.
4. THE SignUp_Screen SHALL remove the Facebook sign-up button placeholder.
5. THE Login_Screen SHALL remove the Apple login button placeholder.

### Requirement 8: Input Validation Feedback

**User Story:** As a user, I want to see clear error messages when I enter invalid data, so that I can correct my input.

#### Acceptance Criteria

1. WHEN the user submits the sign-up form with an empty required field, THE SignUp_Screen SHALL display "Please fill in all fields".
2. WHEN the user enters an invalid email format, THE SignUp_Screen SHALL display "Please enter a valid email address".
3. WHEN the user enters a password shorter than 6 characters, THE SignUp_Screen SHALL display "Password must be at least 6 characters".
4. WHEN the user enters a name shorter than 2 characters, THE SignUp_Screen SHALL display "Name must be at least 2 characters".
5. WHEN the password and confirm-password fields do not match, THE SignUp_Screen SHALL display "Passwords do not match".
6. WHEN the user submits the login form with an empty email or password field, THE Login_Screen SHALL display "Please enter email and password".

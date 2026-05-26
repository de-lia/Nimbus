# Bugfix Requirements Document

## Introduction

The email authentication system in Nimbus generates a 6-digit verification code during registration but never actually sends it to the user's email address. The code is only stored in AsyncStorage and logged to the developer console via `console.log`. This means users have no way to receive their verification code and cannot complete the email verification step required to log in. The fix requires integrating an email delivery mechanism so the verification code reaches the user's inbox.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user registers with a valid email address THEN the system generates a verification code, stores it in AsyncStorage, and only outputs it via `console.log` — the code is never sent to the user's email address.

1.2 WHEN a user requests a resend of the verification code THEN the system generates a new code and stores it in AsyncStorage but again only logs it to the console — no email is delivered to the user.

1.3 WHEN a user is on the Verification Screen waiting for a code THEN the user has no way to receive the code because no email delivery occurs, making verification impossible outside of a developer environment.

### Expected Behavior (Correct)

2.1 WHEN a user registers with a valid email address THEN the system SHALL send the generated 6-digit verification code to that email address via an email delivery service (e.g., an HTTP call to an email API such as SendGrid, AWS SES, Resend, or a custom backend endpoint).

2.2 WHEN a user requests a resend of the verification code THEN the system SHALL send the newly generated code to the user's email address via the same email delivery mechanism.

2.3 WHEN the email delivery service fails or returns an error THEN the system SHALL return a meaningful error to the caller (e.g., `{ success: false, error: "Failed to send verification email. Please try again." }`) and SHALL NOT mark the registration or resend as successful without notifying the user of the delivery failure.

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user registers with valid inputs THEN the system SHALL CONTINUE TO generate a 6-digit numeric verification code, store it in AsyncStorage with a 10-minute expiry, and return the userId on success.

3.2 WHEN a user enters the correct verification code on the Verification Screen THEN the system SHALL CONTINUE TO mark the user's email as verified and navigate to CreateProfileStep1.

3.3 WHEN a user enters an incorrect or expired verification code THEN the system SHALL CONTINUE TO return the appropriate error message ("Invalid verification code" or "Code expired. Please request a new one").

3.4 WHEN a user logs in with valid credentials and a verified email THEN the system SHALL CONTINUE TO authenticate successfully, create a session token, and navigate to MainApp.

3.5 WHEN a user logs in with an unverified email THEN the system SHALL CONTINUE TO block login with the error "Please verify your email before logging in".

3.6 WHEN a user logs out THEN the system SHALL CONTINUE TO clear the session token and current user from AsyncStorage.

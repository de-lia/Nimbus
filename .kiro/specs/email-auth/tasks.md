# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Verification Code Email Delivery
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to the concrete failing cases: `signUp` and `resendVerificationCode` both generate codes but never call any email delivery function
  - Test that for any valid email, calling `signUp(email, password, name)` results in `sendVerificationEmail` being called with the user's email and the generated 6-digit code (from Bug Condition in design: `isBugCondition` — code is stored in AsyncStorage and logged to console but NOT sent via email)
  - Test that for any valid email, calling `resendVerificationCode(email)` results in `sendVerificationEmail` being called with the email and the new code
  - Test that when `sendVerificationEmail` returns `{ success: false }`, `signUp` returns `{ success: false, error: "Failed to send verification email. Please try again." }` (delivery failure handling)
  - The test assertions should match the Expected Behavior Properties from design (Properties 1 and 2)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists: `sendVerificationEmail` is never called, no error handling for delivery failures)
  - Document counterexamples found: `signUp("user@example.com", "password123", "Test")` succeeds without sending email; `resendVerificationCode("user@example.com")` returns code without sending email
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Code Generation, Verification, Login, and Session Flows
  - **IMPORTANT**: Follow observation-first methodology
  - Observe on UNFIXED code: `generateVerificationCode("user@example.com")` produces a 6-digit numeric string and stores a `VerificationEntry` in AsyncStorage with `expiresAt` ~10 minutes in the future
  - Observe on UNFIXED code: `verifyEmail("user@example.com", correctCode)` returns `{ success: true }` and sets `emailVerified: true`
  - Observe on UNFIXED code: `verifyEmail("user@example.com", "000000")` returns `{ success: false, error: "Invalid verification code" }`
  - Observe on UNFIXED code: `login(email, password)` with valid verified credentials returns `{ success: true, user }` and creates a session
  - Observe on UNFIXED code: `login(email, password)` with unverified email returns `{ success: false, error: "Please verify your email before logging in" }`
  - Observe on UNFIXED code: `logout()` clears session token and current user from AsyncStorage
  - Write property-based tests capturing these observed behaviors:
    - For all valid emails, `generateVerificationCode` produces a 6-digit numeric string (`/^\d{6}$/`) and stores it with 10-minute expiry (from Preservation Requirements / design Property 3)
    - For all correct code inputs, `verifyEmail` marks user as verified; for all incorrect codes, returns error (from design Property 4)
    - For all valid credential inputs with verified email, `login` succeeds and creates session; for unverified email, login is blocked (from design Property 4)
    - `logout` and `clearSession` always clear `@nimbus_session` and `@nimbus_current_user` from AsyncStorage (from design Property 4)
  - Verify tests pass on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 3. Fix: Wire email delivery into verification code flow

  - [x] 3.1 Create `sendVerificationEmail` function in `services/emailService.ts`
    - Create new file `services/emailService.ts`
    - Implement `sendVerificationEmail(email: string, code: string): Promise<{ success: boolean; error?: string }>` that sends an HTTP POST to `https://api.resend.com/emails` with the Resend API key from `EXPO_PUBLIC_RESEND_API_KEY`
    - Send a plain-text email with the 6-digit verification code to the recipient
    - Return `{ success: true }` on successful delivery, `{ success: false, error: "Failed to send verification email. Please try again." }` on failure
    - _Bug_Condition: isBugCondition(input) — code is generated but never sent via email delivery API_
    - _Expected_Behavior: sendVerificationEmail is called and delivers code via HTTP POST to Resend API_
    - _Preservation: No existing functions are modified in this sub-task_
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.2 Wire `sendVerificationEmail` into `signUp` in `services/auth.ts`
    - Import `sendVerificationEmail` from `services/emailService`
    - After `generateVerificationCode` returns the code in `signUp`, call `sendVerificationEmail(email, code)` instead of `console.log`
    - If `sendVerificationEmail` returns `{ success: false }`, return `{ success: false, error: "Failed to send verification email. Please try again." }` from `signUp`
    - Keep user record and verification code stored (user can retry via resend)
    - _Bug_Condition: signUp generates code and only logs it to console_
    - _Expected_Behavior: signUp calls sendVerificationEmail(email, code) and handles failure_
    - _Preservation: User record creation, password hashing, code generation and storage remain unchanged_
    - _Requirements: 2.1, 2.3_

  - [x] 3.3 Wire `sendVerificationEmail` into `resendVerificationCode` in `services/auth.ts`
    - Import `sendVerificationEmail` (already imported from 3.2)
    - After generating the new code in `resendVerificationCode`, call `sendVerificationEmail(email, code)`
    - Change return type to `Promise<{ success: boolean; code: string; error?: string }>` to communicate delivery failures
    - If email sending fails, return `{ success: false, code, error: "Failed to send verification email. Please try again." }`
    - _Bug_Condition: resendVerificationCode generates code but never sends it_
    - _Expected_Behavior: resendVerificationCode calls sendVerificationEmail(email, code) and returns delivery status_
    - _Preservation: Code invalidation and regeneration logic remains unchanged_
    - _Requirements: 2.2, 2.3_

  - [x] 3.4 Add `EXPO_PUBLIC_RESEND_API_KEY` to `.env.example`
    - Add `EXPO_PUBLIC_RESEND_API_KEY=your_resend_api_key_here` to `.env.example`
    - _Requirements: 2.1_

  - [x] 3.5 Update `VerificationScreen` resend handler for new return type
    - Update the resend handler in `screens/VerificationScreen.tsx` to handle the new return type from `resendVerificationCode`
    - Show error alert if `result.success` is false instead of always showing success
    - _Preservation: All other VerificationScreen behavior (code input, submit, navigation) remains unchanged_
    - _Requirements: 2.3_

  - [x] 3.6 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Verification Code Email Delivery
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior: `sendVerificationEmail` is called during `signUp` and `resendVerificationCode`, and delivery failures are handled
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 3.7 Verify preservation tests still pass
    - **Property 2: Preservation** - Code Generation, Verification, Login, and Session Flows
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all preservation tests still pass after fix (no regressions in code generation, verification, login, logout, session management)

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

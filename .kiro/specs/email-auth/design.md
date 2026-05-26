# Email Auth - Bugfix Design

## Overview

The Nimbus email authentication system generates a 6-digit verification code during registration and resend, but the code is only stored in AsyncStorage and logged to the console via `console.log`. It is never delivered to the user's email. This makes email verification impossible for end users.

The fix introduces a thin `sendVerificationEmail` service function that calls an external email API (Resend) over HTTP to deliver the code. The change is minimal: `signUp` and `resendVerificationCode` gain a call to this new function, and error handling is added for delivery failures. All existing verification logic (code generation, storage, validation, expiry) remains untouched.

## Glossary

- **Bug_Condition (C)**: A verification code is generated (via `generateVerificationCode`) but no email delivery occurs — the code is only logged to console
- **Property (P)**: When a verification code is generated, it SHALL be sent to the user's email address via an HTTP call to an email delivery API
- **Preservation**: All existing behavior unrelated to email sending — code generation, code storage, code validation, login, logout, session management — must remain unchanged
- **sendVerificationEmail**: A new function in `services/emailService.ts` that sends an HTTP POST to the Resend API with the recipient email and verification code
- **EXPO_PUBLIC_RESEND_API_KEY**: Environment variable holding the Resend API key for email delivery
- **generateVerificationCode**: Existing function in `services/auth.ts` that creates a 6-digit code and stores it in AsyncStorage
- **resendVerificationCode**: Existing function in `services/auth.ts` that invalidates the old code and generates a new one

## Bug Details

### Bug Condition

The bug manifests whenever a verification code is generated — both during initial registration (`signUp`) and when the user requests a resend (`resendVerificationCode`). The generated code is stored in AsyncStorage and returned, but no mechanism exists to deliver it to the user's email. The `signUp` function logs the code via `console.log`, which is only visible in a developer environment.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type { action: "signUp" | "resendCode", email: string }
  OUTPUT: boolean

  code := generateVerificationCode(input.email)
  RETURN code IS stored in AsyncStorage
         AND code IS logged to console
         AND code IS NOT sent to input.email via any email delivery mechanism
END FUNCTION
```

### Examples

- User registers with `user@example.com` → code `482917` is generated, stored in AsyncStorage, logged as `[DEV] Verification code for user@example.com: 482917` → user never receives an email and cannot verify
- User taps "Resend Code" on VerificationScreen → new code `193847` is generated and stored → user still receives nothing in their inbox
- User registers with `test@domain.org` → code is generated → user checks email, finds nothing → verification is stuck
- Edge case: email delivery API is down → currently irrelevant because no API call is made at all

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- 6-digit numeric verification code generation (format, randomness) must remain identical
- Code storage in AsyncStorage with 10-minute expiry must remain identical
- `verifyEmail` logic (correct code → verified, wrong code → error, expired → error) must remain identical
- Login flow (hash comparison, session creation, unverified email block) must remain identical
- Logout and session clearing must remain identical
- All UI screens and navigation flows must remain identical
- `signUp` must still return `{ success: true, userId }` on successful registration

**Scope:**
All inputs that do NOT involve the email sending step should be completely unaffected by this fix. This includes:
- Code generation logic and storage
- Code validation and expiry checking
- Password hashing and comparison
- Session token creation and retrieval
- User record creation and storage
- All screen navigation and UI rendering

## Hypothesized Root Cause

Based on the code analysis, the root cause is straightforward:

1. **No email delivery function exists**: There is no `sendVerificationEmail` function or any HTTP call to an email API anywhere in the codebase. The system was designed as a local-only MVP with the intention to add email delivery later.

2. **Console.log as placeholder**: In `signUp` (line ~112), the code is logged via `console.log(\`[DEV] Verification code for ${email}: ${code}\`)`. This was a development placeholder that was never replaced with actual delivery.

3. **resendVerificationCode has no delivery at all**: The `resendVerificationCode` function generates a new code and returns it, but doesn't even have a console.log — the code is silently stored and returned to the caller without any delivery attempt.

4. **No environment configuration for email**: The `.env.example` only contains Google OAuth client IDs. There are no email service API keys or configuration.

## Correctness Properties

Property 1: Bug Condition - Verification Code Email Delivery

_For any_ registration or resend action where a verification code is generated for a valid email address, the system SHALL call `sendVerificationEmail` with the user's email and the generated code, resulting in an HTTP request to the email delivery API.

**Validates: Requirements 2.1, 2.2**

Property 2: Bug Condition - Email Delivery Failure Handling

_For any_ registration or resend action where the email delivery API returns an error or is unreachable, the system SHALL return `{ success: false, error: "Failed to send verification email. Please try again." }` and SHALL NOT silently succeed.

**Validates: Requirements 2.3**

Property 3: Preservation - Code Generation and Storage

_For any_ email passed to `generateVerificationCode`, the function SHALL continue to produce a 6-digit numeric string and store a `VerificationEntry` in AsyncStorage with a 10-minute expiry, exactly as before the fix.

**Validates: Requirements 3.1**

Property 4: Preservation - Verification and Login Flow

_For any_ input that does NOT involve the email sending step (code validation, login, logout, session management), the fixed code SHALL produce exactly the same behavior as the original code, preserving all existing functionality.

**Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `services/emailService.ts` (NEW)

**Purpose**: Thin wrapper around the Resend API for sending verification emails.

**Specific Changes**:
1. **Create `sendVerificationEmail(email, code)` function**: Makes an HTTP POST to `https://api.resend.com/emails` with the recipient email, a subject line, and the verification code in the body. Uses `fetch` (available in React Native). Reads the API key from `EXPO_PUBLIC_RESEND_API_KEY` environment variable.
2. **Return a result object**: `{ success: boolean, error?: string }` so callers can handle failures.
3. **Keep it minimal**: No retry logic, no templating engine — just a plain-text email with the 6-digit code.

---

**File**: `services/auth.ts` (MODIFY)

**Function**: `signUp`

**Specific Changes**:
1. **Import `sendVerificationEmail`** from `services/emailService`
2. **Replace console.log with email delivery**: After `generateVerificationCode` returns the code, call `sendVerificationEmail(email, code)` instead of `console.log`
3. **Handle delivery failure**: If `sendVerificationEmail` returns `{ success: false }`, return `{ success: false, error: "Failed to send verification email. Please try again." }` from `signUp`. The user record and verification code are already stored, so the user can retry via resend.

**Function**: `resendVerificationCode`

**Specific Changes**:
1. **Add email delivery call**: After generating the new code, call `sendVerificationEmail(email, code)`
2. **Change return type**: Return `Promise<{ success: boolean, code: string, error?: string }>` instead of `Promise<string>` to communicate delivery failures
3. **Handle delivery failure**: If email sending fails, return the error so the UI can display it

---

**File**: `.env.example` (MODIFY)

**Specific Changes**:
1. **Add `EXPO_PUBLIC_RESEND_API_KEY`** placeholder with instructions for obtaining a Resend API key
2. **Remove or keep Google OAuth keys** (they may already be unused after the OAuth removal)

---

**File**: `screens/VerificationScreen.tsx` (MODIFY)

**Specific Changes**:
1. **Update resend handler**: Handle the new return type from `resendVerificationCode` — show error alert if email delivery fails instead of always showing success

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that call `signUp` and `resendVerificationCode` and assert that an email delivery function is invoked. Run these tests on the UNFIXED code to observe failures and confirm the bug.

**Test Cases**:
1. **Registration Email Test**: Call `signUp` with valid inputs, assert `sendVerificationEmail` was called with the correct email and a 6-digit code (will fail on unfixed code — no such call exists)
2. **Resend Email Test**: Call `resendVerificationCode` with a valid email, assert `sendVerificationEmail` was called (will fail on unfixed code)
3. **Delivery Failure Test**: Mock `sendVerificationEmail` to return failure, call `signUp`, assert error is returned (will fail on unfixed code — no error handling exists)

**Expected Counterexamples**:
- `sendVerificationEmail` is never called during `signUp` or `resendVerificationCode`
- No error handling exists for email delivery failures
- Possible cause: the function simply doesn't exist yet

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := signUp_fixed(input.email, input.password, input.name)
  ASSERT sendVerificationEmail WAS CALLED WITH (input.email, generatedCode)
  ASSERT result.success = true
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT verifyEmail_fixed(input) = verifyEmail_original(input)
  ASSERT login_fixed(input) = login_original(input)
  ASSERT logout_fixed() = logout_original()
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for verification, login, and logout operations, then write property-based tests capturing that behavior and confirm they still pass after the fix.

**Test Cases**:
1. **Code Generation Preservation**: Verify that `generateVerificationCode` still produces 6-digit codes stored with 10-minute expiry after the fix
2. **Verification Flow Preservation**: Verify that `verifyEmail` with correct/incorrect/expired codes produces the same results after the fix
3. **Login Flow Preservation**: Verify that login with valid/invalid credentials and verified/unverified emails produces the same results after the fix
4. **Session Management Preservation**: Verify that `createSession`, `getSession`, `clearSession`, and `logout` produce the same results after the fix

### Unit Tests

- Test `sendVerificationEmail` with mocked `fetch` — success and failure responses
- Test `signUp` calls `sendVerificationEmail` after generating code
- Test `signUp` returns error when email delivery fails
- Test `resendVerificationCode` calls `sendVerificationEmail` after generating new code
- Test `resendVerificationCode` returns error when email delivery fails
- Test VerificationScreen resend handler displays error on delivery failure

### Property-Based Tests

- Generate random valid emails and verify `sendVerificationEmail` is called during `signUp` with the correct email and a valid 6-digit code
- Generate random valid emails and verify `sendVerificationEmail` is called during `resendVerificationCode`
- Generate random inputs for `verifyEmail`, `login`, `logout` and verify behavior is identical before and after the fix (preservation)

### Integration Tests

- Test full registration flow: signUp → email sent → enter code on VerificationScreen → verified
- Test resend flow: request resend → new email sent → enter new code → verified
- Test failure flow: email API down → user sees error → taps resend → email API recovers → code delivered

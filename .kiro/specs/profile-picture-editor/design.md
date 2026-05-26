# Profile Picture Editor Bugfix Design

## Overview

The profile picture edit icon on the Profile Screen is non-functional — tapping it does nothing. The avatar is hardcoded to `avatar1.png` and ignores the user's stored `avatarUrl`. This fix will wire up the edit icon to present an action sheet with three options (take photo, choose from camera roll, choose built-in avatar), use `expo-image-picker` for camera/gallery flows, display a modal for built-in avatar selection, and update the displayed avatar to reflect `user.avatarUrl` from UserContext.

## Glossary

- **Bug_Condition (C)**: The edit icon `TouchableOpacity` has no `onPress` handler, and the `Image` source is hardcoded — so tapping the icon does nothing and the avatar never reflects the user's stored preference.
- **Property (P)**: Tapping the edit icon presents a selection interface; choosing an option updates `avatarUrl` via `updateUser`; the displayed avatar reflects `user.avatarUrl`.
- **Preservation**: All existing profile screen behavior (stats, logout, navigation, friends, boosters) must remain unchanged.
- **ProfileScreen**: The screen component in `screens/ProfileScreen.tsx` that renders the user profile.
- **UserContext**: The context in `contexts/UserContext.tsx` that manages user state including `avatarUrl`, persisted via AsyncStorage.
- **updateUser**: The function from UserContext that merges partial updates into the user object and persists to AsyncStorage.
- **avatarUrl**: Optional string field on the User type — stores either a built-in avatar identifier (e.g. `"avatar3"`) or a local file URI from camera/gallery.

## Bug Details

### Bug Condition

The bug manifests when a user taps the pencil edit icon on their profile picture. The `TouchableOpacity` wrapping the pencil icon has no `onPress` handler, so nothing happens. Additionally, the `Image` component uses a hardcoded `require("../assets/avatars/avatar1.png")` source instead of reading from `user.avatarUrl`.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type UserInteraction
  OUTPUT: boolean

  RETURN (input.action == "tap_edit_icon" AND editIcon.onPress == undefined)
         OR (user.avatarUrl != undefined AND displayedAvatar != user.avatarUrl)
END FUNCTION
```

### Examples

- User taps pencil icon → Expected: action sheet appears. Actual: nothing happens.
- User previously selected `avatar3` and `avatarUrl` is `"avatar3"` in AsyncStorage → Expected: `avatar3.png` displayed. Actual: `avatar1.png` displayed.
- User takes a photo via camera, URI stored as `avatarUrl` → Expected: photo displayed as avatar. Actual: `avatar1.png` displayed.
- User selects "Choose from Camera Roll", picks an image → Expected: selected image displayed. Actual: no way to trigger this flow.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- All profile stats (XP, streak, badges, followers, following) must continue to display correctly
- Logout button must continue to clear session and navigate to Login screen
- Friends list rendering must remain unchanged
- Boosters section must remain unchanged
- Navigation options (Achievements, Settings, Help, Invite Friends) must remain unchanged
- Level progress bar calculation and display must remain unchanged
- When `avatarUrl` is undefined/empty, the default `avatar1.png` must still be shown

**Scope:**
All interactions that do NOT involve the edit icon tap or avatar display should be completely unaffected by this fix. This includes:
- Scrolling the profile screen
- Tapping logout
- Viewing stats, boosters, friends
- Navigating to other screens via bottom tabs

## Hypothesized Root Cause

Based on the bug description, the issues are:

1. **Missing `onPress` Handler**: The `TouchableOpacity` wrapping the pencil icon at line ~79 of `ProfileScreen.tsx` has no `onPress` prop — it's purely decorative.

2. **Hardcoded Avatar Source**: The `Image` component at line ~76 uses `require("../assets/avatars/avatar1.png")` unconditionally, ignoring `user.avatarUrl`.

3. **No Action Sheet / Modal Logic**: There is no state management, action sheet presentation, or modal for selecting avatars — the entire feature is unimplemented.

4. **No `expo-image-picker` Integration**: The package is not installed and there is no camera/gallery picker logic in the codebase.

## Correctness Properties

Property 1: Bug Condition - Edit Icon Presents Selection Interface

_For any_ tap on the edit icon when a user is logged in, the fixed ProfileScreen SHALL present an action sheet with three options: "Take a Photo", "Choose from Camera Roll", and "Choose Built-in Avatar", and selecting any option SHALL trigger the corresponding flow (camera, gallery, or avatar modal) and upon completion SHALL update `user.avatarUrl` via `updateUser`.

**Validates: Requirements 2.1, 2.3, 2.4, 2.5**

Property 2: Bug Condition - Avatar Displays User's Stored URL

_For any_ render of ProfileScreen where `user.avatarUrl` is defined and non-empty, the displayed avatar image SHALL reflect the stored `avatarUrl` value (either a built-in avatar identifier mapped to its asset or a local file URI).

**Validates: Requirements 2.2**

Property 3: Preservation - Default Avatar Fallback

_For any_ render of ProfileScreen where `user.avatarUrl` is undefined or empty, the displayed avatar SHALL be the default `avatar1.png`, preserving the original behavior.

**Validates: Requirements 3.1**

Property 4: Preservation - Non-Avatar Profile Behavior

_For any_ interaction that is NOT related to the edit icon or avatar display (logout, stats viewing, friends, boosters, navigation options), the fixed code SHALL produce exactly the same behavior as the original code.

**Validates: Requirements 3.2, 3.3, 3.4**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `screens/ProfileScreen.tsx`

**Specific Changes**:

1. **Install `expo-image-picker`**: Add the dependency via `npx expo install expo-image-picker`.

2. **Add State Variables**: Add state for action sheet visibility (`showActionSheet`) and built-in avatar modal visibility (`showAvatarModal`).

3. **Wire Up `onPress` Handler**: Add an `onPress` callback to the edit icon `TouchableOpacity` that presents the action sheet.

4. **Implement Action Sheet**: Use a simple `ActionSheet`-style component (or React Native `Alert` with buttons on iOS, or a custom bottom sheet) presenting three options:
   - "Take a Photo" → calls `ImagePicker.launchCameraAsync`
   - "Choose from Camera Roll" → calls `ImagePicker.launchImageLibraryAsync`
   - "Choose Built-in Avatar" → opens the avatar modal

5. **Implement Camera/Gallery Handlers**: 
   - Request permissions via `ImagePicker.requestCameraPermissionsAsync()` / `ImagePicker.requestMediaLibraryPermissionsAsync()`
   - Launch picker, get URI from result
   - Call `updateUser({ avatarUrl: result.assets[0].uri })`

6. **Implement Built-in Avatar Modal**: 
   - Render a `Modal` with a grid of 6 avatar images
   - On selection, call `updateUser({ avatarUrl: "avatarN" })` where N is 1-6

7. **Fix Avatar Display Logic**: Replace the hardcoded `require(...)` with a function that:
   - If `user.avatarUrl` starts with `"avatar"` (built-in), map to the corresponding `require(...)` asset
   - If `user.avatarUrl` is a file URI, use `{ uri: user.avatarUrl }`
   - If `user.avatarUrl` is undefined/empty, fall back to `require("../assets/avatars/avatar1.png")`

**File**: `package.json`

**Specific Changes**:
1. Add `expo-image-picker` as a dependency.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis.

**Test Plan**: Write tests that render ProfileScreen and inspect the edit icon's `onPress` prop and the avatar `Image` source. Run on unfixed code to confirm the defects.

**Test Cases**:
1. **Edit Icon Handler Test**: Render ProfileScreen, find the edit icon TouchableOpacity, assert it has an `onPress` handler (will fail on unfixed code — `onPress` is undefined)
2. **Avatar Source Test**: Render ProfileScreen with a user whose `avatarUrl` is `"avatar3"`, assert the Image source reflects avatar3.png (will fail on unfixed code — always shows avatar1.png)
3. **Action Sheet Presentation Test**: Simulate tap on edit icon, assert an action sheet or selection UI appears (will fail on unfixed code — nothing happens)

**Expected Counterexamples**:
- Edit icon `onPress` is undefined
- Avatar Image source is always the hardcoded avatar1.png require regardless of `user.avatarUrl`

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL user WHERE user is logged in DO
  SIMULATE tap on edit icon
  ASSERT action sheet is presented with 3 options

  FOR EACH option IN ["camera", "gallery", "built-in"] DO
    SIMULATE selecting option
    ASSERT corresponding picker/modal is shown
    SIMULATE completing selection with a value
    ASSERT user.avatarUrl is updated via updateUser
    ASSERT displayed avatar reflects new avatarUrl
  END FOR
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL interaction WHERE NOT isBugCondition(interaction) DO
  ASSERT ProfileScreen_original(interaction) = ProfileScreen_fixed(interaction)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many user state configurations automatically
- It catches edge cases where avatar logic might accidentally affect other display elements
- It provides strong guarantees that non-avatar behavior is unchanged

**Test Plan**: Observe behavior on UNFIXED code first for stats display, logout, and other interactions, then write tests capturing that behavior.

**Test Cases**:
1. **Stats Display Preservation**: Verify XP, streak, badges, followers, following display correctly with various user states after fix
2. **Logout Preservation**: Verify logout clears session and navigates to Login after fix
3. **Default Avatar Preservation**: Verify that when `avatarUrl` is undefined, `avatar1.png` is still displayed
4. **Cancel Dismissal Preservation**: Verify dismissing the action sheet or modal without selecting leaves the avatar unchanged

### Unit Tests

- Test that edit icon `onPress` triggers action sheet display
- Test avatar source resolution: built-in identifier → correct require, file URI → `{ uri }`, undefined → default
- Test camera permission request and image picker launch
- Test gallery permission request and image picker launch
- Test built-in avatar modal renders 6 avatars
- Test selecting a built-in avatar calls `updateUser` with correct identifier
- Test cancelling action sheet / modal does not change state

### Property-Based Tests

- Generate random user states (with/without avatarUrl, various built-in identifiers, file URIs) and verify avatar display resolves correctly
- Generate random user states and verify all non-avatar profile data renders identically to the original implementation
- Generate random sequences of avatar selections and verify each persists correctly

### Integration Tests

- Full flow: tap edit icon → select "Take a Photo" → capture → avatar updates and persists
- Full flow: tap edit icon → select "Choose from Camera Roll" → pick image → avatar updates and persists
- Full flow: tap edit icon → select "Choose Built-in Avatar" → pick avatar3 → avatar updates and persists
- Flow with cancel: tap edit icon → dismiss action sheet → avatar unchanged
- Flow with modal cancel: tap edit icon → "Choose Built-in Avatar" → close modal → avatar unchanged

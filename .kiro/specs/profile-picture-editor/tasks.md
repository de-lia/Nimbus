# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Edit Icon Non-Functional and Avatar Hardcoded
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to the concrete failing cases:
    - Render `ProfileScreen` with a user whose `avatarUrl` is `"avatar3"` — assert the displayed `Image` source reflects `avatar3.png` (will fail: always shows `avatar1.png`)
    - Render `ProfileScreen` and find the edit icon `TouchableOpacity` — assert `onPress` is defined (will fail: `onPress` is `undefined`)
    - Simulate tap on edit icon — assert a selection interface with 3 options appears (will fail: nothing happens)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found (e.g., "edit icon onPress is undefined", "Image source is always avatar1.png regardless of user.avatarUrl")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Avatar Profile Behavior Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Observe on UNFIXED code: profile stats (XP, streak, badges, followers, following) render correctly for various user states
  - Observe on UNFIXED code: logout button clears session and navigates to Login
  - Observe on UNFIXED code: when `avatarUrl` is undefined, `avatar1.png` is displayed (default fallback)
  - Observe on UNFIXED code: friends list, boosters, navigation options all render correctly
  - Write property-based tests capturing observed behavior:
    - For all user states, stats display matches user data (XP, streak, badges count, followers, following)
    - For all user states where `avatarUrl` is undefined/empty, default `avatar1.png` is shown
    - Logout triggers `clearUser` and navigates to Login screen
  - Verify tests PASS on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3. Install expo-image-picker dependency
  - Run `npx expo install expo-image-picker`
  - Verify the package is added to `package.json`
  - _Requirements: 2.3, 2.4_

- [x] 4. Fix avatar display and implement edit functionality

  - [x] 4.1 Add avatar source resolution helper function in `screens/ProfileScreen.tsx`
    - Create a `getAvatarSource` function that:
      - If `avatarUrl` starts with `"avatar"` (built-in identifier), maps to the corresponding `require("../assets/avatars/avatarN.png")`
      - If `avatarUrl` is a file URI (starts with `file://` or `/`), returns `{ uri: avatarUrl }`
      - If `avatarUrl` is undefined or empty, falls back to `require("../assets/avatars/avatar1.png")`
    - Replace the hardcoded `require("../assets/avatars/avatar1.png")` in the `Image` component with `getAvatarSource(user.avatarUrl)`
    - _Bug_Condition: isBugCondition(input) where displayedAvatar != user.avatarUrl_
    - _Expected_Behavior: Image source reflects user.avatarUrl (built-in mapped to require, URI to { uri }, undefined to default)_
    - _Preservation: When avatarUrl is undefined, avatar1.png is still displayed_
    - _Requirements: 2.2, 3.1_

  - [x] 4.2 Add state variables and wire up edit icon `onPress` handler
    - Add `useState` for `showActionSheet` (boolean, default false) and `showAvatarModal` (boolean, default false)
    - Add `onPress={() => setShowActionSheet(true)}` to the edit icon `TouchableOpacity`
    - _Bug_Condition: isBugCondition(input) where editIcon.onPress == undefined_
    - _Expected_Behavior: Tapping edit icon sets showActionSheet to true_
    - _Requirements: 2.1_

  - [x] 4.3 Implement action sheet component
    - Render a bottom action sheet (Modal or custom overlay) when `showActionSheet` is true
    - Display three options: "Take a Photo", "Choose from Camera Roll", "Choose Built-in Avatar"
    - Include a "Cancel" option that dismisses the sheet
    - Each option triggers the corresponding handler and dismisses the sheet
    - _Expected_Behavior: Action sheet presents 3 options plus Cancel_
    - _Preservation: Cancelling leaves avatar unchanged_
    - _Requirements: 2.1, 3.4_

  - [x] 4.4 Implement camera and gallery picker handlers
    - Import `* as ImagePicker` from `expo-image-picker`
    - Implement `handleTakePhoto`:
      - Request camera permissions via `ImagePicker.requestCameraPermissionsAsync()`
      - If granted, launch camera via `ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 })`
      - If not cancelled, call `updateUser({ avatarUrl: result.assets[0].uri })`
    - Implement `handleChooseFromGallery`:
      - Request media library permissions via `ImagePicker.requestMediaLibraryPermissionsAsync()`
      - If granted, launch picker via `ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 })`
      - If not cancelled, call `updateUser({ avatarUrl: result.assets[0].uri })`
    - _Expected_Behavior: Camera/gallery selection updates avatarUrl via updateUser and persists to AsyncStorage_
    - _Requirements: 2.3, 2.4_

  - [x] 4.5 Implement built-in avatar selection modal
    - Render a `Modal` (visible when `showAvatarModal` is true) with a grid of 6 built-in avatars (avatar1 through avatar6)
    - Each avatar is a `TouchableOpacity` wrapping an `Image` with the corresponding `require("../assets/avatars/avatarN.png")`
    - On selection, call `updateUser({ avatarUrl: "avatarN" })` and close the modal
    - Include a close/cancel button that dismisses without changing the avatar
    - _Expected_Behavior: Selecting a built-in avatar updates avatarUrl to "avatarN" identifier_
    - _Preservation: Closing modal without selection leaves avatar unchanged_
    - _Requirements: 2.5, 3.4_

  - [x] 4.6 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Edit Icon Presents Selection Interface and Avatar Reflects User URL
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2_

  - [x] 4.7 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Avatar Profile Behavior Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

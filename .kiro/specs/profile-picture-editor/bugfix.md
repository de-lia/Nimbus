# Bugfix Requirements Document

## Introduction

The profile picture edit icon on the Profile Screen is non-functional. Tapping the pencil icon does nothing because the `TouchableOpacity` has no `onPress` handler. Additionally, the displayed avatar is hardcoded to `avatar1.png` and does not reflect the user's stored `avatarUrl` from UserContext. Users have no way to change their profile picture via camera, camera roll, or the 6 built-in avatars.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the user taps the pencil edit icon on their profile picture THEN the system does nothing (no action sheet, modal, or picker is presented)

1.2 WHEN the user has a custom `avatarUrl` stored in UserContext THEN the system ignores it and always displays the hardcoded `avatar1.png`

1.3 WHEN the user wants to take a photo with the camera for their profile picture THEN the system provides no way to do so

1.4 WHEN the user wants to choose a photo from their camera roll THEN the system provides no way to do so

1.5 WHEN the user wants to select one of the 6 built-in avatars THEN the system provides no way to do so

### Expected Behavior (Correct)

2.1 WHEN the user taps the pencil edit icon on their profile picture THEN the system SHALL present a selection interface offering three options: take a photo, choose from camera roll, or choose a built-in avatar

2.2 WHEN the user has a custom `avatarUrl` stored in UserContext THEN the system SHALL display that image as the profile picture instead of the default `avatar1.png`

2.3 WHEN the user selects "Take a Photo" from the selection interface THEN the system SHALL request camera permissions (if not already granted) and open the device camera, and upon capturing a photo the system SHALL update the user's `avatarUrl` via `updateUser` and persist it to AsyncStorage

2.4 WHEN the user selects "Choose from Camera Roll" from the selection interface THEN the system SHALL request media library permissions (if not already granted) and open the image picker, and upon selecting a photo the system SHALL update the user's `avatarUrl` via `updateUser` and persist it to AsyncStorage

2.5 WHEN the user selects "Choose Built-in Avatar" from the selection interface THEN the system SHALL display the 6 available built-in avatars (avatar1 through avatar6) and upon selection SHALL update the user's `avatarUrl` via `updateUser` and persist it to AsyncStorage

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the user has no custom `avatarUrl` set (field is undefined or empty) THEN the system SHALL CONTINUE TO display the default `avatar1.png` as the profile picture

3.2 WHEN the user views other profile information (name, level, XP, streak, badges, boosters, friends) THEN the system SHALL CONTINUE TO display all data correctly and unchanged

3.3 WHEN the user taps the logout button THEN the system SHALL CONTINUE TO clear the session and navigate to the Login screen

3.4 WHEN the user cancels or dismisses the photo selection interface without making a choice THEN the system SHALL CONTINUE TO display the current profile picture unchanged

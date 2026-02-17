# Google Sign-In Setup Instructions

## Installation Steps

### 1. Install Required Packages

Run the following command in your project directory:

```bash
npx expo install expo-auth-session expo-crypto expo-web-browser
```

### 2. Configure Google OAuth

#### For Development (Expo Go):
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. For **Application type**, select "Web application"
6. Add authorized redirect URIs:
   - `https://auth.expo.io/@YOUR_EXPO_USERNAME/nimbus`
   - Replace `YOUR_EXPO_USERNAME` with your Expo username

#### For Production (Standalone App):

**Android:**
1. Create "Android" OAuth client
2. Get your SHA-1 certificate fingerprint:
   ```bash
   keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
3. Add the SHA-1 to Google Console
4. Add package name: `com.deliadelveloper.Nimbus`

**iOS:**
1. Create "iOS" OAuth client
2. Add bundle identifier from `app.json`

### 3. Update app.json

Add the following to your `app.json`:

```json
{
  "expo": {
    "scheme": "nimbus",
    "ios": {
      "bundleIdentifier": "com.deliadelveloper.Nimbus"
    },
    "android": {
      "package": "com.deliadelveloper.Nimbus"
    }
  }
}
```

### 4. Environment Variables

Create a `.env` file in your project root:

```
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
```

## Testing

### In Expo Go:
1. Use the Web Client ID
2. Test on physical device (Google Sign-In doesn't work well in simulator)

### In Production:
1. Build standalone app
2. Use platform-specific client IDs

## Important Notes

- Google Sign-In requires physical device for testing
- Expo Go uses web-based OAuth flow
- Standalone apps use native OAuth flow
- Keep client IDs secure and never commit to version control

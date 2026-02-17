# Google Sign-In Implementation Guide

## ✅ Implementation Complete

Google Sign-In has been fully implemented for both Login and Signup screens.

## 📦 Required Packages

Install these packages to enable Google Sign-In:

```bash
npx expo install expo-auth-session expo-crypto expo-web-browser
```

## 🔧 Setup Steps

### Step 1: Install Dependencies

Run the command above in your project directory.

### Step 2: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**

#### For Expo Go (Development):
- **Application type**: Web application
- **Authorized redirect URIs**: 
  ```
  https://auth.expo.io/@YOUR_EXPO_USERNAME/nimbus
  ```
  Replace `YOUR_EXPO_USERNAME` with your actual Expo username

#### For Android (Production):
- **Application type**: Android
- **Package name**: `com.deliadelveloper.Nimbus`
- **SHA-1 certificate fingerprint**: Get it by running:
  ```bash
  keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
  ```

#### For iOS (Production):
- **Application type**: iOS
- **Bundle ID**: `com.deliadelveloper.Nimbus`

### Step 3: Configure Environment Variables

Create a `.env` file in your project root:

```env
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
```

**Important**: Add `.env` to your `.gitignore` file to keep credentials secure!

### Step 4: Update app.json

Ensure your `app.json` has the correct configuration:

```json
{
  "expo": {
    "name": "Nimbus",
    "slug": "nimbus",
    "scheme": "nimbus",
    "ios": {
      "bundleIdentifier": "com.deliadelveloper.Nimbus",
      "supportsTablet": true
    },
    "android": {
      "package": "com.deliadelveloper.Nimbus",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

## 🎯 How It Works

### User Flow

#### New User (Sign Up):
1. User clicks "Continue with Google"
2. Google OAuth popup appears
3. User selects Google account
4. App receives user info (email, name, photo)
5. Creates new account automatically
6. Navigates to profile setup (CreateProfileStep1)

#### Existing User (Login):
1. User clicks "Continue with Google"
2. Google OAuth popup appears
3. User selects Google account
4. App checks if email exists
5. Loads existing user profile
6. Navigates directly to MainApp (Dashboard)

### Technical Implementation

**Files Created/Modified:**

1. **`services/googleAuth.ts`** (NEW)
   - Google OAuth configuration
   - User info fetching
   - Auth hooks

2. **`services/auth.ts`** (UPDATED)
   - Added `signInOrSignUpWithGoogle()` function
   - Handles both new and existing Google users
   - Stores user with Google ID prefix

3. **`screens/LoginScreen.tsx`** (UPDATED)
   - Integrated Google Sign-In button
   - Handles OAuth response
   - Routes to appropriate screen

4. **`screens/SignUpScreen.tsx`** (UPDATED)
   - Integrated Google Sign-In button
   - Handles OAuth response
   - Creates new user profile

## 🧪 Testing

### In Development (Expo Go):

1. Make sure you've installed the required packages
2. Add your Web Client ID to `.env`
3. Run `npx expo start`
4. Test on a **physical device** (Google Sign-In doesn't work well in simulators)
5. Click "Continue with Google"
6. Select your Google account
7. Verify you're redirected correctly

### In Production (Standalone App):

1. Build your app: `eas build --platform android` or `eas build --platform ios`
2. Install on device
3. Test Google Sign-In with platform-specific client IDs

## 🔒 Security Features

- **No Password Storage**: Google users don't have passwords stored locally
- **Unique User IDs**: Google users get IDs prefixed with `google_`
- **Email Verification**: Google accounts are pre-verified
- **Secure Tokens**: OAuth tokens are handled by Expo's secure auth session
- **Profile Photos**: Automatically imports user's Google profile picture

## 📱 User Experience

### Benefits:
- ✅ One-click sign up/login
- ✅ No password to remember
- ✅ Automatic profile picture
- ✅ Pre-filled name and email
- ✅ Secure authentication
- ✅ Works across devices

### User Data Collected:
- Email address
- Full name
- Profile picture (optional)
- Google user ID (for identification)

## 🐛 Troubleshooting

### "Google Sign-In is not ready yet"
- Make sure you've installed the required packages
- Check that environment variables are set correctly
- Restart the Expo development server

### "Failed to authenticate with Google"
- Verify your Client IDs are correct
- Check that redirect URIs match in Google Console
- Ensure Google+ API is enabled

### "User cancelled the sign-in"
- This is normal if user closes the popup
- No action needed

### Works in Expo Go but not in standalone app
- Make sure you've created platform-specific OAuth clients
- Verify package name (Android) and bundle ID (iOS) match
- Check SHA-1 certificate for Android

## 🚀 Next Steps

### Optional Enhancements:

1. **Apple Sign-In**: Add similar implementation for iOS users
2. **Facebook Login**: Add Facebook OAuth
3. **Account Linking**: Allow users to link Google account to existing email account
4. **Profile Sync**: Sync profile picture updates from Google
5. **Revoke Access**: Add option to disconnect Google account
6. **Multiple Accounts**: Support signing in with multiple Google accounts

## 📚 Resources

- [Expo Auth Session Docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Expo Google Sign-In Guide](https://docs.expo.dev/guides/authentication/#google)

## ⚠️ Important Notes

1. **Physical Device Required**: Google Sign-In requires testing on a physical device
2. **Client IDs**: Keep your client IDs secure and never commit to version control
3. **Redirect URIs**: Must match exactly in Google Console
4. **Expo Username**: Required for development redirect URI
5. **Production Build**: Requires platform-specific OAuth clients

## 🎉 Success!

Your app now supports Google Sign-In! Users can:
- Sign up with one click
- Login without passwords
- Have their profile automatically populated
- Enjoy a seamless authentication experience

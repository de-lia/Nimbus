#!/bin/bash

# Google Sign-In Installation Script for Nimbus

echo "🚀 Installing Google Sign-In dependencies..."
echo ""

# Install required Expo packages
npx expo install expo-auth-session expo-crypto expo-web-browser

echo ""
echo "✅ Packages installed successfully!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Create a .env file in your project root with:"
echo "   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id"
echo "   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id"
echo "   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id"
echo ""
echo "2. Get your OAuth credentials from:"
echo "   https://console.cloud.google.com/"
echo ""
echo "3. Read GOOGLE_SIGNIN_IMPLEMENTATION.md for detailed setup instructions"
echo ""
echo "4. Restart your Expo development server:"
echo "   npx expo start"
echo ""
echo "🎉 Google Sign-In is ready to use!"

# 🚀 Google Sign-In Quick Start

## 3-Step Setup

### 1️⃣ Install Packages (2 minutes)
```bash
npx expo install expo-auth-session expo-crypto expo-web-browser
```

### 2️⃣ Get Google Credentials (5 minutes)
1. Visit: https://console.cloud.google.com/
2. Create project → Enable Google+ API
3. Create OAuth 2.0 Client (Web type)
4. Copy Client ID

### 3️⃣ Configure App (1 minute)
Create `.env` file:
```env
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

## ✅ Test It
```bash
npx expo start
```
- Open on **physical device** (required!)
- Click "Continue with Google"
- Done! 🎉

## 📖 Need More Help?
- Detailed guide: `GOOGLE_SIGNIN_IMPLEMENTATION.md`
- Setup instructions: `GOOGLE_SIGNIN_SETUP.md`
- Full summary: `GOOGLE_SIGNIN_SUMMARY.md`

## ⚠️ Important
- Must test on **physical device**
- Keep `.env` file **secret**
- Restart Expo after adding `.env`

---
**Total Setup Time**: ~8 minutes

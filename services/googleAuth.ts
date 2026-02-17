import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

// Complete the auth session for web browser
WebBrowser.maybeCompleteAuthSession();

// Google OAuth configuration
// Replace these with your actual client IDs from Google Cloud Console
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '';
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '';

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  givenName?: string;
  familyName?: string;
  photoUrl?: string;
}

// Hook for Google Sign-In
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  return { request, response, promptAsync };
};

// Fetch user info from Google
export const fetchGoogleUserInfo = async (accessToken: string): Promise<GoogleUserInfo | null> => {
  try {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userInfo = await response.json();
    
    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      givenName: userInfo.given_name,
      familyName: userInfo.family_name,
      photoUrl: userInfo.picture,
    };
  } catch (error) {
    console.error('Error fetching Google user info:', error);
    return null;
  }
};

// Generate redirect URI for OAuth
export const getRedirectUri = () => {
  return makeRedirectUri({
    scheme: 'nimbus',
    path: 'redirect',
  });
};

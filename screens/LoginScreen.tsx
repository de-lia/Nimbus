import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { useUser } from "../contexts/UserContext";
import { login, signInOrSignUpWithGoogle } from "../services/auth";
import { useGoogleAuth, fetchGoogleUserInfo } from "../services/googleAuth";

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loadUserProfile, updateUser } = useUser();
  
  // Google Sign-In
  const { request, response, promptAsync } = useGoogleAuth();

  useEffect(() => {
    handleGoogleResponse();
  }, [response]);

  const handleGoogleResponse = async () => {
    if (response?.type === 'success') {
      setLoading(true);
      const { authentication } = response;
      
      if (authentication?.accessToken) {
        // Fetch user info from Google
        const userInfo = await fetchGoogleUserInfo(authentication.accessToken);
        
        if (userInfo) {
          // Sign in or sign up with Google
          const result = await signInOrSignUpWithGoogle(
            userInfo.id,
            userInfo.email,
            userInfo.name,
            userInfo.photoUrl
          );
          
          if (result.success) {
            if (result.isNewUser) {
              // New user, create profile
              await updateUser({
                userId: result.userId!,
                name: userInfo.name,
                email: userInfo.email,
                avatarUrl: userInfo.photoUrl,
                mode: null,
                level: 1,
                xp: 0,
                streakDays: 0,
                lastActiveDate: new Date().toISOString(),
                boosters: { doubleXp: 0, streakProtectors: 1 },
                badges: [],
                adventuresCompleted: [],
                dailyGoal: 10,
                notificationsEnabled: true,
              });
              
              setLoading(false);
              navigation.navigate("CreateProfileStep1");
            } else {
              // Existing user, load profile
              await loadUserProfile(result.userId!);
              setLoading(false);
              
              navigation.reset({
                index: 0,
                routes: [{ name: "MainApp" }],
              });
            }
          } else {
            setLoading(false);
            Alert.alert("Error", result.error || "Failed to sign in with Google");
          }
        } else {
          setLoading(false);
          Alert.alert("Error", "Failed to get user information from Google");
        }
      } else {
        setLoading(false);
        Alert.alert("Error", "Failed to authenticate with Google");
      }
    } else if (response?.type === 'error') {
      Alert.alert("Error", "Google Sign-In was cancelled or failed");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setLoading(false);
      Alert.alert("Error", result.error || "Login failed");
      return;
    }

    // Load user profile from storage
    await loadUserProfile(result.user!.userId);

    setLoading(false);

    // Navigate cleanly to MainApp and reset history
    navigation.reset({
      index: 0,
      routes: [{ name: "MainApp" }],
    });
  };

  const handleGoogleLogin = () => {
    if (!request) {
      Alert.alert("Error", "Google Sign-In is not ready yet. Please try again.");
      return;
    }
    promptAsync();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* App Logo */}
          <View style={styles.logoWrapper}>
            <View style={styles.logo} />
          </View>

          {/* Title & Subtitle */}
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your Adventure</Text>

          {/* Input Fields */}
          <InputField
            label="Email or Username"
            placeholder="Enter your email or username"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.accent}
              style={{ marginVertical: 20 }}
            />
          ) : (
            <PrimaryButton title="Log In" onPress={handleLogin} />
          )}

          {/* Divider */}
          <View style={styles.orWrapper}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Don't have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoWrapper: { alignItems: "center", marginBottom: 30 },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: "#7CE8F4",
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    color: Colors.textPrimary,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 40,
  },
  forgotPassword: {
    color: Colors.accent,
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 20,
  },
  orWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.muted,
  },
  orText: {
    color: Colors.muted,
    marginHorizontal: 8,
    fontSize: 14,
  },
  socialButtons: { gap: 12 },
  socialButton: {
    borderColor: Colors.muted,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    textAlign: "center",
    color: Colors.muted,
    marginTop: 20,
  },
  link: { color: Colors.accent, fontWeight: "700" },
});

export default LoginScreen;

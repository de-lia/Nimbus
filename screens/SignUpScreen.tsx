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
import { signUp, validateEmail, validatePassword, validateName, signInOrSignUpWithGoogle } from "../services/auth";
import { useGoogleAuth, fetchGoogleUserInfo } from "../services/googleAuth";

const SignupScreen = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { updateUser } = useUser();
  
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
            // Create or update user profile
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
            
            if (result.isNewUser) {
              // New user, go to profile setup
              navigation.navigate("CreateProfileStep1");
            } else {
              // Existing user, go to main app
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

  const handleSignup = async () => {
    // Validate all fields
    if (!email || !name || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!validateName(name)) {
      Alert.alert("Error", "Name must be at least 2 characters");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    
    // Create account
    const result = await signUp(email, password, name);
    
    if (!result.success) {
      setLoading(false);
      Alert.alert("Error", result.error || "Failed to create account");
      return;
    }

    // Create initial user profile
    await updateUser({
      userId: result.userId!,
      name: name,
      email: email,
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
  };

  const handleGoogleSignup = () => {
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
          {/* App Icon */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>☁️</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Start Your Cloud Journey</Text>

          {/* Input Fields */}
          <InputField 
            label="Email" 
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <InputField 
            label="Full Name" 
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <InputField
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Sign Up Button */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.accent}
              style={{ marginVertical: 20 }}
            />
          ) : (
            <PrimaryButton title="Create Account" onPress={handleSignup} />
          )}

          {/* Divider */}
          <View style={styles.orWrapper}>
            <View style={styles.line} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Sign-In Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButtonLight} onPress={handleGoogleSignup}>
              <Text style={styles.socialTextDark}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButtonLight}>
              <Text style={styles.socialTextDark}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text style={styles.terms}>
            By creating an account, you agree to our{" "}
            <Text style={styles.link}>Terms of Service</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          {/* Footer Link to Login */}
          <Text style={styles.footer}>
            Already have an account?{" "}
            <Text
              style={styles.linkDark}
              onPress={() => navigation.navigate("Login")}
            >
              Log In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    backgroundColor: Colors.accent,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  iconText: { fontSize: 36 },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 30,
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
    color: Colors.textPrimary,
    marginHorizontal: 8,
    fontSize: 14,
  },
  socialButtons: { gap: 12 },
  socialButtonLight: {
    borderColor: Colors.muted,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialTextDark: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
  terms: {
    textAlign: "center",
    color: Colors.textPrimary,
    marginTop: 16,
    fontSize: 13,
  },
  footer: {
    textAlign: "center",
    color: Colors.textPrimary,
    marginTop: 20,
  },
  link: { color: Colors.accent, fontWeight: "700" },
  linkDark: { color: Colors.accent, fontWeight: "700" },
});

export default SignupScreen;

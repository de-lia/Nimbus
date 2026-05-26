import React from "react";
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
import { login } from "../services/auth";

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loadUserProfile } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setLoading(false);
      // Navigate to verification screen if email is unverified
      if (result.error === "Please verify your email before logging in") {
        navigation.navigate("VerificationScreen", { email });
        return;
      }
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
            label="Email"
            placeholder="Enter your email"
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
  footer: {
    textAlign: "center",
    color: Colors.muted,
    marginTop: 20,
  },
  link: { color: Colors.accent, fontWeight: "700" },
});

export default LoginScreen;

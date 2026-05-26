import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { verifyEmail, resendVerificationCode } from "../services/auth";

const VerificationScreen = ({ route, navigation }: any) => {
  const { email } = route.params;
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!code || code.length !== 6) {
      Alert.alert("Error", "Please enter a 6-digit verification code");
      return;
    }

    setLoading(true);
    const result = await verifyEmail(email, code);
    setLoading(false);

    if (!result.success) {
      Alert.alert("Error", result.error || "Verification failed");
      return;
    }

    navigation.navigate("CreateProfileStep1");
  };

  const handleResend = async () => {
    const result = await resendVerificationCode(email);
    if (!result.success) {
      Alert.alert("Error", result.error || "Failed to send verification email. Please try again.");
      return;
    }
    Alert.alert("Code Sent", "A new verification code has been sent to your email.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Icon */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✉️</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to {email}
          </Text>

          {/* Code Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit code"
              placeholderTextColor={Colors.muted}
              value={code}
              onChangeText={(text) => setCode(text.replace(/[^0-9]/g, "").slice(0, 6))}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          {/* Submit Button */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.accent}
              style={{ marginVertical: 20 }}
            />
          ) : (
            <PrimaryButton title="Verify" onPress={handleSubmit} />
          )}

          {/* Resend Code */}
          <TouchableOpacity onPress={handleResend} style={styles.resendWrapper}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: { width: "100%", marginBottom: 20 },
  label: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 15,
    color: Colors.textPrimary,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 8,
  },
  resendWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default VerificationScreen;

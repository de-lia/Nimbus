import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="cloud-outline" size={48} color="#FF9F00" />
            </View>
          </View>

          <Text style={styles.title}>Learn AWS, the fun way.</Text>
          <Text style={styles.subtitle}>Your adventure in the cloud starts here.</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.secondaryText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  iconContainer: { marginBottom: 40 },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FF9F00",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#A0A0A0",
    textAlign: "center",
    marginBottom: 60,
  },
  primaryButton: {
    backgroundColor: "#FF9F00",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 60,
    elevation: 4,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: "#0F161B",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryText: {
    color: "#FF9F00",
    fontSize: 16,
    fontWeight: "600",
  },
});
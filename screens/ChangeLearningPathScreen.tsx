import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";

const ChangeLearningPathScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const { user, updateUser } = useUser();
  const [selectedPath, setSelectedPath] = useState<"role" | "service" | null>(
    user?.mode ?? null
  );

  const handleChoose = async () => {
    if (!selectedPath) return;
    await updateUser({ mode: selectedPath });
    if (selectedPath === "role") {
      navigation.navigate("SelectRole", { returnTo: "MainApp" });
    } else {
      navigation.navigate("SelectService", { returnTo: "MainApp" });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Change Learning Path
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Choose Your Learning Path
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("LearningPathInfo")}
        >
          <Text style={[styles.infoLink, { color: colors.accent }]}>
            Which path is right for me?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            { borderColor: colors.border, backgroundColor: colors.card },
            selectedPath === "role" && { borderColor: colors.accent },
          ]}
          onPress={() => setSelectedPath("role")}
          accessibilityLabel="Learn by Job Role"
          accessibilityRole="button"
          testID="path-role"
        >
          <View style={[styles.optionIcon, { backgroundColor: colors.border }]}>
            <Text style={styles.optionEmoji}>💼</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Learn by Job Role
            </Text>
            <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>
              Master the skills for specific tech roles like Cloud Practitioner
              or Solutions Architect.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            { borderColor: colors.border, backgroundColor: colors.card },
            selectedPath === "service" && { borderColor: colors.accent },
          ]}
          onPress={() => setSelectedPath("service")}
          accessibilityLabel="Learn by Service"
          accessibilityRole="button"
          testID="path-service"
        >
          <View style={[styles.optionIcon, { backgroundColor: colors.border }]}>
            <Text style={styles.optionEmoji}>⚙️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Learn by Service
            </Text>
            <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>
              Deep dive into individual AWS services like S3, EC2, or Lambda.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chooseButton,
            { backgroundColor: colors.accent },
            !selectedPath && styles.chooseButtonDisabled,
          ]}
          onPress={handleChoose}
          disabled={!selectedPath}
          accessibilityLabel="Choose learning path"
          accessibilityRole="button"
          testID="choose-button"
        >
          <Text style={styles.chooseButtonText}>Choose</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeLearningPathScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { padding: 4 },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSpacer: { width: 32 },
  content: { padding: 16 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  infoLink: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 4,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    marginBottom: 14,
  },
  optionIcon: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionEmoji: { fontSize: 24 },
  optionTitle: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  optionDesc: { fontSize: 13 },
  chooseButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  chooseButtonDisabled: { opacity: 0.5 },
  chooseButtonText: { color: "#232F3E", fontSize: 18, fontWeight: "700" },
});

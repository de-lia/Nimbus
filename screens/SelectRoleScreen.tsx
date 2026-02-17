import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import { useUser } from "../contexts/UserContext";

const roles = [
  {
    id: "cloud_practitioner",
    title: "Cloud Practitioner",
    description: "Foundation level - Learn AWS basics and core services",
    icon: "☁️",
  },
  {
    id: "solutions_architect",
    title: "Solutions Architect",
    description: "Design and deploy scalable systems on AWS",
    icon: "🏗️",
  },
  {
    id: "developer",
    title: "Developer",
    description: "Build and maintain applications on AWS",
    icon: "💻",
  },
  {
    id: "devops_engineer",
    title: "DevOps Engineer",
    description: "Automate and optimize AWS infrastructure",
    icon: "⚙️",
  },
  {
    id: "sysops_administrator",
    title: "SysOps Administrator",
    description: "Manage and operate systems on AWS",
    icon: "🔧",
  },
  {
    id: "security_specialist",
    title: "Security Specialist",
    description: "Secure AWS infrastructure and applications",
    icon: "🔒",
  },
  {
    id: "database_specialist",
    title: "Database Specialist",
    description: "Design and manage databases on AWS",
    icon: "🗄️",
  },
  {
    id: "data_engineer",
    title: "Data Engineer",
    description: "Build data pipelines and analytics solutions",
    icon: "📊",
  },
  {
    id: "ml_engineer",
    title: "Machine Learning Engineer",
    description: "Build and deploy ML models on AWS",
    icon: "🤖",
  },
  {
    id: "network_specialist",
    title: "Network Specialist",
    description: "Design and manage AWS network infrastructure",
    icon: "🌐",
  },
];

interface Props {
  navigation: any;
}

const SelectRoleScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { setLearningPath } = useUser();

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    await setLearningPath("role", selectedRole);
    navigation.navigate("CreateProfileStep2");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Progress bar */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: "66%" }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 3</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select the AWS role you want to master
        </Text>

        {/* Role Cards */}
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleCard,
              selectedRole === role.id && styles.roleSelected,
            ]}
            onPress={() => setSelectedRole(role.id)}
          >
            <View style={styles.roleIcon}>
              <Text style={styles.roleEmoji}>{role.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Continue button */}
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedRole}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressWrapper: { alignItems: "center", marginBottom: 20 },
  progressBackground: {
    width: "90%",
    height: 6,
    borderRadius: 10,
    backgroundColor: "#444",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.accent,
  },
  progressText: {
    color: Colors.muted,
    marginTop: 6,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 24,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#444",
    backgroundColor: Colors.backgroundDark,
    marginBottom: 14,
  },
  roleSelected: {
    borderColor: Colors.accent,
    backgroundColor: "#2a2a2a",
  },
  roleIcon: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  roleEmoji: { fontSize: 24 },
  roleTitle: {
    fontWeight: "700",
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 4,
  },
  roleDescription: {
    color: Colors.muted,
    fontSize: 13,
  },
});

export default SelectRoleScreen;

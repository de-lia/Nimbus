import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import { useUser } from "../contexts/UserContext";
import {
  getRolesByCategory,
  CATEGORY_TAGS,
  CategoryTag,
  JobRole,
} from "../data/jobRoles";

interface Props {
  navigation: any;
  route: any;
}

const SelectRoleScreen: React.FC<Props> = ({ navigation, route }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { setLearningPath } = useUser();
  const returnTo = route?.params?.returnTo;

  const sections = useMemo(() => {
    const grouped = getRolesByCategory();
    return CATEGORY_TAGS.map((tag) => ({
      title: tag,
      data: grouped[tag] || [],
    }));
  }, []);

  const handleContinue = async () => {
    if (!selectedRole) return;
    await setLearningPath("role", selectedRole);
    if (returnTo === "MainApp") {
      navigation.navigate("MainApp");
    } else {
      navigation.navigate("CreateProfileStep2");
    }
  };

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const renderItem = ({ item }: { item: JobRole }) => (
    <TouchableOpacity
      style={[
        styles.roleCard,
        selectedRole === item.id && styles.roleSelected,
      ]}
      onPress={() => setSelectedRole(item.id)}
    >
      <View style={styles.roleIcon}>
        <Text style={styles.roleEmoji}>{item.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.roleTitle}>{item.displayName}</Text>
        <Text style={styles.roleDescription}>{item.description}</Text>
        {selectedRole === item.id && (
          <TouchableOpacity
            style={styles.certPathLink}
            onPress={() =>
              navigation.navigate("CertificationPath", { roleId: item.id })
            }
          >
            <Text style={styles.certPathLinkText}>
              View Certification Path
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
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
    </View>
  );

  const ListFooter = () => (
    <View style={styles.footer}>
      <PrimaryButton
        title="Continue"
        onPress={handleContinue}
        disabled={!selectedRole}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={{ padding: 16 }}
        stickySectionHeadersEnabled={false}
      />
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.accent,
    marginTop: 16,
    marginBottom: 8,
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
  certPathLink: {
    marginTop: 8,
  },
  certPathLinkText: {
    color: Colors.accent,
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SelectRoleScreen;

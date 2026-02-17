import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";
import { useUser } from "../contexts/UserContext";

const ProfileScreen: React.FC = () => {
  const { user, loading, clearUser } = useUser();
  const navigation = useNavigation();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>No user data</Text>
      </SafeAreaView>
    );
  }

  const xpForNextLevel = Math.floor(100 * Math.pow(user.level, 1.5));
  const currentLevelXP = user.level > 1 ? Math.floor(100 * Math.pow(user.level - 1, 1.5)) : 0;
  const xpInCurrentLevel = user.xp - currentLevelXP;
  const xpNeededForLevel = xpForNextLevel - currentLevelXP;
  const progressPercent = (xpInCurrentLevel / xpNeededForLevel) * 100;

  const handleLogout = async () => {
    await clearUser();
    // Navigate to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../assets/avatars/avatar1.png")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={14} color="#0B1217" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>
            Level {user.level} - {user.mode === "role" ? user.selectedRole?.replace("_", " ") : user.selectedService?.toUpperCase()}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="star-outline" size={20} color="#FFA500" />
            <Text style={styles.statValue}>{user.xp.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="flame-outline" size={20} color="#FFA500" />
            <Text style={styles.statValue}>{user.streakDays} days</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="shield-outline" size={20} color="#FFA500" />
            <Text style={styles.statValue}>{user.badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.nextLevelLabel}>Next Level</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {xpInCurrentLevel} / {xpNeededForLevel} XP
          </Text>
        </View>

        {/* Boosters */}
        <View style={styles.boostersSection}>
          <Text style={styles.sectionTitle}>Boosters</Text>
          <View style={styles.boosterRow}>
            <View style={styles.boosterCard}>
              <Ionicons name="flash" size={24} color="#FFB703" />
              <Text style={styles.boosterValue}>{user.boosters.doubleXp}</Text>
              <Text style={styles.boosterLabel}>Double XP</Text>
            </View>
            <View style={styles.boosterCard}>
              <Ionicons name="shield-checkmark" size={24} color="#00C851" />
              <Text style={styles.boosterValue}>{user.boosters.streakProtectors}</Text>
              <Text style={styles.boosterLabel}>Streak Shields</Text>
            </View>
          </View>
        </View>

        {/* Options */}
        <View style={styles.option}>
          <Ionicons name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.optionText}>Achievements</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </View>
        <View style={styles.option}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.optionText}>Settings & Preferences</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </View>
        <View style={styles.option}>
          <Ionicons name="help-circle-outline" size={20} color="#fff" />
          <Text style={styles.optionText}>Help & Support</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </View>
        <View style={styles.option}>
          <Ionicons name="person-add-outline" size={20} color="#fff" />
          <Text style={styles.optionText}>Invite Friends</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: Colors.awsNavy,
    borderRadius: 12,
    padding: 4,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#AAB4BE",
    fontSize: 14,
    textTransform: "capitalize",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1B263B",
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 4,
  },
  statValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 6,
  },
  statLabel: {
    color: "#AAB4BE",
    fontSize: 13,
  },
  progressSection: {
    marginBottom: 30,
  },
  nextLevelLabel: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 4,
  },
  progressBarBackground: {
    backgroundColor: "#1B263B",
    height: 8,
    borderRadius: 10,
  },
  progressBarFill: {
    backgroundColor: "#FFA500",
    height: 8,
    borderRadius: 10,
  },
  progressText: {
    color: "#AAB4BE",
    fontSize: 13,
    marginTop: 6,
    textAlign: "right",
  },
  boostersSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  boosterRow: {
    flexDirection: "row",
    gap: 12,
  },
  boosterCard: {
    flex: 1,
    backgroundColor: "#1B263B",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  boosterValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
  boosterLabel: {
    color: "#AAB4BE",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B263B",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
});
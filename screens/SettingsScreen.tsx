import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Switch,
  Modal,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";

const DAILY_GOAL_OPTIONS = [5, 10, 15, 20];

const SettingsScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, colors, toggleTheme } = useTheme();
  const { user, loading, updateUser, clearUser } = useUser();
  const [dailyGoalModalVisible, setDailyGoalModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await clearUser();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ]
    );
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Account Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          {loading || !user ? (
            <ActivityIndicator
              size="small"
              color={colors.accent}
              testID="account-loading"
            />
          ) : (
            <View style={styles.accountRow}>
              {user.avatarUrl ? (
                <Image
                  source={{ uri: user.avatarUrl }}
                  style={styles.avatar}
                  accessibilityLabel={`${user.name}'s avatar`}
                  testID="account-avatar"
                />
              ) : (
                <View
                  style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.border }]}
                  testID="account-avatar"
                  accessibilityLabel={`${user.name}'s avatar`}
                >
                  <Ionicons name="person" size={28} color={colors.textSecondary} />
                </View>
              )}
              <View style={styles.accountInfo}>
                <Text
                  style={[styles.accountName, { color: colors.text }]}
                  testID="account-name"
                >
                  {user.name}
                </Text>
                <Text
                  style={[styles.accountEmail, { color: colors.textSecondary }]}
                  testID="account-email"
                >
                  {user.email}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Appearance Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Appearance
          </Text>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.accent }}
              testID="theme-toggle"
              accessibilityLabel="Toggle dark mode"
              accessibilityRole="switch"
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Notifications
          </Text>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Push Notifications
            </Text>
            <Switch
              value={user?.notificationsEnabled ?? false}
              onValueChange={(value) => updateUser({ notificationsEnabled: value })}
              trackColor={{ false: colors.border, true: colors.accent }}
              testID="notifications-toggle"
              accessibilityLabel="Toggle push notifications"
              accessibilityRole="switch"
            />
          </View>
        </View>

        {/* Learning Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Learning
          </Text>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate("ChangeLearningPath")}
            accessibilityLabel="Change Learning Path"
            accessibilityRole="button"
            testID="change-learning-path"
          >
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Change Learning Path
              </Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                {user?.mode === "role"
                  ? user.selectedRole
                  : user?.mode === "service"
                  ? user.selectedService
                  : "Not set"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setDailyGoalModalVisible(true)}
            accessibilityLabel="Daily Goal"
            accessibilityRole="button"
            testID="daily-goal"
          >
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Daily Goal
              </Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                {user?.dailyGoal ?? 10} min
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            About
          </Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Version
            </Text>
            <Text
              style={[styles.versionText, { color: colors.textSecondary }]}
              testID="app-version"
            >
              1.0.0
            </Text>
          </View>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Linking.openURL("https://example.com/terms")}
            accessibilityLabel="Terms of Service"
            accessibilityRole="button"
            testID="terms-of-service"
          >
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Terms of Service
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Linking.openURL("https://example.com/privacy")}
            accessibilityLabel="Privacy Policy"
            accessibilityRole="button"
            testID="privacy-policy"
          >
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Privacy Policy
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.card }]}
          onPress={handleLogout}
          accessibilityLabel="Log Out"
          accessibilityRole="button"
          testID="logout-button"
        >
          <Text style={[styles.logoutButtonText, { color: colors.accent }]}>
            Log Out
          </Text>
        </TouchableOpacity>

        {/* Daily Goal Modal */}
        <Modal
          visible={dailyGoalModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDailyGoalModalVisible(false)}
          testID="daily-goal-modal"
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Set Daily Goal
              </Text>
              {DAILY_GOAL_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.modalOption,
                    { borderBottomColor: colors.border },
                    user?.dailyGoal === option && { backgroundColor: colors.accent + "20" },
                  ]}
                  onPress={() => {
                    updateUser({ dailyGoal: option });
                    setDailyGoalModalVisible(false);
                  }}
                  accessibilityLabel={`${option} minutes`}
                  accessibilityRole="button"
                  testID={`daily-goal-option-${option}`}
                >
                  <Text style={[styles.modalOptionText, { color: colors.text }]}>
                    {option} min
                  </Text>
                  {user?.dailyGoal === option && (
                    <Ionicons name="checkmark" size={20} color={colors.accent} />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.modalCancel, { borderTopColor: colors.border }]}
                onPress={() => setDailyGoalModalVisible(false)}
                accessibilityLabel="Cancel"
                accessibilityRole="button"
                testID="daily-goal-cancel"
              >
                <Text style={[styles.modalCancelText, { color: colors.accent }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    padding: 16,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  accountInfo: {
    marginLeft: 12,
    flex: 1,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "600",
  },
  accountEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLabel: {
    fontSize: 16,
  },
  settingTextGroup: {
    flex: 1,
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  versionText: {
    fontSize: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 12,
    paddingTop: 20,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCancel: {
    paddingVertical: 14,
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

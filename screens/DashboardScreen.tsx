import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DailyLessonCard from "../components/DailyLessonCard";
import AdventureCard from "../components/AdventureCard";
import { useUser } from "../contexts/UserContext";
import type { Badge } from "../contexts/UserContext";
import { useLesson } from "../contexts/LessonContext";
import { useTheme } from "../contexts/ThemeContext";
import { useFocusEffect } from "@react-navigation/native";
import type { ImageSourcePropType } from "react-native";

export const generateBadgeNotificationMessage = (level: number): string =>
  `You earned a badge for completing Level ${level}`;

const getRelativeTime = (isoDate: string): string => {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  if (isNaN(then)) return "Recently";
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

const avatarMap: Record<string, ImageSourcePropType> = {
  avatar1: require("../assets/avatars/avatar1.png"),
  avatar2: require("../assets/avatars/avatar2.png"),
  avatar3: require("../assets/avatars/avatar3.png"),
  avatar4: require("../assets/avatars/avatar4.png"),
  avatar5: require("../assets/avatars/avatar5.png"),
  avatar6: require("../assets/avatars/avatar6.png"),
};

const getAvatarSource = (avatarUrl?: string): ImageSourcePropType => {
  if (!avatarUrl) return avatarMap.avatar1;
  if (avatarUrl.startsWith("avatar") && avatarMap[avatarUrl]) return avatarMap[avatarUrl];
  if (avatarUrl.startsWith("file://") || avatarUrl.startsWith("/")) return { uri: avatarUrl };
  return avatarMap.avatar1;
};

const DashboardScreen = ({ navigation }: any) => {
  const { user, loading } = useUser();
  const { progress: lessonProgress } = useLesson();
  const { theme, colors } = useTheme();
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(prev => prev + 1);
    }, [])
  );

  const getGreeting = () => {
    const hour = new Date().getUTCHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const [readBadgeIds, setReadBadgeIds] = useState<Set<string>>(new Set());

  const hardcodedNotifications = [
    { id: "1", title: "Daily Streak Reminder", message: "Keep your streak alive! Complete a lesson today.", time: "2 hours ago", read: false },
    { id: "2", title: "New Adventure Available", message: "Check out the new Lambda adventure!", time: "1 day ago", read: true },
    { id: "3", title: "Level Up!", message: "Congratulations! You've reached level " + (user?.level || 1), time: "2 days ago", read: true },
  ];

  const badgeNotifications = useMemo(() => {
    if (!user?.badges) return [];
    return user.badges.map((badge: Badge) => ({
      id: `badge_level_${badge.level}`,
      title: "New Badge Earned!",
      message: generateBadgeNotificationMessage(badge.level),
      time: getRelativeTime(badge.receivedAt),
      read: readBadgeIds.has(`badge_level_${badge.level}`),
      badgeLevel: badge.level,
    }));
  }, [user?.badges, readBadgeIds]);

  const notifications = [...badgeNotifications, ...hardcodedNotifications];

  const unreadCount = notifications.filter(n => !n.read).length;

  const ProgressBar = ({ progress }: { progress: number }) => (
    <View style={[styles.progressContainer, { backgroundColor: colors.card }]}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>No user data</Text>
      </SafeAreaView>
    );
  }

  const xpForNextLevel = Math.floor(100 * Math.pow(user.level, 1.5));
  const currentLevelXP = user.level > 1 ? Math.floor(100 * Math.pow(user.level - 1, 1.5)) : 0;
  const xpInCurrentLevel = user.xp - currentLevelXP;
  const xpNeededForLevel = xpForNextLevel - currentLevelXP;
  const progressPercent = Math.min((xpInCurrentLevel / xpNeededForLevel) * 100, 100);

  const getEnrolledCourses = () => {
    const courses = [];
    if (user.mode === "role" && user.selectedRole) {
      const roleMap: Record<string, { title: string; image: any }> = {
        cloud_practitioner: { title: "Cloud Practitioner", image: require("../assets/cloud_practitioner.png") },
        solutions_architect: { title: "Solutions Architect", image: require("../assets/solutions_architect.png") },
        developer: { title: "Developer", image: require("../assets/cloud_practitioner.png") },
        sysops_administrator: { title: "SysOps Administrator", image: require("../assets/solutions_architect.png") },
      };
      const course = roleMap[user.selectedRole];
      if (course) {
        const { lessons } = require("../data/lessons");
        const roleLessons = lessons.filter((l: any) => l.roles.includes(user.selectedRole));
        const completedCount = roleLessons.filter((l: any) => lessonProgress[l.lessonId]?.completed).length;
        const progress = roleLessons.length > 0 ? (completedCount / roleLessons.length) * 100 : 0;
        courses.push({ ...course, progress: Math.round(progress) });
      }
    } else if (user.mode === "service" && user.selectedService) {
      const serviceMap: Record<string, string> = { s3: "Amazon S3", ec2: "Amazon EC2", lambda: "AWS Lambda", rds: "Amazon RDS" };
      const title = serviceMap[user.selectedService] || user.selectedService.toUpperCase();
      const { lessons } = require("../data/lessons");
      const serviceLessons = lessons.filter((l: any) => l.service === user.selectedService);
      const completedCount = serviceLessons.filter((l: any) => lessonProgress[l.lessonId]?.completed).length;
      const progress = serviceLessons.length > 0 ? (completedCount / serviceLessons.length) * 100 : 0;
      courses.push({ title, image: require("../assets/cloud_practitioner.png"), progress: Math.round(progress) });
    }
    return courses;
  };

  const enrolledCourses = getEnrolledCourses();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={getAvatarSource(user.avatarUrl)} style={styles.profileImage} />
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>{getGreeting()},</Text>
            <Text style={[styles.username, { color: colors.text }]}>{user.name}!</Text>
          </View>
          <TouchableOpacity onPress={() => setNotificationModalVisible(true)} style={styles.notificationButton}>
            <Icon name="bell" size={22} color={colors.text} />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <FontAwesome5 name="fire" size={20} color="#FF7F50" />
            <Text style={[styles.statValue, { color: colors.text }]}>{user.streakDays} days</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <FontAwesome5 name="star" size={20} color="#FFD700" />
            <Text style={[styles.statValue, { color: colors.text }]}>{user.xp.toLocaleString()}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>XP</Text>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>Overall Progress</Text>
            <Text style={[styles.levelText, { color: colors.textSecondary }]}>Level {user.level}</Text>
          </View>
          <ProgressBar progress={progressPercent} />
          <Text style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
            {Math.max(0, xpNeededForLevel - xpInCurrentLevel)} XP to next level
          </Text>
        </View>

        {/* Daily Lesson */}
        <View style={styles.lessonCard}>
          <DailyLessonCard onStartLesson={() => navigation.navigate("LessonPlayer", { lessonId: "s3_lesson_1" })} />
        </View>

        {/* Adventure Card */}
        <View style={styles.adventureCard}>
          <AdventureCard onStartAdventure={() => navigation.navigate("Adventure", { adventureId: "s3_adventure_1" })} />
        </View>

        {/* My Courses */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My Courses</Text>
        {enrolledCourses.length > 0 ? (
          <View style={styles.coursesContainer}>
            {enrolledCourses.map((course, index) => (
              <View key={index} style={[styles.courseCard, { backgroundColor: colors.card }]}>
                <Image source={course.image} style={styles.courseImage} />
                <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
                <ProgressBar progress={course.progress} />
                <Text style={[styles.courseProgressText, { color: colors.textSecondary }]}>{course.progress}% Complete</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.emptyCoursesContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.emptyCoursesText, { color: colors.textSecondary }]}>
              No courses enrolled yet. Choose a learning path to get started!
            </Text>
            <TouchableOpacity style={[styles.chooseLearningPathButton, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate("ChangeLearningPath")}>
              <Text style={styles.chooseLearningPathText}>Choose Learning Path</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notification Modal */}
        <Modal visible={notificationModalVisible} transparent animationType="slide" onRequestClose={() => setNotificationModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Notifications</Text>
                <TouchableOpacity onPress={() => setNotificationModalVisible(false)}>
                  <Icon name="x" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isBadgeNotification = 'badgeLevel' in item;
                  const handlePress = () => {
                    if (isBadgeNotification) {
                      setReadBadgeIds(prev => new Set(prev).add(item.id));
                      setNotificationModalVisible(false);
                      navigation.navigate("BadgeDetails", { badgeLevel: (item as any).badgeLevel });
                    }
                  };
                  const content = (
                    <View style={[styles.notificationItem, { backgroundColor: colors.background }, !item.read && { backgroundColor: colors.card, borderLeftWidth: 3, borderLeftColor: colors.accent }]}>
                      <View style={styles.notificationContent}>
                        <Text style={[styles.notificationTitle, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>{item.message}</Text>
                        <Text style={[styles.notificationTime, { color: colors.border }]}>{item.time}</Text>
                      </View>
                      {!item.read && <View style={[styles.unreadDot, { backgroundColor: colors.accent }]} />}
                    </View>
                  );
                  if (isBadgeNotification) {
                    return <TouchableOpacity onPress={handlePress}>{content}</TouchableOpacity>;
                  }
                  return content;
                }}
                ListEmptyComponent={<Text style={[styles.emptyNotifications, { color: colors.textSecondary }]}>No notifications yet</Text>}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  greeting: { fontSize: 14 },
  username: { fontSize: 18, fontWeight: "bold" },
  notificationButton: { marginLeft: "auto", position: "relative" },
  notificationBadge: { position: "absolute", top: -4, right: -4, backgroundColor: "#FF4444", borderRadius: 10, width: 18, height: 18, justifyContent: "center", alignItems: "center" },
  notificationBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  statsContainer: { flexDirection: "row", justifyContent: "space-between" },
  statCard: { flex: 1, padding: 16, margin: 5, borderRadius: 12, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "bold", marginTop: 4 },
  statLabel: { fontSize: 12 },
  progressSection: { marginVertical: 16 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between" },
  progressTitle: { fontWeight: "bold" },
  levelText: {},
  progressContainer: { height: 8, borderRadius: 8, marginVertical: 8 },
  progressBar: { height: 8, borderRadius: 8, backgroundColor: "#21C25E" },
  progressSubtitle: { fontSize: 12 },
  lessonCard: { borderRadius: 16, marginVertical: 12, overflow: "hidden" },
  adventureCard: { borderRadius: 16, marginVertical: 12, overflow: "hidden" },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginVertical: 10 },
  coursesContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  courseCard: { borderRadius: 12, padding: 10, width: "48%" },
  courseImage: { width: "100%", height: 80, borderRadius: 8 },
  courseTitle: { fontWeight: "bold", fontSize: 14, marginVertical: 8 },
  courseProgressText: { fontSize: 12, marginTop: 4 },
  emptyCoursesContainer: { borderRadius: 12, padding: 24, alignItems: "center", marginBottom: 30 },
  emptyCoursesText: { fontSize: 14, textAlign: "center", marginBottom: 16 },
  chooseLearningPathButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  chooseLearningPathText: { color: "#232F3E", fontWeight: "bold", fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: "80%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  notificationItem: { borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: "row", alignItems: "center" },
  notificationContent: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  notificationMessage: { fontSize: 14, marginBottom: 4 },
  notificationTime: { fontSize: 12 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 8 },
  emptyNotifications: { textAlign: "center", marginTop: 20, fontSize: 14 },
});

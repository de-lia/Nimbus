import React, { useState, useEffect } from "react";
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
import { useLesson } from "../contexts/LessonContext";
import { useFocusEffect } from "@react-navigation/native";

const DashboardScreen = ({ navigation }: any) => {
  const { user, loading } = useUser();
  const { progress: lessonProgress } = useLesson();
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(prev => prev + 1);
    }, [])
  );

  // Get UTC-based greeting
  const getGreeting = () => {
    const hour = new Date().getUTCHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Mock notifications (you can replace this with real notification data later)
  const notifications = [
    {
      id: "1",
      title: "Daily Streak Reminder",
      message: "Keep your streak alive! Complete a lesson today.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "New Adventure Available",
      message: "Check out the new Lambda adventure!",
      time: "1 day ago",
      read: true,
    },
    {
      id: "3",
      title: "Level Up!",
      message: "Congratulations! You've reached level " + (user?.level || 1),
      time: "2 days ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Inline Progress Bar Component
  const ProgressBar = ({ progress }: { progress: number }) => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

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
  const progressPercent = Math.min((xpInCurrentLevel / xpNeededForLevel) * 100, 100);

  // Get user's enrolled courses based on their learning path
  const getEnrolledCourses = () => {
    const courses = [];
    
    if (user.mode === "role" && user.selectedRole) {
      // Map role to course
      const roleMap: Record<string, { title: string; image: any }> = {
        cloud_practitioner: {
          title: "Cloud Practitioner",
          image: require("../assets/cloud_practitioner.png"),
        },
        solutions_architect: {
          title: "Solutions Architect",
          image: require("../assets/solutions_architect.png"),
        },
        developer: {
          title: "Developer",
          image: require("../assets/cloud_practitioner.png"),
        },
        sysops_administrator: {
          title: "SysOps Administrator",
          image: require("../assets/solutions_architect.png"),
        },
      };
      
      const course = roleMap[user.selectedRole];
      if (course) {
        // Calculate progress based on completed lessons for this role
        const { lessons } = require("../data/lessons");
        const roleLessons = lessons.filter((l: any) => l.roles.includes(user.selectedRole));
        const completedCount = roleLessons.filter((l: any) => lessonProgress[l.lessonId]?.completed).length;
        const progress = roleLessons.length > 0 ? (completedCount / roleLessons.length) * 100 : 0;
        
        courses.push({
          ...course,
          progress: Math.round(progress),
        });
      }
    } else if (user.mode === "service" && user.selectedService) {
      // Map service to course
      const serviceMap: Record<string, string> = {
        s3: "Amazon S3",
        ec2: "Amazon EC2",
        lambda: "AWS Lambda",
        rds: "Amazon RDS",
      };
      
      const title = serviceMap[user.selectedService] || user.selectedService.toUpperCase();
      
      // Calculate progress based on completed lessons for this service
      const { lessons } = require("../data/lessons");
      const serviceLessons = lessons.filter((l: any) => l.service === user.selectedService);
      const completedCount = serviceLessons.filter((l: any) => lessonProgress[l.lessonId]?.completed).length;
      const progress = serviceLessons.length > 0 ? (completedCount / serviceLessons.length) * 100 : 0;
      
      courses.push({
        title,
        image: require("../assets/cloud_practitioner.png"),
        progress: Math.round(progress),
      });
    }
    
    return courses;
  };

  const enrolledCourses = getEnrolledCourses();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/avatars/avatar1.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.username}>{user.name}!</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setNotificationModalVisible(true)}
            style={styles.notificationButton}
          >
            <Icon name="bell" size={22} color="#fff" />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FontAwesome5 name="fire" size={20} color="#FF7F50" />
            <Text style={styles.statValue}>{user.streakDays} days</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="star" size={20} color="#FFD700" />
            <Text style={styles.statValue}>{user.xp.toLocaleString()}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Overall Progress</Text>
            <Text style={styles.levelText}>Level {user.level}</Text>
          </View>
          <ProgressBar progress={progressPercent} />
          <Text style={styles.progressSubtitle}>
            {Math.max(0, xpNeededForLevel - xpInCurrentLevel)} XP to next level
          </Text>
        </View>

        {/* Daily Lesson */}
        <View style={styles.lessonCard}>
          <DailyLessonCard onStartLesson={() => navigation.navigate("LessonPlayer", { lessonId: "s3_lesson_1" })} />
        </View>

        {/* Adventure Card */}
        <View style={[styles.adventureCard]}>
          <AdventureCard onStartAdventure={() => navigation.navigate("Adventure", { adventureId: "s3_adventure_1" })} />
        </View>

        {/* Start Learning Section */}
        <Text style={styles.sectionTitle}>Start Learning</Text>
        <View style={styles.learningContainer}>
          <View style={styles.learningCard}>
            <Icon name="user" size={30} color="#fff" />
            <Text style={styles.learningText}>Learn by Job Role</Text>
          </View>
          <View style={styles.learningCard}>
            <Icon name="cloud" size={30} color="#fff" />
            <Text style={styles.learningText}>Learn by Service</Text>
          </View>
        </View>

        {/* My Courses */}
        <Text style={styles.sectionTitle}>My Courses</Text>
        {enrolledCourses.length > 0 ? (
          <View style={styles.coursesContainer}>
            {enrolledCourses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <Image
                  source={course.image}
                  style={styles.courseImage}
                />
                <Text style={styles.courseTitle}>{course.title}</Text>
                <ProgressBar progress={course.progress} />
                <Text style={styles.courseProgressText}>{course.progress}% Complete</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCoursesContainer}>
            <Text style={styles.emptyCoursesText}>
              No courses enrolled yet. Choose a learning path to get started!
            </Text>
            <TouchableOpacity 
              style={styles.chooseLearningPathButton}
              onPress={() => navigation.navigate("SelectRole")}
            >
              <Text style={styles.chooseLearningPathText}>Choose Learning Path</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notification Modal */}
        <Modal
          visible={notificationModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setNotificationModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <TouchableOpacity onPress={() => setNotificationModalVisible(false)}>
                  <Icon name="x" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={[styles.notificationItem, !item.read && styles.notificationUnread]}>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationMessage}>{item.message}</Text>
                      <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>
                    {!item.read && <View style={styles.unreadDot} />}
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyNotifications}>No notifications yet</Text>
                }
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
  container: { flex: 1, backgroundColor: "#0E141B", paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  greeting: { color: "#aaa", fontSize: 14 },
  username: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  notificationButton: { 
    marginLeft: "auto",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF4444",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  statsContainer: { flexDirection: "row", justifyContent: "space-between" },
  statCard: {
    flex: 1,
    backgroundColor: "#18222D",
    padding: 16,
    margin: 5,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 4 },
  statLabel: { color: "#aaa", fontSize: 12 },

  progressSection: { marginVertical: 16 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between" },
  progressTitle: { color: "#fff", fontWeight: "bold" },
  levelText: { color: "#aaa" },
  progressContainer: {
    backgroundColor: "#1C2732",
    height: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#21C25E",
  },
  progressSubtitle: { color: "#aaa", fontSize: 12 },

  lessonCard: {
    // backgroundColor: "#18222D",
    borderRadius: 16,
    marginVertical: 12,
    overflow: "hidden",
  },

  adventureCard: {
    // backgroundColor: "#18222D",
    borderRadius: 16,
    marginVertical: 12,
    overflow: "hidden",
  },

  lessonImage: { width: "100%", height: 160 },
  lessonContent: { padding: 16 },
  lessonTitle: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  lessonDescription: { color: "#aaa", fontSize: 14, marginVertical: 6 },
  lessonFooter: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  lessonDuration: { color: "#ccc", marginLeft: 6 },
  lessonButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  lessonButtonText: {
    color: "#000",
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },

  learningContainer: { flexDirection: "row", justifyContent: "space-between" },
  learningCard: {
    backgroundColor: "#18222D",
    borderRadius: 12,
    padding: 20,
    width: "48%",
    alignItems: "center",
  },
  learningText: { color: "#fff", marginTop: 10, textAlign: "center" },

  coursesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  courseCard: {
    backgroundColor: "#18222D",
    borderRadius: 12,
    padding: 10,
    width: "48%",
  },
  courseImage: { width: "100%", height: 80, borderRadius: 8 },
  courseTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 8,
  },
  courseProgressText: { color: "#aaa", fontSize: 12, marginTop: 4 },
  
  emptyCoursesContainer: {
    backgroundColor: "#18222D",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 30,
  },
  emptyCoursesText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  chooseLearningPathButton: {
    backgroundColor: "#FF9900",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  chooseLearningPathText: {
    color: "#232F3E",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1B263B",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationItem: {
    backgroundColor: "#18222D",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationUnread: {
    backgroundColor: "#232F3E",
    borderLeftWidth: 3,
    borderLeftColor: "#FF9900",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationMessage: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    color: "#666",
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF9900",
    marginLeft: 8,
  },
  emptyNotifications: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});
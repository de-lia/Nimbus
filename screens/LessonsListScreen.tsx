import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import { useLesson } from "../contexts/LessonContext";
import { getLessonsByRole, getLessonsByService } from "../data/lessons/index";
import { Colors } from "../constants/colors";

const LessonsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, loading } = useUser();
  const { isLessonCompleted } = useLesson();

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

  // Get lessons based on user's learning path
  const lessons =
    user.mode === "role" && user.selectedRole
      ? getLessonsByRole(user.selectedRole)
      : user.mode === "service" && user.selectedService
      ? getLessonsByService(user.selectedService)
      : [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "#00C851";
      case "medium":
        return "#FFB703";
      case "hard":
        return "#ff4444";
      default:
        return "#999";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Lessons</Text>
          <Text style={styles.headerSubtitle}>
            {user.mode === "role"
              ? `${user.selectedRole?.replace("_", " ").toUpperCase()} Path`
              : `${user.selectedService?.toUpperCase()} Service`}
          </Text>
        </View>

        {/* Lessons List */}
        {lessons.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color="#555" />
            <Text style={styles.emptyText}>No lessons available yet</Text>
          </View>
        ) : (
          lessons.map((lesson) => {
            const completed = isLessonCompleted(lesson.lessonId);
            
            return (
              <TouchableOpacity
                key={lesson.lessonId}
                style={[styles.lessonCard, completed && styles.lessonCardCompleted]}
                onPress={() =>
                  navigation.navigate("LessonPlayer", { lessonId: lesson.lessonId })
                }
              >
                <View style={styles.lessonHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonService}>
                      {lesson.service.toUpperCase()}
                    </Text>
                  </View>
                  {completed && (
                    <Ionicons name="checkmark-circle" size={28} color="#00C851" />
                  )}
                </View>

                <View style={styles.lessonMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#999" />
                    <Text style={styles.metaText}>
                      {Math.floor(lesson.durationSeconds / 60)} min
                    </Text>
                  </View>

                  <View style={styles.metaItem}>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(lesson.difficulty) + "33" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.difficultyText,
                          { color: getDifficultyColor(lesson.difficulty) },
                        ]}
                      >
                        {lesson.difficulty.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.metaItem}>
                    <Ionicons name="star-outline" size={16} color="#FFB703" />
                    <Text style={styles.metaText}>{lesson.xpReward} XP</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonsListScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
    marginTop: 16,
  },
  lessonCard: {
    backgroundColor: "#1B263B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },
  lessonCardCompleted: {
    borderColor: "#00C851",
    opacity: 0.7,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  lessonTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  lessonService: {
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: "#999",
    fontSize: 13,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "700",
  },
});

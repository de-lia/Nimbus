import React, { useState, useEffect, useRef, useMemo } from "react";
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
import { useTheme } from "../contexts/ThemeContext";
import { getLessonsByRole, getLessonsByService, searchLessons } from "../data/lessons/index";
import { JOB_ROLES, CATEGORY_TAGS, CategoryTag } from "../data/jobRoles";
import { Colors } from "../constants/colors";
import SearchBar from "../components/SearchBar";
import TagFilterChips from "../components/TagFilterChips";

const LessonsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, loading } = useUser();
  const { isLessonCompleted } = useLesson();
  const { theme, colors } = useTheme();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<CategoryTag | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [searchInput]);

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

  const lessons =
    user.mode === "role" && user.selectedRole
      ? getLessonsByRole(user.selectedRole)
      : user.mode === "service" && user.selectedService
      ? getLessonsByService(user.selectedService)
      : [];

  const filteredLessons = useMemo(() => {
    let result = lessons;
    if (searchQuery) result = searchLessons(result, searchQuery);
    if (selectedTag) {
      const categoryRoleIds = JOB_ROLES.filter((r) => r.category === selectedTag).map((r) => r.id);
      result = result.filter((lesson) => lesson.roles.some((r) => categoryRoleIds.includes(r)));
    }
    return result;
  }, [lessons, searchQuery, selectedTag]);

  const hasFiltersActive = searchQuery !== "" || selectedTag !== null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "#00C851";
      case "medium": return "#FFB703";
      case "hard": return "#ff4444";
      default: return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Lessons</Text>
          <Text style={[styles.headerSubtitle, { color: colors.accent }]}>
            {user.mode === "role"
              ? `${user.selectedRole?.replace("_", " ").toUpperCase()} Path`
              : `${user.selectedService?.toUpperCase()} Service`}
          </Text>
        </View>

        <SearchBar value={searchInput} onChangeText={setSearchInput} placeholder="Search lessons..." />

        <View style={styles.tagFilterContainer}>
          <TagFilterChips tags={CATEGORY_TAGS} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
        </View>

        {filteredLessons.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {hasFiltersActive ? "No lessons found" : "No lessons available yet"}
            </Text>
          </View>
        ) : (
          filteredLessons.map((lesson) => {
            const completed = isLessonCompleted(lesson.lessonId);
            return (
              <TouchableOpacity
                key={lesson.lessonId}
                style={[styles.lessonCard, { backgroundColor: colors.card }, completed && styles.lessonCardCompleted]}
                onPress={() => navigation.navigate("LessonPlayer", { lessonId: lesson.lessonId })}
              >
                <View style={styles.lessonHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
                    <Text style={[styles.lessonService, { color: colors.textSecondary }]}>{lesson.service.toUpperCase()}</Text>
                  </View>
                  {completed && <Ionicons name="checkmark-circle" size={28} color="#00C851" />}
                </View>
                <View style={styles.lessonMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{Math.floor(lesson.durationSeconds / 60)} min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(lesson.difficulty) + "33" }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(lesson.difficulty) }]}>{lesson.difficulty.toUpperCase()}</Text>
                    </View>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star-outline" size={16} color="#FFB703" />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{lesson.xpReward} XP</Text>
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
  header: { marginBottom: 24 },
  headerTitle: { fontSize: 28, fontWeight: "700", marginBottom: 4 },
  headerSubtitle: { fontSize: 14, fontWeight: "600" },
  tagFilterContainer: { marginTop: 12, marginBottom: 16 },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 60 },
  emptyText: { fontSize: 16, marginTop: 16 },
  lessonCard: { borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 2, borderColor: "transparent" },
  lessonCardCompleted: { borderColor: "#00C851", opacity: 0.7 },
  lessonHeader: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  lessonTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  lessonService: { fontSize: 12, fontWeight: "600" },
  lessonMeta: { flexDirection: "row", alignItems: "center", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 13 },
  difficultyBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  difficultyText: { fontSize: 11, fontWeight: "700" },
});

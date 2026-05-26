import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLeaderboard } from "../contexts/LeaderboardContext";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import { LeaderboardPeriod } from "../types/leaderboard";
import { RootStackParamList } from "../navigation/types";

export default function LeaderboardScreen() {
  const { leaderboardData, currentPeriod, loading, setPeriod } = useLeaderboard();
  const { user } = useUser();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const periods: { key: LeaderboardPeriod; label: string }[] = [
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
    { key: "friends", label: "Friends" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Leaderboard 🏆</Text>

        <View style={[styles.periodSelector, { backgroundColor: colors.card }]}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[styles.periodButton, currentPeriod === period.key && { backgroundColor: colors.accent }]}
              onPress={() => setPeriod(period.key)}
            >
              <Text style={[styles.periodText, { color: colors.textSecondary }, currentPeriod === period.key && { color: "#232F3E" }]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : (
          <ScrollView style={styles.listContainer}>
            {leaderboardData?.entries.map((entry) => {
              const isCurrentUser = entry.userId === user?.userId;
              const isTopThree = entry.rank <= 3;

              const handlePress = () => {
                if (isCurrentUser) {
                  navigation.navigate("MainApp", { screen: "Profile" } as any);
                } else {
                  navigation.navigate("UserProfile", {
                    userId: entry.userId,
                    name: entry.name,
                    avatarUrl: entry.avatarUrl,
                    level: 1,
                    xp: entry.xpEarned,
                    streakDays: 0,
                    badgesCount: 0,
                  });
                }
              };

              return (
                <TouchableOpacity key={entry.userId} onPress={handlePress} activeOpacity={0.7}>
                  <View style={[styles.entryCard, { backgroundColor: colors.card }, isCurrentUser && { borderWidth: 2, borderColor: colors.accent }]}>
                    <View style={styles.rankContainer}>
                      {isTopThree ? (
                        <Text style={styles.rankMedal}>
                          {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                        </Text>
                      ) : (
                        <Text style={[styles.rankNumber, { color: colors.textSecondary }]}>{entry.rank}</Text>
                      )}
                    </View>
                    <Image source={{ uri: entry.avatarUrl || "https://i.pravatar.cc/150?img=1" }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                      <Text style={[styles.userName, { color: colors.text }, isCurrentUser && { color: colors.accent }]}>
                        {isCurrentUser ? `${user?.name} (You)` : entry.name}
                      </Text>
                      <Text style={[styles.userScore, { color: colors.textSecondary }]}>{entry.score.toLocaleString()} pts</Text>
                    </View>
                    <View style={[styles.xpBadge, { backgroundColor: colors.border }]}>
                      <Ionicons name="star" size={16} color="#FFB703" />
                      <Text style={styles.xpText}>{entry.xpEarned}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  periodSelector: { flexDirection: "row", borderRadius: 12, padding: 4, marginBottom: 20 },
  periodButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  periodText: { fontSize: 14, fontWeight: "600" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { flex: 1 },
  entryCard: { flexDirection: "row", alignItems: "center", borderRadius: 12, padding: 12, marginBottom: 10 },
  rankContainer: { width: 40, alignItems: "center" },
  rankMedal: { fontSize: 24 },
  rankNumber: { fontSize: 18, fontWeight: "700" },
  avatar: { width: 48, height: 48, borderRadius: 24, marginHorizontal: 12 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  userScore: { fontSize: 14 },
  xpBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 4 },
  xpText: { color: "#FFB703", fontSize: 14, fontWeight: "600" },
});

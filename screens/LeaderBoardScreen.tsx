import React, { useState } from "react";
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
import { useLeaderboard } from "../contexts/LeaderboardContext";
import { useUser } from "../contexts/UserContext";
import { LeaderboardPeriod } from "../types/leaderboard";
import { Colors } from "../constants/colors";

export default function LeaderboardScreen() {
  const { leaderboardData, currentPeriod, loading, setPeriod } = useLeaderboard();
  const { user } = useUser();

  const periods: { key: LeaderboardPeriod; label: string }[] = [
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
    { key: "friends", label: "Friends" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Leaderboard 🏆</Text>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                currentPeriod === period.key && styles.periodButtonActive,
              ]}
              onPress={() => setPeriod(period.key)}
            >
              <Text
                style={[
                  styles.periodText,
                  currentPeriod === period.key && styles.periodTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Leaderboard List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.accent} />
          </View>
        ) : (
          <ScrollView style={styles.listContainer}>
            {leaderboardData?.entries.map((entry, index) => {
              const isCurrentUser = entry.userId === user?.userId;
              const isTopThree = entry.rank <= 3;

              return (
                <View
                  key={entry.userId}
                  style={[
                    styles.entryCard,
                    isCurrentUser && styles.entryCardHighlight,
                  ]}
                >
                  {/* Rank */}
                  <View style={styles.rankContainer}>
                    {isTopThree ? (
                      <Text style={styles.rankMedal}>
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                      </Text>
                    ) : (
                      <Text style={styles.rankNumber}>{entry.rank}</Text>
                    )}
                  </View>

                  {/* Avatar */}
                  <Image
                    source={{ uri: entry.avatarUrl || "https://i.pravatar.cc/150?img=1" }}
                    style={styles.avatar}
                  />

                  {/* User Info */}
                  <View style={styles.userInfo}>
                    <Text style={[styles.userName, isCurrentUser && styles.userNameHighlight]}>
                      {entry.name}
                      {isCurrentUser && " (You)"}
                    </Text>
                    <Text style={styles.userScore}>{entry.score.toLocaleString()} pts</Text>
                  </View>

                  {/* XP Badge */}
                  <View style={styles.xpBadge}>
                    <Ionicons name="star" size={16} color="#FFB703" />
                    <Text style={styles.xpText}>{entry.xpEarned}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#1B263B",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: Colors.accent,
  },
  periodText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "600",
  },
  periodTextActive: {
    color: "#232F3E",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
  },
  entryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B263B",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  entryCardHighlight: {
    borderWidth: 2,
    borderColor: Colors.accent,
    backgroundColor: "#232F3E",
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
  },
  rankMedal: {
    fontSize: 24,
  },
  rankNumber: {
    color: "#999",
    fontSize: 18,
    fontWeight: "700",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginHorizontal: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  userNameHighlight: {
    color: Colors.accent,
  },
  userScore: {
    color: "#999",
    fontSize: 14,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  xpText: {
    color: "#FFB703",
    fontSize: 14,
    fontWeight: "600",
  },
});
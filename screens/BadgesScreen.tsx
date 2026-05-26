import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useUser, Badge } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const sortBadgesDescending = (badges: Badge[]): Badge[] =>
  [...badges].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  );

const BadgesScreen: React.FC = () => {
  const { user, loading } = useUser();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const badges = user ? sortBadgesDescending(user.badges) : [];

  const renderBadgeRow = ({ item }: { item: Badge }) => (
    <TouchableOpacity
      style={[styles.badgeRow, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate("BadgeDetails", { badgeLevel: item.level })}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, earned ${formatDate(item.receivedAt)}, ${item.xpEarned} XP`}
    >
      <View style={styles.badgeInfo}>
        <Text style={[styles.badgeName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.badgeDate, { color: colors.textSecondary }]}>
          {formatDate(item.receivedAt)}
        </Text>
      </View>
      <View style={styles.badgeXp}>
        <Text style={[styles.xpText, { color: colors.accent }]}>{item.xpEarned} XP</Text>
        <Ionicons name="chevron-forward-outline" size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Badges</Text>
        <View style={{ width: 24 }} />
      </View>
      {badges.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ribbon-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No badges earned yet. Keep learning to level up and earn badges!
          </Text>
        </View>
      ) : (
        <FlatList
          data={badges}
          keyExtractor={(item) => String(item.level)}
          renderItem={renderBadgeRow}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default BadgesScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  listContent: { padding: 16 },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  badgeInfo: { flex: 1 },
  badgeName: { fontSize: 16, fontWeight: "600" },
  badgeDate: { fontSize: 13, marginTop: 4 },
  badgeXp: { flexDirection: "row", alignItems: "center", gap: 6 },
  xpText: { fontSize: 14, fontWeight: "600" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: { fontSize: 16, textAlign: "center", marginTop: 16 },
});

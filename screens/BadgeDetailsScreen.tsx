import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const BadgeDetailsScreen: React.FC = () => {
  const { user, loading } = useUser();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "BadgeDetails">>();
  const { badgeLevel } = route.params;

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const badge = user?.badges.find((b) => b.level === badgeLevel) ?? null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Badge Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {badge ? (
        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Ionicons name="ribbon" size={64} color={colors.accent} style={styles.icon} />
            <Text style={[styles.badgeName, { color: colors.text }]}>{badge.name}</Text>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Received</Text>
            <Text style={[styles.value, { color: colors.text }]}>{formatDateTime(badge.receivedAt)}</Text>
            <Text style={[styles.label, { color: colors.textSecondary }]}>XP Earned</Text>
            <Text style={[styles.xpValue, { color: colors.accent }]}>{badge.xpEarned} XP</Text>
          </View>
        </View>
      ) : (
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>Badge not found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BadgeDetailsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  content: { flex: 1, padding: 16 },
  card: {
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  icon: { marginBottom: 16 },
  badgeName: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 13, marginTop: 12 },
  value: { fontSize: 16, fontWeight: "500", marginTop: 4 },
  xpValue: { fontSize: 20, fontWeight: "bold", marginTop: 4 },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  notFoundText: { fontSize: 16, textAlign: "center", marginTop: 16 },
});

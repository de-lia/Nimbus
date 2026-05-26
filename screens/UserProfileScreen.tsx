import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useSocial } from "../contexts/SocialContext";
import { useTheme } from "../contexts/ThemeContext";

type UserProfileRouteProp = NativeStackScreenProps<RootStackParamList, "UserProfile">["route"];

const UserProfileScreen: React.FC = () => {
  const route = useRoute<UserProfileRouteProp>();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { isFollowing, followUser, unfollowUser, getFollowersCount, getFollowingCount } = useSocial();

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loadingCounts, setLoadingCounts] = useState(true);

  const params = route.params;
  const hasRequiredParams = params?.userId && params?.name != null && params?.level != null && params?.xp != null && params?.streakDays != null && params?.badgesCount != null;

  useEffect(() => {
    if (!hasRequiredParams) return;
    let cancelled = false;
    const loadCounts = async () => {
      setLoadingCounts(true);
      try {
        const [followers, following] = await Promise.all([getFollowersCount(params.userId), getFollowingCount(params.userId)]);
        if (!cancelled) { setFollowersCount(followers); setFollowingCount(following); }
      } catch { /* counts stay at 0 */ } finally { if (!cancelled) setLoadingCounts(false); }
    };
    loadCounts();
    return () => { cancelled = true; };
  }, [params?.userId, getFollowersCount, getFollowingCount, hasRequiredParams]);

  const following = hasRequiredParams ? isFollowing(params.userId) : false;

  const handleFollowToggle = async () => {
    if (!hasRequiredParams) return;
    if (following) await unfollowUser(params.userId);
    else await followUser(params.userId);
    const [newFollowers, newFollowing] = await Promise.all([getFollowersCount(params.userId), getFollowingCount(params.userId)]);
    setFollowersCount(newFollowers);
    setFollowingCount(newFollowing);
  };

  if (!hasRequiredParams) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.fallbackContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.fallbackText, { color: colors.textSecondary }]}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} testID="back-button">
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.profileSection}>
          <Image source={params.avatarUrl ? { uri: params.avatarUrl } : require("../assets/avatars/avatar1.png")} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.text }]}>{params.name}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Level {params.level}</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { icon: "star-outline", value: params.xp.toLocaleString(), label: "Total XP" },
            { icon: "flame-outline", value: `${params.streakDays} days`, label: "Streak" },
            { icon: "shield-outline", value: String(params.badgesCount), label: "Badges" },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statBox, { backgroundColor: colors.card }]}>
              <Ionicons name={stat.icon as any} size={20} color={colors.accent} />
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.socialRow}>
          <View style={[styles.socialBox, { backgroundColor: colors.card }]}>
            {loadingCounts ? <ActivityIndicator size="small" color={colors.accent} /> : <Text style={[styles.socialValue, { color: colors.text }]}>{followersCount}</Text>}
            <Text style={[styles.socialLabel, { color: colors.textSecondary }]}>Followers</Text>
          </View>
          <View style={[styles.socialBox, { backgroundColor: colors.card }]}>
            {loadingCounts ? <ActivityIndicator size="small" color={colors.accent} /> : <Text style={[styles.socialValue, { color: colors.text }]}>{followingCount}</Text>}
            <Text style={[styles.socialLabel, { color: colors.textSecondary }]}>Following</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.followButton, { backgroundColor: colors.accent }, following && { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.textSecondary }]}
          onPress={handleFollowToggle}
          testID="follow-button"
        >
          <Ionicons name={following ? "person-remove-outline" : "person-add-outline"} size={20} color={following ? colors.text : colors.background} />
          <Text style={[styles.followButtonText, { color: colors.background }, following && { color: colors.text }]}>
            {following ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  profileSection: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 14 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  statBox: { flex: 1, alignItems: "center", borderRadius: 10, paddingVertical: 15, marginHorizontal: 4 },
  statValue: { fontWeight: "bold", fontSize: 16, marginTop: 6 },
  statLabel: { fontSize: 13 },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 24, marginBottom: 24 },
  socialBox: { alignItems: "center", borderRadius: 10, paddingVertical: 14, paddingHorizontal: 28 },
  socialValue: { fontWeight: "bold", fontSize: 18 },
  socialLabel: { fontSize: 13, marginTop: 4 },
  followButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 14, gap: 8 },
  followButtonText: { fontSize: 16, fontWeight: "bold" },
  fallbackContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  backButton: { position: "absolute", top: 16, left: 16 },
  fallbackText: { fontSize: 18 },
});

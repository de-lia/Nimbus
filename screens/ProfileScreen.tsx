import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import { useSocial } from "../contexts/SocialContext";
import * as ImagePicker from "expo-image-picker";
import type { ImageSourcePropType } from "react-native";

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

const ProfileScreen: React.FC = () => {
  const { user, loading, clearUser, updateUser } = useUser();
  const { colors } = useTheme();
  const { socialData, friends, loading: socialLoading } = useSocial();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

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
  const progressPercent = (xpInCurrentLevel / xpNeededForLevel) * 100;

  const handleLogout = async () => {
    await clearUser();
    navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
  };

  const handleTakePhoto = async () => {
    setShowActionSheet(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled) updateUser({ avatarUrl: result.assets[0].uri });
  };

  const handleChooseFromGallery = async () => {
    setShowActionSheet(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled) updateUser({ avatarUrl: result.assets[0].uri });
  };

  const handleChooseBuiltInAvatar = () => {
    setShowActionSheet(false);
    setShowAvatarModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image source={getAvatarSource(user.avatarUrl)} style={styles.avatar} />
            <TouchableOpacity style={[styles.editIcon, { backgroundColor: colors.card }]} onPress={() => setShowActionSheet(true)}>
              <Ionicons name="pencil" size={14} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Level {user.level} - {user.mode === "role" ? user.selectedRole?.replace("_", " ") : user.selectedService?.toUpperCase()}
          </Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { icon: "star-outline", value: user.xp.toLocaleString(), label: "Total XP" },
            { icon: "flame-outline", value: `${user.streakDays} days`, label: "Streak" },
            { icon: "shield-outline", value: String(user.badges.length), label: "Badges" },
            { icon: "people-outline", value: String(socialData?.followers.length ?? 0), label: "Followers" },
            { icon: "person-add-outline", value: String(socialData?.following.length ?? 0), label: "Following" },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statBox, { backgroundColor: colors.card }]}>
              <Ionicons name={stat.icon as any} size={20} color={colors.accent} />
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.progressSection}>
          <Text style={[styles.nextLevelLabel, { color: colors.text }]}>Next Level</Text>
          <View style={[styles.progressBarBackground, { backgroundColor: colors.card }]}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: colors.accent }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>{xpInCurrentLevel} / {xpNeededForLevel} XP</Text>
        </View>

        <View style={styles.boostersSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Boosters</Text>
          <View style={styles.boosterRow}>
            <View style={[styles.boosterCard, { backgroundColor: colors.card }]}>
              <Ionicons name="flash" size={24} color="#FFB703" />
              <Text style={[styles.boosterValue, { color: colors.text }]}>{user.boosters.doubleXp}</Text>
              <Text style={[styles.boosterLabel, { color: colors.textSecondary }]}>Double XP</Text>
            </View>
            <View style={[styles.boosterCard, { backgroundColor: colors.card }]}>
              <Ionicons name="shield-checkmark" size={24} color="#00C851" />
              <Text style={[styles.boosterValue, { color: colors.text }]}>{user.boosters.streakProtectors}</Text>
              <Text style={[styles.boosterLabel, { color: colors.textSecondary }]}>Streak Shields</Text>
            </View>
          </View>
        </View>

        <View style={styles.friendsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Friends</Text>
          {friends.length === 0 ? (
            <Text style={[styles.emptyFriendsText, { color: colors.textSecondary }]}>
              No friends yet. Follow users and get followed back to see friends here.
            </Text>
          ) : (
            friends.map((friendId) => (
              <View key={friendId} style={[styles.friendRow, { backgroundColor: colors.card }]}>
                <Image source={{ uri: `https://i.pravatar.cc/150?u=${friendId}` }} style={styles.friendAvatar} />
                <Text style={[styles.friendName, { color: colors.text }]}>{friendId}</Text>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.card, opacity: user.badges.length > 0 ? 1 : 0.5 }]}
          onPress={user.badges.length > 0 ? () => navigation.navigate("Badges") : undefined}
          activeOpacity={user.badges.length > 0 ? 0.7 : 1}
          disabled={user.badges.length === 0}
        >
          <Ionicons name="trophy-outline" size={20} color={colors.text} />
          <Text style={[styles.optionText, { color: colors.text }]}>Achievements</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={20} color={colors.text} />
          <Text style={[styles.optionText, { color: colors.text }]}>Settings & Preferences</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={[styles.option, { backgroundColor: colors.card }]}>
          <Ionicons name="help-circle-outline" size={20} color={colors.text} />
          <Text style={[styles.optionText, { color: colors.text }]}>Help & Support</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
        </View>
        <View style={[styles.option, { backgroundColor: colors.card }]}>
          <Ionicons name="person-add-outline" size={20} color={colors.text} />
          <Text style={[styles.optionText, { color: colors.text }]}>Invite Friends</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Action Sheet Modal */}
      <Modal visible={showActionSheet} transparent animationType="slide" onRequestClose={() => setShowActionSheet(false)}>
        <TouchableOpacity style={styles.actionSheetOverlay} activeOpacity={1} onPress={() => setShowActionSheet(false)}>
          <View style={[styles.actionSheetContainer, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={[styles.actionSheetOption, { borderBottomColor: colors.border }]} onPress={handleTakePhoto}>
              <Ionicons name="camera-outline" size={22} color={colors.text} />
              <Text style={[styles.actionSheetOptionText, { color: colors.text }]}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionSheetOption, { borderBottomColor: colors.border }]} onPress={handleChooseFromGallery}>
              <Ionicons name="images-outline" size={22} color={colors.text} />
              <Text style={[styles.actionSheetOptionText, { color: colors.text }]}>Choose from Camera Roll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionSheetOption, { borderBottomColor: colors.border }]} onPress={handleChooseBuiltInAvatar}>
              <Ionicons name="happy-outline" size={22} color={colors.text} />
              <Text style={[styles.actionSheetOptionText, { color: colors.text }]}>Choose Built-in Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionSheetOption, styles.actionSheetCancel]} onPress={() => setShowActionSheet(false)}>
              <Text style={[styles.actionSheetCancelText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Built-in Avatar Selection Modal */}
      <Modal visible={showAvatarModal} transparent animationType="fade" onRequestClose={() => setShowAvatarModal(false)}>
        <View style={styles.avatarModalOverlay}>
          <View style={[styles.avatarModalContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.avatarModalTitle, { color: colors.text }]}>Choose an Avatar</Text>
            <FlatList
              data={Object.keys(avatarMap) as (keyof typeof avatarMap)[]}
              numColumns={3}
              keyExtractor={(item) => item}
              columnWrapperStyle={styles.avatarGridRow}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.avatarGridItem} onPress={() => { updateUser({ avatarUrl: item }); setShowAvatarModal(false); }}>
                  <Image source={avatarMap[item]} style={styles.avatarGridImage} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.avatarModalCloseButton} onPress={() => setShowAvatarModal(false)}>
              <Text style={[styles.avatarModalCloseText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  profileSection: { alignItems: "center", marginBottom: 20 },
  avatarWrapper: { position: "relative", marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editIcon: { position: "absolute", bottom: 5, right: 5, borderRadius: 12, padding: 4 },
  name: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 14, textTransform: "capitalize" },
  statsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 30, gap: 8 },
  statBox: { minWidth: "30%", alignItems: "center", borderRadius: 10, paddingVertical: 15, flexGrow: 1 },
  statValue: { fontWeight: "bold", fontSize: 16, marginTop: 6 },
  statLabel: { fontSize: 13 },
  progressSection: { marginBottom: 30 },
  nextLevelLabel: { fontWeight: "600", marginBottom: 4 },
  progressBarBackground: { height: 8, borderRadius: 10 },
  progressBarFill: { height: 8, borderRadius: 10 },
  progressText: { fontSize: 13, marginTop: 6, textAlign: "right" },
  boostersSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  boosterRow: { flexDirection: "row", gap: 12 },
  boosterCard: { flex: 1, borderRadius: 10, padding: 16, alignItems: "center" },
  boosterValue: { fontSize: 24, fontWeight: "700", marginTop: 8 },
  boosterLabel: { fontSize: 12, marginTop: 4, textAlign: "center" },
  option: { flexDirection: "row", alignItems: "center", borderRadius: 10, padding: 14, marginBottom: 12 },
  optionText: { fontSize: 16, flex: 1, marginLeft: 12 },
  friendsSection: { marginBottom: 30 },
  emptyFriendsText: { fontSize: 14, textAlign: "center", paddingVertical: 20 },
  friendRow: { flexDirection: "row", alignItems: "center", borderRadius: 10, padding: 12, marginBottom: 8 },
  friendAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  friendName: { fontSize: 16, fontWeight: "500" },
  actionSheetOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  actionSheetContainer: { borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: 12, paddingBottom: 32, paddingHorizontal: 16 },
  actionSheetOption: { flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1 },
  actionSheetOptionText: { fontSize: 16, marginLeft: 12 },
  actionSheetCancel: { justifyContent: "center", borderBottomWidth: 0, marginTop: 8 },
  actionSheetCancelText: { fontSize: 16, textAlign: "center", width: "100%" },
  avatarModalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  avatarModalContainer: { borderRadius: 16, padding: 20, width: "85%" },
  avatarModalTitle: { fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  avatarGridRow: { justifyContent: "space-around", marginBottom: 12 },
  avatarGridItem: { borderRadius: 40, padding: 4 },
  avatarGridImage: { width: 72, height: 72, borderRadius: 36 },
  avatarModalCloseButton: { marginTop: 8, paddingVertical: 12, alignItems: "center" },
  avatarModalCloseText: { fontSize: 16 },
});

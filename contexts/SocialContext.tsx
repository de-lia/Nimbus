import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "./UserContext";

const SOCIAL_STORAGE_KEY_PREFIX = "@nimbus_social_";

interface SocialData {
  followers: string[];
  following: string[];
}

interface SocialContextType {
  socialData: SocialData | null;
  friends: string[];
  loading: boolean;
  followUser: (targetUserId: string) => Promise<void>;
  unfollowUser: (targetUserId: string) => Promise<void>;
  isFollowing: (targetUserId: string) => boolean;
  getFollowersCount: (userId: string) => Promise<number>;
  getFollowingCount: (userId: string) => Promise<number>;
  loadSocialData: () => Promise<void>;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

const getSocialStorageKey = (userId: string) => `${SOCIAL_STORAGE_KEY_PREFIX}${userId}`;

const readSocialData = async (userId: string): Promise<SocialData> => {
  try {
    const raw = await AsyncStorage.getItem(getSocialStorageKey(userId));
    if (raw) {
      return JSON.parse(raw) as SocialData;
    }
  } catch (error) {
    console.warn("Failed to read social data for user:", userId, error);
  }
  return { followers: [], following: [] };
};

const writeSocialData = async (userId: string, data: SocialData): Promise<void> => {
  await AsyncStorage.setItem(getSocialStorageKey(userId), JSON.stringify(data));
};

export const SocialProvider = ({ children }: { children: ReactNode }) => {
  const [socialData, setSocialData] = useState<SocialData | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const loadSocialData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await readSocialData(user.userId);
      setSocialData(data);
    } catch (error) {
      console.error("Failed to load social data:", error);
      setSocialData({ followers: [], following: [] });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadSocialData();
    }
  }, [user, loadSocialData]);

  const friends = useMemo(() => {
    if (!socialData) return [];
    const followersSet = new Set(socialData.followers);
    return socialData.following.filter((id) => followersSet.has(id));
  }, [socialData]);

  const followUser = useCallback(async (targetUserId: string) => {
    if (!user || targetUserId === user.userId) return;
    if (!socialData) return;

    if (socialData.following.includes(targetUserId)) return;

    const updatedCurrentData: SocialData = {
      ...socialData,
      following: [...socialData.following, targetUserId],
    };

    const targetData = await readSocialData(targetUserId);
    const updatedTargetData: SocialData = {
      ...targetData,
      followers: targetData.followers.includes(user.userId)
        ? targetData.followers
        : [...targetData.followers, user.userId],
    };

    try {
      await writeSocialData(user.userId, updatedCurrentData);
      await writeSocialData(targetUserId, updatedTargetData);
      setSocialData(updatedCurrentData);
    } catch (error) {
      console.warn("Failed to persist follow:", error);
    }
  }, [user, socialData]);

  const unfollowUser = useCallback(async (targetUserId: string) => {
    if (!user || !socialData) return;

    if (!socialData.following.includes(targetUserId)) return;

    const updatedCurrentData: SocialData = {
      ...socialData,
      following: socialData.following.filter((id) => id !== targetUserId),
    };

    const targetData = await readSocialData(targetUserId);
    const updatedTargetData: SocialData = {
      ...targetData,
      followers: targetData.followers.filter((id) => id !== user.userId),
    };

    try {
      await writeSocialData(user.userId, updatedCurrentData);
      await writeSocialData(targetUserId, updatedTargetData);
      setSocialData(updatedCurrentData);
    } catch (error) {
      console.warn("Failed to persist unfollow:", error);
    }
  }, [user, socialData]);

  const isFollowing = useCallback((targetUserId: string): boolean => {
    if (!socialData) return false;
    return socialData.following.includes(targetUserId);
  }, [socialData]);

  const getFollowersCount = useCallback(async (userId: string): Promise<number> => {
    const data = await readSocialData(userId);
    return data.followers.length;
  }, []);

  const getFollowingCount = useCallback(async (userId: string): Promise<number> => {
    const data = await readSocialData(userId);
    return data.following.length;
  }, []);

  return (
    <SocialContext.Provider
      value={{
        socialData,
        friends,
        loading,
        followUser,
        unfollowUser,
        isFollowing,
        getFollowersCount,
        getFollowingCount,
        loadSocialData,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error("useSocial must be used inside SocialProvider");
  return ctx;
};

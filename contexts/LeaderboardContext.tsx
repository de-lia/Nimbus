import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LeaderboardData, LeaderboardPeriod, LeaderboardEntry } from "../types/leaderboard";
import { getMockLeaderboardData } from "../data/leaderboardMock";
import { useUser } from "./UserContext";
import { useSocial } from "./SocialContext";

type LeaderboardContextType = {
  leaderboardData: LeaderboardData | null;
  currentPeriod: LeaderboardPeriod;
  loading: boolean;
  setPeriod: (period: LeaderboardPeriod) => void;
  refreshLeaderboard: () => Promise<void>;
};

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<LeaderboardPeriod>("weekly");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { friends } = useSocial();

  useEffect(() => {
    refreshLeaderboard();
  }, [currentPeriod, user, friends]);

  const refreshLeaderboard = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let entries = getMockLeaderboardData(currentPeriod, {
        userId: user.userId,
        name: user.name,
        xp: user.xp,
      });

      // When period is "friends", filter to only friends (plus current user)
      if (currentPeriod === "friends") {
        const friendsSet = new Set(friends);
        entries = entries.filter(
          (e) => e.userId === user.userId || friendsSet.has(e.userId)
        );
      }

      // Sort by score descending and assign sequential ranks
      entries = entries
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      // Exclude current user if their score is lower than all other entries
      const otherEntries = entries.filter((e) => e.userId !== user.userId);
      if (otherEntries.length > 0) {
        const currentEntry = entries.find((e) => e.userId === user.userId);
        if (currentEntry) {
          const minOtherScore = Math.min(...otherEntries.map((e) => e.score));
          if (currentEntry.score < minOtherScore) {
            entries = otherEntries.map((entry, index) => ({
              ...entry,
              rank: index + 1,
            }));
          }
        }
      }

      const currentUserEntry = entries.find((e) => e.userId === user.userId);
      
      setLeaderboardData({
        period: currentPeriod,
        entries,
        currentUserRank: currentUserEntry?.rank
      });
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const setPeriod = (period: LeaderboardPeriod) => {
    setCurrentPeriod(period);
  };

  return (
    <LeaderboardContext.Provider
      value={{
        leaderboardData,
        currentPeriod,
        loading,
        setPeriod,
        refreshLeaderboard,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) throw new Error("useLeaderboard must be used inside LeaderboardProvider");
  return ctx;
};

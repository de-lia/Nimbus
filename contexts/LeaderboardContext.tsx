import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LeaderboardData, LeaderboardPeriod, LeaderboardEntry } from "../types/leaderboard";
import { getMockLeaderboardData } from "../data/leaderboardMock";
import { useUser } from "./UserContext";

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

  useEffect(() => {
    refreshLeaderboard();
  }, [currentPeriod, user]);

  const refreshLeaderboard = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const entries = getMockLeaderboardData(currentPeriod, user.userId);
      const currentUserEntry = entries.find(e => e.userId === user.userId);
      
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

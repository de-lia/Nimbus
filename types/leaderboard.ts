export type LeaderboardPeriod = "weekly" | "monthly" | "friends";

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl?: string;
  xpEarned: number;        // XP earned in period
  adventureBonus: number;  // Adventure XP earned in period
  score: number;           // Calculated: xpEarned + (adventureBonus * 2)
  rank: number;
}

export interface LeaderboardData {
  period: LeaderboardPeriod;
  entries: LeaderboardEntry[];
  currentUserRank?: number;
}

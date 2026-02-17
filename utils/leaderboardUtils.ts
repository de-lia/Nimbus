import { LeaderboardEntry } from "../types/leaderboard";

/**
 * Calculate leaderboard score
 * Formula: xpEarned + (adventureBonus * 2)
 */
export function calculateLeaderboardScore(
  xpEarned: number,
  adventureBonus: number
): number {
  return xpEarned + (adventureBonus * 2);
}

/**
 * Sort leaderboard entries by score (descending)
 */
export function sortLeaderboardEntries(
  entries: LeaderboardEntry[]
): LeaderboardEntry[] {
  return [...entries].sort((a, b) => b.score - a.score);
}

/**
 * Assign ranks to sorted entries
 */
export function assignRanks(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return entries.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

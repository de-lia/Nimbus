import { LeaderboardEntry } from "../types/leaderboard";

export interface CurrentUserData {
  userId: string;
  name: string;
  xp: number;
}

const names = [
  "Alex Chen", "Jordan Smith", "Taylor Kim", "Morgan Lee", "Casey Brown",
  "Riley Davis", "Avery Wilson", "Quinn Martinez", "Sage Anderson", "River Taylor",
  "Phoenix Garcia", "Skylar Rodriguez", "Dakota Moore", "Rowan Jackson", "Finley White",
  "Emerson Harris", "Kai Thompson", "Lennon Clark", "Reese Lewis", "Blake Walker"
];

function generateMockEntry(index: number, period: string, currentUser: CurrentUserData): LeaderboardEntry {
  const isCurrentUser = index === 5; // Place current user at rank 6
  const userId = isCurrentUser ? currentUser.userId : `user_${period}_${index}`;
  const name = isCurrentUser ? currentUser.name : names[index % names.length];

  // For the current user, use real XP; for others, generate mock XP
  const baseXP = period === "monthly" ? 2000 : 500;
  const xpEarned = isCurrentUser ? currentUser.xp : Math.floor(baseXP - (index * (baseXP / 25)));
  const adventureBonus = Math.floor(Math.random() * 800);
  const score = xpEarned + (adventureBonus * 2);

  return {
    userId,
    name,
    avatarUrl: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    xpEarned,
    adventureBonus,
    score,
    rank: index + 1
  };
}

export function getMockLeaderboardData(period: "weekly" | "monthly" | "friends", currentUser: CurrentUserData): LeaderboardEntry[] {
  const count = period === "friends" ? 10 : 20;
  const entries: LeaderboardEntry[] = [];

  for (let i = 0; i < count; i++) {
    entries.push(generateMockEntry(i, period, currentUser));
  }

  // Sort by score descending and assign ranks
  return entries
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

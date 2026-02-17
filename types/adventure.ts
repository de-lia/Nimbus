export interface AdventureStep {
  stepId: string;
  description: string;
  completed: boolean;
}

export interface Adventure {
  adventureId: string;
  title: string;
  description: string;
  service: string;
  roles: string[];
  steps: AdventureStep[];
  xpReward: number;  // Base reward: 400 XP
  badge: string;     // Badge ID to award on completion
  difficulty: "easy" | "medium" | "hard";
}

export interface AdventureProgress {
  adventureId: string;
  steps: AdventureStep[];
  completed: boolean;
  completedAt?: string;
  xpEarned?: number;
}

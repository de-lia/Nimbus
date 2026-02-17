import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Adventure, AdventureProgress, AdventureStep } from "../types/adventure";
import { adventures, getAdventureById } from "../data/adventures/index";
import { useUser } from "./UserContext";

type AdventureContextType = {
  progress: Record<string, AdventureProgress>;
  loading: boolean;
  getAdventureProgress: (adventureId: string) => AdventureProgress | undefined;
  markStepComplete: (adventureId: string, stepId: string, completed: boolean) => Promise<void>;
  isAdventureCompleted: (adventureId: string) => boolean;
};

const AdventureContext = createContext<AdventureContextType | undefined>(undefined);

const ADVENTURE_PROGRESS_KEY = "@nimbus_adventure_progress";

export const AdventureProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<string, AdventureProgress>>({});
  const [loading, setLoading] = useState(true);
  const { user, updateUser, addXP } = useUser();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await AsyncStorage.getItem(ADVENTURE_PROGRESS_KEY);
      if (data) {
        setProgress(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load adventure progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress: Record<string, AdventureProgress>) => {
    try {
      await AsyncStorage.setItem(ADVENTURE_PROGRESS_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error("Failed to save adventure progress:", error);
    }
  };

  const getAdventureProgress = (adventureId: string): AdventureProgress | undefined => {
    return progress[adventureId];
  };

  const isAdventureCompleted = (adventureId: string): boolean => {
    return progress[adventureId]?.completed || false;
  };

  const calculateAdventureXP = (baseXP: number, difficulty: "easy" | "medium" | "hard"): number => {
    if (!user) return baseXP;

    const difficultyMultipliers = {
      easy: 0.8,
      medium: 1.0,
      hard: 1.5,
    };
    const difficultyMultiplier = difficultyMultipliers[difficulty];

    const streakBonus = Math.min(user.streakDays, 30) * 0.01;
    const boosterMultiplier = user.boosters.doubleXp > 0 ? 2 : 1;

    return Math.floor(baseXP * difficultyMultiplier * (1 + streakBonus) * boosterMultiplier);
  };

  const markStepComplete = async (adventureId: string, stepId: string, completed: boolean) => {
    const adventure = getAdventureById(adventureId);
    if (!adventure || !user) return;

    // Get current progress or initialize
    const currentProgress = progress[adventureId] || {
      adventureId,
      steps: adventure.steps.map(s => ({ ...s })),
      completed: false
    };

    // Update the specific step
    const updatedSteps = currentProgress.steps.map(step =>
      step.stepId === stepId ? { ...step, completed } : step
    );

    // Check if all steps are now complete
    const allStepsComplete = updatedSteps.every(step => step.completed);
    const wasAlreadyCompleted = currentProgress.completed;

    const updatedProgress: AdventureProgress = {
      ...currentProgress,
      steps: updatedSteps,
      completed: allStepsComplete
    };

    // If adventure just completed (wasn't completed before)
    if (allStepsComplete && !wasAlreadyCompleted) {
      const xpEarned = calculateAdventureXP(adventure.xpReward, adventure.difficulty);
      updatedProgress.completedAt = new Date().toISOString();
      updatedProgress.xpEarned = xpEarned;

      // Calculate new XP and level
      const newXP = user.xp + xpEarned;
      const newLevel = Math.floor(newXP / 100) + 1;

      // Update user profile with XP, level, adventures, and badges in one call
      const adventuresCompleted = user.adventuresCompleted || [];
      if (!adventuresCompleted.includes(adventureId)) {
        await updateUser({
          xp: newXP,
          level: newLevel,
          adventuresCompleted: [...adventuresCompleted, adventureId],
          badges: [...user.badges, adventure.badge]
        });
      } else {
        // Just update XP and level if adventure was already completed
        await updateUser({
          xp: newXP,
          level: newLevel,
        });
      }

      console.log(`Adventure completed! Earned ${xpEarned} XP and badge: ${adventure.badge}`);
    }

    // Save progress
    const newProgress = {
      ...progress,
      [adventureId]: updatedProgress
    };

    await saveProgress(newProgress);
  };

  return (
    <AdventureContext.Provider
      value={{
        progress,
        loading,
        getAdventureProgress,
        markStepComplete,
        isAdventureCompleted,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
};

export const useAdventure = () => {
  const ctx = useContext(AdventureContext);
  if (!ctx) throw new Error("useAdventure must be used inside AdventureProvider");
  return ctx;
};

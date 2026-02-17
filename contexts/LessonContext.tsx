import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LessonProgress } from "../types/lesson";
import { useUser } from "./UserContext";
import { validateAndUpdateStreak } from "../utils/streakUtils";

type LessonContextType = {
  progress: Record<string, LessonProgress>;
  loading: boolean;
  completeLesson: (lessonId: string, score: number) => Promise<number>;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
};

const LessonContext = createContext<LessonContextType | undefined>(undefined);

const LESSON_PROGRESS_KEY = "@nimbus_lesson_progress";

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);
  const { user, addXP, updateUser } = useUser();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await AsyncStorage.getItem(LESSON_PROGRESS_KEY);
      if (data) {
        setProgress(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load lesson progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress: Record<string, LessonProgress>) => {
    try {
      await AsyncStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error("Failed to save lesson progress:", error);
    }
  };

  const calculateXP = (baseXP: number, difficulty: "easy" | "medium" | "hard"): number => {
    if (!user) return baseXP;

    // Difficulty multiplier
    const difficultyMultipliers = {
      easy: 0.8,
      medium: 1.0,
      hard: 1.5,
    };
    const difficultyMultiplier = difficultyMultipliers[difficulty];

    // Streak bonus: min(streakDays, 30) * 0.01 (1% per day capped at 30%)
    const streakBonus = Math.min(user.streakDays, 30) * 0.01;

    // Booster multiplier (2x if double XP active)
    const boosterMultiplier = user.boosters.doubleXp > 0 ? 2 : 1;

    // XP formula: baseXP * difficultyMultiplier * (1 + streakBonus) * boosterMultiplier
    const totalXP = Math.floor(
      baseXP * difficultyMultiplier * (1 + streakBonus) * boosterMultiplier
    );

    return totalXP;
  };

  const completeLesson = async (lessonId: string, score: number): Promise<number> => {
    if (!user) return 0;

    console.log('=== Completing Lesson ===');
    console.log('User before update:', {
      xp: user.xp,
      level: user.level,
      streakDays: user.streakDays,
      lastActiveDate: user.lastActiveDate,
      streakProtectors: user.boosters.streakProtectors
    });

    // Get lesson data to calculate XP
    const { lessons } = require("../data/lessons");
    const lesson = lessons.find((l: any) => l.lessonId === lessonId);
    
    if (!lesson) return 0;

    const xpEarned = calculateXP(lesson.xpReward, lesson.difficulty);

    const lessonProgress: LessonProgress = {
      lessonId,
      completed: true,
      completedAt: new Date().toISOString(),
      xpEarned,
      score,
    };

    const newProgress = {
      ...progress,
      [lessonId]: lessonProgress,
    };

    await saveProgress(newProgress);
    
    // Calculate new XP and level
    const newXP = user.xp + xpEarned;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    // Update streak
    const streakResult = validateAndUpdateStreak(
      user.lastActiveDate,
      user.streakDays,
      user.boosters.streakProtectors
    );

    console.log('Streak update result:', streakResult);

    // Combine all updates into a single call to avoid race conditions
    const updates: any = {
      xp: newXP,
      level: newLevel,
      streakDays: streakResult.newStreakDays,
      lastActiveDate: new Date().toISOString(),
    };

    console.log('Updates to apply:', updates);

    // If streak protector was used, decrement count
    if (streakResult.streakProtectorUsed) {
      updates.boosters = {
        ...user.boosters,
        streakProtectors: user.boosters.streakProtectors - 1,
      };
    }

    // If double XP booster was used, decrement count
    if (user.boosters.doubleXp > 0) {
      updates.boosters = {
        ...updates.boosters,
        doubleXp: user.boosters.doubleXp - 1,
      };
    }

    await updateUser(updates);
    
    console.log('Lesson completion finished');

    return xpEarned;
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress[lessonId]?.completed || false;
  };

  const getLessonProgress = (lessonId: string): LessonProgress | undefined => {
    return progress[lessonId];
  };

  return (
    <LessonContext.Provider
      value={{
        progress,
        loading,
        completeLesson,
        isLessonCompleted,
        getLessonProgress,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export const useLesson = () => {
  const ctx = useContext(LessonContext);
  if (!ctx) throw new Error("useLesson must be used inside LessonProvider");
  return ctx;
};

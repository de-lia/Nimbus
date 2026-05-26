import { CodeFrame } from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export type LessonContentType = "text" | "quiz" | "code" | "diagram";

export interface LessonContent {
  type: LessonContentType;
  text?: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
  code?: CodeFrame;
  imageUrl?: string;
}

export interface Lesson {
  lessonId: string;
  title: string;
  service: string;
  roles: string[];
  durationSeconds: number;
  difficulty: "easy" | "medium" | "hard"; // 0.8, 1.0, 1.5 multipliers
  content: LessonContent[];
  xpReward: number; // base XP
  isAdventure: boolean;
  prerequisiteLessons?: string[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  xpEarned: number;
  score?: number;
}

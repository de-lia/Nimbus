export type UserProfileParams = {
  userId: string;
  name: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  streakDays: number;
  badgesCount: number;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  VerificationScreen: undefined;
  CreateProfileStep1: undefined;
  LearningPathInfo: undefined;
  SelectRole: { returnTo?: string } | undefined;
  SelectService: { returnTo?: string } | undefined;
  CreateProfileStep2: undefined;
  MainApp: undefined;
  Lesson: undefined;
  LessonPlayer: undefined;
  Adventure: undefined;
  UserProfile: UserProfileParams;
  CertificationPath: { roleId: string };
  Settings: undefined;
  ChangeLearningPath: undefined;
  Badges: undefined;
  BadgeDetails: { badgeLevel: number };
};

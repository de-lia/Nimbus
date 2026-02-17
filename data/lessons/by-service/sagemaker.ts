import { Lesson } from "../../../types/lesson";

// SageMaker Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const sagemakerLessons: Lesson[] = [
  {
    lessonId: "sagemaker_lesson_1",
    title: "What is Amazon SageMaker?",
    service: "sagemaker",
    roles: ["developer", "data_scientist", "ml_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon SageMaker is a fully managed service that provides every developer and data scientist with the ability to build, train, and deploy machine learning (ML) models quickly.",
      },
      {
        type: "quiz",
        question: "What is SageMaker used for?",
        options: ["Machine learning", "Database management", "File storage", "Networking"],
        correctAnswer: "Machine learning",
      },
    ],
  },
];

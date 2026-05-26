import { Lesson } from "../../../types/lesson";

// ECR (Elastic Container Registry) Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const ecrLessons: Lesson[] = [
  {
    lessonId: "ecr_lesson_1",
    title: "What is Amazon ECR?",
    service: "ecr",
    roles: ["software_development_engineer", "cloud_devops_engineer", "solutions_architect", "cloud_engineer", "cloud_administrator", "devsecops_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon Elastic Container Registry (ECR) is a fully managed container registry that makes it easy to store, manage, share, and deploy container images and artifacts anywhere.",
      },
      {
        type: "quiz",
        question: "What does ECR store?",
        options: ["Container images", "Virtual machines", "Databases", "Static files"],
        correctAnswer: "Container images",
      },
    ],
  },
];

import { Lesson } from "../../../types/lesson";

// IAM (Identity and Access Management) Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const iamLessons: Lesson[] = [
  {
    lessonId: "iam_lesson_1",
    title: "What is AWS IAM?",
    service: "iam",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "devsecops_engineer", "cloud_security_engineer", "cloud_security_architect", "software_development_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "AWS Identity and Access Management (IAM) enables you to manage access to AWS services and resources securely. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.",
      },
      {
        type: "quiz",
        question: "What is the principle of least privilege?",
        options: ["Give users only the permissions they need", "Give users maximum permissions", "Give no permissions by default", "Give everyone admin access"],
        correctAnswer: "Give users only the permissions they need",
      },
    ],
  },
];

import { Lesson } from "../../../types/lesson";

// VPC (Virtual Private Cloud) Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const vpcLessons: Lesson[] = [
  {
    lessonId: "vpc_lesson_1",
    title: "What is Amazon VPC?",
    service: "vpc",
    roles: ["solutions_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer", "cloud_security_architect", "network_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.",
      },
      {
        type: "quiz",
        question: "What does VPC provide?",
        options: ["Isolated network environment", "Database storage", "Compute power", "Content delivery"],
        correctAnswer: "Isolated network environment",
      },
    ],
  },
];

import { Lesson } from "../../../types/lesson";

// Lambda Lessons - 50 lessons organized into 4 modules
// Total duration: 150 minutes (2.5 hours)
// Module 1: Fundamentals (10 lessons)
// Module 2: Function Development (15 lessons)
// Module 3: Event Sources & Integrations (15 lessons)
// Module 4: Advanced Topics (10 lessons)

export const lambdaLessons: Lesson[] = [
  // ============================================
  // LAMBDA MODULE 1: FUNDAMENTALS (10 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_1",
    title: "What is AWS Lambda?",
    service: "lambda",
    roles: ["developer", "solutions_architect", "devops_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. You simply upload your code, and Lambda takes care of everything required to run and scale your code with high availability.",
      },
      {
        type: "quiz",
        question: "What is the main benefit of AWS Lambda?",
        options: ["No server management required", "Unlimited free tier", "Faster than all other services", "Built-in database"],
        correctAnswer: "No server management required",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_2",
    title: "Serverless Computing Explained",
    service: "lambda",
    roles: ["developer", "solutions_architect", "cloud_practitioner"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_1"],
    content: [
      {
        type: "text",
        text: "Serverless doesn't mean there are no servers - it means you don't have to think about them. AWS manages the infrastructure, and you focus on writing code. You pay only for the compute time you consume.",
      },
      {
        type: "quiz",
        question: "In serverless computing, who manages the servers?",
        options: ["AWS manages them", "You manage them", "No one manages them", "Third-party vendors"],
        correctAnswer: "AWS manages them",
      },
    ],
  },
];

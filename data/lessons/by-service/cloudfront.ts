import { Lesson } from "../../../types/lesson";

// CloudFront Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const cloudfrontLessons: Lesson[] = [
  {
    lessonId: "cloudfront_lesson_1",
    title: "What is Amazon CloudFront?",
    service: "cloudfront",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_devops_engineer", "network_engineer", "cloud_security_engineer", "cloud_administrator"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds.",
      },
      {
        type: "quiz",
        question: "What type of service is CloudFront?",
        options: ["Content Delivery Network (CDN)", "Database", "Compute service", "Storage service"],
        correctAnswer: "Content Delivery Network (CDN)",
      },
    ],
  },
];

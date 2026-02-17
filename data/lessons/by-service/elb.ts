import { Lesson } from "../../../types/lesson";

// ELB (Elastic Load Balancing) Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const elbLessons: Lesson[] = [
  {
    lessonId: "elb_lesson_1",
    title: "What is Elastic Load Balancing?",
    service: "elb",
    roles: ["solutions_architect", "sysops_administrator", "devops_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Elastic Load Balancing automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses. It ensures high availability and fault tolerance.",
      },
      {
        type: "quiz",
        question: "What is the main purpose of a load balancer?",
        options: ["Distribute traffic across multiple targets", "Store data", "Run applications", "Monitor performance"],
        correctAnswer: "Distribute traffic across multiple targets",
      },
    ],
  },
];

import { Lesson } from "../../../types/lesson";

// EC2 Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const ec2Lessons: Lesson[] = [
  {
    lessonId: "ec2_lesson_1",
    title: "What is Amazon EC2?",
    service: "ec2",
    roles: ["cloud_practitioner", "solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS cloud. It eliminates the need to invest in hardware upfront, so you can develop and deploy applications faster.",
      },
      {
        type: "quiz",
        question: "What does EC2 stand for?",
        options: ["Elastic Compute Cloud", "Elastic Container Cloud", "Enterprise Cloud Capacity", "Elastic Cloud Computing"],
        correctAnswer: "Elastic Compute Cloud",
      },
    ],
  },
];

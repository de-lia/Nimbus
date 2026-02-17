import { Lesson } from "../../../types/lesson";

// DynamoDB Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const dynamodbLessons: Lesson[] = [
  {
    lessonId: "dynamodb_lesson_1",
    title: "What is Amazon DynamoDB?",
    service: "dynamodb",
    roles: ["developer", "solutions_architect", "database_specialist"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. It's designed to handle massive amounts of data and traffic.",
      },
      {
        type: "quiz",
        question: "What type of database is DynamoDB?",
        options: ["NoSQL", "Relational", "Graph", "Time-series"],
        correctAnswer: "NoSQL",
      },
    ],
  },
];

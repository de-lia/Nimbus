import { Lesson } from "../../../types/lesson";

// Kinesis Lessons - 50 lessons
// Total duration: 150 minutes (2.5 hours)

export const kinesisLessons: Lesson[] = [
  {
    lessonId: "kinesis_lesson_1",
    title: "What is Amazon Kinesis?",
    service: "kinesis",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "ml_engineer", "data_scientist"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon Kinesis makes it easy to collect, process, and analyze real-time streaming data. It enables you to get timely insights and react quickly to new information.",
      },
      {
        type: "quiz",
        question: "What type of data does Kinesis handle?",
        options: ["Real-time streaming data", "Static files", "Archived data", "Backup data"],
        correctAnswer: "Real-time streaming data",
      },
    ],
  },
];

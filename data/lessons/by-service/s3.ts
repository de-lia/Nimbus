import { Lesson } from "../../../types/lesson";

// S3 Lessons - 50 lessons organized into 4 modules
// Total duration: 150 minutes (2.5 hours)
// Module 1: Fundamentals (10 lessons)
// Module 2: Security & Permissions (15 lessons)
// Module 3: Storage Classes (10 lessons)
// Module 4: Data Management (15 lessons)

export const s3Lessons: Lesson[] = [
  // ============================================
  // S3 MODULE 1: FUNDAMENTALS (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_1",
    title: "What is Amazon S3?",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Imagine you have a magic backpack. This backpack is special because it can hold anything you want — photos, videos, documents, you name it. And the best part? It never runs out of space. You can put as much as you want in it, and it will always have room for more. In the world of AWS, this magic backpack is called an S3 Bucket.",
      },
      {
        type: "text",
        text: "S3 stands for Simple Storage Service, and it's a place where you can store and retrieve any amount of data, anytime, from anywhere on the web. It's like having your own personal, infinitely large hard drive in the cloud.",
      },
      {
        type: "quiz",
        question: "What does S3 stand for?",
        options: ["Simple Storage Service", "Secure Storage System", "Standard Storage Service", "Simple Server Storage"],
        correctAnswer: "Simple Storage Service",
      },
    ],
  },
  {
    lessonId: "s3_lesson_2",
    title: "Understanding S3 Buckets",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "A bucket is a container for objects stored in Amazon S3. Think of it like a top-level folder. Every object is contained in a bucket. For example, if you store a photo named 'vacation.jpg' in a bucket named 'my-photos', the object can be addressed as 'my-photos/vacation.jpg'.",
      },
      {
        type: "quiz",
        question: "What is an S3 bucket?",
        options: ["A container for objects", "A type of database", "A virtual machine", "A network router"],
        correctAnswer: "A container for objects",
      },
      {
        type: "text",
        text: "Bucket names must be globally unique across all AWS accounts. Once you create a bucket with a specific name, no one else can use that name until you delete the bucket.",
      },
    ],
  },
];

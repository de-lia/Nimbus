import { Lesson } from "../../types/lesson";

// Import lessons from each service
import { s3Lessons } from "./by-service/s3";
import { lambdaLessons } from "./by-service/lambda";
import { dynamodbLessons } from "./by-service/dynamodb";
import { ec2Lessons } from "./by-service/ec2";
import { elbLessons } from "./by-service/elb";
import { cloudfrontLessons } from "./by-service/cloudfront";
import { kinesisLessons } from "./by-service/kinesis";
import { ecrLessons } from "./by-service/ecr";
import { vpcLessons } from "./by-service/vpc";
import { iamLessons } from "./by-service/iam";
import { sagemakerLessons } from "./by-service/sagemaker";

// Aggregate all lessons
export const lessons: Lesson[] = [
  ...s3Lessons,
  ...lambdaLessons,
  ...dynamodbLessons,
  ...ec2Lessons,
  ...elbLessons,
  ...cloudfrontLessons,
  ...kinesisLessons,
  ...ecrLessons,
  ...vpcLessons,
  ...iamLessons,
  ...sagemakerLessons,
];

// Helper function to get lessons by service
export const getLessonsByService = (service: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.service === service);
};

// Helper function to get lessons by role
export const getLessonsByRole = (role: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.roles.includes(role));
};

// Helper function to get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.lessonId === lessonId);
};

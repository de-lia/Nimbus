import { Lesson } from "../../types/lesson";
import { migrateRoleId } from "../roleMigration";
import { JOB_ROLES, CategoryTag } from "../jobRoles";

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
  const resolvedRoles = migrateRoleId(role);
  return lessons.filter((lesson) =>
    lesson.roles.some((r) => resolvedRoles.includes(r))
  );
};

// Helper function to get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.lessonId === lessonId);
};

// Filter lessons by category tag
export const getLessonsByCategory = (category: CategoryTag): Lesson[] => {
  const roleIds = JOB_ROLES.filter((r) => r.category === category).map((r) => r.id);
  return lessons.filter((lesson) =>
    lesson.roles.some((r) => roleIds.includes(r))
  );
};

// Search lessons by title (case-insensitive)
export const searchLessons = (allLessons: Lesson[], query: string): Lesson[] => {
  const lower = query.toLowerCase();
  return allLessons.filter((l) => l.title.toLowerCase().includes(lower));
};

import { Adventure } from "../../types/adventure";

// Import adventures from each service
import { s3Adventures } from "./by-service/s3";
import { lambdaAdventures } from "./by-service/lambda";
import { dynamodbAdventures } from "./by-service/dynamodb";
import { ec2Adventures } from "./by-service/ec2";
import { elbAdventures } from "./by-service/elb";
import { cloudfrontAdventures } from "./by-service/cloudfront";
import { kinesisAdventures } from "./by-service/kinesis";
import { ecrAdventures } from "./by-service/ecr";
import { vpcAdventures } from "./by-service/vpc";
import { iamAdventures } from "./by-service/iam";
import { sagemakerAdventures } from "./by-service/sagemaker";

// Aggregate all adventures
export const adventures: Adventure[] = [
  ...s3Adventures,
  ...lambdaAdventures,
  ...dynamodbAdventures,
  ...ec2Adventures,
  ...elbAdventures,
  ...cloudfrontAdventures,
  ...kinesisAdventures,
  ...ecrAdventures,
  ...vpcAdventures,
  ...iamAdventures,
  ...sagemakerAdventures,
];

// Helper function to get adventure by ID
export const getAdventureById = (adventureId: string): Adventure | undefined => {
  return adventures.find((adventure) => adventure.adventureId === adventureId);
};

// Helper function to get adventures by service
export const getAdventuresByService = (service: string): Adventure[] => {
  return adventures.filter((adventure) => adventure.service === service);
};

// Helper function to get adventures by role
export const getAdventuresByRole = (role: string): Adventure[] => {
  return adventures.filter((adventure) => adventure.roles.includes(role));
};

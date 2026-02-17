import { Adventure } from "../../../types/adventure";

export const dynamodbAdventures: Adventure[] = [
  {
    adventureId: "dynamodb_adventure_1",
    title: "Build Your First DynamoDB Table",
    description: "Create a NoSQL table and perform CRUD operations",
    service: "dynamodb",
    roles: ["developer", "solutions_architect", "database_specialist"],
    difficulty: "medium",
    xpReward: 400,
    badge: "dynamodb_builder",
    steps: [
      {
        stepId: "step_1",
        description: "Navigate to DynamoDB in the AWS Console",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create a new table with a partition key",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Add items to your table",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Query items using the partition key",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Update and delete items",
        completed: false
      }
    ]
  },
];

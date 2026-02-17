import { Adventure } from "../../../types/adventure";

// Lambda Adventures - 10 adventures
// Total duration: 150 minutes (2.5 hours)

export const lambdaAdventures: Adventure[] = [
  {
    adventureId: "lambda_adventure_1",
    title: "Create Your First Lambda Function",
    description: "Build a serverless function that responds to events",
    service: "lambda",
    roles: ["developer", "solutions_architect", "devops_engineer"],
    difficulty: "medium",
    xpReward: 400,
    badge: "serverless_ninja",
    steps: [
      {
        stepId: "step_1",
        description: "Navigate to Lambda in the AWS Console",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create a new Lambda function from scratch",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Write a simple function that returns 'Hello World'",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Test your function using the built-in test feature",
        completed: false
      },
      {
        stepId: "step_5",
        description: "View the execution logs in CloudWatch",
        completed: false
      }
    ]
  },
];

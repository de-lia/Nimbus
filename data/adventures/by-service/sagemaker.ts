import { Adventure } from "../../../types/adventure";

export const sagemakerAdventures: Adventure[] = [
  {
    adventureId: "sagemaker_adventure_1",
    title: "Train Your First ML Model",
    description: "Build and train a machine learning model using SageMaker",
    service: "sagemaker",
    roles: ["developer", "data_scientist", "ml_engineer"],
    difficulty: "hard",
    xpReward: 400,
    badge: "ml_pioneer",
    steps: [
      {
        stepId: "step_1",
        description: "Create a SageMaker notebook instance",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Upload training data to S3",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Prepare and explore your dataset",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Train a model using a built-in algorithm",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Deploy the model to an endpoint",
        completed: false
      },
      {
        stepId: "step_6",
        description: "Make predictions using the endpoint",
        completed: false
      }
    ]
  },
];

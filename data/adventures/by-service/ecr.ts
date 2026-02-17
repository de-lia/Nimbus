import { Adventure } from "../../../types/adventure";

export const ecrAdventures: Adventure[] = [
  {
    adventureId: "ecr_adventure_1",
    title: "Push Your First Container Image",
    description: "Create a container registry and push a Docker image",
    service: "ecr",
    roles: ["developer", "devops_engineer", "solutions_architect"],
    difficulty: "medium",
    xpReward: 400,
    badge: "container_pro",
    steps: [
      {
        stepId: "step_1",
        description: "Create an ECR repository",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Install Docker on your local machine",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Authenticate Docker to your ECR registry",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Build a Docker image locally",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Tag and push the image to ECR",
        completed: false
      }
    ]
  },
];

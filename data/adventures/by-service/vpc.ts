import { Adventure } from "../../../types/adventure";

export const vpcAdventures: Adventure[] = [
  {
    adventureId: "vpc_adventure_1",
    title: "Build Your First VPC",
    description: "Create a custom VPC with public and private subnets",
    service: "vpc",
    roles: ["solutions_architect", "sysops_administrator", "network_specialist"],
    difficulty: "hard",
    xpReward: 400,
    badge: "network_architect",
    steps: [
      {
        stepId: "step_1",
        description: "Create a VPC with a CIDR block",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create a public subnet",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create a private subnet",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Create and attach an Internet Gateway",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Configure route tables for public subnet",
        completed: false
      },
      {
        stepId: "step_6",
        description: "Launch an EC2 instance in the public subnet",
        completed: false
      }
    ]
  },
];

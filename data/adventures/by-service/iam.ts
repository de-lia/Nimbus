import { Adventure } from "../../../types/adventure";

export const iamAdventures: Adventure[] = [
  {
    adventureId: "iam_adventure_1",
    title: "Master IAM Users and Policies",
    description: "Create users, groups, and policies following security best practices",
    service: "iam",
    roles: ["cloud_practitioner", "solutions_architect", "sysops_administrator", "security_specialist"],
    difficulty: "medium",
    xpReward: 400,
    badge: "security_guardian",
    steps: [
      {
        stepId: "step_1",
        description: "Create an IAM user with console access",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create an IAM group for developers",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Attach a managed policy to the group",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Add the user to the group",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Enable MFA for the user",
        completed: false
      }
    ]
  },
];

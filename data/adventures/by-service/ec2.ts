import { Adventure } from "../../../types/adventure";

export const ec2Adventures: Adventure[] = [
  {
    adventureId: "ec2_adventure_1",
    title: "Launch Your First EC2 Instance",
    description: "Deploy a web server on EC2 and connect to it via SSH",
    service: "ec2",
    roles: ["cloud_practitioner", "solutions_architect", "sysops_administrator"],
    difficulty: "medium",
    xpReward: 400,
    badge: "ec2_pioneer",
    steps: [
      {
        stepId: "step_1",
        description: "Navigate to EC2 in the AWS Console",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Launch a new t2.micro instance with Amazon Linux 2",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create and download a new key pair",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Configure security group to allow SSH (port 22)",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Connect to your instance using SSH",
        completed: false
      },
      {
        stepId: "step_6",
        description: "Install and start a web server (Apache or Nginx)",
        completed: false
      }
    ]
  },
];

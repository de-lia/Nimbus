import { Adventure } from "../../../types/adventure";

export const elbAdventures: Adventure[] = [
  {
    adventureId: "elb_adventure_1",
    title: "Set Up Your First Load Balancer",
    description: "Create an Application Load Balancer to distribute traffic",
    service: "elb",
    roles: ["solutions_architect", "sysops_administrator", "devops_engineer"],
    difficulty: "medium",
    xpReward: 400,
    badge: "load_balancer_pro",
    steps: [
      {
        stepId: "step_1",
        description: "Launch two EC2 instances in different availability zones",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create an Application Load Balancer",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Configure target group with your EC2 instances",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Set up health checks",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Test load balancing by accessing the ALB DNS name",
        completed: false
      }
    ]
  },
];

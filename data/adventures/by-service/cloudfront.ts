import { Adventure } from "../../../types/adventure";

export const cloudfrontAdventures: Adventure[] = [
  {
    adventureId: "cloudfront_adventure_1",
    title: "Create Your First CloudFront Distribution",
    description: "Set up a CDN to deliver content globally with low latency",
    service: "cloudfront",
    roles: ["solutions_architect", "developer", "devops_engineer"],
    difficulty: "medium",
    xpReward: 400,
    badge: "cdn_master",
    steps: [
      {
        stepId: "step_1",
        description: "Create an S3 bucket with static content",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create a CloudFront distribution",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Configure the S3 bucket as the origin",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Wait for distribution deployment",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Access content via CloudFront domain name",
        completed: false
      }
    ]
  },
];

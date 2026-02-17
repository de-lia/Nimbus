import { Adventure } from "../../../types/adventure";

// S3 Adventures - 10 adventures
// Total duration: 150 minutes (2.5 hours)

export const s3Adventures: Adventure[] = [
  {
    adventureId: "s3_adventure_1",
    title: "Build Your First S3 Static Website",
    description: "Learn to host a static website using S3 by completing hands-on steps in the AWS Console",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    difficulty: "medium",
    xpReward: 400,
    badge: "s3_website_master",
    steps: [
      {
        stepId: "step_1",
        description: "Create an S3 bucket with a unique name",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Enable static website hosting on the bucket",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Upload an index.html file to your bucket",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Configure bucket policy for public read access",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Access your website via the S3 endpoint URL",
        completed: false
      }
    ]
  },
];

import { Adventure } from "../types/adventure";

export const adventures: Adventure[] = [
  // ============================================
  // S3 ADVENTURES (10 total)
  // ============================================
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
  {
    adventureId: "s3_adventure_2",
    title: "Master S3 Versioning and Lifecycle",
    description: "Implement versioning and lifecycle policies to manage object versions and optimize costs",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator", "developer"],
    difficulty: "medium",
    xpReward: 400,
    badge: "s3_lifecycle_expert",
    steps: [
      {
        stepId: "step_1",
        description: "Create a new S3 bucket for testing",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Enable versioning on the bucket",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Upload a file and then upload a modified version",
        completed: false
      },
      {
        stepId: "step_4",
        description: "View and restore a previous version of the object",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Create a lifecycle policy to transition old versions to Glacier after 30 days",
        completed: false
      },
      {
        stepId: "step_6",
        description: "Verify the lifecycle policy is active",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_3",
    title: "Secure Your S3 Bucket",
    description: "Implement comprehensive security controls including encryption, policies, and access logging",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    difficulty: "hard",
    xpReward: 400,
    badge: "s3_security_guardian",
    steps: [
      {
        stepId: "step_1",
        description: "Create a new S3 bucket with Block Public Access enabled",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Enable default encryption (SSE-S3) on the bucket",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create an IAM policy that grants read-only access to the bucket",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Create a bucket policy that enforces HTTPS-only access",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Enable server access logging to track all requests",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_4",
    title: "Set Up Cross-Region Replication",
    description: "Configure automatic replication of objects across AWS regions for disaster recovery",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    difficulty: "hard",
    xpReward: 400,
    badge: "s3_replication_pro",
    steps: [
      {
        stepId: "step_1",
        description: "Create a source bucket in one region with versioning enabled",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create a destination bucket in a different region with versioning enabled",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create an IAM role for replication with appropriate permissions",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Configure replication rule from source to destination bucket",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Upload a test file to source bucket and verify it replicates",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_5",
    title: "Optimize Costs with Storage Classes",
    description: "Use Intelligent-Tiering and lifecycle policies to automatically optimize storage costs",
    service: "s3",
    roles: ["solutions_architect", "cloud_practitioner", "developer"],
    difficulty: "medium",
    xpReward: 400,
    badge: "s3_cost_optimizer",
    steps: [
      {
        stepId: "step_1",
        description: "Create a bucket and upload sample files",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Enable S3 Intelligent-Tiering on the bucket",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create a lifecycle policy to move objects to Standard-IA after 30 days",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Add a rule to transition to Glacier Flexible Retrieval after 90 days",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Configure expiration to delete objects after 365 days",
        completed: false
      },
      {
        stepId: "step_6",
        description: "Review the lifecycle configuration and estimate cost savings",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_6",
    title: "Build an Event-Driven Workflow",
    description: "Use S3 event notifications to trigger Lambda functions for automated processing",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    difficulty: "hard",
    xpReward: 400,
    badge: "s3_automation_ninja",
    steps: [
      {
        stepId: "step_1",
        description: "Create an S3 bucket for file uploads",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create a Lambda function that logs object details",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Grant S3 permission to invoke your Lambda function",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Configure S3 event notification for object creation events",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Upload a test file and verify Lambda function is triggered",
        completed: false
      },
      {
        stepId: "step_6",
        description: "Check CloudWatch Logs to see the Lambda execution results",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_7",
    title: "Implement S3 Access Points",
    description: "Simplify data access management using S3 Access Points for different teams",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    difficulty: "hard",
    xpReward: 400,
    badge: "s3_access_architect",
    steps: [
      {
        stepId: "step_1",
        description: "Create an S3 bucket with sample data organized by department",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Create an Access Point for the finance team with restricted access",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create another Access Point for the marketing team",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Configure Access Point policies with appropriate permissions",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Test accessing data through each Access Point",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_8",
    title: "Master S3 Batch Operations",
    description: "Perform large-scale operations on thousands of objects using S3 Batch Operations",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    difficulty: "hard",
    xpReward: 400,
    badge: "s3_batch_master",
    steps: [
      {
        stepId: "step_1",
        description: "Create a bucket and upload multiple test objects",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Generate an S3 Inventory report for the bucket",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Create an IAM role for Batch Operations",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Create a Batch Operations job to add tags to all objects",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Monitor the job progress and review the completion report",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_9",
    title: "Accelerate Global Uploads",
    description: "Configure S3 Transfer Acceleration for faster uploads from around the world",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    difficulty: "medium",
    xpReward: 400,
    badge: "s3_speed_demon",
    steps: [
      {
        stepId: "step_1",
        description: "Create an S3 bucket in a region far from your location",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Enable Transfer Acceleration on the bucket",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Use the Transfer Acceleration Speed Comparison tool",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Upload a large file using the accelerated endpoint",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Compare upload times with and without acceleration",
        completed: false
      }
    ]
  },
  {
    adventureId: "s3_adventure_10",
    title: "Query Data with S3 Select",
    description: "Use S3 Select to efficiently query and retrieve specific data from large files",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    difficulty: "medium",
    xpReward: 400,
    badge: "s3_query_wizard",
    steps: [
      {
        stepId: "step_1",
        description: "Create a bucket and upload a CSV file with sample data",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Use S3 Select in the console to query specific columns",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Write a SQL query to filter rows based on conditions",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Compare data transfer with and without S3 Select",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Use AWS CLI to run S3 Select queries programmatically",
        completed: false
      }
    ]
  },

  // ============================================
  // EC2 ADVENTURES
  // ============================================
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

  // ============================================
  // LAMBDA ADVENTURES
  // ============================================
  {
    adventureId: "lambda_adventure_1",
    title: "Create Your First Lambda Function",
    description: "Build a serverless function that responds to events",
    service: "lambda",
    roles: ["developer", "solutions_architect", "devops_engineer"],
    difficulty: "hard",
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
  }
];

// Helper function to get adventure by ID
export const getAdventureById = (adventureId: string): Adventure | undefined => {
  return adventures.find((adventure) => adventure.adventureId === adventureId);
};

// Helper function to get adventures by service
export const getAdventuresByService = (service: string): Adventure[] => {
  return adventures.filter((adventure) => adventure.service === service);
};

// Helper function to get adventures by role
export const getAdventuresByRole = (role: string): Adventure[] => {
  return adventures.filter((adventure) => adventure.roles.includes(role));
};

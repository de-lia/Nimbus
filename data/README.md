# Data Organization

This folder contains all learning content for the Nimbus AWS learning app, organized by service and role.

## Structure

```
data/
├── lessons/
│   ├── by-service/
│   │   ├── s3.ts              # 50 S3 lessons (2.5 hours)
│   │   ├── lambda.ts          # 50 Lambda lessons (2.5 hours)
│   │   ├── dynamodb.ts        # 50 DynamoDB lessons (2.5 hours)
│   │   ├── ec2.ts             # 50 EC2 lessons (2.5 hours)
│   │   ├── elb.ts             # 50 ELB lessons (2.5 hours)
│   │   ├── cloudfront.ts      # 50 CloudFront lessons (2.5 hours)
│   │   ├── kinesis.ts         # 50 Kinesis lessons (2.5 hours)
│   │   ├── ecr.ts             # 50 ECR lessons (2.5 hours)
│   │   ├── vpc.ts             # 50 VPC lessons (2.5 hours)
│   │   ├── iam.ts             # 50 IAM lessons (2.5 hours)
│   │   └── sagemaker.ts       # 50 SageMaker lessons (2.5 hours)
│   └── index.ts               # Aggregates all lessons
├── adventures/
│   ├── by-service/
│   │   ├── s3.ts              # 10 S3 adventures (2.5 hours)
│   │   ├── lambda.ts          # 10 Lambda adventures (2.5 hours)
│   │   ├── dynamodb.ts        # 10 DynamoDB adventures (2.5 hours)
│   │   ├── ec2.ts             # 10 EC2 adventures (2.5 hours)
│   │   ├── elb.ts             # 10 ELB adventures (2.5 hours)
│   │   ├── cloudfront.ts      # 10 CloudFront adventures (2.5 hours)
│   │   ├── kinesis.ts         # 10 Kinesis adventures (2.5 hours)
│   │   ├── ecr.ts             # 10 ECR adventures (2.5 hours)
│   │   ├── vpc.ts             # 10 VPC adventures (2.5 hours)
│   │   ├── iam.ts             # 10 IAM adventures (2.5 hours)
│   │   └── sagemaker.ts       # 10 SageMaker adventures (2.5 hours)
│   └── index.ts               # Aggregates all adventures
├── lessons.ts                 # LEGACY - kept for backward compatibility
├── adventures.ts              # LEGACY - kept for backward compatibility
└── leaderboardMock.ts         # Mock leaderboard data

```

## Content Guidelines

### Lessons
- Each lesson is 3 minutes (180 seconds)
- Each service has ~50 lessons = 150 minutes (2.5 hours)
- Lessons include text content and quizzes
- XP rewards: 50 (easy), 75 (medium), 100 (hard)

### Adventures
- Each adventure is 15 minutes
- Each service has ~10 adventures = 150 minutes (2.5 hours)
- Adventures have 4-6 hands-on steps
- XP reward: 400 per adventure

### Total Content per Service
- 50 lessons (2.5 hours) + 10 adventures (2.5 hours) = 5 hours per service
- 11 services × 5 hours = 55 hours of total content

## Adding New Content

### Adding a New Lesson

1. Open the appropriate service file in `data/lessons/by-service/`
2. Add your lesson to the array:

```typescript
{
  lessonId: "service_lesson_X",
  title: "Your Lesson Title",
  service: "service_name",
  roles: ["role1", "role2"],
  durationSeconds: 180,
  difficulty: "easy" | "medium" | "hard",
  xpReward: 50 | 75 | 100,
  isAdventure: false,
  prerequisiteLessons: ["previous_lesson_id"], // optional
  content: [
    {
      type: "text",
      text: "Your lesson content here..."
    },
    {
      type: "quiz",
      question: "Your question?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1"
    }
  ]
}
```

### Adding a New Adventure

1. Open the appropriate service file in `data/adventures/by-service/`
2. Add your adventure to the array:

```typescript
{
  adventureId: "service_adventure_X",
  title: "Your Adventure Title",
  description: "Brief description of what users will learn",
  service: "service_name",
  roles: ["role1", "role2"],
  difficulty: "easy" | "medium" | "hard",
  xpReward: 400,
  badge: "badge_identifier",
  steps: [
    {
      stepId: "step_1",
      description: "First step description",
      completed: false
    },
    // Add 4-6 steps total
  ]
}
```

### Adding a New Service

1. Create a new file in `data/lessons/by-service/newservice.ts`
2. Create a new file in `data/adventures/by-service/newservice.ts`
3. Import and add to the aggregation in `data/lessons/index.ts`
4. Import and add to the aggregation in `data/adventures/index.ts`

## Service Codes

- `s3` - Amazon S3 (Simple Storage Service)
- `lambda` - AWS Lambda
- `dynamodb` - Amazon DynamoDB
- `ec2` - Amazon EC2 (Elastic Compute Cloud)
- `elb` - Elastic Load Balancing
- `cloudfront` - Amazon CloudFront
- `kinesis` - Amazon Kinesis
- `ecr` - Amazon ECR (Elastic Container Registry)
- `vpc` - Amazon VPC (Virtual Private Cloud)
- `iam` - AWS IAM (Identity and Access Management)
- `sagemaker` - Amazon SageMaker

## Role Codes

- `cloud_practitioner` - Cloud Practitioner
- `solutions_architect` - Solutions Architect
- `developer` - Developer
- `sysops_administrator` - SysOps Administrator
- `devops_engineer` - DevOps Engineer
- `security_specialist` - Security Specialist
- `database_specialist` - Database Specialist
- `data_engineer` - Data Engineer
- `data_scientist` - Data Scientist
- `ml_engineer` - Machine Learning Engineer
- `network_specialist` - Network Specialist

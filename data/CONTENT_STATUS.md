# Content Status

## Current Status

The data folder has been reorganized into a modular structure. Each service now has its own file for lessons and adventures.

### Structure Created ✅
- `data/lessons/by-service/` - One file per service for lessons
- `data/adventures/by-service/` - One file per service for adventures
- `data/lessons/index.ts` - Aggregates all lessons
- `data/adventures/index.ts` - Aggregates all adventures

### Services Set Up ✅
1. S3 - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
2. Lambda - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
3. DynamoDB - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
4. EC2 - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
5. ELB - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
6. CloudFront - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
7. Kinesis - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
8. ECR - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
9. VPC - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
10. IAM - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)
11. SageMaker - ✅ Starter content (needs expansion to 50 lessons + 10 adventures)

### Imports Updated ✅
- `screens/LessonsListScreen.tsx` - Updated to use new path
- `screens/LessonPlayerScreen.tsx` - Updated to use new path
- `contexts/AdventureContext.tsx` - Updated to use new path
- `screens/AdventureScreen.tsx` - Updated to use new path

## Next Steps

To complete the content for each service, edit the respective files and add:

### For Each Service:
- **50 lessons** (3 mins each = 150 mins total)
  - Organized into 3-4 modules
  - Mix of easy (50 XP), medium (75 XP), and hard (100 XP) difficulties
  - Include text content and quizzes
  
- **10 adventures** (15 mins each = 150 mins total)
  - Hands-on practical exercises
  - 4-6 steps each
  - 400 XP reward per adventure

### Content Guidelines:

#### Lesson Structure:
```typescript
{
  lessonId: "service_lesson_X",
  title: "Descriptive Title",
  service: "service_code",
  roles: ["role1", "role2", "role3"],
  durationSeconds: 180,
  difficulty: "easy" | "medium" | "hard",
  xpReward: 50 | 75 | 100,
  isAdventure: false,
  prerequisiteLessons: ["previous_lesson"], // optional
  content: [
    { type: "text", text: "Educational content..." },
    {
      type: "quiz",
      question: "Question?",
      options: ["A", "B", "C", "D"],
      correctAnswer: "A"
    }
  ]
}
```

#### Adventure Structure:
```typescript
{
  adventureId: "service_adventure_X",
  title: "Hands-on Title",
  description: "What users will build/learn",
  service: "service_code",
  roles: ["role1", "role2"],
  difficulty: "easy" | "medium" | "hard",
  xpReward: 400,
  badge: "badge_name",
  steps: [
    { stepId: "step_1", description: "Step description", completed: false },
    // 4-6 steps total
  ]
}
```

## Content Expansion Priority

Suggested order for expanding content:

1. **S3** - Most fundamental service (already has 50 lessons from previous work)
2. **IAM** - Critical for security
3. **EC2** - Core compute service
4. **Lambda** - Serverless fundamentals
5. **VPC** - Networking basics
6. **DynamoDB** - Database fundamentals
7. **ELB** - Load balancing
8. **CloudFront** - CDN and content delivery
9. **ECR** - Container registry
10. **Kinesis** - Streaming data
11. **SageMaker** - Machine learning

## Benefits of New Structure

✅ **Modular** - Each service in its own file
✅ **Scalable** - Easy to add new services
✅ **Maintainable** - Easy to find and edit content
✅ **Organized** - Clear separation of concerns
✅ **Flexible** - Can add lessons/adventures independently
✅ **Version Control Friendly** - Smaller diffs when editing

## Migration Notes

- Old `data/lessons.ts` and `data/adventures.ts` files can be kept for reference or removed
- All imports have been updated to use the new structure
- The app will work with the current starter content
- Content can be expanded incrementally, one service at a time

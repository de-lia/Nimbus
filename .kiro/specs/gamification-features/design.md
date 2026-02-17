# Design Document: Gamification Features

## Overview

This design document outlines the implementation of three interconnected gamification features for the Nimbus AWS learning app: Leaderboard System, Streak Tracking System, and Adventures System. These features enhance user engagement through competitive rankings, habit-forming mechanics, and structured learning challenges.

The implementation follows the existing architecture patterns:
- React Native/Expo with TypeScript
- AsyncStorage for local persistence
- Context API for state management (UserContext pattern)
- Mock data for MVP delivery

The design prioritizes simplicity and maintainability while ensuring the features integrate seamlessly with the existing lesson completion flow and XP calculation system.

## Architecture

### Component Structure

```
gamification-features/
├── contexts/
│   ├── AdventureContext.tsx       # Adventure state management
│   └── LeaderboardContext.tsx     # Leaderboard data management
├── data/
│   ├── adventures.ts              # Adventure definitions (mock data)
│   └── leaderboardMock.ts         # Mock leaderboard data
├── types/
│   ├── adventure.ts               # Adventure type definitions
│   └── leaderboard.ts             # Leaderboard type definitions
├── utils/
│   ├── streakUtils.ts             # Streak calculation logic
│   ├── dateUtils.ts               # UTC date handling
│   └── leaderboardUtils.ts        # Score calculation
└── screens/
    ├── LeaderboardScreen.tsx      # Already exists, needs updates
    └── AdventureScreen.tsx        # Already exists, needs updates
```

### Data Flow

1. **Lesson Completion Flow** (existing, needs updates):
   - User completes lesson → LessonContext updates progress
   - XP calculation occurs → UserContext.addXP() called
   - **NEW**: Streak validation → streakUtils.validateAndUpdateStreak()
   - **NEW**: lastActiveDate updated → UserContext.updateUser()

2. **Adventure Completion Flow** (new):
   - User marks step complete → AdventureContext.markStepComplete()
   - Check if all steps complete → AdventureContext.checkCompletion()
   - Award XP and badge → UserContext.addXP() + updateUser()
   - Track completion → Add to adventuresCompleted array

3. **Leaderboard Display Flow** (new):
   - User navigates to Leaderboard → LeaderboardScreen renders
   - Select period (weekly/monthly/friends) → LeaderboardContext.setPeriod()
   - Calculate scores → leaderboardUtils.calculateScore()
   - Sort and display → Render ranked list

### Integration Points

- **UserContext**: Extended with adventuresCompleted array and streak logic
- **LessonPlayerScreen**: Hook into lesson completion to trigger streak updates
- **AsyncStorage**: Keys for adventure progress and user data persistence

## Components and Interfaces

### Type Definitions

#### Adventure Types

```typescript
// types/adventure.ts

export interface AdventureStep {
  stepId: string;
  description: string;
  completed: boolean;
}

export interface Adventure {
  adventureId: string;
  title: string;
  description: string;
  service: string;
  roles: string[];
  steps: AdventureStep[];
  xpReward: number;  // Base reward: 400 XP
  badge: string;     // Badge ID to award on completion
  difficulty: "easy" | "medium" | "hard";
}

export interface AdventureProgress {
  adventureId: string;
  steps: AdventureStep[];
  completed: boolean;
  completedAt?: string;
}
```

#### Leaderboard Types

```typescript
// types/leaderboard.ts

export type LeaderboardPeriod = "weekly" | "monthly" | "friends";

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl?: string;
  xpEarned: number;        // XP earned in period
  adventureBonus: number;  // Adventure XP earned in period
  score: number;           // Calculated: xpEarned + (adventureBonus * 2)
  rank: number;
}

export interface LeaderboardData {
  period: LeaderboardPeriod;
  entries: LeaderboardEntry[];
  currentUserRank?: number;
}
```

### User Type Extension

```typescript
// Update to contexts/UserContext.tsx User type

type User = {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  mode: "role" | "service" | null;
  selectedRole?: string;
  selectedService?: string;
  level: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;  // ISO 8601 format
  boosters: {
    doubleXp: number;
    streakProtectors: number;
  };
  badges: string[];
  adventuresCompleted: string[];  // NEW: Array of completed adventure IDs
  dailyGoal: number;
  notificationsEnabled: boolean;
};
```

### Utility Functions

#### Date Utilities

```typescript
// utils/dateUtils.ts

/**
 * Get UTC date string in YYYY-MM-DD format
 */
export function getUTCDateString(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate days between two UTC dates
 */
export function daysBetweenUTC(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const utc1 = Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
  const utc2 = Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

/**
 * Check if two dates are the same UTC day
 */
export function isSameUTCDay(date1: string, date2: string): boolean {
  return getUTCDateString(new Date(date1)) === getUTCDateString(new Date(date2));
}
```

#### Streak Utilities

```typescript
// utils/streakUtils.ts

export interface StreakUpdateResult {
  newStreakDays: number;
  streakProtectorUsed: boolean;
  streakBroken: boolean;
}

/**
 * Validate and update streak based on last active date
 */
export function validateAndUpdateStreak(
  lastActiveDate: string,
  currentStreakDays: number,
  streakProtectors: number
): StreakUpdateResult {
  const today = getUTCDateString(new Date());
  const daysSinceActive = daysBetweenUTC(lastActiveDate, today);
  
  // Same day - no change
  if (daysSinceActive === 0) {
    return {
      newStreakDays: currentStreakDays,
      streakProtectorUsed: false,
      streakBroken: false
    };
  }
  
  // Next day - increment streak
  if (daysSinceActive === 1) {
    return {
      newStreakDays: currentStreakDays + 1,
      streakProtectorUsed: false,
      streakBroken: false
    };
  }
  
  // Missed one day with protector available
  if (daysSinceActive === 2 && streakProtectors > 0) {
    return {
      newStreakDays: currentStreakDays,
      streakProtectorUsed: true,
      streakBroken: false
    };
  }
  
  // Streak broken
  return {
    newStreakDays: 1,
    streakProtectorUsed: false,
    streakBroken: true
  };
}
```

#### Leaderboard Utilities

```typescript
// utils/leaderboardUtils.ts

/**
 * Calculate leaderboard score
 * Formula: xpEarned + (adventureBonus * 2)
 */
export function calculateLeaderboardScore(
  xpEarned: number,
  adventureBonus: number
): number {
  return xpEarned + (adventureBonus * 2);
}

/**
 * Sort leaderboard entries by score (descending)
 */
export function sortLeaderboardEntries(
  entries: LeaderboardEntry[]
): LeaderboardEntry[] {
  return [...entries].sort((a, b) => b.score - a.score);
}

/**
 * Assign ranks to sorted entries
 */
export function assignRanks(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return entries.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}
```

### Context Implementations

#### AdventureContext

```typescript
// contexts/AdventureContext.tsx

type AdventureContextType = {
  adventures: Adventure[];
  progress: Map<string, AdventureProgress>;
  loading: boolean;
  getAdventureById: (id: string) => Adventure | undefined;
  getAdventureProgress: (id: string) => AdventureProgress | undefined;
  markStepComplete: (adventureId: string, stepId: string) => Promise<void>;
  checkAndCompleteAdventure: (adventureId: string) => Promise<boolean>;
};

// Key methods:
// - markStepComplete: Updates step status and persists to AsyncStorage
// - checkAndCompleteAdventure: Checks if all steps complete, awards XP/badge
```

#### LeaderboardContext

```typescript
// contexts/LeaderboardContext.tsx

type LeaderboardContextType = {
  leaderboardData: LeaderboardData | null;
  currentPeriod: LeaderboardPeriod;
  loading: boolean;
  setPeriod: (period: LeaderboardPeriod) => void;
  refreshLeaderboard: () => Promise<void>;
};

// For MVP: Uses mock data from leaderboardMock.ts
// Future: Replace with API calls to backend
```

## Data Models

### Adventure Data Structure

Adventures follow a similar pattern to lessons but include a steps array for tracking progress:

```typescript
// data/adventures.ts

export const adventures: Adventure[] = [
  {
    adventureId: "s3_adventure_1",
    title: "Build Your First S3 Static Website",
    description: "Learn to host a static website using S3 by completing hands-on steps",
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
        description: "Upload an index.html file",
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
  // Additional adventures...
];
```

### Mock Leaderboard Data

```typescript
// data/leaderboardMock.ts

export const mockLeaderboardData = {
  weekly: [
    {
      userId: "user_1",
      name: "Alex Chen",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      xpEarned: 850,
      adventureBonus: 400,
      score: 1650,  // 850 + (400 * 2)
      rank: 1
    },
    // ... 19 more entries
  ],
  monthly: [
    // Different data for monthly period
  ],
  friends: [
    // Subset of users marked as friends
  ]
};
```

### AsyncStorage Keys

```typescript
const STORAGE_KEYS = {
  USER: "@nimbus_user",
  ADVENTURE_PROGRESS: "@nimbus_adventure_progress",
  STREAK_PROTECTOR_USAGE: "@nimbus_streak_protector_usage"
};
```

## Correctness Properties


A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Leaderboard Score Calculation

*For any* XP earned value and adventure bonus value, the calculated leaderboard score should equal xpEarned + (adventureBonus * 2)

**Validates: Requirements 2.1**

### Property 2: Leaderboard Sorting Order

*For any* list of leaderboard entries, after sorting by score, each entry at index i should have a score greater than or equal to the entry at index i+1

**Validates: Requirements 2.3**

### Property 3: Stable Sort Preservation

*For any* list of leaderboard entries with duplicate scores, sorting should preserve the relative order of entries with equal scores

**Validates: Requirements 2.4**

### Property 4: Streak Update Logic

*For any* valid lastActiveDate, current streak count, and lesson completion date:
- If completion is same UTC day as lastActiveDate (0 days): streak remains unchanged
- If completion is next UTC day (1 day difference): streak increments by 1
- If completion is 2+ days later without protectors: streak resets to 1
- lastActiveDate should always update to the completion date

**Validates: Requirements 3.2, 3.3, 3.4, 3.5**

### Property 5: Streak Protector Logic

*For any* streak state with a given number of protectors:
- If 2 days elapsed (1 missed day) and protectors > 0: streak maintained, protectors decremented by 1
- If 2 days elapsed and protectors = 0: streak resets to 1
- If 3+ days elapsed: streak resets to 1 regardless of protectors

**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 6: Adventure Structure Validation

*For any* adventure object, it should contain all required properties: adventureId (string), title (string), description (string), service (string), roles (array), steps (array), xpReward (number), badge (string), and difficulty (enum)

*For any* adventure step, it should contain: stepId (string), description (string), and completed (boolean)

**Validates: Requirements 5.1, 5.2**

### Property 7: Step Completion Persistence

*For any* adventure step, marking it as complete should:
- Set the step's completed property to true
- Persist the change to AsyncStorage such that reloading returns the updated state

**Validates: Requirements 6.2, 6.3**

### Property 8: Step Completion Order Independence

*For any* adventure with N steps, completing all steps in any order (any permutation) should result in the same final state where all steps are marked complete

**Validates: Requirements 6.4**

### Property 9: Adventure Completion Rewards

*For any* adventure where all steps are marked complete:
- The adventure's XP reward should be added to the user's total XP
- The adventure's badge should be added to the user's badges array
- The adventure's ID should be added to the user's adventuresCompleted array

**Validates: Requirements 7.1, 7.2, 7.3**

### Property 10: Adventure XP Calculation

*For any* adventure completion with a given difficulty level and active boosters, the XP calculation should apply the same difficulty multiplier and booster multiplier as used for lesson XP calculations

**Validates: Requirements 7.4**

### Property 11: Duplicate Completion Prevention

*For any* adventure that exists in the user's adventuresCompleted array, attempting to complete it again should not award additional XP, badges, or add duplicate entries to adventuresCompleted

**Validates: Requirements 7.5**

### Property 12: User Data Persistence Round-Trip

*For any* user object with an adventuresCompleted array, serializing to AsyncStorage and then deserializing should preserve the adventuresCompleted array with all its elements intact

**Validates: Requirements 8.3**

### Property 13: UTC Date Comparison

*For any* two dates on the same UTC calendar day but different times, they should be considered the same day for streak calculations

*For any* two UTC dates, the calculated day difference should accurately reflect the number of calendar days between them

*For any* valid ISO 8601 string or Date object, the date parsing function should correctly extract the UTC date

**Validates: Requirements 9.2, 9.3, 9.5**

### Property 14: Current User in Leaderboard

*For any* mock leaderboard data generation, the resulting leaderboard entries should include an entry matching the current user's ID

**Validates: Requirements 10.3**

### Property 15: Period-Specific Leaderboard Data

*For any* two different leaderboard periods (weekly vs monthly, weekly vs friends, monthly vs friends), the returned leaderboard entries should differ in at least one entry or score value

**Validates: Requirements 10.4**

### Property 16: Leaderboard Entry Display Information

*For any* leaderboard entry, the rendered output should contain the user's avatar, name, XP earned, and rank position

**Validates: Requirements 1.2**

## Error Handling

### Streak Calculation Errors

- **Invalid Date Format**: If lastActiveDate is not a valid ISO 8601 string or Date object, default to treating it as "today" and maintain current streak
- **Future Dates**: If lastActiveDate is in the future, reset to current date and maintain streak
- **Missing lastActiveDate**: If undefined or null, initialize to current date with streak of 1

### Adventure Completion Errors

- **Missing Steps**: If an adventure has no steps array or empty steps, treat as invalid and prevent completion
- **Invalid Step ID**: If marking a non-existent step complete, log error and ignore the operation
- **Storage Failure**: If AsyncStorage write fails, retry once; if still fails, keep in-memory state and show user notification

### Leaderboard Data Errors

- **Empty Leaderboard**: If no entries exist for a period, display empty state with message
- **Missing User Data**: If current user not found in leaderboard, add them at the bottom with their actual stats
- **Score Calculation Overflow**: Cap leaderboard scores at Number.MAX_SAFE_INTEGER

### AsyncStorage Errors

- **Read Failure**: If unable to read from AsyncStorage, use default/empty state and log error
- **Write Failure**: Retry once, then show user-friendly error message
- **Quota Exceeded**: Clear old adventure progress data (keep only last 10 adventures)

## Testing Strategy

### Dual Testing Approach

This feature will use both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Property-Based Testing Configuration

We will use **fast-check** (TypeScript property-based testing library) for implementing property tests.

**Configuration:**
- Each property test will run a minimum of 100 iterations
- Each test will be tagged with a comment referencing the design property
- Tag format: `// Feature: gamification-features, Property {number}: {property_text}`

**Example:**
```typescript
// Feature: gamification-features, Property 1: Leaderboard Score Calculation
it('should calculate leaderboard score correctly for all inputs', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 10000 }), // xpEarned
      fc.integer({ min: 0, max: 1000 }),  // adventureBonus
      (xpEarned, adventureBonus) => {
        const score = calculateLeaderboardScore(xpEarned, adventureBonus);
        expect(score).toBe(xpEarned + (adventureBonus * 2));
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Focus

Unit tests should focus on:
- Specific examples that demonstrate correct behavior (e.g., "streak increments from 5 to 6 when lesson completed next day")
- Edge cases (e.g., "streak resets when 10 days have passed")
- Error conditions (e.g., "invalid date format defaults to current date")
- Integration points (e.g., "lesson completion triggers streak update")

### Test Coverage Goals

- **Streak Logic**: 100% coverage of validateAndUpdateStreak function
- **Leaderboard Calculations**: 100% coverage of score calculation and sorting
- **Adventure Completion**: 100% coverage of step marking and completion detection
- **Date Utilities**: 100% coverage of UTC date handling functions
- **Context Methods**: Integration tests for all context methods

### Testing Tools

- **Jest**: Test runner and assertion library
- **fast-check**: Property-based testing library
- **React Native Testing Library**: Component testing
- **AsyncStorage Mock**: Mock AsyncStorage for testing persistence

### Test Organization

```
__tests__/
├── utils/
│   ├── streakUtils.test.ts
│   ├── dateUtils.test.ts
│   ├── leaderboardUtils.test.ts
│   └── streakUtils.property.test.ts
├── contexts/
│   ├── AdventureContext.test.tsx
│   └── LeaderboardContext.test.tsx
└── integration/
    ├── lessonCompletionFlow.test.ts
    └── adventureCompletionFlow.test.ts
```

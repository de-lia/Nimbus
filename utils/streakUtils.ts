import { getUTCDateString, daysBetweenUTC } from './dateUtils';

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
  try {
    const today = getUTCDateString(new Date());
    const lastActiveDateFormatted = getUTCDateString(new Date(lastActiveDate));
    const daysSinceActive = daysBetweenUTC(lastActiveDate, today);
    
    console.log('=== Streak Validation Debug ===');
    console.log('Last Active Date (raw):', lastActiveDate);
    console.log('Last Active Date (formatted):', lastActiveDateFormatted);
    console.log('Today (formatted):', today);
    console.log('Days Since Active:', daysSinceActive);
    console.log('Current Streak Days:', currentStreakDays);
    console.log('Streak Protectors:', streakProtectors);
    
    // Special case: First lesson ever (streak is 0)
    if (currentStreakDays === 0) {
      console.log('Result: First lesson, setting streak to 1');
      return {
        newStreakDays: 1,
        streakProtectorUsed: false,
        streakBroken: false
      };
    }
    
    // Same day - no change
    if (daysSinceActive === 0) {
      console.log('Result: Same day, no change');
      return {
        newStreakDays: currentStreakDays,
        streakProtectorUsed: false,
        streakBroken: false
      };
    }
    
    // Next day - increment streak
    if (daysSinceActive === 1) {
      console.log('Result: Next day, incrementing streak to', currentStreakDays + 1);
      return {
        newStreakDays: currentStreakDays + 1,
        streakProtectorUsed: false,
        streakBroken: false
      };
    }
    
    // Missed one day with protector available
    if (daysSinceActive === 2 && streakProtectors > 0) {
      console.log('Result: Missed one day, using protector');
      return {
        newStreakDays: currentStreakDays,
        streakProtectorUsed: true,
        streakBroken: false
      };
    }
    
    // Streak broken
    console.log('Result: Streak broken, resetting to 1');
    return {
      newStreakDays: 1,
      streakProtectorUsed: false,
      streakBroken: true
    };
  } catch (error) {
    console.error('Error validating streak:', error);
    // On error, maintain current streak
    return {
      newStreakDays: currentStreakDays,
      streakProtectorUsed: false,
      streakBroken: false
    };
  }
}

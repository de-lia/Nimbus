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

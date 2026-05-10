import { AppState, XPLevel } from '@/types';
import roadmapData from '@/data/roadmap.json';

const xpSystem = roadmapData.xp_system;

export function getLevelForXP(xp: number): XPLevel {
  const levels = xpSystem.levels as XPLevel[];
  let current = levels[0];
  for (const lvl of levels) {
    if (xp >= lvl.xp_required) current = lvl;
    else break;
  }
  return current;
}

export function getNextLevel(currentLevel: number): XPLevel | null {
  const levels = xpSystem.levels as XPLevel[];
  return levels.find(l => l.level === currentLevel + 1) || null;
}

export function getXPProgress(xp: number): { current: XPLevel; next: XPLevel | null; progress: number } {
  const current = getLevelForXP(xp);
  const next = getNextLevel(current.level);
  if (!next) return { current, next: null, progress: 100 };
  const range = next.xp_required - current.xp_required;
  const earned = xp - current.xp_required;
  return { current, next, progress: Math.min(100, (earned / range) * 100) };
}

export function calculateStreakBonus(streakCount: number): number {
  const bonuses = xpSystem.streak_bonus as Record<string, number>;
  let bonus = 0;
  const thresholds = Object.keys(bonuses).map(Number).sort((a, b) => a - b);
  for (const t of thresholds) {
    if (streakCount >= t) bonus = bonuses[String(t)];
  }
  return bonus;
}

export function awardXP(
  state: AppState,
  taskId: string,
  baseXP: number
): { newXP: number; newLevel: number; leveledUp: boolean; xpGained: number } {
  // Check if it's a multiplier or flat bonus (based on roadmap data)
  const bonusValue = calculateStreakBonus(state.streak_count);
  let xpGained = baseXP;
  
  if (bonusValue > 0 && bonusValue < 5) {
    // It's a multiplier (e.g., 1.2)
    xpGained = Math.round(baseXP * bonusValue);
  } else {
    // It's a flat bonus (e.g., 50)
    xpGained = baseXP + bonusValue;
  }

  const newXP = state.xp + xpGained;
  const oldLevel = getLevelForXP(state.xp);
  const newLevelObj = getLevelForXP(newXP);
  return {
    newXP,
    newLevel: newLevelObj.level,
    leveledUp: newLevelObj.level > oldLevel.level,
    xpGained,
  };
}

export function unawardXP(
  state: AppState,
  xpToDeduct: number
): { newXP: number; newLevel: number } {
  const newXP = Math.max(0, state.xp - xpToDeduct);
  const newLevelObj = getLevelForXP(newXP);
  return {
    newXP,
    newLevel: newLevelObj.level,
  };
}

export function getTotalTasksCompleted(state: AppState): number {
  return Object.values(state.task_progress).filter(p => p.status === 'completed').length;
}

export function getDayCompletionRate(state: AppState, weekId: number, dayId: number): number {
  const week = roadmapData.weeks.find((w: any) => w.week_id === weekId);
  if (!week) return 0;
  const day = week.days.find((d: any) => d.day_id === dayId);
  if (!day) return 0;
  let total = 0, completed = 0;
  for (const tasks of Object.values(day.tasks) as any[][]) {
    for (const t of tasks) {
      total++;
      if (state.task_progress[t.id]?.status === 'completed') completed++;
    }
  }
  return total === 0 ? 0 : (completed / total) * 100;
}

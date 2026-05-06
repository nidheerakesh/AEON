import { AppState, StreakDay } from '@/types';
import roadmapData from '@/data/roadmap.json';

const rules = roadmapData.streak_rules;

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function getTodayTasksCompleted(state: AppState): number {
  const today = getToday();
  return Object.values(state.task_progress).filter(
    p => p.status === 'completed' && p.completed_at?.startsWith(today)
  ).length;
}

export function checkStreakMaintained(state: AppState): boolean {
  return getTodayTasksCompleted(state) >= rules.min_tasks_per_day;
}

export function updateStreak(state: AppState): Partial<AppState> {
  const today = getToday();
  const todayEntry = state.streak_days.find(d => d.date === today);
  const tasksToday = getTodayTasksCompleted(state);
  const maintained = tasksToday >= rules.min_tasks_per_day;

  const updatedEntry: StreakDay = {
    date: today,
    tasks_completed: tasksToday,
    streak_maintained: maintained,
    freeze_used: false,
  };

  const newDays = todayEntry
    ? state.streak_days.map(d => d.date === today ? updatedEntry : d)
    : [...state.streak_days, updatedEntry];

  // Check if yesterday was maintained
  const yesterday = getYesterday();
  const yesterdayEntry = state.streak_days.find(d => d.date === yesterday);
  const yesterdayOk = yesterdayEntry?.streak_maintained || yesterdayEntry?.freeze_used;

  let newStreak = state.streak_count;
  if (maintained && (yesterdayOk || state.streak_count === 0 || newDays.length <= 1)) {
    newStreak = Math.max(state.streak_count, 1);
    if (yesterdayOk) newStreak = state.streak_count + (todayEntry ? 0 : 1);
  }

  return { streak_days: newDays, streak_count: newStreak };
}

export function useStreakFreeze(state: AppState): Partial<AppState> | null {
  if (state.streak_freeze_tokens <= 0) return null;
  const today = getToday();
  const entry: StreakDay = {
    date: today,
    tasks_completed: getTodayTasksCompleted(state),
    streak_maintained: false,
    freeze_used: true,
  };
  const existing = state.streak_days.find(d => d.date === today);
  const newDays = existing
    ? state.streak_days.map(d => d.date === today ? entry : d)
    : [...state.streak_days, entry];
  return {
    streak_days: newDays,
    streak_freeze_tokens: state.streak_freeze_tokens - 1,
  };
}

export function getCurrentWeekAndDay(startDate: string): { week: number; day: number } {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.min(12, Math.max(1, Math.floor(diffDays / 7) + 1));
  const dayInWeek = Math.min(6, Math.max(1, (diffDays % 7) + 1));
  return { week, day: dayInWeek };
}

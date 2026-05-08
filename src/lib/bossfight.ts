import { Task, TaskCategory } from '@/types';
import { BOSS_FIGHTS } from '@/data/boss-fights';

export interface BossGuideDay {
  day_id: number;
  label: string;
  title: string;
  tasks: string[];
}

export interface BossGuideWeek {
  week_id: number;
  name: string;
  phase: string;
  difficulty: string;
  skills: string[];
  description: string;
  winConditions: string[];
  days: BossGuideDay[];
  failConditions: string[];
  drop: string;
}

// Convert BOSS_FIGHTS data into the BossGuideWeek format used by the planner
export const bossGuideWeeks: BossGuideWeek[] = BOSS_FIGHTS.map(bf => ({
  week_id: bf.week,
  name: bf.name,
  phase: bf.phase,
  difficulty: bf.difficulty,
  skills: bf.skills,
  description: bf.lore,
  winConditions: bf.winConditions,
  days: bf.dailyTasks.map(dt => ({
    day_id: dt.day,
    label: dt.dayLabel,
    title: dt.title,
    tasks: dt.subtasks,
  })),
  failConditions: bf.failConditions,
  drop: bf.bossDrops.join(' · '),
}));

export function getBossGuideWeek(weekId: number): BossGuideWeek | undefined {
  return bossGuideWeeks.find(week => week.week_id === weekId);
}

export interface PlannedBossTask extends Task {
  category: TaskCategory;
  reason: string;
  priority: number;
  bossWeekId: number;
  scheduledDayId: number;
}

export function getBossFightTask(weekId: number, dayId: number): PlannedBossTask | null {
  const week = getBossGuideWeek(weekId);
  const day = week?.days.find(d => d.day_id === dayId);
  if (!week || !day) return null;

  return {
    id: `boss_w${weekId}_d${dayId}`,
    title: `${week.name}: ${day.title}`,
    description: week.description,
    xp: dayId === 6 ? 80 : 35,
    time_min: dayId === 6 ? 120 : 45,
    difficulty: dayId === 6 ? 'hard' : week.difficulty.includes('Normal') ? 'medium' : 'hard',
    category: weekId <= 4 ? 'ai_ml' : weekId <= 8 ? 'backend' : 'build',
    subtasks: day.tasks.map((title, index) => ({
      id: `boss_w${weekId}_d${dayId}_st${index}`,
      title,
      completed: false,
    })),
    resources: [],
    reason: dayId === 6 ? `⚔️ ${week.name} — Fight Day!` : `⚔️ ${week.name} — Boss Prep`,
    priority: dayId === 6 ? 10 : 8,
    bossWeekId: weekId,
    scheduledDayId: dayId,
  };
}

export function getBossFightTasksBefore(weekId: number, dayId: number): PlannedBossTask[] {
  const tasks: PlannedBossTask[] = [];
  for (let week = 1; week <= weekId; week++) {
    const maxDay = week === weekId ? dayId - 1 : 7;
    for (let day = 1; day <= maxDay; day++) {
      const task = getBossFightTask(week, day);
      if (task) tasks.push(task);
    }
  }
  return tasks;
}

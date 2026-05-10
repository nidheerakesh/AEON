import { AppState, Task, TaskCategory } from '@/types';
import roadmapData from '@/data/roadmap.json';
import { getBossFightTask, getBossFightTasksBefore, PlannedBossTask } from '@/lib/bossfight';

// Mock AI planner — generates smart daily plans
// Phase 2: Replace with Gemini API calls

interface PlannedTask extends Task {
  category: TaskCategory;
  reason: string;
  priority: number;
  carriedFrom?: string;
}

export function generateDailyPlan(
  state: AppState,
  weekId: number,
  dayId: number,
  energyLevel: 'low' | 'medium' | 'high' = 'medium'
): PlannedTask[] {
  const week = roadmapData.weeks.find((w: any) => w.week_id === weekId);
  if (!week) return [];
  const day = week.days.find((d: any) => d.day_id === dayId);
  if (!day) return [];

  const planned: PlannedTask[] = [];
  const categories: TaskCategory[] = ['ai_ml', 'backend', 'dsa', 'build', 'college'];

  for (const cat of categories) {
    const tasks = (day.tasks as any)[cat] as Task[] || [];
    for (const task of tasks) {
      planned.push({
        ...task,
        category: cat,
        reason: getTaskReason(cat),
        priority: getTaskPriority(cat, task, state, energyLevel),
      });
    }
  }

  const bossTask = getBossFightTask(weekId, dayId);
  if (bossTask) planned.push(bossTask);

  const customTasks = state.custom_tasks?.filter(t => t.week_id === weekId && t.day_id === dayId) || [];
  for (const task of customTasks) {
    planned.push({
      ...task,
      reason: task.source === 'ai' ? 'Scheduled by AI' : 'Added by you',
      priority: 7,
    });
  }

  // Pick up every unfinished task from previous roadmap days.
  const missedTasks = getMissedTasks(state, weekId, dayId);
  const plannedIds = new Set(planned.map(task => task.id));
  for (const mt of missedTasks) {
    if (plannedIds.has(mt.id)) continue;
    planned.push({
      ...mt,
      reason: mt.reason || 'High Priority: Catch-up required',
      priority: 10,
    });
    plannedIds.add(mt.id);
  }

  // Sort by priority (higher = first), then by time estimate
  planned.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.time_min - b.time_min;
  });

  // Sort by priority (higher = first), then by time estimate
  planned.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.time_min - b.time_min;
  });

  // Energy-based scaling (rolling budget)
  let maxTime = 180; // Default Medium: 3 hours
  if (energyLevel === 'low') maxTime = 90; // Low: 1.5 hours
  if (energyLevel === 'high') maxTime = 300; // High: 5 hours

  const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

  let incompleteTime = 0;
  return planned.filter(t => {
    const progress = state.task_progress[t.id];
    const isCompleted = progress?.status === 'completed';
    const isCompletedToday = isCompleted && progress.completed_at?.split('T')[0] === todayStr;

    // 1. If it's a task specifically for TODAY (roadmap or custom), always show it
    const isScheduledForToday = t.week_id === weekId && t.day_id === dayId;
    if (isScheduledForToday) return true;

    // 2. If it's a MISSED task completed today, keep showing it
    if (isCompletedToday) return true;
    
    // 3. If it's already completed on a previous day, hide it
    if (isCompleted) return false; 

    // 4. For other incomplete tasks (like missed ones), apply the energy budget
    if (incompleteTime + t.time_min <= maxTime) {
      incompleteTime += t.time_min;
      return true;
    }
    return false;
  });
}

function getTaskReason(cat: TaskCategory): string {
  const reasons: Record<TaskCategory, string[]> = {
    ai_ml: ['Build your ML foundation', 'Core AI skill', 'Essential for AI engineering'],
    backend: ['Backend fundamentals', 'Critical for full-stack', 'Industry-standard skill'],
    dsa: ['Sharpens problem-solving', 'Interview prep essential', 'Algorithmic thinking'],
    build: ['Hands-on practice', 'Apply what you learned', 'Portfolio project'],
    college: ['Keep up with coursework', 'Light review session', 'Stay on track'],
  };
  const catReasons = reasons[cat];
  return catReasons[Math.floor(Math.random() * catReasons.length)];
}

function getTaskPriority(
  cat: TaskCategory,
  task: Task,
  state: AppState,
  energy: string
): number {
  let priority = 5;

  // Category weights
  const weights: Record<TaskCategory, number> = {
    ai_ml: 9,
    backend: 8,
    dsa: 7,
    build: 6,
    college: 4,
  };
  priority = weights[cat];

  // Boost easy tasks on low energy days
  if (energy === 'low' && task.difficulty === 'easy') priority += 3;
  if (energy === 'high' && task.difficulty === 'hard') priority += 2;

  // Short tasks get slight boost (reduce decision paralysis)
  if (task.time_min <= 20) priority += 1;

  return priority;
}

function isIncomplete(state: AppState, taskId: string): boolean {
  const status = state.task_progress[taskId]?.status;
  return status !== 'completed' && status !== 'skipped';
}

function getMissedTasks(state: AppState, currentWeek: number, currentDay: number): PlannedTask[] {
  const missed: PlannedTask[] = [];
  const categories: TaskCategory[] = ['ai_ml', 'backend', 'dsa', 'build', 'college'];

  for (const week of roadmapData.weeks as any[]) {
    if (week.week_id > currentWeek) break;
    for (const day of week.days) {
      if (week.week_id === currentWeek && day.day_id >= currentDay) break;
      for (const cat of categories) {
        const tasks = (day.tasks as any)[cat] as Task[] || [];
        for (const task of tasks) {
          const progress = state.task_progress[task.id];
          const isCompletedToday = progress?.status === 'completed' && progress.completed_at?.split('T')[0] === new Date().toISOString().split('T')[0];
          
          if (isIncomplete(state, task.id) || isCompletedToday) {
            missed.push({
              ...task,
              category: cat,
              reason: `LATE: From Week ${week.week_id}, Day ${day.day_id}`,
              priority: 10,
              carriedFrom: `Week ${week.week_id}, Day ${day.day_id}`,
            });
          }
        }
      }
    }
  }

  const missedBossTasks: PlannedBossTask[] = getBossFightTasksBefore(currentWeek, currentDay)
    .filter(task => isIncomplete(state, task.id));

  for (const task of missedBossTasks) {
    missed.push({
      ...task,
      reason: `LATE BOSS PREP: Week ${task.bossWeekId}, Day ${task.scheduledDayId}`,
      priority: 11, // Even higher priority for boss tasks
      carriedFrom: `Week ${task.bossWeekId}, Day ${task.scheduledDayId}`,
    });
  }

  for (const task of state.custom_tasks || []) {
    const isBeforeToday = task.week_id < currentWeek || (task.week_id === currentWeek && task.day_id < currentDay);
    const progress = state.task_progress[task.id];
    const isCompletedToday = progress?.status === 'completed' && progress.completed_at?.split('T')[0] === new Date().toISOString().split('T')[0];
    
    if (isBeforeToday && (isIncomplete(state, task.id) || isCompletedToday)) {
      missed.push({
        ...task,
        reason: `Missed from Week ${task.week_id}, Day ${task.day_id}`,
        priority: 4,
        carriedFrom: `Week ${task.week_id}, Day ${task.day_id}`,
      });
    }
  }

  return missed;
}

export function getMotivationalMessage(state: AppState): string {
  const completed = Object.values(state.task_progress).filter(p => p.status === 'completed').length;
  const streak = state.streak_count;

  if (completed === 0) return "Your journey begins now. Every expert was once a beginner. ";
  if (streak >= 14) return `${streak}-day streak! You're on fire! Nothing can stop you. `;
  if (streak >= 7) return `Week-long streak! You're building real momentum. `;
  if (streak >= 3) return `${streak} days strong! Consistency beats intensity. `;
  if (completed > 50) return "Over 50 tasks crushed! You're transforming. ";
  if (completed > 20) return "Great progress! Keep the momentum going. ";
  return "One task at a time. You've got this. ";
}

export function suggestEasiestTask(
  state: AppState,
  weekId: number,
  dayId: number
): PlannedTask | null {
  const plan = generateDailyPlan(state, weekId, dayId, 'low');
  if (plan.length === 0) return null;
  // Find the easiest, shortest task
  return plan.reduce((easiest, t) =>
    t.time_min < easiest.time_min ? t : easiest
  , plan[0]);
}

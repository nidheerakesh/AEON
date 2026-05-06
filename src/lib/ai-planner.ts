import { AppState, Task, DayTasks, TaskCategory } from '@/types';
import roadmapData from '@/data/roadmap.json';

// Mock AI planner — generates smart daily plans
// Phase 2: Replace with Gemini API calls

interface PlannedTask extends Task {
  category: TaskCategory;
  reason: string;
  priority: number;
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
      const progress = state.task_progress[task.id];


      planned.push({
        ...task,
        category: cat,
        reason: getTaskReason(cat, task, state),
        priority: getTaskPriority(cat, task, state, energyLevel),
      });
    }
  }

  // Also pick up missed tasks from previous days (max 2)
  const missedTasks = getMissedTasks(state, weekId, dayId);
  for (const mt of missedTasks.slice(0, 2)) {
    planned.push({
      ...mt,
      reason: '⚠️ Carried over from a previous day',
      priority: mt.priority - 1, // slightly lower priority
    });
  }

  // Sort by priority (higher = first), then by time estimate
  planned.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.time_min - b.time_min;
  });

  // If low energy, reduce load
  if (energyLevel === 'low') {
    const maxTime = 90;
    let total = 0;
    return planned.filter(t => {
      if (total + t.time_min <= maxTime) {
        total += t.time_min;
        return true;
      }
      return false;
    });
  }

  return planned;
}

function getTaskReason(cat: TaskCategory, task: Task, state: AppState): string {
  const reasons: Record<TaskCategory, string[]> = {
    ai_ml: ['🧠 Build your ML foundation', '🧠 Core AI skill', '🧠 Essential for AI engineering'],
    backend: ['⚙️ Backend fundamentals', '⚙️ Critical for full-stack', '⚙️ Industry-standard skill'],
    dsa: ['🧩 Sharpens problem-solving', '🧩 Interview prep essential', '🧩 Algorithmic thinking'],
    build: ['🔨 Hands-on practice', '🔨 Apply what you learned', '🔨 Portfolio project'],
    college: ['🎓 Keep up with coursework', '🎓 Light review session', '🎓 Stay on track'],
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

function getMissedTasks(state: AppState, currentWeek: number, currentDay: number): PlannedTask[] {
  const week = roadmapData.weeks.find((w: any) => w.week_id === currentWeek);
  if (!week) return [];

  const missed: PlannedTask[] = [];
  const categories: TaskCategory[] = ['ai_ml', 'backend', 'dsa', 'build', 'college'];

  for (const day of week.days) {
    if (day.day_id >= currentDay) break;
    for (const cat of categories) {
      const tasks = (day.tasks as any)[cat] as Task[] || [];
      for (const task of tasks) {
        const progress = state.task_progress[task.id];
        if (!progress || progress.status === 'pending') {
          missed.push({
            ...task,
            category: cat,
            reason: `Missed from Day ${day.day_id}`,
            priority: 3,
          });
        }
      }
    }
  }

  return missed;
}

export function getMotivationalMessage(state: AppState): string {
  const completed = Object.values(state.task_progress).filter(p => p.status === 'completed').length;
  const streak = state.streak_count;

  if (completed === 0) return "Your journey begins now. Every expert was once a beginner. 🌱";
  if (streak >= 14) return `${streak}-day streak! You're on fire! Nothing can stop you. 🔥`;
  if (streak >= 7) return `Week-long streak! You're building real momentum. ⚡`;
  if (streak >= 3) return `${streak} days strong! Consistency beats intensity. 💪`;
  if (completed > 50) return "Over 50 tasks crushed! You're transforming. 🚀";
  if (completed > 20) return "Great progress! Keep the momentum going. ✨";
  return "One task at a time. You've got this. 💫";
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

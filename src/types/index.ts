// ============================================================
// AEON — Type Definitions
// ============================================================

// --- Roadmap Data Types ---

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  xp: number;
  time_min: number;
  subtasks: SubTask[];
  topic_id?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  resources?: string[];
}

export interface DayTasks {
  ai_ml: Task[];
  backend: Task[];
  build: Task[];
  dsa: Task[];
  college: Task[];
}

export interface Day {
  day_id: number;
  day_label: string; // "Monday", "Tuesday", etc.
  tasks: DayTasks;
  estimated_time_min: number;
}

export interface BossFight {
  name: string;
  description: string;
  challenge: string;
  xp_reward: number;
  requirements: string[];
}

export interface Week {
  week_id: number;
  theme: string;
  goals: string[];
  days: Day[];
  boss_fight: BossFight;
}

export interface XPLevel {
  level: number;
  name: string;
  xp_required: number;
  badge_emoji: string;
}

export interface XPSystem {
  levels: XPLevel[];
  task_xp: { easy: number; medium: number; hard: number };
  streak_bonus: Record<string, number>;
  boss_fight_xp: number;
}

export interface StreakRules {
  min_tasks_per_day: number;
  grace_days: number;
  freeze_tokens_max: number;
}

export interface Roadmap {
  weeks: Week[];
  xp_system: XPSystem;
  streak_rules: StreakRules;
}

// --- Topic Tree Types ---

export type TopicStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface TopicNode {
  id: string;
  label: string;
  description?: string;
  status: TopicStatus;
  children?: TopicNode[];
  linked_tasks?: string[]; // task IDs
}

export interface TopicTrees {
  backend: TopicNode;
  ml: TopicNode;
  dsa: TopicNode;
}

// --- App State Types ---

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface TaskProgress {
  task_id: string;
  status: TaskStatus;
  completed_at?: string;
  xp_earned: number;
  subtasks_completed: string[];
  notes?: string;
}

export interface XPLog {
  id: string;
  xp_amount: number;
  source: 'task' | 'boss_fight' | 'streak_bonus' | 'achievement';
  source_id: string;
  multiplier: number;
  timestamp: string;
}

export interface StreakDay {
  date: string; // ISO date
  tasks_completed: number;
  streak_maintained: boolean;
  freeze_used: boolean;
}

export interface BossFightProgress {
  week_id: number;
  status: 'locked' | 'active' | 'completed' | 'failed';
  score: number;
  completed_at?: string;
}

export interface UserNote {
  id: string;
  topic_id?: string;
  task_id?: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface UserSettings {
  theme: 'dark' | 'light';
  focus_mode_duration: number; // minutes
  daily_goal_tasks: number;
  notifications: boolean;
  sound_effects: boolean;
  start_date: string; // ISO date — when the 12-week journey started
}

// --- Custom Task (AI-scheduled or user-added) ---

export interface CustomTask {
  id: string;
  title: string;
  description: string;
  xp: number;
  time_min: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: TaskCategory;
  week_id: number;
  day_id: number;
  created_at: string;
  source: 'ai' | 'user';
  subtasks: SubTask[];
  resources: string[];
}

export interface AppState {
  // Progress
  task_progress: Record<string, TaskProgress>;
  xp: number;
  level: number;
  streak_count: number;
  streak_freeze_tokens: number;
  streak_days: StreakDay[];
  boss_fights: BossFightProgress[];
  xp_logs: XPLog[];

  // Content
  notes: UserNote[];
  completed_topics: string[];
  custom_tasks: CustomTask[];

  // Settings
  settings: UserSettings;

  // UI State
  current_week: number;
  current_day: number;
  focus_task_id: string | null;
  show_level_up: boolean;
  last_xp_gain: number;
}

// --- Category Metadata ---

export type TaskCategory = keyof DayTasks;

export interface CategoryMeta {
  key: TaskCategory;
  label: string;
  color: string;
  icon: string;
  bgColor: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: 'ai_ml', label: 'AI / ML', color: '#a29bfe', icon: '🧠', bgColor: 'rgba(162,155,254,0.15)' },
  { key: 'backend', label: 'Backend', color: '#55efc4', icon: '⚙️', bgColor: 'rgba(85,239,196,0.15)' },
  { key: 'build', label: 'Build', color: '#fd79a8', icon: '🔨', bgColor: 'rgba(253,121,168,0.15)' },
  { key: 'dsa', label: 'DSA', color: '#fab1a0', icon: '🧩', bgColor: 'rgba(250,177,160,0.15)' },
  { key: 'college', label: 'College', color: '#74b9ff', icon: '🎓', bgColor: 'rgba(116,185,255,0.15)' },
];

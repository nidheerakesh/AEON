'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { AppState, TaskProgress, UserNote, XPLog, BossFightProgress, CustomTask } from '@/types';
import { awardXP } from '@/lib/xp-engine';
import { updateStreak, getCurrentWeekAndDay } from '@/lib/streak-manager';

// --- Initial State ---
const getInitialState = (): AppState => {
  const startDate = '2026-05-06';
  return {
    task_progress: {},
    xp: 0,
    level: 1,
    streak_count: 0,
    streak_freeze_tokens: 3,
    streak_days: [],
    boss_fights: [],
    xp_logs: [],
    notes: [],
    completed_topics: [],
    custom_tasks: [],
    custom_schedule: {},
    settings: {
      theme: 'dark',
      focus_mode_duration: 25,
      daily_goal_tasks: 5,
      notifications: true,
      sound_effects: true,
      start_date: startDate,
      gemini_api_key: '',
    },
    current_week: 1,
    current_day: 1,
    focus_task_id: null,
    show_level_up: false,
    last_xp_gain: 0,
  };
};

// --- Actions ---
type Action =
  | { type: 'COMPLETE_TASK'; taskId: string; baseXP: number }
  | { type: 'SKIP_TASK'; taskId: string }
  | { type: 'START_TASK'; taskId: string }
  | { type: 'SET_FOCUS_TASK'; taskId: string | null }
  | { type: 'ADD_NOTE'; note: UserNote }
  | { type: 'UPDATE_NOTE'; noteId: string; content: string }
  | { type: 'DELETE_NOTE'; noteId: string }
  | { type: 'COMPLETE_BOSS_FIGHT'; weekId: number; score: number; xpReward: number }
  | { type: 'USE_STREAK_FREEZE' }
  | { type: 'DISMISS_LEVEL_UP' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<AppState['settings']> }
  | { type: 'SET_WEEK_DAY'; week: number; day: number }
  | { type: 'COMPLETE_TOPIC'; topicId: string }
  | { type: 'ADD_CUSTOM_TASK'; task: CustomTask }
  | { type: 'DELETE_CUSTOM_TASK'; taskId: string }
  | { type: 'TOGGLE_SUBTASK'; taskId: string; subtaskId: string }
  | { type: 'RESCHEDULE_TASK'; taskId: string; newDate: string }
  | { type: 'ROLLOVER_INCOMPLETE_TASKS'; taskIds: string[] }
  | { type: 'HYDRATE'; state: AppState };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'COMPLETE_TASK': {
      const { newXP, newLevel, leveledUp, xpGained } = awardXP(state, action.taskId, action.baseXP);
      const progress: TaskProgress = {
        task_id: action.taskId,
        status: 'completed',
        completed_at: new Date().toISOString(),
        xp_earned: xpGained,
        subtasks_completed: [],
      };
      const log: XPLog = {
        id: `xp_${Date.now()}`,
        xp_amount: xpGained,
        source: 'task',
        source_id: action.taskId,
        multiplier: xpGained / action.baseXP,
        timestamp: new Date().toISOString(),
      };
      const newState = {
        ...state,
        task_progress: { ...state.task_progress, [action.taskId]: progress },
        xp: newXP,
        level: newLevel,
        show_level_up: leveledUp,
        last_xp_gain: xpGained,
        xp_logs: [...state.xp_logs, log],
      };
      const streakUpdate = updateStreak(newState);
      return { ...newState, ...streakUpdate };
    }

    case 'SKIP_TASK': {
      const progress: TaskProgress = {
        task_id: action.taskId,
        status: 'skipped',
        xp_earned: 0,
        subtasks_completed: [],
      };
      return { ...state, task_progress: { ...state.task_progress, [action.taskId]: progress } };
    }

    case 'START_TASK': {
      const progress: TaskProgress = {
        task_id: action.taskId,
        status: 'in_progress',
        xp_earned: 0,
        subtasks_completed: [],
      };
      return { ...state, task_progress: { ...state.task_progress, [action.taskId]: progress } };
    }

    case 'SET_FOCUS_TASK':
      return { ...state, focus_task_id: action.taskId };

    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.note] };

    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === action.noteId ? { ...n, content: action.content, updated_at: new Date().toISOString() } : n
        ),
      };

    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(n => n.id !== action.noteId) };

    case 'COMPLETE_BOSS_FIGHT': {
      const bf: BossFightProgress = {
        week_id: action.weekId,
        status: 'completed',
        score: action.score,
        completed_at: new Date().toISOString(),
      };
      const { newXP, newLevel, leveledUp, xpGained } = awardXP(state, `boss_w${action.weekId}`, action.xpReward);
      const log: XPLog = {
        id: `xp_boss_${Date.now()}`,
        xp_amount: xpGained,
        source: 'boss_fight',
        source_id: `boss_w${action.weekId}`,
        multiplier: 1,
        timestamp: new Date().toISOString(),
      };
      return {
        ...state,
        boss_fights: [...state.boss_fights.filter(b => b.week_id !== action.weekId), bf],
        xp: newXP,
        level: newLevel,
        show_level_up: leveledUp,
        last_xp_gain: xpGained,
        xp_logs: [...state.xp_logs, log],
      };
    }

    case 'USE_STREAK_FREEZE':
      if (state.streak_freeze_tokens <= 0) return state;
      return { ...state, streak_freeze_tokens: state.streak_freeze_tokens - 1 };

    case 'DISMISS_LEVEL_UP':
      return { ...state, show_level_up: false, last_xp_gain: 0 };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };

    case 'SET_WEEK_DAY':
      return { ...state, current_week: action.week, current_day: action.day };

    case 'COMPLETE_TOPIC':
      if (state.completed_topics.includes(action.topicId)) return state;
      return { ...state, completed_topics: [...state.completed_topics, action.topicId] };

    case 'ADD_CUSTOM_TASK':
      return { ...state, custom_tasks: [...state.custom_tasks, action.task] };

    case 'DELETE_CUSTOM_TASK':
      return { ...state, custom_tasks: state.custom_tasks.filter(t => t.id !== action.taskId) };

    case 'TOGGLE_SUBTASK': {
      const progress = state.task_progress[action.taskId] || {
        task_id: action.taskId,
        status: 'in_progress',
        xp_earned: 0,
        subtasks_completed: [],
      };
      
      const isCompleted = progress.subtasks_completed.includes(action.subtaskId);
      const newSubtasks = isCompleted
        ? progress.subtasks_completed.filter((id: string) => id !== action.subtaskId)
        : [...progress.subtasks_completed, action.subtaskId];
        
      return {
        ...state,
        task_progress: {
          ...state.task_progress,
          [action.taskId]: { ...progress, subtasks_completed: newSubtasks, status: progress.status === 'pending' ? 'in_progress' : progress.status }
        }
      };
    }

    case 'RESCHEDULE_TASK':
      return {
        ...state,
        custom_schedule: {
          ...state.custom_schedule,
          [action.taskId]: action.newDate
        }
      };

    case 'ROLLOVER_INCOMPLETE_TASKS': {
      const today = new Date().toISOString().split('T')[0];
      const newSchedule = { ...state.custom_schedule };
      action.taskIds.forEach(id => {
        newSchedule[id] = today;
      });
      return {
        ...state,
        custom_schedule: newSchedule
      };
    }

    case 'HYDRATE':
      return action.state;

    default:
      return state;
  }
}

// --- Context ---
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  completeTask: (taskId: string, baseXP: number) => void;
  skipTask: (taskId: string) => void;
  startTask: (taskId: string) => void;
  setFocusTask: (taskId: string | null) => void;
  addNote: (note: Omit<UserNote, 'id' | 'created_at' | 'updated_at'>) => void;
  completeBossFight: (weekId: number, score: number, xpReward: number) => void;
  dismissLevelUp: () => void;
  addCustomTask: (task: CustomTask) => void;
  deleteCustomTask: (taskId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  rescheduleTask: (taskId: string, newDate: string) => void;
  rolloverTasks: (taskIds: string[]) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'aeon_app_state';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    if (typeof window === 'undefined') return getInitialState();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...getInitialState(), ...parsed };
      }
    } catch {}
    return getInitialState();
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  // Auto-detect current week/day
  useEffect(() => {
    const { week, day } = getCurrentWeekAndDay(state.settings.start_date);
    if (week !== state.current_week || day !== state.current_day) {
      dispatch({ type: 'SET_WEEK_DAY', week, day });
    }
  }, [state.current_day, state.current_week, state.settings.start_date]);

  const completeTask = useCallback((taskId: string, baseXP: number) => {
    dispatch({ type: 'COMPLETE_TASK', taskId, baseXP });
  }, []);

  const skipTask = useCallback((taskId: string) => {
    dispatch({ type: 'SKIP_TASK', taskId });
  }, []);

  const startTask = useCallback((taskId: string) => {
    dispatch({ type: 'START_TASK', taskId });
  }, []);

  const setFocusTask = useCallback((taskId: string | null) => {
    dispatch({ type: 'SET_FOCUS_TASK', taskId });
  }, []);

  const addNote = useCallback((note: Omit<UserNote, 'id' | 'created_at' | 'updated_at'>) => {
    const fullNote: UserNote = {
      ...note,
      id: `note_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_NOTE', note: fullNote });
  }, []);

  const completeBossFight = useCallback((weekId: number, score: number, xpReward: number) => {
    dispatch({ type: 'COMPLETE_BOSS_FIGHT', weekId, score, xpReward });
  }, []);

  const dismissLevelUp = useCallback(() => {
    dispatch({ type: 'DISMISS_LEVEL_UP' });
  }, []);

  const addCustomTask = useCallback((task: CustomTask) => {
    dispatch({ type: 'ADD_CUSTOM_TASK', task });
  }, []);

  const deleteCustomTask = useCallback((taskId: string) => {
    dispatch({ type: 'DELETE_CUSTOM_TASK', taskId });
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    dispatch({ type: 'TOGGLE_SUBTASK', taskId, subtaskId });
  }, []);

  const rescheduleTask = useCallback((taskId: string, newDate: string) => {
    dispatch({ type: 'RESCHEDULE_TASK', taskId, newDate });
  }, []);

  const rolloverTasks = useCallback((taskIds: string[]) => {
    dispatch({ type: 'ROLLOVER_INCOMPLETE_TASKS', taskIds });
  }, []);

  return (
    <AppContext.Provider value={{
      state, dispatch, completeTask, skipTask, startTask,
      setFocusTask, addNote, completeBossFight, dismissLevelUp,
      addCustomTask, deleteCustomTask, toggleSubtask, rescheduleTask, rolloverTasks
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ============================================================
// AEON  Achievements System
// ============================================================

import { AppState } from '@/types';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'boss' | 'special';
  xp_reward: number;
  condition: (state: AppState) => boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export const ACHIEVEMENTS: Achievement[] = [
  // --- Progress Achievements ---
  {
    id: 'first_task', title: 'First Step', description: 'Complete your very first task',
    icon: '', category: 'progress', xp_reward: 10, tier: 'bronze',
    condition: (s) => Object.values(s.task_progress).filter(p => p.status === 'completed').length >= 1,
  },
  {
    id: 'ten_tasks', title: 'Getting Started', description: 'Complete 10 tasks',
    icon: '', category: 'progress', xp_reward: 25, tier: 'bronze',
    condition: (s) => Object.values(s.task_progress).filter(p => p.status === 'completed').length >= 10,
  },
  {
    id: 'fifty_tasks', title: 'Dedicated Learner', description: 'Complete 50 tasks',
    icon: '', category: 'progress', xp_reward: 75, tier: 'silver',
    condition: (s) => Object.values(s.task_progress).filter(p => p.status === 'completed').length >= 50,
  },
  {
    id: 'hundred_tasks', title: 'Centurion', description: 'Complete 100 tasks',
    icon: '', category: 'progress', xp_reward: 150, tier: 'gold',
    condition: (s) => Object.values(s.task_progress).filter(p => p.status === 'completed').length >= 100,
  },
  {
    id: 'two_hundred_tasks', title: 'Unstoppable', description: 'Complete 200 tasks',
    icon: '', category: 'progress', xp_reward: 300, tier: 'diamond',
    condition: (s) => Object.values(s.task_progress).filter(p => p.status === 'completed').length >= 200,
  },

  // --- XP Achievements ---
  {
    id: 'xp_500', title: 'XP Collector', description: 'Earn 500 XP total',
    icon: '', category: 'progress', xp_reward: 20, tier: 'bronze',
    condition: (s) => s.xp >= 500,
  },
  {
    id: 'xp_2000', title: 'XP Hoarder', description: 'Earn 2000 XP total',
    icon: '', category: 'progress', xp_reward: 50, tier: 'silver',
    condition: (s) => s.xp >= 2000,
  },
  {
    id: 'xp_5000', title: 'XP Legend', description: 'Earn 5000 XP total',
    icon: '', category: 'progress', xp_reward: 100, tier: 'gold',
    condition: (s) => s.xp >= 5000,
  },

  // --- Streak Achievements ---
  {
    id: 'streak_3', title: 'Warming Up', description: 'Maintain a 3-day streak',
    icon: '', category: 'streak', xp_reward: 15, tier: 'bronze',
    condition: (s) => s.streak_count >= 3,
  },
  {
    id: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day streak',
    icon: '', category: 'streak', xp_reward: 40, tier: 'silver',
    condition: (s) => s.streak_count >= 7,
  },
  {
    id: 'streak_14', title: 'Fortnight Force', description: 'Maintain a 14-day streak',
    icon: '', category: 'streak', xp_reward: 80, tier: 'gold',
    condition: (s) => s.streak_count >= 14,
  },
  {
    id: 'streak_30', title: 'Monthly Master', description: 'Maintain a 30-day streak',
    icon: '', category: 'streak', xp_reward: 200, tier: 'diamond',
    condition: (s) => s.streak_count >= 30,
  },

  // --- Boss Fight Achievements ---
  {
    id: 'first_boss', title: 'Boss Slayer', description: 'Defeat your first boss',
    icon: '', category: 'boss', xp_reward: 30, tier: 'bronze',
    condition: (s) => s.boss_fights.filter(b => b.status === 'completed').length >= 1,
  },
  {
    id: 'five_bosses', title: 'Champion', description: 'Defeat 5 bosses',
    icon: '', category: 'boss', xp_reward: 75, tier: 'silver',
    condition: (s) => s.boss_fights.filter(b => b.status === 'completed').length >= 5,
  },
  {
    id: 'all_bosses', title: 'Legendary', description: 'Defeat all 12 bosses',
    icon: '', category: 'boss', xp_reward: 500, tier: 'diamond',
    condition: (s) => s.boss_fights.filter(b => b.status === 'completed').length >= 12,
  },

  // --- Special Achievements ---
  {
    id: 'level_5', title: 'Rising Star', description: 'Reach Level 5',
    icon: '', category: 'special', xp_reward: 50, tier: 'silver',
    condition: (s) => s.level >= 5,
  },
  {
    id: 'level_10', title: 'Superstar', description: 'Reach Level 10',
    icon: '', category: 'special', xp_reward: 150, tier: 'gold',
    condition: (s) => s.level >= 10,
  },
  {
    id: 'notes_10', title: 'Scholar', description: 'Write 10 learning notes',
    icon: '', category: 'special', xp_reward: 25, tier: 'bronze',
    condition: (s) => s.notes.length >= 10,
  },
  {
    id: 'week_6', title: 'Halfway There', description: 'Reach Week 6 of your journey',
    icon: '', category: 'special', xp_reward: 100, tier: 'gold',
    condition: (s) => s.current_week >= 6,
  },
  {
    id: 'week_12', title: 'Journey Complete', description: 'Reach Week 12  you did it!',
    icon: '', category: 'special', xp_reward: 500, tier: 'diamond',
    condition: (s) => s.current_week >= 12,
  },
];

const tierColors: Record<Achievement['tier'], string> = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
  diamond: '#b9f2ff',
};

const tierBgColors: Record<Achievement['tier'], string> = {
  bronze: 'rgba(205,127,50,0.1)',
  silver: 'rgba(192,192,192,0.1)',
  gold: 'rgba(255,215,0,0.1)',
  diamond: 'rgba(185,242,255,0.15)',
};

export function getTierColor(tier: Achievement['tier']): string {
  return tierColors[tier];
}

export function getTierBgColor(tier: Achievement['tier']): string {
  return tierBgColors[tier];
}

export function getUnlockedAchievements(state: AppState): string[] {
  return ACHIEVEMENTS
    .filter(a => a.condition(state))
    .map(a => a.id);
}

export function getNewlyUnlocked(state: AppState, previousUnlocked: string[]): Achievement[] {
  return ACHIEVEMENTS.filter(a =>
    a.condition(state) && !previousUnlocked.includes(a.id)
  );
}

'use client';

import { useApp } from '@/context/AppContext';
import { getXPProgress, getTotalTasksCompleted, getDayCompletionRate } from '@/lib/xp-engine';
import { generateDailyPlan, getMotivationalMessage } from '@/lib/ai-planner';
import { CATEGORIES } from '@/types';
import { getUnlockedAchievements, ACHIEVEMENTS, getTierColor } from '@/lib/achievements';
import roadmapData from '@/data/roadmap.json';
import { getBossGuideWeek } from '@/lib/bossfight';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const catBadgeClass: Record<string, string> = {
  ai_ml: 'badge-ml', backend: 'badge-backend', build: 'badge-build',
  dsa: 'badge-dsa', college: 'badge-college',
};

export default function Dashboard() {
  const { state, completeTask, uncompleteTask, setFocusTask } = useApp();
  const [mounted, setMounted] = useState(false);
  const [xpPopups, setXpPopups] = useState<{ id: number; xp: number; x: number; y: number }[]>([]);
  const [toasts, setToasts] = useState<{ id: string; title: string; icon: string; tier: string }[]>([]);
  const prevUnlockedRef = useRef<string[] | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for new achievements
  useEffect(() => {
    if (!mounted) return;
    const currentUnlocked = getUnlockedAchievements(state);
    if (prevUnlockedRef.current === null) {
      prevUnlockedRef.current = currentUnlocked;
      return;
    }
    const previousUnlocked = prevUnlockedRef.current;
    const newlyUnlocked = ACHIEVEMENTS.filter(
      a => currentUnlocked.includes(a.id) && !previousUnlocked.includes(a.id)
    );
    
    if (newlyUnlocked.length > 0) {
      for (const achievement of newlyUnlocked) {
        const toast = {
          id: achievement.id,
          title: achievement.title,
          icon: achievement.icon,
          tier: achievement.tier,
        };
        setToasts(prev => [...prev, toast]);
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== toast.id));
        }, 4000);
      }
    }
    prevUnlockedRef.current = currentUnlocked;
  }, [state, mounted]);

  if (!mounted) return <DashboardSkeleton />;

  const xpInfo = getXPProgress(state.xp);
  const totalCompleted = getTotalTasksCompleted(state);
  const dayCompletion = getDayCompletionRate(state, state.current_week, state.current_day);
  const plan = generateDailyPlan(state, state.current_week, state.current_day);
  const motivation = getMotivationalMessage(state);

  const week = roadmapData.weeks.find((w: any) => w.week_id === state.current_week);
  const guideWeek = getBossGuideWeek(state.current_week);

  // Total tasks in roadmap
  let totalTasks = 0;
  for (const w of roadmapData.weeks) {
    for (const d of w.days) {
      for (const tasks of Object.values(d.tasks) as any[][]) {
        totalTasks += tasks.length;
      }
    }
  }
  const overallPct = totalTasks ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const handleToggleTask = (taskId: string, xp: number, isCompleted: boolean, e: React.MouseEvent) => {
    if (isCompleted) {
      uncompleteTask(taskId);
    } else {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      completeTask(taskId, xp);
      const popup = { id: Date.now(), xp, x: rect.left, y: rect.top };
      setXpPopups(prev => [...prev, popup]);
      setTimeout(() => setXpPopups(prev => prev.filter(p => p.id !== popup.id)), 1500);
    }
  };

  return (
    <div>
      {/* Achievement Toasts */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 200, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(toast => (
          <div key={toast.id} className="toast-enter" style={{
            padding: '14px 20px', borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)', border: `1px solid ${getTierColor(toast.tier as any)}40`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 20px ${getTierColor(toast.tier as any)}20`,
            display: 'flex', alignItems: 'center', gap: 12, minWidth: 280,
          }}>
            <span style={{ fontSize: 28 }} className="achievement-unlock">{toast.icon}</span>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-warning)' }}>
                Achievement Unlocked!
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: getTierColor(toast.tier as any), marginTop: 2 }}>
                {toast.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* XP Popups */}
      {xpPopups.map(p => (
        <div key={p.id} className="xp-popup" style={{ left: p.x, top: p.y }}>
          +{p.xp} XP
        </div>
      ))}

      {/* Level Up Modal */}
      {state.show_level_up && <LevelUpModal />}

      {/* Header */}
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>
          Good {getTimeOfDay()}, <span className="glow-text">Nidhi</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 15, maxWidth: 500 }}>
          {motivation}
        </p>
      </div>

      {/* Stats Row */}
      <div className="fade-in fade-in-delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
        <StatCard icon="" label="Level" value={`${xpInfo.current.level}  ${xpInfo.current.name}`} accent="var(--accent-primary)" />
        <StatCard icon="" label="Total XP" value={state.xp.toLocaleString()} accent="var(--text-primary)" />
        <StatCard icon="" label="Tasks Done" value={`${totalCompleted}`} accent="var(--accent-secondary)" />
        <StatCard icon="" label="Streak" value={`${state.streak_count} days`} accent="var(--accent-primary)" />
      </div>

      {/* Overall Progress */}
      <div className="card-flat fade-in fade-in-delay-2" style={{ marginBottom: 32, padding: '24px 32px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-hard)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase' }}>Overall Roadmap Progress</span>
          <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-primary)' }}>
            {totalCompleted}/{totalTasks}  {overallPct}%
          </span>
        </div>
        <div style={{ width: '100%', height: 12, background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{
            width: `${overallPct}%`, height: '100%',
            background: 'var(--accent-primary)',
            borderRadius: 0, transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* Weekly Theme */}
      {week && (
        <div className="card fade-in fade-in-delay-2" style={{ marginBottom: 24, background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
                Week {state.current_week} of 12
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{week.theme}</h2>
            </div>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `conic-gradient(var(--accent-primary) ${dayCompletion * 3.6}deg, var(--bg-hover) 0)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)',
              }}>
                {Math.round(dayCompletion)}%
              </div>
            </div>
          </div>
          {/* Week goals */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {(week.goals as string[]).map((g: string, i: number) => (
              <span key={i} style={{
                fontSize: 11, padding: '4px 10px',
                background: 'var(--bg-hover)', borderRadius: 20,
                color: 'var(--text-secondary)', border: '1px solid var(--border)',
              }}>
                {g}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Two-column layout: Tasks + Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Today's Tasks */}
        <div className="fade-in fade-in-delay-3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Today&apos;s Tasks</h2>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {plan.filter(t => state.task_progress[t.id]?.status === 'completed').length}/{plan.length} done
            </span>
          </div>

          {plan.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>All done for today!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                You&apos;ve completed all tasks. Time to relax or push ahead!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {plan.map((task, idx) => {
                const progress = state.task_progress[task.id];
                const isCompleted = progress?.status === 'completed';
                const cat = CATEGORIES.find(c => c.key === task.category);

                return (
                  <div
                    key={task.id}
                    className="card-flat fade-in"
                    style={{
                      animationDelay: `${idx * 0.04}s`,
                      opacity: isCompleted ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={(e) => handleToggleTask(task.id, task.xp, isCompleted, e)}
                      style={{
                        width: 28, height: 28, borderRadius: 8,
                        border: isCompleted
                          ? 'none'
                          : `2px solid ${cat?.color || 'var(--text-muted)'}`,
                        background: isCompleted
                          ? cat?.color || 'var(--accent-success)'
                          : 'transparent',
                        cursor: isCompleted ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                        fontSize: 14,
                        color: 'white',
                      }}
                    >
                      {isCompleted && ''}
                    </button>

                    {/* Task info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        textDecoration: isCompleted ? 'line-through' : 'none',
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>
                          {task.title}
                        </span>
                        <span className={`badge ${catBadgeClass[task.category] || ''}`}>
                          {cat?.icon} {cat?.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, textDecoration: isCompleted ? 'line-through' : 'none' }}>
                        {task.reason}  ~{task.time_min}min
                      </div>
                    </div>

                    {/* XP + Focus */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700,
                        color: isCompleted ? 'var(--text-muted)' : 'var(--accent-warning)',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                      }}>
                        {isCompleted ? `+${progress?.xp_earned || task.xp}` : task.xp} XP
                      </span>
                      {!isCompleted && (
                        <Link
                          href="/focus"
                          onClick={() => setFocusTask(task.id)}
                          className="btn-ghost"
                          style={{ padding: '4px 8px', fontSize: 11, textDecoration: 'none' }}
                        >
                          Focus
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column: Quick links */}
        <div className="fade-in fade-in-delay-3">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="/focus" style={{ textDecoration: 'none' }}>
              <div className="card-flat" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Enter Focus Mode</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Deep work with Pomodoro timer</div>
                </div>
              </div>
            </Link>
            <Link href="/analytics" style={{ textDecoration: 'none' }}>
              <div className="card-flat" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>View Analytics</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Track your progress over time</div>
                </div>
              </div>
            </Link>
            <Link href="/achievements" style={{ textDecoration: 'none' }}>
              <div className="card-flat" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Achievements</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {getUnlockedAchievements(state).length}/{ACHIEVEMENTS.length} unlocked
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/boss-fight" style={{ textDecoration: 'none' }}>
              <div className="card-flat" style={{
                display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                border: '1px solid rgba(255,107,107,0.2)',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-danger)' }}>Boss Fight</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Week {state.current_week} challenge</div>
                </div>
              </div>
            </Link>
          </div>

          {/* Boss Fight Teaser */}
          {week && guideWeek && (
            <div style={{ marginTop: 16 }}>
              <div className="card boss-arena" style={{
                background: 'linear-gradient(135deg, rgba(255,107,107,0.05), rgba(255,107,107,0.02))',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: 'var(--accent-danger)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                      Week {state.current_week} Boss
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>
                      {guideWeek.name}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)' }}>
                      {week.boss_fight.xp_reward}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>XP</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: accent, marginTop: 12 }}>{value}</div>
    </div>
  );
}

function LevelUpModal() {
  const { state, dismissLevelUp } = useApp();
  const xpInfo = getXPProgress(state.xp);

  return (
    <div className="focus-overlay" onClick={dismissLevelUp}>
      <div className="level-up-modal card" style={{
        textAlign: 'center', maxWidth: 400, padding: 48,
        background: 'var(--bg-secondary)',
        border: '3px solid var(--accent-primary)',
        boxShadow: 'var(--shadow-md)',
      }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: 28, fontWeight: 900 }}>
          <span className="glow-text">LEVEL UP!</span>
        </h2>
        <p style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>
          Level {xpInfo.current.level}  {xpInfo.current.name}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>
          You&apos;re evolving. Keep pushing forward!
        </p>
        <button className="btn-primary" style={{ marginTop: 24, padding: '12px 32px' }} onClick={dismissLevelUp}>
          Continue Journey 
        </button>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div>
      <div style={{ height: 40, width: 300, background: 'var(--bg-card)', borderRadius: 8, marginBottom: 32 }} className="shimmer" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: 100, background: 'var(--bg-card)', borderRadius: 16 }} className="shimmer" />
        ))}
      </div>
      <div style={{ height: 120, background: 'var(--bg-card)', borderRadius: 16, marginBottom: 24 }} className="shimmer" />
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ height: 60, background: 'var(--bg-card)', borderRadius: 12, marginBottom: 8 }} className="shimmer" />
      ))}
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

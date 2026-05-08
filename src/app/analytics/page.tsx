'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/types';
import roadmapData from '@/data/roadmap.json';

export default function AnalyticsPage() {
  const { state } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // All hooks must be called before any conditional returns
  const completedTasks = Object.values(state.task_progress).filter(p => p.status === 'completed');
  const totalXP = state.xp;

  // Category breakdown
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number; xp: number }> = {};
    for (const cat of CATEGORIES) stats[cat.key] = { total: 0, completed: 0, xp: 0 };

    for (const week of roadmapData.weeks) {
      for (const day of week.days) {
        for (const [cat, tasks] of Object.entries(day.tasks) as [string, any[]][]) {
          if (!stats[cat]) continue;
          for (const task of tasks) {
            stats[cat].total++;
            const prog = state.task_progress[task.id];
            if (prog?.status === 'completed') {
              stats[cat].completed++;
              stats[cat].xp += prog.xp_earned;
            }
          }
        }
      }
    }
    return stats;
  }, [state.task_progress]);

  // Weekly progress heatmap
  const weeklyProgress = useMemo(() => {
    return roadmapData.weeks.map(week => {
      let total = 0, completed = 0;
      for (const day of week.days) {
        for (const tasks of Object.values(day.tasks) as any[][]) {
          for (const t of tasks) {
            total++;
            if (state.task_progress[t.id]?.status === 'completed') completed++;
          }
        }
      }
      return { week_id: week.week_id, theme: week.theme, total, completed, pct: total ? Math.round((completed / total) * 100) : 0 };
    });
  }, [state.task_progress]);

  // XP over time (last 14 days)
  const xpTimeline = useMemo(() => {
    const days: Record<string, number> = {};
    for (const log of state.xp_logs) {
      const d = log.timestamp.split('T')[0];
      days[d] = (days[d] || 0) + log.xp_amount;
    }
    // Fill last 14 days
    const result: { date: string; xp: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      result.push({ date: key, xp: days[key] || 0 });
    }
    return result;
  }, [state.xp_logs]);

  // Difficulty breakdown
  const difficultyStats = useMemo(() => {
    const stats = { easy: { total: 0, done: 0 }, medium: { total: 0, done: 0 }, hard: { total: 0, done: 0 } };
    for (const week of roadmapData.weeks) {
      for (const day of week.days) {
        for (const tasks of Object.values(day.tasks) as any[][]) {
          for (const t of tasks) {
            const diff = (t.difficulty || 'medium') as 'easy' | 'medium' | 'hard';
            stats[diff].total++;
            if (state.task_progress[t.id]?.status === 'completed') stats[diff].done++;
          }
        }
      }
    }
    return stats;
  }, [state.task_progress]);

  if (!mounted) return <AnalyticsSkeleton />;

  const maxDailyXP = Math.max(...xpTimeline.map(d => d.xp), 1);
  const totalTasks = Object.values(categoryStats).reduce((s, c) => s + c.total, 0);
  const totalCompleted = completedTasks.length;
  const overallPct = totalTasks ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span className="glow-text">Analytics</span> 📊
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
          Track your learning journey with detailed insights
        </p>
      </div>

      {/* Overview Stats */}
      <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <MiniStat label="Total Tasks" value={`${totalCompleted}/${totalTasks}`} accent="var(--accent-primary)" icon="✅" />
        <MiniStat label="Total XP" value={totalXP.toLocaleString()} accent="var(--text-primary)" icon="⚡" />
        <MiniStat label="Progress" value={`${overallPct}%`} accent="var(--accent-secondary)" icon="📈" />
        <MiniStat label="Boss Victories" value={`${state.boss_fights.filter(b => b.status === 'completed').length}/12`} accent="var(--accent-primary)" icon="⚔️" />
      </div>

      {/* XP Timeline Chart */}
      <div className="card fade-in fade-in-delay-1" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>XP Earned (Last 14 Days)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
          {xpTimeline.map((d, i) => {
            const height = maxDailyXP ? Math.max(4, (d.xp / maxDailyXP) * 100) : 4;
            const dayLabel = new Date(d.date).toLocaleDateString('en', { weekday: 'short' }).charAt(0);
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  {d.xp > 0 && (
                    <span style={{
                      position: 'absolute', bottom: `${height + 4}%`, fontSize: 9,
                      fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)',
                      fontWeight: 600, whiteSpace: 'nowrap',
                    }}>
                      {d.xp}
                    </span>
                  )}
                  <div
                    style={{
                      width: '70%', borderRadius: 0,
                      height: `${height}%`, minHeight: 4,
                      background: d.xp > 0 ? 'var(--accent-primary)' : 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      transition: 'height 0.5s ease',
                    }}
                  />
                </div>
                <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Category Breakdown */}
        <div className="card fade-in fade-in-delay-2">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Category Breakdown</h3>
          {CATEGORIES.map(cat => {
            const s = categoryStats[cat.key];
            const pct = s.total ? Math.round((s.completed / s.total) * 100) : 0;
            return (
              <div key={cat.key} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{cat.icon}</span> {cat.label}
                  </span>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: cat.color }}>
                    {s.completed}/{s.total} · {pct}%
                  </span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'var(--bg-hover)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', background: cat.color,
                    borderRadius: 3, transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Difficulty Breakdown */}
        <div className="card fade-in fade-in-delay-2">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Difficulty Breakdown</h3>
          {(['easy', 'medium', 'hard'] as const).map(diff => {
            const s = difficultyStats[diff];
            const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
            const colors = { easy: '#55efc4', medium: '#fdcb6e', hard: '#ff6b6b' };
            const icons = { easy: '🟢', medium: '🟡', hard: '🔴' };
            return (
              <div key={diff} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {icons[diff]} {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </span>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: colors[diff] }}>
                    {s.done}/{s.total} · {pct}%
                  </span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'var(--bg-hover)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', background: colors[diff],
                    borderRadius: 3, transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            );
          })}

          {/* Time invested estimate */}
          <div style={{ marginTop: 20, padding: '20px 24px', background: 'var(--accent-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-hard)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800 }}>Estimated Time Invested</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', marginTop: 8 }}>
              {(() => {
                let total = 0;
                for (const week of roadmapData.weeks) {
                  for (const day of week.days) {
                    for (const tasks of Object.values(day.tasks) as any[][]) {
                      for (const t of tasks) {
                        if (state.task_progress[t.id]?.status === 'completed') total += t.time_min;
                      }
                    }
                  }
                }
                return `${Math.floor(total / 60)}h ${total % 60}m`;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Heatmap */}
      <div className="card fade-in fade-in-delay-3">
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Weekly Progress Heatmap</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {weeklyProgress.map(w => (
            <div key={w.week_id} style={{
              padding: 14, borderRadius: 'var(--radius-sm)',
              background: `rgba(108, 92, 231, ${Math.max(0.03, w.pct / 100 * 0.4)})`,
              border: w.week_id === state.current_week
                ? '2px solid var(--accent-primary)'
                : '1px solid var(--border)',
              transition: 'all 0.2s ease',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                W{w.week_id}
              </div>
              <div style={{
                fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: 4,
                color: w.pct >= 80 ? 'var(--accent-success)' : w.pct >= 40 ? 'var(--accent-warning)' : 'var(--text-muted)',
              }}>
                {w.pct}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                {w.completed}/{w.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, accent, icon }: { label: string; value: string; accent: string; icon: string }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: accent, marginTop: 4, fontFamily: 'var(--font-mono)' }}>{value}</div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div>
      <div style={{ height: 36, width: 250, background: 'var(--bg-card)', borderRadius: 8, marginBottom: 28 }} className="shimmer" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: 90, background: 'var(--bg-card)', borderRadius: 16 }} className="shimmer" />
        ))}
      </div>
      <div style={{ height: 200, background: 'var(--bg-card)', borderRadius: 16, marginBottom: 24 }} className="shimmer" />
    </div>
  );
}

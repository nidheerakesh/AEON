'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { generateDailyPlan, suggestEasiestTask } from '@/lib/ai-planner';
import { CATEGORIES } from '@/types';
import roadmapData from '@/data/roadmap.json';

const catBadgeClass: Record<string, string> = {
  ai_ml: 'badge-ml', backend: 'badge-backend', build: 'badge-build',
  dsa: 'badge-dsa', college: 'badge-college',
};

export default function PlannerPage() {
  const { state, completeTask, startTask, setFocusTask } = useApp();
  const [energy, setEnergy] = useState<'low' | 'medium' | 'high'>('medium');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const plan = generateDailyPlan(state, state.current_week, state.current_day, energy);
  const easiest = suggestEasiestTask(state, state.current_week, state.current_day);
  const totalTime = plan.reduce((s, t) => s + t.time_min, 0);
  const completedTime = plan.filter(t => state.task_progress[t.id]?.status === 'completed')
    .reduce((s, t) => s + t.time_min, 0);

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span className="glow-text">Daily Planner</span> 📋
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
          AI-generated plan based on your progress — Week {state.current_week}, Day {state.current_day}
        </p>
      </div>

      {/* Energy Selector */}
      <div className="card-flat fade-in" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>How&apos;s your energy?</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['low', 'medium', 'high'] as const).map(e => (
            <button
              key={e}
              onClick={() => setEnergy(e)}
              style={{
                padding: '6px 16px', borderRadius: 20, border: '1px solid',
                borderColor: energy === e ? 'var(--accent-primary)' : 'var(--border)',
                background: energy === e ? 'var(--accent-primary)20' : 'transparent',
                color: energy === e ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: 13, fontWeight: 500,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {e === 'low' ? '😴 Low' : e === 'medium' ? '😊 Medium' : '⚡ High'}
            </button>
          ))}
        </div>
      </div>

      {/* Time estimate */}
      <div className="card-flat fade-in fade-in-delay-1" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimated Time</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {Math.floor(totalTime / 60)}h {totalTime % 60}m
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completed</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-success)', marginTop: 4 }}>
            {Math.floor(completedTime / 60)}h {completedTime % 60}m
          </div>
        </div>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: `conic-gradient(var(--accent-success) ${totalTime ? (completedTime / totalTime) * 360 : 0}deg, var(--bg-hover) 0)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
          }}>
            {totalTime ? Math.round((completedTime / totalTime) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Overwhelmed? */}
      {easiest && energy === 'low' && (
        <div className="card fade-in fade-in-delay-2" style={{
          marginBottom: 20, background: 'linear-gradient(135deg, rgba(108,92,231,0.05), rgba(0,206,201,0.05))',
          border: '1px solid var(--accent-primary)',
        }}>
          <div style={{ fontSize: 12, color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            🌿 Just do one thing
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, marginTop: 8 }}>{easiest.title}</p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>~{easiest.time_min} min · {easiest.xp} XP</p>
          <button
            className="btn-primary"
            style={{ marginTop: 12 }}
            onClick={() => setFocusTask(easiest.id)}
          >
            Start This →
          </button>
        </div>
      )}

      {/* Task List by Category */}
      <div className="fade-in fade-in-delay-3">
        {CATEGORIES.map(cat => {
          const catTasks = plan.filter(t => t.category === cat.key);
          if (catTasks.length === 0) return null;
          return (
            <div key={cat.key} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>{cat.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: cat.color }}>{cat.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {catTasks.filter(t => state.task_progress[t.id]?.status === 'completed').length}/{catTasks.length}
                </span>
              </div>
              {catTasks.map(task => {
                const progress = state.task_progress[task.id];
                const isCompleted = progress?.status === 'completed';
                const isInProgress = progress?.status === 'in_progress';
                return (
                  <div key={task.id} className="card-flat" style={{
                    marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12,
                    opacity: isCompleted ? 0.5 : 1,
                    borderLeft: `3px solid ${isInProgress ? cat.color : 'transparent'}`,
                  }}>
                    <button
                      onClick={() => isCompleted ? null : completeTask(task.id, task.xp)}
                      disabled={isCompleted}
                      style={{
                        width: 24, height: 24, borderRadius: 6,
                        border: isCompleted ? 'none' : `2px solid ${cat.color}`,
                        background: isCompleted ? cat.color : 'transparent',
                        cursor: isCompleted ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, color: 'white', flexShrink: 0,
                        fontFamily: 'var(--font-sans)',
                      }}
                    >{isCompleted && '✓'}</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, textDecoration: isCompleted ? 'line-through' : 'none' }}>
                        {task.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>~{task.time_min}min</div>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)', fontWeight: 600 }}>
                      {task.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

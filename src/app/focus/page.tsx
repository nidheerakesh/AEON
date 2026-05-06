'use client';

import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { generateDailyPlan } from '@/lib/ai-planner';
import { CATEGORIES } from '@/types';

export default function FocusPage() {
  const { state, completeTask, setFocusTask } = useApp();
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(state.settings.focus_mode_duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalRef.current = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timer]);

  if (!mounted) return null;

  const plan = generateDailyPlan(state, state.current_week, state.current_day);
  const focusTask = state.focus_task_id
    ? plan.find(t => t.id === state.focus_task_id)
    : plan[0];

  if (!focusTask || completed) {
    return (
      <div className="focus-overlay" style={{ position: 'relative', minHeight: '100vh', inset: 'unset' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>
            <span className="glow-text">{completed ? 'Task Complete!' : 'All Clear!'}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16 }}>
            {completed ? 'Great work! Ready for the next one?' : 'No pending tasks. You\'re ahead of schedule!'}
          </p>
          {completed && (
            <button className="btn-primary" style={{ marginTop: 24, padding: '12px 32px' }}
              onClick={() => { setCompleted(false); setFocusTask(null); setTimer(state.settings.focus_mode_duration * 60); }}>
              Next Task →
            </button>
          )}
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find(c => c.key === focusTask.category);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progress = 1 - (timer / (state.settings.focus_mode_duration * 60));

  const handleComplete = () => {
    completeTask(focusTask.id, focusTask.xp);
    setCompleted(true);
    setIsRunning(false);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      {/* Category badge */}
      <div className={`badge ${cat ? `badge-${cat.key === 'ai_ml' ? 'ml' : cat.key}` : ''}`}
        style={{ marginBottom: 20, fontSize: 13, padding: '6px 16px' }}>
        {cat?.icon} {cat?.label}
      </div>

      {/* Task title */}
      <h1 style={{ fontSize: 28, fontWeight: 800, maxWidth: 500, lineHeight: 1.3 }}>
        {focusTask.title}
      </h1>

      {/* Time estimate */}
      <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 14 }}>
        ~{focusTask.time_min} min estimated · {focusTask.xp} XP
      </p>

      {/* Timer circle */}
      <div style={{
        width: 200, height: 200,
        borderRadius: '50%',
        background: `conic-gradient(var(--accent-primary) ${progress * 360}deg, var(--bg-tertiary) 0)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '40px 0',
        boxShadow: isRunning ? '0 0 40px var(--accent-primary-glow)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div style={{
          width: 176, height: 176, borderRadius: '50%',
          background: 'var(--bg-primary)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 40, fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: isRunning ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase' }}>
            {isRunning ? 'focusing...' : timer === 0 ? 'time\'s up!' : 'ready'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          className="btn-ghost"
          onClick={() => setIsRunning(!isRunning)}
          style={{ padding: '10px 24px', fontSize: 14 }}
        >
          {isRunning ? '⏸ Pause' : '▶ Start Timer'}
        </button>
        <button
          className="btn-primary"
          onClick={handleComplete}
          style={{ padding: '10px 24px', fontSize: 14 }}
        >
          ✓ Mark Complete
        </button>
      </div>

      {/* Skip */}
      <button
        onClick={() => setFocusTask(null)}
        style={{
          marginTop: 20, background: 'transparent', border: 'none',
          color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13,
          fontFamily: 'var(--font-sans)',
        }}
      >
        Skip this task →
      </button>

      {/* Task count */}
      <div style={{
        marginTop: 40, fontSize: 12, color: 'var(--text-muted)',
        display: 'flex', gap: 4,
      }}>
        {plan.map((t, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: state.task_progress[t.id]?.status === 'completed'
              ? 'var(--accent-success)'
              : t.id === focusTask.id
                ? 'var(--accent-primary)'
                : 'var(--bg-hover)',
          }} />
        ))}
      </div>
    </div>
  );
}

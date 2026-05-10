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
  const activeTask = state.focus_task_id
    ? plan.find(t => t.id === state.focus_task_id) || plan[0]
    : plan[0];

  const handleSetTime = (mins: number) => {
    setTimer(mins * 60);
    setIsRunning(false);
  };

  if (!activeTask || completed) {
    return (
      <div className="focus-overlay" style={{ position: 'relative', minHeight: '100vh', inset: 'unset' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>
            <span className="glow-text">{completed ? 'Task Complete' : 'All Clear'}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16 }}>
            {completed ? 'Great work. Ready for the next one?' : 'No pending tasks. You\'re ahead of schedule.'}
          </p>
          {completed && (
            <button className="btn-primary" style={{ marginTop: 24, padding: '12px 32px' }}
              onClick={() => { setCompleted(false); setFocusTask(null); setTimer(state.settings.focus_mode_duration * 60); }}>
              Next Task
            </button>
          )}
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find(c => c.key === activeTask.category);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progress = 1 - (timer / (timer > 0 ? timer : 1)); // Simplified progress

  const handleComplete = () => {
    completeTask(activeTask.id, activeTask.xp);
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
      padding: '40px 20px',
    }}>
      {/* Task Selector */}
      <div style={{ marginBottom: 40, width: '100%', maxWidth: 400 }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12, textAlign: 'center' }}>Active Focus Task</div>
        <select 
          value={activeTask.id}
          onChange={(e) => setFocusTask(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', outline: 'none'
          }}
        >
          {plan.filter(t => state.task_progress[t.id]?.status !== 'completed').map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      {/* Timer Circle */}
      <div style={{
        width: 240, height: 240,
        borderRadius: '50%',
        border: '2px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 40,
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 900, fontFamily: 'var(--font-mono)', letterSpacing: '-2px' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: 4 }}>
            {isRunning ? 'Focusing' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Time Selection */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {[15, 25, 45, 60].map(m => (
          <button
            key={m}
            onClick={() => handleSetTime(m)}
            style={{
              padding: '6px 16px', borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border)',
              background: Math.floor(timer/60) === m ? 'var(--accent-secondary)' : 'transparent',
              color: Math.floor(timer/60) === m ? '#000' : 'var(--text-muted)',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {m}m
          </button>
        ))}
      </div>

      {/* Main Controls */}
      <div style={{ display: 'flex', gap: 16 }}>
        <button
          className="btn-ghost"
          onClick={() => setIsRunning(!isRunning)}
          style={{ padding: '14px 32px', fontSize: 15, minWidth: 140 }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="btn-primary"
          onClick={handleComplete}
          style={{ padding: '14px 32px', fontSize: 15, background: 'var(--accent-secondary)', color: '#000' }}
        >
          Complete Task
        </button>
      </div>
    </div>
  );
}

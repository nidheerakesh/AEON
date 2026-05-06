'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const { state, dispatch } = useApp();
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState(state.settings.start_date);
  const [focusDuration, setFocusDuration] = useState(state.settings.focus_mode_duration);
  const [dailyGoal, setDailyGoal] = useState(state.settings.daily_goal_tasks);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      settings: {
        start_date: startDate,
        focus_mode_duration: focusDuration,
        daily_goal_tasks: dailyGoal,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('This will reset ALL your progress. Are you sure?')) {
      localStorage.removeItem('aeon_app_state');
      window.location.reload();
    }
  };

  const totalXP = state.xp;
  const totalTasks = Object.values(state.task_progress).filter(p => p.status === 'completed').length;
  const totalNotes = state.notes.length;

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span className="glow-text">Settings</span> ⚙️
        </h1>
      </div>

      {/* Stats overview */}
      <div className="card fade-in" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Your Journey</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)' }}>{totalXP}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total XP</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-success)' }}>{totalTasks}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Tasks Done</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{state.streak_count}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Day Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cat-ml)' }}>{totalNotes}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Notes</div>
          </div>
        </div>
      </div>

      {/* Journey Settings */}
      <div className="card fade-in fade-in-delay-1" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Journey Configuration</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={{
              padding: '8px 14px', background: 'var(--bg-hover)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)', fontSize: 14,
              fontFamily: 'var(--font-mono)', outline: 'none',
            }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            When you started (or want to start) the 12-week journey
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
            Focus Timer Duration: {focusDuration} min
          </label>
          <input
            type="range"
            min={5} max={60} step={5}
            value={focusDuration}
            onChange={e => setFocusDuration(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
            Daily Task Goal: {dailyGoal} tasks
          </label>
          <input
            type="range"
            min={1} max={10} step={1}
            value={dailyGoal}
            onChange={e => setDailyGoal(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-primary" onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card fade-in fade-in-delay-2" style={{
        borderColor: 'rgba(255,107,107,0.3)',
        background: 'rgba(255,107,107,0.02)',
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-danger)', marginBottom: 8 }}>
          ⚠️ Danger Zone
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
          This will erase all progress, XP, streaks, and notes. Cannot be undone.
        </p>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 20px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--accent-danger)',
            background: 'transparent',
            color: 'var(--accent-danger)',
            cursor: 'pointer', fontWeight: 600, fontSize: 13,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}

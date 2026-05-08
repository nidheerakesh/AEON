'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { generateDailyPlan, suggestEasiestTask } from '@/lib/ai-planner';
import { CATEGORIES } from '@/types';

export default function PlannerPage() {
  const { state, completeTask, setFocusTask, toggleSubtask } = useApp();
  const [energy, setEnergy] = useState<'low' | 'medium' | 'high'>('medium');
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const plan = generateDailyPlan(state, state.current_week, state.current_day, energy);
  const easiest = suggestEasiestTask(state, state.current_week, state.current_day);
  const totalTime = plan.reduce((s, t) => s + t.time_min, 0);
  const completedTime = plan.filter(t => state.task_progress[t.id]?.status === 'completed')
    .reduce((s, t) => s + t.time_min, 0);

  const getRealDate = (weekId: number, dayId: number) => {
    if (!state.settings?.start_date) return null;
    try {
      const startDate = new Date(state.settings.start_date);
      const daysOffset = (weekId - 1) * 7 + (dayId - 1);
      const date = new Date(startDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    } catch {
      return null;
    }
  };

  const currentDateStr = getRealDate(state.current_week, state.current_day) || `Week ${state.current_week}, Day ${state.current_day}`;

  const toggleExpand = (id: string) => {
    setExpandedTasks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span className="glow-text">Daily Planner</span> 📋
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
          {currentDateStr}
        </p>
      </div>

      {/* Energy Selector */}
      <div className="card-flat fade-in" style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-hard)' }}>
        <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Energy:</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['low', 'medium', 'high'] as const).map(e => (
            <button
              key={e}
              onClick={() => setEnergy(e)}
              style={{
                padding: '8px 20px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)',
                background: energy === e ? 'var(--accent-secondary)' : 'var(--bg-primary)',
                boxShadow: energy === e ? 'var(--shadow-hard)' : 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer', fontSize: 13, fontWeight: 700,
                transition: 'all 0.15s ease',
              }}
            >
              {e === 'low' ? '😴 Low' : e === 'medium' ? '😊 Mid' : '⚡ High'}
            </button>
          ))}
        </div>
      </div>

      {/* Time estimate */}
      <div className="card-flat fade-in fade-in-delay-1" style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-hard)' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Estimated Time</div>
          <div style={{ fontSize: 24, fontWeight: 900, marginTop: 4 }}>
            {Math.floor(totalTime / 60)}h {totalTime % 60}m
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Completed</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--accent-primary)', marginTop: 4 }}>
            {Math.floor(completedTime / 60)}h {completedTime % 60}m
          </div>
        </div>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          border: '1px solid var(--border)',
          background: `conic-gradient(var(--accent-primary) ${totalTime ? (completedTime / totalTime) * 360 : 0}deg, var(--bg-secondary) 0)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-hard)',
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: '50%', background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 900,
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
                const isExpanded = expandedTasks.includes(task.id);
                return (
                  <div key={task.id} className="card-flat" style={{
                    marginBottom: 12,
                    opacity: isCompleted ? 0.6 : 1,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-hard)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                        }}
                      >{isCompleted && '✓'}</button>
                      
                      <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => toggleExpand(task.id)}>
                        <div style={{ fontSize: 14, fontWeight: 600, textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                          {task.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          ~{task.time_min}min · {task.subtasks?.length || 0} subtasks
                        </div>
                      </div>
                      
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)', fontWeight: 600 }}>
                        {task.xp} XP
                      </span>
                      
                      <button onClick={() => toggleExpand(task.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', width: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>▼</span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: 16, paddingLeft: 36, borderTop: '1px dashed var(--border)', paddingTop: 16 }}>
                        {task.description && (
                          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{task.description}</p>
                        )}
                        
                        {task.subtasks && task.subtasks.length > 0 && (
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.5px' }}>Checklist</div>
                            {task.subtasks.map(st => {
                              const isSubtaskCompleted = progress?.subtasks_completed?.includes(st.id);
                              return (
                                <div key={st.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }} onClick={() => toggleSubtask(task.id, st.id)}>
                                  <div style={{
                                    width: 16, height: 16, borderRadius: 4, marginTop: 2, cursor: 'pointer', flexShrink: 0,
                                    border: `1.5px solid ${isSubtaskCompleted ? 'var(--accent-success)' : 'var(--text-muted)'}`,
                                    background: isSubtaskCompleted ? 'var(--accent-success)' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                  }}>
                                    {isSubtaskCompleted && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
                                  </div>
                                  <span style={{ fontSize: 13, cursor: 'pointer', textDecoration: isSubtaskCompleted ? 'line-through' : 'none', color: isSubtaskCompleted ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
                                    {st.title}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {task.resources && task.resources.length > 0 && (
                          <div>
                            <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.5px' }}>Resources</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {task.resources.map((res, idx) => (
                                <a key={idx} href={res} target="_blank" rel="noopener noreferrer" style={{
                                  fontSize: 12, display: 'flex', alignItems: 'center', gap: 4,
                                  background: 'var(--bg-tertiary)', padding: '6px 10px', borderRadius: 6,
                                  color: 'var(--accent-primary)', textDecoration: 'none', border: '1px solid var(--border)'
                                }}>
                                  <span>🔗</span> Resource {idx + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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

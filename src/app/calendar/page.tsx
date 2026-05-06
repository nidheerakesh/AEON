'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CustomTask, CATEGORIES } from '@/types';
import roadmapData from '@/data/roadmap.json';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function CalendarPage() {
  const { state, addCustomTask } = useApp();
  const [mounted, setMounted] = useState(false);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  
  // AI Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);

  const calendarData = useMemo(() => {
    return roadmapData.weeks.map(week => {
      const daysWithCustomTasks = week.days.map(day => {
        const customForDay = state.custom_tasks?.filter(
          ct => ct.week_id === week.week_id && ct.day_id === day.day_id
        ) || [];
        
        let standardCount = 0;
        let standardTasks: any[] = [];
        Object.values(day.tasks).forEach((arr: any) => {
          standardCount += arr.length;
          standardTasks.push(...arr);
        });

        return {
          ...day,
          standardCount,
          standardTasks,
          customTasks: customForDay,
          totalCount: standardCount + customForDay.length
        };
      });
      
      return {
        ...week,
        days: daysWithCustomTasks
      };
    });
  }, [state.custom_tasks]);

  const handleAiSchedule = async () => {
    if (!aiInput.trim()) return;
    setIsScheduling(true);
    setAiResult(null);
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'schedule_task',
          context: {
            userInput: aiInput,
            currentWeek: state.current_week,
            currentDay: state.current_day,
            energyLevel: 'medium',
            todayTaskCount: 0,
            totalCompleted: Object.keys(state.task_progress).length
          }
        })
      });
      
      const resData = await response.json();
      
      if (resData.fallback || resData.error) {
        setAiResult({
          error: resData.error || 'Failed to connect to Gemini AI.',
          fallback: true
        });
      } else if (resData.success && resData.data) {
        setAiResult(resData.data);
      }
    } catch (err) {
      console.error(err);
      setAiResult({ error: 'Network error. Please try again.' });
    } finally {
      setIsScheduling(false);
    }
  };

  const acceptAiTask = () => {
    if (!aiResult?.task) return;
    
    const newTask: CustomTask = {
      id: `custom_${generateId()}`,
      title: aiResult.task.title,
      description: aiResult.task.description,
      xp: aiResult.task.xp || 20,
      time_min: aiResult.task.time_min || 30,
      difficulty: aiResult.task.difficulty || 'medium',
      category: aiResult.task.category || 'ai_ml',
      week_id: aiResult.suggested_week || state.current_week,
      day_id: aiResult.suggested_day || state.current_day,
      created_at: new Date().toISOString(),
      source: 'ai',
      subtasks: [],
      resources: []
    };
    
    addCustomTask(newTask);
    setIsAiModalOpen(false);
    setAiInput('');
    setAiResult(null);
    
    // Smooth scroll to the week
    const weekEl = document.getElementById(`week-${newTask.week_id}`);
    if (weekEl) {
      weekEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getRealDate = (weekId: number, dayId: number) => {
    if (!state.settings?.start_date) return null;
    try {
      const startDate = new Date(state.settings.start_date);
      const daysOffset = (weekId - 1) * 7 + (dayId - 1);
      const date = new Date(startDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return null;
    }
  };

  const getCategoryColor = (catKey: string) => {
    const cat = CATEGORIES.find(c => c.key === catKey);
    return cat ? cat.color : '#fff';
  };

  if (!mounted) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 40,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <h1 className="page-title glow-text" style={{ fontSize: 36, marginBottom: 8 }}>Learning Calendar</h1>
          <p className="page-subtitle">View your entire 12-week roadmap and schedule custom tasks with AI.</p>
        </div>
        
        <button 
          onClick={() => setIsAiModalOpen(true)}
          className="btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            fontSize: 15,
            fontWeight: 600,
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(162, 155, 254, 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{ fontSize: 18 }}>✨</span>
          Schedule Extra Task
        </button>
      </div>

      {/* Timeline View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, paddingBottom: 60 }}>
        {calendarData.map(week => (
          <div key={week.week_id} id={`week-${week.week_id}`} style={{
            position: 'relative',
            paddingLeft: 32
          }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: 8,
              top: 8,
              bottom: -48,
              width: 2,
              background: 'var(--border)',
              zIndex: 0
            }} />
            
            {/* Week Header */}
            <div style={{ position: 'relative', zIndex: 1, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: state.current_week > week.week_id ? 'var(--accent-primary)' : state.current_week === week.week_id ? 'var(--accent-warning)' : 'var(--bg-tertiary)',
                border: `4px solid var(--bg-primary)`,
                marginLeft: -32 - 8 + 4,
                boxShadow: state.current_week === week.week_id ? '0 0 0 2px var(--accent-warning)' : 'none'
              }} />
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' }}>
                  Week {week.week_id}: <span style={{ color: 'var(--text-secondary)' }}>{week.theme}</span>
                </h2>
                {state.current_week === week.week_id && (
                  <span style={{ fontSize: 12, background: 'rgba(253,203,110,0.15)', color: 'var(--accent-warning)', padding: '2px 8px', borderRadius: 12, fontWeight: 600, marginTop: 4, display: 'inline-block' }}>
                    Current Week
                  </span>
                )}
              </div>
            </div>

            {/* Days Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16
            }}>
              {week.days.map(day => {
                const isCurrentDay = state.current_week === week.week_id && state.current_day === day.day_id;
                const isPast = week.week_id < state.current_week || (week.week_id === state.current_week && day.day_id < state.current_day);
                const realDate = getRealDate(week.week_id, day.day_id);
                const dayIdKey = `${week.week_id}-${day.day_id}`;
                const isExpanded = expandedDays.includes(dayIdKey);
                
                return (
                  <div key={day.day_id} className="card-hover" style={{
                    background: isCurrentDay ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    border: `1px solid ${isCurrentDay ? 'var(--accent-warning)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: 16,
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: isPast ? 0.7 : 1,
                    cursor: 'pointer'
                  }} onClick={() => setExpandedDays(prev => prev.includes(dayIdKey) ? prev.filter(d => d !== dayIdKey) : [...prev, dayIdKey])}>
                    {isCurrentDay && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                        background: 'linear-gradient(90deg, var(--accent-warning), transparent)'
                      }} />
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: isCurrentDay ? 'var(--accent-warning)' : 'var(--text-primary)' }}>
                          Day {day.day_id}: {day.day_label}
                        </h3>
                        {realDate && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{realDate}</div>}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                        {day.estimated_time_min} min
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {day.standardCount > 0 && (
                        <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 12 }}>
                          <span>📚</span> {day.standardCount} roadmap tasks
                        </span>
                      )}
                      {day.customTasks.length > 0 && (
                        <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(162,155,254,0.1)', color: 'var(--accent-primary)', padding: '4px 8px', borderRadius: 12, fontWeight: 500 }}>
                          <span>✨</span> {day.customTasks.length} extra
                        </span>
                      )}
                    </div>
                    
                    {/* Custom Tasks preview (if not expanded) */}
                    {!isExpanded && day.customTasks.length > 0 && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
                        {day.customTasks.map((ct: CustomTask) => (
                          <div key={ct.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontSize: 12 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: getCategoryColor(ct.category) }} />
                            <span style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ct.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Expanded Task List */}
                    {isExpanded && (
                      <div style={{ marginTop: 16, borderTop: '1px dashed var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }} onClick={e => e.stopPropagation()}>
                        {[...day.standardTasks, ...day.customTasks].map((t: any) => (
                          <div key={t.id} style={{ background: 'var(--bg-primary)', padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: getCategoryColor(t.category || t.id.split('_')[1]) || 'var(--accent-primary)' }} />
                              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{t.title}</div>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>~{t.time_min} mins · {t.xp} XP</div>
                            
                            {t.subtasks && t.subtasks.length > 0 && (
                              <div style={{ marginTop: 8, paddingLeft: 8, borderLeft: '2px solid var(--border)' }}>
                                {t.subtasks.map((st: any) => (
                                  <div key={st.id} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>• {st.title}</div>
                                ))}
                              </div>
                            )}
                            
                            {t.resources && t.resources.length > 0 && (
                              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                                {t.resources.map((r: string, i: number) => (
                                  <a href={r} key={i} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--accent-primary)', background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: 6, textDecoration: 'none', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span>🔗</span> Resource {i+1}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI Schedule Modal */}
      {isAiModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20
        }}>
          <div style={{
            background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
            width: '100%', maxWidth: 500, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsAiModalOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20 }}
            >
              ✕
            </button>
            
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="glow-text">AI Scheduler</span> ✨
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
              Tell AEON what you want to learn or practice. It will break it down into a task, estimate time/XP, and schedule it optimally.
            </p>
            
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="e.g. I want to build a small Docker container for my Node.js app..."
              style={{
                width: '100%', height: 100, background: 'var(--bg-primary)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: 12, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
                fontSize: 14, resize: 'none', marginBottom: 16
              }}
            />
            
            {!aiResult && !isScheduling && (
              <button 
                onClick={handleAiSchedule}
                disabled={!aiInput.trim()}
                className="btn-primary"
                style={{
                  width: '100%', padding: 12, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: aiInput.trim() ? 'pointer' : 'not-allowed',
                  opacity: aiInput.trim() ? 1 : 0.5
                }}
              >
                Generate Task
              </button>
            )}

            {isScheduling && (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-secondary)' }}>
                <div className="spinner" style={{ width: 24, height: 24, border: '2px solid var(--border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                AEON is analyzing your request...
              </div>
            )}

            {aiResult && !aiResult.fallback && !aiResult.error && (
              <div style={{ background: 'var(--bg-primary)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-primary)40' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--accent-primary)' }}>Suggested Task</h3>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{aiResult.task.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{aiResult.task.description}</div>
                
                <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 12 }}>
                  <span style={{ background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: 4 }}>⏳ {aiResult.task.time_min} min</span>
                  <span style={{ background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: 4 }}>✨ {aiResult.task.xp} XP</span>
                  <span style={{ background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: 4 }}>📅 Week {aiResult.suggested_week}, Day {aiResult.suggested_day}</span>
                </div>
                
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 16, paddingLeft: 8, borderLeft: '2px solid var(--border)' }}>
                  "{aiResult.reason}"
                </div>
                
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={acceptAiTask} style={{ flex: 1, padding: 10, background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer' }}>
                    Accept & Schedule
                  </button>
                  <button onClick={() => setAiResult(null)} style={{ flex: 1, padding: 10, background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer' }}>
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {aiResult?.error && (
              <div style={{ padding: 16, background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)', borderRadius: 'var(--radius-md)', color: '#ff6b6b', fontSize: 14 }}>
                {aiResult.error}
                <div style={{ marginTop: 12 }}>
                  <button onClick={() => setAiResult(null)} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

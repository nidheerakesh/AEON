'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CustomTask, CATEGORIES } from '@/types';
import roadmapData from '@/data/roadmap.json';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalendarContent />
    </Suspense>
  );
}

function CalendarContent() {
  const { state, addCustomTask } = useApp();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayContext, setSelectedDayContext] = useState<{ week: number; day: number } | null>(null);
  
  // Manual state
  const [manualTitle, setManualTitle] = useState('');
  const [manualCategory, setManualCategory] = useState<any>('build');
  const [manualWeek, setManualWeek] = useState(1);
  const [manualDay, setManualDay] = useState(1);
  const [manualXP, setManualXP] = useState(25);

  useEffect(() => { 
    setMounted(true); 
    setManualWeek(state.current_week);
    setManualDay(state.current_day);
    
    if (searchParams.get('schedule') === 'true') {
      openScheduleModal();
    }
  }, [state.current_week, state.current_day, searchParams]);

  const openScheduleModal = (week?: number, day?: number) => {
    if (week && day) {
      setSelectedDayContext({ week, day });
      setManualWeek(week);
      setManualDay(day);
    } else {
      setSelectedDayContext(null);
      setManualWeek(state.current_week);
      setManualDay(state.current_day);
    }
    setIsModalOpen(true);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const newTask: CustomTask = {
      id: `custom_${generateId()}`,
      title: manualTitle,
      description: 'Manual task',
      xp: manualXP,
      time_min: 45,
      difficulty: 'medium',
      category: manualCategory,
      week_id: manualWeek,
      day_id: manualDay,
      created_at: new Date().toISOString(),
      source: 'user',
      subtasks: [],
      resources: []
    };

    addCustomTask(newTask);
    setIsModalOpen(false);
    setManualTitle('');
    scrollToTask(newTask.week_id);
  };

  const scrollToTask = (weekId: number) => {
    setTimeout(() => {
      const weekEl = document.getElementById(`week-${weekId}`);
      if (weekEl) {
        weekEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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

  const calendarData = useMemo(() => {
    return roadmapData.weeks.map(week => {
      const daysWithCustomTasks = week.days.map(day => {
        const customForDay = state.custom_tasks?.filter(
          ct => ct.week_id === week.week_id && ct.day_id === day.day_id
        ) || [];
        
        let standardCount = 0;
        const standardTasks: any[] = [];
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
          <p className="page-subtitle">View your entire 12-week roadmap and schedule custom tasks.</p>
        </div>
        
        <button 
          onClick={() => openScheduleModal()}
          className="btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            fontSize: 15,
            fontWeight: 600,
            background: 'var(--accent-secondary)',
            color: '#000',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.2s ease'
          }}
        >
          Schedule New Task
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
                      <button 
                        onClick={(e) => { e.stopPropagation(); openScheduleModal(week.week_id, day.day_id); }}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: 18 }}
                        title="Add task to this day"
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {day.standardCount > 0 && (
                        <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 12 }}>
                          {day.standardCount} roadmap tasks
                        </span>
                      )}
                      {day.customTasks.length > 0 && (
                        <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(162,155,254,0.1)', color: 'var(--accent-primary)', padding: '4px 8px', borderRadius: 12, fontWeight: 500 }}>
                          {day.customTasks.length} extra
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
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: getCategoryColor(t.category || (t.id && t.id.split('_')[1])) || 'var(--accent-primary)' }} />
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
                                    Resource {i+1}
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

      {/* Scheduler Modal */}
      {isModalOpen && (
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
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20 }}
            >
              ✕
            </button>
            
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="glow-text">Schedule New Task</span>
            </h2>

            <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>TASK TITLE</label>
                <input 
                  type="text" 
                  value={manualTitle}
                  onChange={e => setManualTitle(e.target.value)}
                  placeholder="e.g., Build Docker Container"
                  required
                  style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>WEEK</label>
                  <select 
                    value={manualWeek}
                    onChange={e => setManualWeek(parseInt(e.target.value))}
                    style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                  >
                    {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>Week {i+1}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>DAY</label>
                  <select 
                    value={manualDay}
                    onChange={e => setManualDay(parseInt(e.target.value))}
                    style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                  >
                    {[...Array(6)].map((_, i) => <option key={i+1} value={i+1}>Day {i+1}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>CATEGORY & XP</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select 
                    value={manualCategory}
                    onChange={e => setManualCategory(e.target.value)}
                    style={{ flex: 2, padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                  >
                    {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                  <input 
                    type="number" 
                    value={manualXP}
                    onChange={e => setManualXP(parseInt(e.target.value))}
                    style={{ flex: 1, padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: 14, marginTop: 8, background: 'var(--accent-secondary)', color: '#000', borderRadius: 8, fontWeight: 800 }}
              >
                Add Task to Schedule
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

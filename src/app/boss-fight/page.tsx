'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import roadmapData from '@/data/roadmap.json';
import { BOSS_FIGHTS, BossData } from '@/data/boss-fights';

const PHASE_COLORS: Record<string, string> = {
  ml: '#a29bfe',
  backend: '#55efc4',
  mlops: '#fdcb6e',
};

const PHASE_LABELS: Record<string, string> = {
  ml: 'MACHINE LEARNING',
  backend: 'BACKEND',
  mlops: 'MLOPS',
};

export default function BossFightPage() {
  const { state, completeBossFight, toggleSubtask } = useApp();
  const [mounted, setMounted] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(state.current_week);
  const [fighting, setFighting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'checklist'>('overview');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const week = (roadmapData.weeks as any[]).find((w) => w.week_id === selectedWeek);
  if (!week) return null;

  const boss = BOSS_FIGHTS.find(b => b.week === selectedWeek);
  if (!boss) return null;

  const bfProgress = state.boss_fights.find(b => b.week_id === selectedWeek);
  const isCompleted = bfProgress?.status === 'completed';
  const phaseColor = PHASE_COLORS[boss.phase] || '#a29bfe';

  // Count completed tasks this week
  let weekTasks = 0, weekCompleted = 0;
  for (const day of week.days) {
    for (const tasks of Object.values(day.tasks) as any[][]) {
      for (const t of tasks) {
        weekTasks++;
        if (state.task_progress[t.id]?.status === 'completed') weekCompleted++;
      }
    }
  }
  const canFight = weekCompleted >= 10;
  const progressPct = weekTasks ? Math.round((weekCompleted / weekTasks) * 100) : 0;

  // Track boss daily subtask completion
  // We need to check task_progress for each potential daily boss task ID (boss_w{week}_d{day})
  const getSubtaskStatus = (day: number, subIndex: number) => {
    const taskId = `boss_w${selectedWeek}_d${day}`;
    const subtaskId = `${taskId}_st${subIndex}`;
    return state.task_progress[taskId]?.subtasks_completed.includes(subtaskId) || false;
  };

  const getDayCompletion = (day: number, totalSubtasks: number) => {
    const taskId = `boss_w${selectedWeek}_d${day}`;
    return state.task_progress[taskId]?.subtasks_completed.length || 0;
  };

  return (
    <div>
      {/* Header */}
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span style={{ color: 'var(--accent-danger)' }}>Boss Fights</span> ⚔️
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
          12 weekly challenges across ML → Backend → MLOps
        </p>
      </div>

      {/* Phase Labels + Week Selector */}
      <div style={{ marginBottom: 24 }}>
        {/* Phase row */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {(['ml', 'backend', 'mlops'] as const).map(phase => (
            <div key={phase} style={{
              flex: phase === 'ml' ? 4 : 4,
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '1.5px', color: PHASE_COLORS[phase],
              textAlign: 'center', padding: '4px 0',
              background: `${PHASE_COLORS[phase]}10`,
              borderRadius: 4,
            }}>
              {PHASE_LABELS[phase]}
            </div>
          ))}
        </div>
        {/* Week buttons */}
        <div style={{ display: 'flex', gap: 4 }}>
          {roadmapData.weeks.map((w: any) => {
            const bf = state.boss_fights.find(b => b.week_id === w.week_id);
            const bossData = BOSS_FIGHTS.find(b => b.week === w.week_id);
            if (!bossData) return null;
            const pc = PHASE_COLORS[bossData.phase] || '#a29bfe';
            const isSelected = selectedWeek === w.week_id;
            const isCurrent = state.current_week === w.week_id;
            return (
              <button
                key={w.week_id}
                onClick={() => { setSelectedWeek(w.week_id); setFighting(false); setActiveTab('overview'); }}
                style={{
                  flex: 1, height: 44, borderRadius: 8,
                  border: isSelected ? `2px solid ${pc}` : isCurrent ? `2px solid var(--accent-warning)` : '1px solid var(--border)',
                  background: bf?.status === 'completed'
                    ? `${pc}15`
                    : isSelected ? `${pc}10` : 'var(--bg-card)',
                  color: bf?.status === 'completed' ? pc : isSelected ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer', fontWeight: 700, fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {bf?.status === 'completed' ? '✓' : w.week_id}
                <span style={{ fontSize: 8, opacity: 0.6 }}>{bossData.emoji}</span>
                {isCurrent && !isSelected && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--accent-warning)',
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Boss Arena Card */}
      <div className={`card ${!isCompleted ? 'boss-arena' : ''}`} style={{
        padding: 0, overflow: 'hidden',
        background: isCompleted
          ? `linear-gradient(135deg, ${phaseColor}08, ${phaseColor}03)`
          : `linear-gradient(135deg, rgba(255,107,107,0.04), rgba(255,107,107,0.01))`,
        borderColor: isCompleted ? `${phaseColor}40` : undefined,
      }}>
        {/* Boss Header */}
        <div style={{
          padding: '32px 32px 24px',
          background: `linear-gradient(180deg, ${isCompleted ? phaseColor : 'var(--accent-danger)'}08, transparent)`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>
            {isCompleted ? '🏆' : boss.emoji || '👹'}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '2px',
            color: isCompleted ? phaseColor : 'var(--accent-danger)',
            fontWeight: 700, marginBottom: 4,
            background: `${isCompleted ? phaseColor : 'var(--accent-danger)'}15`,
            padding: '4px 12px', borderRadius: 20,
          }}>
            <span>{boss.difficulty}</span>
            <span>{boss.difficultyLabel}</span>
            <span>·</span>
            <span>{boss.phaseLabel}</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>
            {isCompleted && <span style={{ color: phaseColor }}>✦ </span>}
            {boss.name}
          </h2>
          <p style={{
            color: 'var(--text-secondary)', marginTop: 12, maxWidth: 550,
            margin: '12px auto 0', lineHeight: 1.7, fontSize: 14, fontStyle: 'italic',
          }}>
            &ldquo;{boss.lore}&rdquo;
          </p>

          {/* Skills */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            {(boss.skills || []).map((s: string, i: number) => (
              <span key={i} style={{
                fontSize: 11, padding: '3px 10px', borderRadius: 20,
                background: `${phaseColor}15`, color: phaseColor,
                border: `1px solid ${phaseColor}30`, fontWeight: 500,
              }}>{s}</span>
            ))}
          </div>

          {/* XP Reward */}
          <div style={{ marginTop: 20 }}>
            <span style={{
              fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-mono)',
              color: 'var(--accent-warning)',
            }}>
              {boss.xpReward} XP
            </span>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>REWARD</div>
          </div>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div style={{ padding: '0 32px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>WEEK {selectedWeek} PROGRESS</span>
              <span>{weekCompleted}/{weekTasks} tasks · {progressPct}%</span>
            </div>
            <div style={{ width: '100%', height: 8, background: 'var(--bg-hover)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                width: `${progressPct}%`, height: '100%',
                background: canFight
                  ? `linear-gradient(90deg, ${phaseColor}, var(--accent-warning))`
                  : phaseColor,
                borderRadius: 4, transition: 'width 0.5s ease',
              }} />
            </div>
            {!canFight && (
              <p style={{ fontSize: 12, color: 'var(--accent-warning)', marginTop: 6 }}>
                ⚡ Complete at least 10 tasks this week to unlock the boss fight
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ padding: '0 32px 24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/boss-fight/guide" className="btn-ghost" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px' }}>
              📖 Read Full Doc
            </Link>
            {!isCompleted && (
              fighting ? (
                <button
                  className="btn-primary"
                  style={{ padding: '14px 40px', fontSize: 16 }}
                  onClick={() => { completeBossFight(selectedWeek, 100, boss.xpReward); setFighting(false); }}
                >
                  ⚔️ Claim Victory!
                </button>
              ) : (
                <button
                  className="btn-primary"
                  disabled={!canFight}
                  style={{
                    padding: '14px 40px', fontSize: 16,
                    opacity: canFight ? 1 : 0.4,
                    cursor: canFight ? 'pointer' : 'not-allowed',
                    background: canFight ? `linear-gradient(135deg, ${phaseColor}, ${phaseColor}cc)` : undefined,
                  }}
                  onClick={() => setFighting(true)}
                >
                  {canFight ? '⚔️ Begin Boss Fight' : '🔒 Locked'}
                </button>
              )
            )}
          </div>
          {isCompleted && (
            <div style={{ color: phaseColor, fontWeight: 700, fontSize: 16 }}>
              ✅ Victory! +{boss.xpReward} XP earned
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginTop: 20, marginBottom: 16 }}>
        {([
          { key: 'overview', label: '📋 Win Conditions', },
          { key: 'daily', label: '📅 Daily Tasks' },
          { key: 'checklist', label: '☠️ Fail / Drops' },
        ] as const).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1, padding: '10px 16px', borderRadius: 8,
              border: activeTab === tab.key ? `1px solid ${phaseColor}` : '1px solid var(--border)',
              background: activeTab === tab.key ? `${phaseColor}12` : 'var(--bg-card)',
              color: activeTab === tab.key ? phaseColor : 'var(--text-secondary)',
              cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-sans)',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Win Conditions */}
      {activeTab === 'overview' && (
        <div className="card-flat fade-in" style={{ padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: phaseColor }}>
            🎯 Win Conditions
          </div>
          {(boss.winConditions || []).map((wc: string, i: number) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0',
              borderBottom: i < (boss.winConditions?.length || 0) - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ color: isCompleted ? 'var(--accent-success)' : 'var(--text-muted)', fontSize: 14, marginTop: 1 }}>
                {isCompleted ? '✅' : '⬜'}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>{wc}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Daily Tasks */}
      {activeTab === 'daily' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(boss.dailyTasks || []).map((dt: any, idx: number) => (
            <div key={idx} className="card-flat" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `${phaseColor}15`, border: `1px solid ${phaseColor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, fontFamily: 'var(--font-mono)', color: phaseColor,
                }}>
                  D{dt.day}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {dt.dayLabel}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{dt.title}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {getDayCompletion(dt.day, dt.subtasks.length)}/{dt.subtasks.length}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 42 }}>
                {dt.subtasks.map((st: string, si: number) => {
                  const dailyTaskId = `boss_w${selectedWeek}_d${dt.day}`;
                  const subtaskId = `${dailyTaskId}_st${si}`;
                  const isDone = getSubtaskStatus(dt.day, si);
                  return (
                    <div key={si}
                      onClick={() => toggleSubtask(dailyTaskId, subtaskId)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer',
                        padding: '6px 8px', borderRadius: 6,
                        background: isDone ? `${phaseColor}08` : 'transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                        border: `1.5px solid ${isDone ? phaseColor : 'var(--text-muted)'}`,
                        background: isDone ? phaseColor : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}>
                        {isDone && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
                      </div>
                      <span style={{
                        fontSize: 13, lineHeight: 1.5,
                        textDecoration: isDone ? 'line-through' : 'none',
                        color: isDone ? 'var(--text-muted)' : 'var(--text-secondary)',
                      }}>{st}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Fail Conditions + Boss Drops */}
      {activeTab === 'checklist' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Fail Conditions */}
          <div className="card-flat" style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--accent-danger)' }}>
              ☠️ Instant Fail Conditions
            </div>
            {(boss.failConditions || []).map((fc: string, i: number) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
                fontSize: 13, color: 'var(--text-secondary)',
              }}>
                <span style={{ color: 'var(--accent-danger)' }}>✕</span>
                {fc}
              </div>
            ))}
          </div>

          {/* Boss Drops */}
          <div className="card-flat" style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--accent-warning)' }}>
              🎁 Boss Drops (What You Unlock)
            </div>
            {(boss.bossDrops || []).map((bd: string, i: number) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
                fontSize: 13, color: 'var(--text-secondary)',
              }}>
                <span style={{ color: 'var(--accent-warning)' }}>★</span>
                {bd}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

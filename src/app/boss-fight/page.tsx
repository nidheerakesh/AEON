'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import roadmapData from '@/data/roadmap.json';

export default function BossFightPage() {
  const { state, completeBossFight } = useApp();
  const [mounted, setMounted] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(state.current_week);
  const [fighting, setFighting] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const week = roadmapData.weeks.find((w: any) => w.week_id === selectedWeek);
  if (!week) return null;

  const boss = week.boss_fight as any;
  const bfProgress = state.boss_fights.find(b => b.week_id === selectedWeek);
  const isCompleted = bfProgress?.status === 'completed';

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

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span style={{ color: 'var(--accent-danger)' }}>Boss Fight</span> ⚔️
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
          Weekly challenges to test your skills
        </p>
      </div>

      {/* Week selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {roadmapData.weeks.map((w: any) => {
          const bf = state.boss_fights.find(b => b.week_id === w.week_id);
          return (
            <button
              key={w.week_id}
              onClick={() => setSelectedWeek(w.week_id)}
              style={{
                width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                border: selectedWeek === w.week_id ? '2px solid var(--accent-danger)' : '1px solid var(--border)',
                background: bf?.status === 'completed' ? 'rgba(85,239,196,0.15)' : selectedWeek === w.week_id ? 'rgba(255,107,107,0.1)' : 'var(--bg-card)',
                color: bf?.status === 'completed' ? 'var(--accent-success)' : 'var(--text-secondary)',
                cursor: 'pointer', fontWeight: 700, fontSize: 14,
                fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {bf?.status === 'completed' ? '✓' : w.week_id}
            </button>
          );
        })}
      </div>

      {/* Boss Card */}
      <div className={`card ${!isCompleted ? 'boss-arena' : ''}`} style={{
        padding: 32,
        background: isCompleted
          ? 'linear-gradient(135deg, rgba(85,239,196,0.05), rgba(85,239,196,0.02))'
          : 'linear-gradient(135deg, rgba(255,107,107,0.05), rgba(255,107,107,0.02))',
        borderColor: isCompleted ? 'rgba(85,239,196,0.3)' : undefined,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>
            {isCompleted ? '🏆' : '👹'}
          </div>
          <div style={{
            fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px',
            color: isCompleted ? 'var(--accent-success)' : 'var(--accent-danger)',
            fontWeight: 700,
          }}>
            {isCompleted ? 'DEFEATED' : `WEEK ${selectedWeek} BOSS`}
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>
            {boss.name}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500, margin: '12px auto 0', lineHeight: 1.6 }}>
            {boss.challenge}
          </p>

          {/* HP Bar */}
          {!isCompleted && (
            <div style={{ marginTop: 24, maxWidth: 400, margin: '24px auto 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
                <span>TASKS COMPLETED</span>
                <span>{weekCompleted}/{weekTasks}</span>
              </div>
              <div style={{ width: '100%', height: 10, background: 'var(--bg-hover)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{
                  width: `${weekTasks ? (weekCompleted / weekTasks) * 100 : 0}%`,
                  height: '100%',
                  background: canFight
                    ? 'linear-gradient(90deg, var(--accent-danger), var(--accent-warning))'
                    : 'var(--accent-danger)',
                  borderRadius: 5,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              {!canFight && (
                <p style={{ fontSize: 12, color: 'var(--accent-warning)', marginTop: 8 }}>
                  Complete at least 10 tasks this week to unlock the boss fight
                </p>
              )}
            </div>
          )}

          {/* XP Reward */}
          <div style={{ marginTop: 24 }}>
            <span style={{
              fontSize: 32, fontWeight: 900, fontFamily: 'var(--font-mono)',
              color: 'var(--accent-warning)',
            }}>
              {boss.xp_reward} XP
            </span>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>REWARD</div>
          </div>

          {/* Action */}
          {!isCompleted && (
            <div style={{ marginTop: 24 }}>
              {fighting ? (
                <div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Complete the challenge above, then claim your victory! 🗡️
                  </p>
                  <button
                    className="btn-primary"
                    style={{ padding: '14px 40px', fontSize: 16 }}
                    onClick={() => {
                      completeBossFight(selectedWeek, 100, boss.xp_reward);
                      setFighting(false);
                    }}
                  >
                    ⚔️ Claim Victory!
                  </button>
                </div>
              ) : (
                <button
                  className="btn-primary"
                  disabled={!canFight}
                  style={{
                    padding: '14px 40px', fontSize: 16,
                    opacity: canFight ? 1 : 0.4,
                    cursor: canFight ? 'pointer' : 'not-allowed',
                  }}
                  onClick={() => setFighting(true)}
                >
                  {canFight ? '⚔️ Begin Boss Fight' : '🔒 Locked'}
                </button>
              )}
            </div>
          )}

          {isCompleted && (
            <div style={{ marginTop: 24, color: 'var(--accent-success)', fontWeight: 700 }}>
              ✅ Victory! +{boss.xp_reward} XP earned
            </div>
          )}
        </div>
      </div>

      {/* Requirements */}
      <div className="card-flat" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Requirements</div>
        {(boss.requirements as string[]).map((r: string, i: number) => (
          <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
            <span style={{ color: canFight ? 'var(--accent-success)' : 'var(--text-muted)' }}>
              {canFight ? '✅' : '⬜'}
            </span>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

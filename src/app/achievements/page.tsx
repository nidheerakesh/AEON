'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ACHIEVEMENTS, Achievement, getTierColor, getTierBgColor, getUnlockedAchievements } from '@/lib/achievements';

export default function AchievementsPage() {
  const { state } = useApp();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'all' | Achievement['category']>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const unlockedIds = getUnlockedAchievements(state);
  const unlocked = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id));

  const filtered = filter === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === filter);

  const totalXPFromAchievements = unlocked.reduce((s, a) => s + a.xp_reward, 0);

  const categoryIcons: Record<Achievement['category'], string> = {
    progress: '📈', streak: '🔥', boss: '⚔️', special: '✨',
  };

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>
            <span className="glow-text">Achievements</span> 🏆
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
            {unlocked.length}/{ACHIEVEMENTS.length} unlocked · {totalXPFromAchievements} bonus XP earned
          </p>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="card fade-in" style={{
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24,
        background: 'linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))',
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: `conic-gradient(var(--accent-warning) ${(unlocked.length / ACHIEVEMENTS.length) * 360}deg, var(--bg-hover) 0)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-card)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)' }}>
              {Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {unlocked.length} of {ACHIEVEMENTS.length} Achievements
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Keep completing tasks, building streaks, and defeating bosses to unlock more!
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            {(['bronze', 'silver', 'gold', 'diamond'] as const).map(tier => {
              const count = unlocked.filter(a => a.tier === tier).length;
              const total = ACHIEVEMENTS.filter(a => a.tier === tier).length;
              return (
                <div key={tier} style={{
                  padding: '4px 12px', borderRadius: 20,
                  background: getTierBgColor(tier),
                  border: `1px solid ${getTierColor(tier)}30`,
                  fontSize: 11, fontWeight: 600,
                  color: getTierColor(tier),
                }}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}: {count}/{total}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }} className="fade-in fade-in-delay-1">
        <button
          className="btn-ghost"
          onClick={() => setFilter('all')}
          style={{
            background: filter === 'all' ? 'var(--accent-primary)20' : undefined,
            borderColor: filter === 'all' ? 'var(--accent-primary)' : undefined,
            color: filter === 'all' ? 'var(--accent-primary)' : undefined,
          }}
        >All</button>
        {(Object.entries(categoryIcons) as [Achievement['category'], string][]).map(([cat, icon]) => (
          <button
            key={cat}
            className="btn-ghost"
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? 'var(--accent-primary)20' : undefined,
              borderColor: filter === cat ? 'var(--accent-primary)' : undefined,
              color: filter === cat ? 'var(--accent-primary)' : undefined,
            }}
          >{icon} {cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="fade-in fade-in-delay-2" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
      }}>
        {filtered.map(achievement => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const isHovered = hoveredId === achievement.id;

          return (
            <div
              key={achievement.id}
              onMouseEnter={() => setHoveredId(achievement.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: 20,
                borderRadius: 'var(--radius-lg)',
                background: isUnlocked
                  ? getTierBgColor(achievement.tier)
                  : 'var(--bg-card)',
                border: `1px solid ${isUnlocked ? `${getTierColor(achievement.tier)}40` : 'var(--border)'}`,
                opacity: isUnlocked ? 1 : 0.5,
                transform: isHovered ? 'translateY(-2px) scale(1.01)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Tier indicator */}
              <div style={{
                position: 'absolute', top: 12, right: 12,
                fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '1px', color: getTierColor(achievement.tier),
              }}>
                {achievement.tier}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: 36, marginBottom: 10,
                filter: isUnlocked ? 'none' : 'grayscale(1)',
              }}>
                {achievement.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 15, fontWeight: 700,
                color: isUnlocked ? getTierColor(achievement.tier) : 'var(--text-muted)',
              }}>
                {achievement.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 12, color: 'var(--text-secondary)',
                marginTop: 4, lineHeight: 1.4,
              }}>
                {achievement.description}
              </p>

              {/* XP */}
              <div style={{
                marginTop: 10,
                fontSize: 12, fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: isUnlocked ? 'var(--accent-warning)' : 'var(--text-muted)',
              }}>
                {isUnlocked ? `+${achievement.xp_reward} XP Earned` : `${achievement.xp_reward} XP`}
              </div>

              {/* Unlocked glow */}
              {isUnlocked && (
                <div style={{
                  position: 'absolute', bottom: -20, right: -20,
                  width: 80, height: 80, borderRadius: '50%',
                  background: `radial-gradient(circle, ${getTierColor(achievement.tier)}20, transparent)`,
                  pointerEvents: 'none',
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

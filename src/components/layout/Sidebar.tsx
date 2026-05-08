'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getXPProgress } from '@/lib/xp-engine';
import { getUnlockedAchievements } from '@/lib/achievements';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '' },
  { href: '/roadmap', label: 'Roadmap', icon: '' },
  { href: '/planner', label: 'Daily Plan', icon: '' },
  { href: '/calendar', label: 'Calendar', icon: '' },
  { href: '/focus', label: 'Focus Mode', icon: '' },
  { href: '/boss-fight', label: 'Boss Fight', icon: '' },
  { href: '/analytics', label: 'Analytics', icon: '' },
  { href: '/achievements', label: 'Achievements', icon: '' },
  { href: '/notes', label: 'Notes', icon: '' },
  { href: '/settings', label: 'Settings', icon: '' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const xpInfo = getXPProgress(state.xp);
  const achievementCount = mounted ? getUnlockedAchievements(state).length : 0;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        style={{
          position: 'fixed', top: 12, left: 12, zIndex: 60,
          width: 40, height: 40, borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: 'var(--text-primary)',
        }}
      >
        {mobileOpen ? '' : ''}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 45, display: 'none',
          }}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`} style={{
        background: 'var(--bg-tertiary)',
        borderRight: '1px solid var(--border)',
        boxShadow: '4px 0 0 var(--border)',
        zIndex: 50
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: '-1px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span className="glow-text">AEON</span>
            <span style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 4,
              background: 'var(--accent-primary)20',
              color: 'var(--accent-primary)', fontWeight: 700,
              letterSpacing: '1px', textTransform: 'uppercase',
            }}>v2</span>
          </h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Learning Engine
          </p>
        </div>

        {/* XP Bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{mounted ? xpInfo.current.badge_emoji : ''}</span>
              <span>{mounted ? xpInfo.current.name : 'Loading...'}</span>
            </span>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-warning)' }}>
              {mounted ? `Lv.${xpInfo.current.level}` : ''}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: 6,
            background: 'var(--bg-hover)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <div
              className="progress-glow"
              style={{
                width: `${xpInfo.progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                borderRadius: 3,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {mounted ? `${state.xp} XP` : ''}
            </span>
            {mounted && xpInfo.next && (
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {xpInfo.next.xp_required} XP
              </span>
            )}
          </div>

          {/* Streak */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 12,
            padding: '8px 12px',
            background: mounted && state.streak_count > 0 ? 'rgba(253,203,110,0.1)' : 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            border: mounted && state.streak_count > 0 ? '1px solid rgba(253,203,110,0.2)' : '1px solid var(--border)',
          }}>
            <span className={mounted && state.streak_count > 0 ? 'flame' : ''} style={{ fontSize: 18 }}>
              {mounted && state.streak_count > 0 ? '' : ''}
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)', color: mounted && state.streak_count > 0 ? 'var(--accent-warning)' : 'var(--text-muted)' }}>
                {mounted ? state.streak_count : 0} day streak
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                {mounted ? state.streak_freeze_tokens : 3} freeze tokens
              </div>
            </div>
          </div>

          {/* Achievement count */}
          {mounted && (
            <Link href="/achievements" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 8, padding: '6px 12px',
              background: achievementCount > 0 ? 'rgba(255,215,0,0.05)' : 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              textDecoration: 'none', color: 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}>
              <span style={{ fontSize: 14 }}></span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                {achievementCount}/{ACHIEVEMENTS.length} achievements
              </span>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: '12px 12px', flex: 1, overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-secondary)' : 'transparent',
                  border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                  boxShadow: isActive ? 'var(--shadow-hard)' : 'none',
                  fontSize: 14,
                  fontWeight: 800,
                  transition: 'all 0.15s ease',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.href === '/achievements' && mounted && achievementCount > 0 && (
                  <span style={{
                    marginLeft: 'auto', fontSize: 10, fontFamily: 'var(--font-mono)',
                    padding: '2px 6px', borderRadius: 10,
                    background: 'rgba(255,215,0,0.15)', color: '#ffd700',
                  }}>
                    {achievementCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Week indicator */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border)',
          fontSize: 12,
          color: 'var(--text-muted)',
        }}>
          {mounted ? (
            <>
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                Week {state.current_week}  Day {state.current_day}
              </div>
              <div style={{ marginTop: 4 }}>
                {Math.round(((state.current_week - 1) * 6 + state.current_day) / 72 * 100)}% journey complete
              </div>
            </>
          ) : (
            <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Loading...</div>
          )}
        </div>
      </aside>
    </>
  );
}

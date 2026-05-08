'use client';

import { BOSSFIGHT_MARKDOWN } from '@/data/boss-fights';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BossFightGuidePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // Simple Markdown to HTML parser
  const renderMarkdown = (md: string) => {
    return md
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('# ')) return <h1 key={i} style={{ fontSize: 32, fontWeight: 800, margin: '32px 0 16px', color: 'var(--text-primary)' }}>{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: 24, fontWeight: 700, margin: '24px 0 12px', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>{line.slice(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: 18, fontWeight: 700, margin: '20px 0 8px', color: 'var(--text-primary)' }}>{line.slice(4)}</h3>;
        
        // Lists
        if (line.startsWith('- [ ] ')) return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0', paddingLeft: 12 }}>
            <div style={{ width: 16, height: 16, border: '1px solid var(--text-muted)', borderRadius: 4 }} />
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{line.slice(6)}</span>
          </div>
        );
        if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 20, fontSize: 14, color: 'var(--text-secondary)', margin: '4px 0' }}>{line.slice(2)}</li>;
        
        // Quotes
        if (line.startsWith('> ')) return (
          <blockquote key={i} style={{ borderLeft: '4px solid var(--accent-primary)', padding: '8px 16px', background: 'var(--bg-tertiary)', margin: '16px 0', fontStyle: 'italic', color: 'var(--text-secondary)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
            {line.slice(2)}
          </blockquote>
        );

        // Separators
        if (line === '---') return <hr key={i} style={{ border: 'none', height: 1, background: 'var(--border)', margin: '32px 0' }} />;

        // Table (simple check)
        if (line.startsWith('|')) return (
           <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', padding: '2px 8px', background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{line}</div>
        );

        // Empty lines
        if (line.trim() === '') return <div key={i} style={{ height: 12 }} />;

        // Paragraphs
        return <p key={i} style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 8 }}>{line}</p>;
      });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }} className="fade-in">
      <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/boss-fight" style={{ textDecoration: 'none', color: 'var(--accent-primary)', fontSize: 14, fontWeight: 600 }}>
          ← Back to Arena
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Full Guide Document</span>
      </div>

      <div className="card" style={{ padding: '40px 48px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>Original Document</div>
            <h1 style={{ fontSize: 36, fontWeight: 900 }}>BOSS FIGHT GUIDE</h1>
            <div style={{ width: 60, height: 4, background: 'var(--accent-primary)', margin: '16px auto' }} />
        </div>

        <div className="markdown-content">
          {renderMarkdown(BOSSFIGHT_MARKDOWN)}
        </div>
      </div>

      <div style={{ marginTop: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
        AEON Learning Engine · Phase 1-3 Documentation
      </div>
    </div>
  );
}

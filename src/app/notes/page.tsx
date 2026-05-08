'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

interface GitCommit {
  id: string;
  hash: string;
  message: string;
  repo: string;
  date: string;
}

export default function NotesPage() {
  const { state, addNote, dispatch } = useApp();
  const [mounted, setMounted] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  // Git Commit Section State
  const [gitCommits, setGitCommits] = useState<GitCommit[]>([]);
  const [newHash, setNewHash] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [showGitForm, setShowGitForm] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hydrate git commits from localStorage
    try {
      const saved = localStorage.getItem('aeon_git_commits');
      if (saved) {
        setGitCommits(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('aeon_git_commits', JSON.stringify(gitCommits));
      } catch {}
    }
  }, [gitCommits, mounted]);

  if (!mounted) return null;

  const filteredNotes = filter === 'all'
    ? state.notes
    : state.notes.filter(n => n.tags.includes(filter));

  const allTags = [...new Set(state.notes.flatMap(n => n.tags))];

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addNote({
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setShowForm(false);
  };

  const handleAddCommit = () => {
    if (!newHash.trim() || !newMsg.trim()) return;
    const commit: GitCommit = {
      id: `commit_${Date.now()}`,
      hash: newHash.trim().toLowerCase(),
      message: newMsg.trim(),
      repo: newRepo.trim() || 'AEON Engine',
      date: new Date().toISOString(),
    };
    setGitCommits(prev => [commit, ...prev]);
    setNewHash('');
    setNewMsg('');
    setShowGitForm(false);
  };

  const handleDeleteCommit = (id: string) => {
    setGitCommits(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>
            <span className="glow-text">Notes & Git Integration</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
            Track your learnings and log your commits
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" onClick={() => setShowGitForm(!showGitForm)}>
            {showGitForm ? '✕ Close Git' : '🔗 Log Commit'}
          </button>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ New Note'}
          </button>
        </div>
      </div>

      {/* New Note Form */}
      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Note title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--bg-hover)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)', fontSize: 15, fontWeight: 600,
              fontFamily: 'var(--font-sans)', outline: 'none', marginBottom: 12,
            }}
          />
          <textarea
            placeholder="Write your notes here... (Markdown supported)"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            rows={6}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--bg-hover)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)', fontSize: 14, resize: 'vertical',
              fontFamily: 'var(--font-mono)', outline: 'none', marginBottom: 12,
              lineHeight: 1.6,
            }}
          />
          <input
            type="text"
            placeholder="Tags (comma separated): backend, http, apis"
            value={newTags}
            onChange={e => setNewTags(e.target.value)}
            style={{
              width: '100%', padding: '8px 14px', background: 'var(--bg-hover)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)', fontSize: 13,
              fontFamily: 'var(--font-sans)', outline: 'none', marginBottom: 12,
            }}
          />
          <button className="btn-primary" onClick={handleAdd}>Save Note</button>
        </div>
      )}

      {/* Log Commit Form */}
      {showGitForm && (
        <div className="card fade-in" style={{
          marginBottom: 24, border: '1px solid var(--accent-secondary)',
          background: 'var(--bg-secondary)'
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--accent-secondary)' }}>
            Log Repository Commit
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 12, marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Hash (e.g., a8c2fd0)"
              value={newHash}
              onChange={e => setNewHash(e.target.value)}
              style={{
                padding: '10px 14px', background: 'var(--bg-hover)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-mono)',
                outline: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Commit message..."
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              style={{
                padding: '10px 14px', background: 'var(--bg-hover)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)', fontSize: 14,
                outline: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Repository..."
              value={newRepo}
              onChange={e => setNewRepo(e.target.value)}
              style={{
                padding: '10px 14px', background: 'var(--bg-hover)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)', fontSize: 14,
                outline: 'none',
              }}
            />
          </div>
          <button className="btn-primary" onClick={handleAddCommit} style={{ background: 'var(--accent-secondary)' }}>
            Link Commit
          </button>
        </div>
      )}

      {/* Grid Layout for Notes + Commits */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left Column: Notes */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            My Learnings
          </h2>

          {/* Tags filter */}
          {allTags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
              <button
                className="btn-ghost"
                onClick={() => setFilter('all')}
                style={{
                  background: filter === 'all' ? 'var(--accent-primary)20' : undefined,
                  borderColor: filter === 'all' ? 'var(--accent-primary)' : undefined,
                  color: filter === 'all' ? 'var(--accent-primary)' : undefined,
                }}
              >All</button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className="btn-ghost"
                  onClick={() => setFilter(tag)}
                  style={{
                    background: filter === tag ? 'var(--accent-primary)20' : undefined,
                    borderColor: filter === tag ? 'var(--accent-primary)' : undefined,
                    color: filter === tag ? 'var(--accent-primary)' : undefined,
                  }}
                >#{tag}</button>
              ))}
            </div>
          )}

          {filteredNotes.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>
              <p style={{ color: 'var(--text-secondary)' }}>No notes found.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredNotes.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map(note => (
                <div key={note.id} className="card" style={{ position: 'relative' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{note.title}</h3>
                  <p style={{
                    fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {note.content}
                  </p>
                  {note.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 12, flexWrap: 'wrap' }}>
                      {note.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: 10, padding: '2px 8px', borderRadius: 10,
                          background: 'var(--bg-hover)', color: 'var(--accent-primary)',
                        }}>#{tag}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 12 }}>
                    {new Date(note.updated_at).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'DELETE_NOTE', noteId: note.id })}
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: 'var(--text-muted)', fontSize: 14,
                    }}
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Commits */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            Git Commit Tracker
          </h2>

          <div className="card" style={{ padding: 16, background: 'var(--bg-secondary)' }}>
            {gitCommits.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: 24 }}>
                No commits logged yet. Use the button above to log your git work.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {gitCommits.map(commit => (
                  <div key={commit.id} style={{
                    background: 'var(--bg-hover)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '10px 12px',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                        color: 'var(--accent-secondary)', background: 'rgba(0,206,201,0.1)',
                        padding: '2px 6px', borderRadius: 4
                      }}>
                        {commit.hash}
                      </span>
                      <button
                        onClick={() => handleDeleteCommit(commit.id)}
                        style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          color: 'var(--text-muted)', fontSize: 12
                        }}
                      >✕</button>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, marginTop: 6, color: 'var(--text-primary)' }}>
                      {commit.message}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>
                      <span>{commit.repo}</span>
                      <span>{new Date(commit.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

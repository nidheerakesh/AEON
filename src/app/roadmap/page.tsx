'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { topicTrees } from '@/data/topic-trees';
import { TopicNode as TopicNodeType, TopicStatus } from '@/types';

const statusColors: Record<TopicStatus, string> = {
  locked: 'var(--text-muted)',
  available: 'var(--accent-secondary)',
  in_progress: 'var(--accent-primary)',
  completed: 'var(--accent-success)',
};

const statusIcons: Record<TopicStatus, string> = {
  locked: '🔒',
  available: '📖',
  in_progress: '⏳',
  completed: '✅',
};

const treeTabs = [
  { key: 'backend', label: 'Backend', icon: '⚙️', color: 'var(--cat-backend)' },
  { key: 'ml', label: 'Machine Learning', icon: '🧠', color: 'var(--cat-ml)' },
  { key: 'dsa', label: 'DSA', icon: '🧩', color: 'var(--cat-dsa)' },
] as const;

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'backend' | 'ml' | 'dsa'>('backend');
  const { state } = useApp();

  const tree = topicTrees[activeTab];
  const completedCount = countCompleted(tree, state.completed_topics);
  const totalCount = countTotal(tree);

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          <span className="glow-text">Roadmap</span> 🗺️
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>
          Your learning path — expand topics to explore
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {treeTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              border: activeTab === tab.key ? `1px solid ${tab.color}` : '1px solid var(--border)',
              background: activeTab === tab.key ? `${tab.color}15` : 'var(--bg-card)',
              color: activeTab === tab.key ? tab.color : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="card-flat" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
            {activeTab.toUpperCase()} PROGRESS
          </div>
          <div style={{
            width: '100%', height: 8,
            background: 'var(--bg-hover)', borderRadius: 4,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%`,
              height: '100%',
              background: treeTabs.find(t => t.key === activeTab)?.color,
              borderRadius: 4,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Tree */}
      <div className="card fade-in fade-in-delay-1" style={{ padding: 24 }}>
        <TreeNodeComponent node={tree} depth={0} completedTopics={state.completed_topics} />
      </div>
    </div>
  );
}

function TreeNodeComponent({ node, depth, completedTopics }: {
  node: TopicNodeType;
  depth: number;
  completedTopics: string[];
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isComplete = completedTopics.includes(node.id);
  const effectiveStatus: TopicStatus = isComplete ? 'completed' : node.status;

  return (
    <div style={{ marginLeft: depth > 0 ? 0 : 0 }}>
      <div
        className="tree-node"
        onClick={() => hasChildren && setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderLeft: depth > 0 ? `2px solid ${statusColors[effectiveStatus]}20` : 'none',
          marginLeft: depth > 0 ? 16 : 0,
          paddingLeft: depth > 0 ? 16 : 12,
        }}
      >
        {/* Expand indicator */}
        {hasChildren && (
          <span style={{
            fontSize: 10,
            color: 'var(--text-muted)',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
            width: 16,
            textAlign: 'center',
          }}>
            ▶
          </span>
        )}
        {!hasChildren && <span style={{ width: 16 }} />}

        {/* Status icon */}
        <span style={{ fontSize: 14 }}>{statusIcons[effectiveStatus]}</span>

        {/* Label */}
        <span style={{
          fontSize: depth === 0 ? 16 : depth === 1 ? 14 : 13,
          fontWeight: depth < 2 ? 600 : 400,
          color: effectiveStatus === 'locked' ? 'var(--text-muted)' : 'var(--text-primary)',
        }}>
          {node.label}
        </span>

        {/* Count badge */}
        {hasChildren && (
          <span style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            background: 'var(--bg-hover)',
            padding: '2px 6px',
            borderRadius: 10,
          }}>
            {node.children!.filter(c => completedTopics.includes(c.id)).length}/{node.children!.length}
          </span>
        )}

        {/* Status dot */}
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: statusColors[effectiveStatus],
          marginLeft: 'auto',
          opacity: 0.7,
        }} />
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div style={{ marginTop: 2 }}>
          {node.children!.map(child => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              depth={depth + 1}
              completedTopics={completedTopics}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function countCompleted(node: TopicNodeType, completed: string[]): number {
  let count = completed.includes(node.id) ? 1 : 0;
  if (node.children) {
    for (const c of node.children) count += countCompleted(c, completed);
  }
  return count;
}

function countTotal(node: TopicNodeType): number {
  let count = node.children ? 0 : 1;
  if (node.children) {
    for (const c of node.children) count += countTotal(c);
  }
  return count;
}

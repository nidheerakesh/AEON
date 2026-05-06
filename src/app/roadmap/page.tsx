'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { topicTrees } from '@/data/topic-trees';
import { TopicNode as TopicNodeType, TopicStatus } from '@/types';
import roadmapData from '@/data/roadmap.json';

// Flatten all tasks from roadmapData and attach week/day
const allRoadmapTasks = roadmapData.weeks.flatMap(w => 
  w.days.flatMap(d => 
    Object.values(d.tasks).flat().map((t: any) => ({
      ...t,
      week_id: w.week_id,
      day_id: d.day_id
    }))
  )
);

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
  { key: 'ai_ml', label: 'Machine Learning', icon: '🧠', color: 'var(--cat-ml)' },
  { key: 'backend', label: 'Backend', icon: '⚙️', color: 'var(--cat-backend)' },
  { key: 'mlops', label: 'MLOps', icon: '⚙️', color: 'var(--cat-ml)' },
  { key: 'dsa', label: 'DSA', icon: '🧩', color: 'var(--cat-dsa)' },
] as const;

function buildDynamicTree(category: 'ai_ml' | 'backend' | 'mlops' | 'dsa'): TopicNodeType {
  let catKey = category === 'mlops' ? 'ai_ml' : category; // mlops is stored under ai_ml in weeks 9-12
  let startWeek = 1;
  let endWeek = 12;
  
  if (category === 'ai_ml') { endWeek = 4; }
  else if (category === 'backend') { startWeek = 5; endWeek = 8; }
  else if (category === 'mlops') { startWeek = 9; endWeek = 12; }

  const root: TopicNodeType = {
    id: category,
    label: treeTabs.find(t => t.key === category)?.label || 'Track',
    status: 'available',
    children: []
  };

  roadmapData.weeks.forEach((w: any) => {
    if (w.week_id < startWeek || w.week_id > endWeek) return;
    
    const weekNode: TopicNodeType = {
      id: `${category}_w${w.week_id}`,
      label: `Week ${w.week_id}: ${w.theme}`,
      status: 'available',
      children: []
    };

    w.days.forEach((d: any) => {
      const tasks = d.tasks[catKey] || [];
      if (tasks.length === 0) return;
      const t = tasks[0];
      
      weekNode.children!.push({
        id: `node_${t.id}`,
        label: `Day ${d.day_id} — ${t.title}`,
        status: 'available',
        linked_tasks: [t.id]
      });
    });

    if (weekNode.children!.length > 0) {
      root.children!.push(weekNode);
    }
  });

  return root;
}

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'ai_ml' | 'backend' | 'mlops' | 'dsa'>('ai_ml');
  const { state, toggleSubtask } = useApp();

  const getRealDate = (weekId: number, dayId: number) => {
    if (!state.settings?.start_date) return null;
    try {
      const startDate = new Date(state.settings.start_date);
      const daysOffset = (weekId - 1) * 7 + (dayId - 1);
      const date = new Date(startDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return null;
    }
  };

  const tree = buildDynamicTree(activeTab);
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
        <TreeNodeComponent 
          node={tree} 
          depth={0} 
          completedTopics={state.completed_topics} 
          getRealDate={getRealDate}
          toggleSubtask={toggleSubtask}
          taskProgress={state.task_progress}
        />
      </div>
    </div>
  );
}

function TreeNodeComponent({ node, depth, completedTopics, getRealDate, toggleSubtask, taskProgress }: {
  node: TopicNodeType;
  depth: number;
  completedTopics: string[];
  getRealDate: (w: number, d: number) => string | null;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  taskProgress: any;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const hasTasks = node.linked_tasks && node.linked_tasks.length > 0;
  const isComplete = completedTopics.includes(node.id);
  const effectiveStatus: TopicStatus = isComplete ? 'completed' : node.status;

  return (
    <div style={{ marginLeft: depth > 0 ? 0 : 0 }}>
      <div
        className="tree-node"
        onClick={() => (hasChildren || hasTasks) && setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderLeft: depth > 0 ? `2px solid ${statusColors[effectiveStatus]}20` : 'none',
          marginLeft: depth > 0 ? 16 : 0,
          paddingLeft: depth > 0 ? 16 : 12,
          cursor: (hasChildren || hasTasks) ? 'pointer' : 'default'
        }}
      >
        {/* Expand indicator */}
        {(hasChildren || hasTasks) && (
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
        {!(hasChildren || hasTasks) && <span style={{ width: 16 }} />}

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

        {/* Inline Date for leaf nodes */}
        {!hasChildren && hasTasks && (
          <span style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            background: 'var(--bg-tertiary)',
            padding: '2px 8px',
            borderRadius: 12,
            marginLeft: 8,
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap'
          }}>
            {(() => {
              const matchId = node.linked_tasks![0].replace(/1$/, '');
              const task = allRoadmapTasks.find(t => t.id === matchId);
              if (task) {
                return getRealDate(task.week_id, task.day_id) || `Week ${task.week_id}, Day ${task.day_id}`;
              }
              return 'Scheduled';
            })()}
          </span>
        )}

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

      {/* Children or Tasks */}
      {expanded && (
        <div style={{ marginTop: 2 }}>
          {hasChildren && node.children!.map(child => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              depth={depth + 1}
              completedTopics={completedTopics}
              getRealDate={getRealDate}
              toggleSubtask={toggleSubtask}
              taskProgress={taskProgress}
            />
          ))}
          
          {!hasChildren && hasTasks && (
            <div style={{ paddingLeft: depth > 0 ? 32 : 16, marginTop: 8, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {node.linked_tasks!.map(linkedId => {
                // Strip the trailing '1' to match new roadmap generator IDs
                const matchId = linkedId.replace(/1$/, '');
                const task = allRoadmapTasks.find(t => t.id === matchId);
                
                if (!task) return null;
                
                const dateStr = getRealDate(task.week_id, task.day_id) || `Week ${task.week_id}, Day ${task.day_id}`;
                const progress = taskProgress[task.id];
                
                return (
                  <div key={task.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{task.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4 }}>
                        📅 {dateStr}
                      </div>
                    </div>
                    
                    {task.resources && task.resources.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                        {task.resources.map((r: string, idx: number) => (
                          <a key={idx} href={r} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                            fontSize: 11, display: 'flex', alignItems: 'center', gap: 4,
                            background: 'var(--bg-card)', padding: '4px 8px', borderRadius: 4,
                            color: 'var(--accent-primary)', textDecoration: 'none', border: '1px solid var(--border)'
                          }}>
                            🔗 Resource {idx + 1}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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

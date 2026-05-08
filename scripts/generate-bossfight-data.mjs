import { readFileSync, writeFileSync } from 'node:fs';

const markdown = readFileSync(new URL('../src/bossfight.md', import.meta.url), 'utf8');
const outFile = new URL('../src/data/boss-fights.ts', import.meta.url);

const dayIdByLabel = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, 'sat-sun': 6 };
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday–Sunday'];

function stripMarkdown(value) {
  return value
    .replace(/^#+\s*/, '')
    .replace(/\*\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim();
}

function normalizeTaskLine(line) {
  const match = line.match(/^\s{0,4}- \[ \]\s+(.+)$/);
  return match ? stripMarkdown(match[1]) : null;
}

function collectListItems(section) {
  return section
    .split('\n')
    .map(line => normalizeTaskLine(line))
    .filter(Boolean);
}

function collectMixedListItems(section) {
  return section
    .split('\n')
    .map(line => {
      const checkbox = normalizeTaskLine(line);
      if (checkbox) return checkbox;
      const numbered = line.match(/^\d+\.\s+(.+)$/);
      if (numbered) return stripMarkdown(numbered[1]);
      const bullet = line.match(/^- (.+)$/);
      if (bullet) return stripMarkdown(bullet[1]);
      return null;
    })
    .filter(Boolean);
}

function sectionBetween(source, start, endPattern) {
  const startIdx = source.indexOf(start);
  if (startIdx === -1) return '';
  const rest = source.slice(startIdx + start.length);
  const end = rest.search(endPattern);
  return end === -1 ? rest : rest.slice(0, end);
}

function parseDays(section) {
  const dayRegex = /\*\*Day\s+([0-9](?:[–-][0-9])?)\s+\(([^)]+)\)\s+—\s+([^*]+)\*\*/g;
  const matches = [...section.matchAll(dayRegex)];
  const result = [];

  matches.forEach((match, index) => {
    const blockStart = (match.index ?? 0) + match[0].length;
    const blockEnd = matches[index + 1]?.index ?? section.length;
    const dayPart = match[1]; // e.g. "1" or "6–7"
    const title = stripMarkdown(match[3]);
    const subtasks = collectListItems(section.slice(blockStart, blockEnd));

    if (dayPart.includes('–') || dayPart.includes('-')) {
      const [start, end] = dayPart.split(/[–-]/).map(Number);
      for (let d = start; d <= end; d++) {
        result.push({
          day: d,
          dayLabel: dayLabels[d - 1] || match[2],
          title: title,
          subtasks: subtasks,
        });
      }
    } else {
      const d = Number(dayPart);
      result.push({
        day: d,
        dayLabel: dayLabels[d - 1] || match[2],
        title: title,
        subtasks: subtasks,
      });
    }
  });
  return result;
}

const weekRegex = /^## Week (\d+) —\s+(.+)$/gm;
const matches = [...markdown.matchAll(weekRegex)];

const weeks = matches.map((match, index) => {
  const weekId = Number(match[1]);
  const blockStart = match.index ?? 0;
  const blockEnd = matches[index + 1]?.index ?? markdown.length;
  const block = markdown.slice(blockStart, blockEnd);
  
  const difficultyMatch = block.match(/\*\*Difficulty:\*\*\s*([^·\n]+)(?:·\s*\*\*Skills:\*\*\s*(.+))?/);
  const quoteMatch = block.match(/^>\s+\*(.+)\*$/m);
  const emojiMatch = match[2].match(/([^\w\s\(\)]+)/);
  const emoji = emojiMatch ? emojiMatch[1].trim() : '⚔️';
  
  const winSection = sectionBetween(block, '### Win Condition', /### Daily Sub-Tasks/);
  const dailySection = sectionBetween(block, '### Daily Sub-Tasks', /### ☠️/);
  const failSection = sectionBetween(block, '### ☠️ Instant Fail Conditions', /### 🎁/);
  const dropSection = sectionBetween(block, '### 🎁', /---\n---|\n## Week|\n# /);
  const bossDropsSection = dropSection.split('\n').map(line => stripMarkdown(line)).filter(l => l && !l.startsWith('('));
  const bossDrops = bossDropsSection.length > 0 ? (collectMixedListItems(dropSection).length > 0 ? collectMixedListItems(dropSection) : bossDropsSection) : [];

  const fullDifficulty = stripMarkdown(difficultyMatch?.[1] ?? '');
  const difficultyIcon = fullDifficulty.match(/([^\w\s]+)/)?.[1] || '⚔️';
  const difficultyLabel = fullDifficulty.replace(/[^\w\s]+/g, '').trim();

  return {
    week: weekId,
    name: stripMarkdown(match[2].replace(/[^\w\s\d]+/, '').replace(/\s+\*\(.+\)\*$/, '').trim()),
    emoji: emoji,
    difficulty: difficultyIcon,
    difficultyLabel: difficultyLabel,
    phase: weekId <= 4 ? 'ml' : weekId <= 8 ? 'backend' : 'mlops',
    phaseLabel: weekId <= 4 ? 'Machine Learning' : weekId <= 8 ? 'Backend' : 'MLOps',
    skills: (difficultyMatch?.[2] ?? '').split('·').map(s => stripMarkdown(s)).filter(Boolean),
    lore: stripMarkdown(quoteMatch?.[1] ?? ''),
    winConditions: collectMixedListItems(winSection),
    failConditions: collectMixedListItems(failSection),
    bossDrops: collectMixedListItems(dropSection),
    xpReward: weekId === 12 ? 2000 : (weekId % 4 === 0 ? 1000 : 500 + (weekId * 20)),
    dailyTasks: parseDays(dailySection),
  };
});

const fileContent = `// Generated from src/bossfight.md by scripts/generate-bossfight-data.mjs
export interface BossDailyTask {
  day: number;
  dayLabel: string;
  title: string;
  subtasks: string[];
}

export interface BossData {
  week: number;
  name: string;
  emoji: string;
  difficulty: string;
  difficultyLabel: string;
  phase: string;
  phaseLabel: string;
  skills: string[];
  lore: string;
  winConditions: string[];
  failConditions: string[];
  bossDrops: string[];
  xpReward: number;
  dailyTasks: BossDailyTask[];
}

export const BOSS_FIGHTS: BossData[] = ${JSON.stringify(weeks, null, 2)};
`;

writeFileSync(outFile, fileContent);
console.log('✅ Generated boss data for ' + weeks.length + ' weeks');

const fs = require('fs');
const path = require('path');

const weeks = 12;
const daysPerWeek = 7;

function parseMarkdownFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const days = [];
  const dayBlocks = content.split(/### Day \d+ — /).slice(1);
  
  dayBlocks.forEach(block => {
    const lines = block.split('\n');
    const title = lines[0].trim();
    const subs = [];
    let mainTask = "";
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- [ ]')) {
        subs.push(line.replace('- [ ]', '').trim());
      } else if (line.startsWith('- **Task:**') || line.startsWith('- **Mini Project:**') || line.startsWith('- **Intermediate Project:**')) {
        mainTask = line.replace(/^- \*\*.*?\*\*\s*/, '').trim();
      }
    }
    
    days.push({
      title,
      description: mainTask || `Study ${title} and review concepts.`,
      subs: subs,
    });
  });
  
  return days;
}

const mlDays = parseMarkdownFile(path.join(__dirname, '../ml_roadmap_plan.md'));
const beDays = parseMarkdownFile(path.join(__dirname, '../backend_roadmap_plan.md'));
const mlopsDays = parseMarkdownFile(path.join(__dirname, '../mlops_roadmap_plan.md'));

// Ensure exactly 28 days
while(mlDays.length < 28) mlDays.push({ title: "ML Review", description: "Review ML", subs: [] });
while(beDays.length < 28) beDays.push({ title: "Backend Review", description: "Review BE", subs: [] });
while(mlopsDays.length < 28) mlopsDays.push({ title: "MLOps Review", description: "Review MLOps", subs: [] });

// CP Handbook Chapters (30 days mapped)
const cpHandbook = [
  { ch: "Introduction", subs: ["Input/Output basics", "Working with Numbers", "Shortening code"], lc: ["https://leetcode.com/problemset/all/?difficulty=EASY"] },
  { ch: "Time complexity", subs: ["Big O notation", "Estimating efficiency", "Complexity classes"], lc: ["https://leetcode.com/problemset/all/?difficulty=EASY"] },
  { ch: "Sorting", subs: ["Two Sum (LC 1)", "Merge Intervals (LC 56)", "Sort Colors (LC 75)"], lc: ["https://leetcode.com/problems/two-sum/", "https://leetcode.com/problems/merge-intervals/"] },
  { ch: "Data structures", subs: ["Valid Parentheses (LC 20)", "Min Stack (LC 155)", "LRU Cache (LC 146)"], lc: ["https://leetcode.com/problems/valid-parentheses/", "https://leetcode.com/problems/lru-cache/"] },
  { ch: "Complete search", subs: ["Subsets (LC 78)", "Permutations (LC 46)", "N-Queens (LC 51)"], lc: ["https://leetcode.com/problems/subsets/", "https://leetcode.com/problems/n-queens/"] },
  { ch: "Greedy algorithms", subs: ["Jump Game (LC 55)", "Task Scheduler (LC 621)", "Gas Station (LC 134)"], lc: ["https://leetcode.com/problems/jump-game/", "https://leetcode.com/problems/task-scheduler/"] },
  { ch: "Dynamic programming", subs: ["Climbing Stairs (LC 70)", "Coin Change (LC 322)", "Longest Increasing Subsequence (LC 300)"], lc: ["https://leetcode.com/problems/coin-change/", "https://leetcode.com/problems/longest-increasing-subsequence/"] },
  { ch: "Amortized analysis", subs: ["Subarray Sum Equals K (LC 560)", "Sliding Window Maximum (LC 239)"], lc: ["https://leetcode.com/problems/subarray-sum-equals-k/", "https://leetcode.com/problems/sliding-window-maximum/"] },
  { ch: "Range queries", subs: ["Range Sum Query - Immutable (LC 303)", "Range Sum Query - Mutable (LC 307)"], lc: ["https://leetcode.com/problems/range-sum-query-immutable/", "https://leetcode.com/problems/range-sum-query-mutable/"] },
  { ch: "Bit manipulation", subs: ["Single Number (LC 136)", "Number of 1 Bits (LC 191)", "Counting Bits (LC 338)"], lc: ["https://leetcode.com/problems/single-number/", "https://leetcode.com/problems/counting-bits/"] },
  { ch: "Basics of graphs", subs: ["Find Center of Star Graph (LC 1791)", "Find the Town Judge (LC 997)"], lc: ["https://leetcode.com/problems/find-center-of-star-graph/", "https://leetcode.com/problems/find-the-town-judge/"] },
  { ch: "Graph traversals", subs: ["Number of Islands (LC 200)", "Clone Graph (LC 133)", "Rotting Oranges (LC 994)"], lc: ["https://leetcode.com/problems/number-of-islands/", "https://leetcode.com/problems/rotting-oranges/"] },
  { ch: "Shortest paths", subs: ["Network Delay Time (LC 743)", "Cheapest Flights Within K Stops (LC 787)"], lc: ["https://leetcode.com/problems/network-delay-time/", "https://leetcode.com/problems/cheapest-flights-within-k-stops/"] },
  { ch: "Tree algorithms", subs: ["Maximum Depth of Binary Tree (LC 104)", "Diameter of Binary Tree (LC 543)", "LCA of a Binary Tree (LC 236)"], lc: ["https://leetcode.com/problems/maximum-depth-of-binary-tree/", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"] },
  { ch: "Spanning trees", subs: ["Min Cost to Connect All Points (LC 1584)"], lc: ["https://leetcode.com/problems/min-cost-to-connect-all-points/"] },
  { ch: "Directed graphs", subs: ["Course Schedule (LC 207)", "Course Schedule II (LC 210)"], lc: ["https://leetcode.com/problems/course-schedule/", "https://leetcode.com/problems/course-schedule-ii/"] },
  { ch: "Strong connectivity", subs: ["Critical Connections in a Network (LC 1192)"], lc: ["https://leetcode.com/problems/critical-connections-in-a-network/"] },
  { ch: "Tree queries", subs: ["Kth Ancestor of a Tree Node (LC 1483)"], lc: ["https://leetcode.com/problems/kth-ancestor-of-a-tree-node/"] },
  { ch: "Paths and circuits", subs: ["Reconstruct Itinerary (LC 332)"], lc: ["https://leetcode.com/problems/reconstruct-itinerary/"] },
  { ch: "Flows and cuts", subs: ["Maximum Students Taking Exam (LC 1349)"], lc: ["https://leetcode.com/problems/maximum-students-taking-exam/"] },
  { ch: "Number theory", subs: ["Count Primes (LC 204)", "Ugly Number II (LC 264)"], lc: ["https://leetcode.com/problems/count-primes/", "https://leetcode.com/problems/ugly-number-ii/"] },
  { ch: "Combinatorics", subs: ["Unique Paths (LC 62)", "Pascal's Triangle (LC 118)"], lc: ["https://leetcode.com/problems/unique-paths/", "https://leetcode.com/problems/pascals-triangle/"] },
  { ch: "Matrices", subs: ["Set Matrix Zeroes (LC 73)", "Spiral Matrix (LC 54)", "Rotate Image (LC 48)"], lc: ["https://leetcode.com/problems/set-matrix-zeroes/", "https://leetcode.com/problems/rotate-image/"] },
  { ch: "Probability", subs: ["Knight Probability in Chessboard (LC 688)"], lc: ["https://leetcode.com/problems/knight-probability-in-chessboard/"] },
  { ch: "Game theory", subs: ["Stone Game (LC 877)", "Nim Game (LC 292)"], lc: ["https://leetcode.com/problems/stone-game/"] },
  { ch: "String algorithms", subs: ["Longest Palindromic Substring (LC 5)", "Implement strStr() (LC 28)"], lc: ["https://leetcode.com/problems/longest-palindromic-substring/", "https://leetcode.com/problems/implement-strstr/"] },
  { ch: "Square root algorithms", subs: ["Range Addition (LC 370)"], lc: ["https://leetcode.com/problems/range-addition/"] },
  { ch: "Segment trees", subs: ["Count of Smaller Numbers After Self (LC 315)"], lc: ["https://leetcode.com/problems/count-of-smaller-numbers-after-self/"] },
  { ch: "Geometry", subs: ["Max Points on a Line (LC 149)", "Valid Square (LC 593)"], lc: ["https://leetcode.com/problems/max-points-on-a-line/"] },
  { ch: "Sweep line algorithms", subs: ["The Skyline Problem (LC 218)", "Meeting Rooms II (LC 253)"], lc: ["https://leetcode.com/problems/the-skyline-problem/", "https://leetcode.com/problems/meeting-rooms-ii/"] }
];

const roadmap = {
  weeks: [],
  xp_system: {
    levels: [
      { level: 1, name: "Novice", xp_required: 0, badge_emoji: "🌱" },
      { level: 2, name: "Apprentice", xp_required: 500, badge_emoji: "🌿" },
      { level: 3, name: "Adept", xp_required: 1500, badge_emoji: "🌲" },
      { level: 4, name: "Expert", xp_required: 3000, badge_emoji: "🌳" },
      { level: 5, name: "Master", xp_required: 5000, badge_emoji: "🌎" }
    ],
    task_xp: { easy: 20, medium: 40, hard: 60 },
    streak_bonus: { "3": 50, "7": 150, "30": 1000 },
    boss_fight_xp: 500
  },
  streak_rules: {
    min_tasks_per_day: 1,
    grace_days: 1,
    freeze_tokens_max: 3
  }
};

for (let w = 1; w <= weeks; w++) {
  const weekData = {
    week_id: w,
    theme: w <= 4 ? "Machine Learning" : w <= 8 ? "Backend Development" : "MLOps Engineering",
    goals: [`Master concepts of Week ${w}`],
    days: [],
    boss_fight: {
      name: `Week ${w} Boss: The Evaluator`,
      description: "A comprehensive test of this week's study.",
      challenge: "Complete a full integrated project featuring this week's concepts.",
      xp_reward: 1000,
      requirements: [`Complete all core tasks in Week ${w}`]
    }
  };

  for (let d = 1; d <= daysPerWeek; d++) {
    const absoluteDay = (w - 1) * 7 + (d - 1);
    
    // Determine Engineering Task
    let ai_ml = [];
    let backend = [];
    
    if (w <= 4) {
      const t = mlDays[absoluteDay];
      ai_ml.push({
        id: `w${w}d${d}_ml`,
        title: t.title,
        description: t.description,
        xp: 40,
        time_min: 120,
        difficulty: "medium",
        subtasks: t.subs.map((s,i) => ({ id: `st${i}`, title: s, completed: false })),
        resources: [`https://www.youtube.com/results?search_query=${encodeURIComponent(t.title)}`]
      });
    } else if (w <= 8) {
      const t = beDays[absoluteDay - 28];
      backend.push({
        id: `w${w}d${d}_be`,
        title: t.title,
        description: t.description,
        xp: 40,
        time_min: 120,
        difficulty: "medium",
        subtasks: t.subs.map((s,i) => ({ id: `st${i}`, title: s, completed: false })),
        resources: [`https://www.youtube.com/results?search_query=${encodeURIComponent(t.title)}`]
      });
    } else {
      const t = mlopsDays[absoluteDay - 56];
      ai_ml.push({
        id: `w${w}d${d}_mlops`,
        title: t.title,
        description: t.description,
        xp: 40,
        time_min: 120,
        difficulty: "medium",
        subtasks: t.subs.map((s,i) => ({ id: `st${i}`, title: s, completed: false })),
        resources: [`https://www.youtube.com/results?search_query=${encodeURIComponent(t.title)}`]
      });
    }
    
    // Determine DSA Task
    let dsaTaskData = {};
    if (absoluteDay < 30) {
      const cp = cpHandbook[absoluteDay];
      dsaTaskData = {
        title: `CP Handbook Ch ${absoluteDay + 1}: ${cp.ch}`,
        description: `Read the chapter from CP Handbook and solve LeetCode problems.`,
        subtasks: cp.subs.map((s, i) => ({ id: `st${i}`, title: s, completed: false })),
        resources: [
          `https://cses.fi/book/book.pdf`,
          ...cp.lc
        ]
      };
    } else {
      const pracNum = absoluteDay - 29;
      dsaTaskData = {
        title: `NxtWave Advanced Practice ${pracNum}`,
        description: `Solve 2 Hard and 2 Medium problems from NxtWave Launchpad / LeetCode.`,
        subtasks: [
          { id: 'st1', title: "Solve Medium problem 1", completed: false },
          { id: 'st2', title: "Solve Medium problem 2", completed: false },
          { id: 'st3', title: "Solve Hard problem 1", completed: false },
          { id: 'st4', title: "Upsolve and review editorials", completed: false }
        ],
        resources: [
          `https://leetcode.com/problemset/all/?difficulty=HARD`,
          `https://leetcode.com/problemset/all/?difficulty=MEDIUM`
        ]
      };
    }

    weekData.days.push({
      day_id: d,
      day_label: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][d-1],
      tasks: {
        ai_ml: ai_ml,
        backend: backend,
        dsa: [{
          id: `w${w}d${d}_dsa`,
          title: dsaTaskData.title,
          description: dsaTaskData.description,
          xp: 60,
          time_min: 120,
          difficulty: "hard",
          subtasks: dsaTaskData.subtasks,
          resources: dsaTaskData.resources
        }],
        build: [],
        college: []
      },
      estimated_time_min: 240
    });
  }
  roadmap.weeks.push(weekData);
}

fs.writeFileSync(path.join(__dirname, '../src/data/roadmap.json'), JSON.stringify(roadmap, null, 2));
console.log('Successfully generated new sequential roadmap.json from markdown files');

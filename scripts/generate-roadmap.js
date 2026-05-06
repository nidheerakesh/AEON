const fs = require('fs');

const weeks = 12;
const daysPerWeek = 7;

// Some broad topic domains to iterate over
const aiTopics = ["Python Basics", "NumPy & Pandas", "Data Visualization", "Scikit-Learn Basics", "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests", "SVMs", "K-Means Clustering", "PCA", "Neural Networks Intro", "PyTorch Basics", "CNNs", "RNNs", "NLP Basics", "Transformers", "Model Deployment", "MLOps Basics", "Capstone AI Project"];
const beTopics = ["Internet Basics", "HTTP/DNS", "Node.js Basics", "Express Server", "REST APIs", "PostgreSQL Intro", "Advanced SQL", "Prisma ORM", "Authentication (JWT)", "Authorization", "Docker Basics", "Caching with Redis", "Message Queues", "GraphQL", "WebSockets", "CI/CD Pipelines", "AWS Basics", "Serverless", "Microservices", "Capstone Backend Project"];
const dsaTopics = ["Time Complexity", "Arrays", "Strings", "Two Pointers", "Sliding Window", "Hash Maps", "Linked Lists", "Stacks & Queues", "Trees Basics", "BST", "Tries", "Heaps/Priority Queues", "Graphs Basics", "BFS/DFS", "Advanced Graphs", "Dynamic Programming 1D", "DP 2D", "Bit Manipulation", "Math & Geometry", "System Design Basics"];

function getTopic(category, week, day) {
  const index = Math.floor(((week - 1) * 7 + (day - 1)) / 4.2); // roughly advance topic every ~4 days
  const list = category === 'ai_ml' ? aiTopics : category === 'backend' ? beTopics : dsaTopics;
  return list[Math.min(index, list.length - 1)];
}

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
    theme: `Intensive Week ${w} - Mastery`,
    goals: ["Master AI concepts", "Build scalable backends", "Solve complex DSA"],
    days: [],
    boss_fight: {
      name: `Week ${w} Boss: The Evaluator`,
      description: "A comprehensive test of this week's 42 hours of study.",
      challenge: "Complete a full-stack integrated project featuring this week's concepts.",
      xp_reward: 1000,
      requirements: [`Complete at least 15 tasks in Week ${w}`]
    }
  };

  for (let d = 1; d <= daysPerWeek; d++) {
    const aiTopic = getTopic('ai_ml', w, d);
    const beTopic = getTopic('backend', w, d);
    const dsaTopic = getTopic('dsa', w, d);

    weekData.days.push({
      day_id: d,
      day_label: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][d-1],
      tasks: {
        ai_ml: [{
          id: `w${w}d${d}_ml`,
          title: `${aiTopic} Deep Dive`,
          description: `Spend 2 hours deeply understanding and practicing ${aiTopic}.`,
          xp: 40,
          time_min: 120,
          difficulty: "medium",
          subtasks: [
            { id: `st1`, title: "Read core documentation/theory", completed: false },
            { id: `st2`, title: "Write code examples", completed: false },
            { id: `st3`, title: "Build a mini-project or script", completed: false },
            { id: `st4`, title: "Review and summarize notes", completed: false }
          ],
          resources: [
            `https://www.youtube.com/results?search_query=${encodeURIComponent(aiTopic)}`,
            `https://towardsdatascience.com/search?q=${encodeURIComponent(aiTopic)}`
          ]
        }],
        backend: [{
          id: `w${w}d${d}_be`,
          title: `${beTopic} Implementation`,
          description: `Spend 2 hours implementing and experimenting with ${beTopic}.`,
          xp: 40,
          time_min: 120,
          difficulty: "medium",
          subtasks: [
            { id: `st1`, title: "Understand the architecture/concept", completed: false },
            { id: `st2`, title: "Set up the environment", completed: false },
            { id: `st3`, title: "Implement the feature", completed: false },
            { id: `st4`, title: "Write tests and debug", completed: false }
          ],
          resources: [
            `https://www.youtube.com/results?search_query=${encodeURIComponent(beTopic+ ' backend')}`,
            `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(beTopic)}`
          ]
        }],
        dsa: [{
          id: `w${w}d${d}_dsa`,
          title: `${dsaTopic} Problem Solving`,
          description: `Spend 2 hours solving algorithmic problems on ${dsaTopic}.`,
          xp: 40,
          time_min: 120,
          difficulty: "hard",
          subtasks: [
            { id: `st1`, title: "Review algorithm fundamentals", completed: false },
            { id: `st2`, title: "Solve 2 Easy problems", completed: false },
            { id: `st3`, title: "Solve 2 Medium problems", completed: false },
            { id: `st4`, title: "Analyze time/space complexity", completed: false }
          ],
          resources: [
            `https://leetcode.com/problemset/all/?search=${encodeURIComponent(dsaTopic.toLowerCase())}`,
            `https://www.youtube.com/results?search_query=${encodeURIComponent(dsaTopic + ' leetcode')}`
          ]
        }],
        build: [],
        college: []
      },
      estimated_time_min: 360
    });
  }
  roadmap.weeks.push(weekData);
}

fs.writeFileSync('src/data/roadmap.json', JSON.stringify(roadmap, null, 2));
console.log('Successfully generated new roadmap.json');

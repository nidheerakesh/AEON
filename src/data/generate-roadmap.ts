// Roadmap generator — run with: npx tsx src/data/generate-roadmap.ts
import * as fs from 'fs';
import * as path from 'path';

const WEEK_THEMES = [
  "Foundation — Internet, Python, Math Basics",
  "APIs & Data — REST, NumPy, Pandas",
  "Frameworks & ML Pipeline — Flask, Supervised Learning",
  "Databases & Classical ML — PostgreSQL, Regression",
  "Auth & Classification — JWT, Decision Trees, SVM",
  "DevOps & Ensemble — Docker, Random Forest, Boosting",
  "System Design & Neural Networks — Caching, Deep Learning",
  "Advanced Backend & CNNs — Microservices, Computer Vision",
  "Testing & RNNs — TDD, Sequences, NLP basics",
  "Cloud & Transformers — AWS, Attention, BERT",
  "AI Engineering — Embeddings, RAG, Vector DBs",
  "Capstone — Full Stack AI App + Boss Rush"
];

const BACKEND_TOPICS = [
  ["How the Internet works","HTTP/HTTPS deep dive","DNS & Domain Names","How Browsers work","Hosting basics"],
  ["REST API fundamentals","JSON & Serialization","HTTP Status Codes","API Design patterns","Postman & Testing APIs"],
  ["Flask setup & routing","Flask templates","Flask middleware","FastAPI intro","Request/Response cycle"],
  ["SQL fundamentals","PostgreSQL setup","CRUD operations","Joins & Relations","Database normalization"],
  ["JWT authentication","Sessions & Cookies","OAuth 2.0 concepts","Password hashing","CORS & Security headers"],
  ["Docker fundamentals","Dockerfile & images","Docker Compose","CI/CD with GitHub Actions","Environment variables"],
  ["Caching with Redis","Load balancing concepts","Rate limiting","Monolith vs Microservices","Message queues intro"],
  ["Microservices patterns","API Gateway","Service discovery","Event-driven architecture","gRPC basics"],
  ["Unit testing basics","Integration testing","Test-driven development","Mocking & fixtures","Code coverage"],
  ["AWS EC2 & S3 basics","Serverless functions","Cloud databases (RDS)","CDN & CloudFront","Infrastructure as Code"],
  ["WebSockets","GraphQL intro","Streaming APIs","Webhooks","API versioning"],
  ["Full-stack project setup","Backend architecture review","Performance optimization","Deployment pipeline","Production checklist"]
];

const ML_TOPICS = [
  ["What is Machine Learning?","Supervised vs Unsupervised","ML Pipeline overview","Python for ML setup","Jupyter notebooks"],
  ["NumPy arrays & ops","Pandas DataFrames","Data cleaning","Matplotlib basics","Seaborn visualization"],
  ["Feature engineering","Feature scaling","Train/test split","Cross-validation","Bias-variance tradeoff"],
  ["Linear Regression theory","Linear Regression implementation","Polynomial regression","Regularization (Ridge/Lasso)","Model evaluation metrics"],
  ["Logistic Regression","Classification metrics","Decision Trees","Confusion matrix","ROC & AUC"],
  ["Random Forest","Gradient Boosting","XGBoost","Ensemble methods","Hyperparameter tuning"],
  ["Neural network basics","Perceptrons","Activation functions","Backpropagation","Loss functions"],
  ["CNN architecture","Convolution & pooling","Image classification","Transfer learning","Data augmentation"],
  ["RNN fundamentals","LSTM & GRU","Sequence modeling","Text preprocessing","Word embeddings (Word2Vec)"],
  ["Attention mechanism","Transformer architecture","BERT overview","GPT overview","Fine-tuning basics"],
  ["Embeddings deep dive","Vector databases (Pinecone)","RAG architecture","LangChain basics","AI Agents intro"],
  ["Building RAG app","Agent workflows","Prompt engineering","Model deployment","ML system design"]
];

const DSA_TOPICS = [
  ["Arrays basics","String manipulation","Big-O notation","Linear search","Binary search intro"],
  ["Two pointers","Sliding window","Hash maps","Frequency counting","Anagram problems"],
  ["Linked list basics","Singly linked list ops","Stack implementation","Queue implementation","Bracket matching"],
  ["Recursion basics","Merge sort","Quick sort","Binary search","Search in rotated array"],
  ["Binary tree basics","Tree traversals (BFS/DFS)","BST operations","Level order traversal","Tree height/depth"],
  ["Heap basics","Priority queue","Kth largest element","Graph representation","BFS on graphs"],
  ["DFS on graphs","Topological sort","Dijkstra's algorithm","Connected components","Cycle detection"],
  ["Dynamic programming intro","Fibonacci variants","Climbing stairs","Coin change","Subset sum"],
  ["Longest common subsequence","0/1 Knapsack","Matrix chain","Edit distance","Palindrome DP"],
  ["Trie data structure","Prefix problems","Segment trees intro","Bit manipulation","XOR problems"],
  ["Greedy algorithms","Activity selection","Huffman coding","Interval scheduling","Backtracking intro"],
  ["N-Queens","Sudoku solver","Graph coloring","Mock interview prep","Problem marathon"]
];

const BUILD_TOPICS = [
  [],[],
  ["CLI todo app"],
  ["REST API project setup"],
  ["Add auth to API"],
  ["Dockerize the API"],
  ["Add caching layer"],
  ["Build microservice"],
  ["Write test suite"],
  ["Deploy to cloud"],
  ["Build RAG chatbot"],
  ["Full capstone project"]
];

const COLLEGE_TOPICS = [
  ["Review lecture notes","Assignment prep"],
  ["Review lecture notes","Lab prep"],
  ["Review lecture notes","Assignment submission"],
  ["Review lecture notes","Mid-sem prep"],
  ["Review lecture notes","Lab report"],
  ["Review lecture notes","Assignment prep"],
  ["Review lecture notes","Project discussion"],
  ["Review lecture notes","Lab prep"],
  ["Review lecture notes","Assignment submission"],
  ["Review lecture notes","End-sem prep start"],
  ["Review lecture notes","End-sem revision"],
  ["Review lecture notes","End-sem finals"]
];

const BOSS_FIGHTS = [
  { name: "The Gateway Guardian", challenge: "Build a CLI tool that fetches data from a public API and displays it formatted", xp: 500 },
  { name: "Data Wrangler", challenge: "Clean and visualize a messy dataset, produce 3 meaningful charts", xp: 500 },
  { name: "The Framework Forge", challenge: "Build a Flask API with 3 endpoints and serve ML predictions", xp: 600 },
  { name: "Query Master", challenge: "Design a normalized database schema and write 10 complex SQL queries", xp: 600 },
  { name: "The Auth Sentinel", challenge: "Implement JWT auth with role-based access control", xp: 700 },
  { name: "Container Commander", challenge: "Dockerize a multi-service app with docker-compose", xp: 700 },
  { name: "The Neural Architect", challenge: "Build and train a neural network from scratch (no frameworks)", xp: 800 },
  { name: "Vision Vanguard", challenge: "Build an image classifier with 90%+ accuracy on a custom dataset", xp: 800 },
  { name: "Sequence Sorcerer", challenge: "Build a text generation model using LSTM", xp: 900 },
  { name: "Transformer Titan", challenge: "Fine-tune a transformer model for a classification task", xp: 900 },
  { name: "RAG Reaper", challenge: "Build a RAG-powered Q&A system over custom documents", xp: 1000 },
  { name: "The Final Boss — AEON Prime", challenge: "Build and deploy a full-stack AI application end-to-end", xp: 2000 }
];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function makeTask(id: string, title: string, cat: string, diff: string, time: number): any {
  const xpMap: Record<string,number> = { easy: 15, medium: 25, hard: 40 };
  return { id, title, description: "", xp: xpMap[diff] || 25, time_min: time, subtasks: [], difficulty: diff, resources: [] };
}

function generateWeeks() {
  const weeks = [];
  for (let w = 0; w < 12; w++) {
    const days = [];
    const bTopics = BACKEND_TOPICS[w];
    const mTopics = ML_TOPICS[w];
    const dTopics = DSA_TOPICS[w];
    const buildTopics = BUILD_TOPICS[w];
    const collegeTopics = COLLEGE_TOPICS[w];

    for (let d = 0; d < 6; d++) {
      const dayTasks: any = { ai_ml: [], backend: [], build: [], dsa: [], college: [] };
      let totalTime = 0;

      // Backend (1 topic per day, spread across 5 weekdays + 1 review)
      if (d < bTopics.length) {
        const t = makeTask(`w${w+1}d${d+1}_be1`, bTopics[d], 'backend', d < 3 ? 'medium' : 'hard', 45);
        dayTasks.backend.push(t);
        totalTime += 45;
      }

      // ML (1 topic per day)
      if (d < mTopics.length) {
        const t = makeTask(`w${w+1}d${d+1}_ml1`, mTopics[d], 'ai_ml', d < 3 ? 'medium' : 'hard', 50);
        dayTasks.ai_ml.push(t);
        totalTime += 50;
      }

      // DSA (1 per day)
      if (d < dTopics.length) {
        const diff = w < 4 ? 'easy' : w < 8 ? 'medium' : 'hard';
        const t = makeTask(`w${w+1}d${d+1}_dsa1`, dTopics[d], 'dsa', diff, 40);
        dayTasks.dsa.push(t);
        totalTime += 40;
      }

      // Build (only on weekends or when available)
      if (d >= 4 && buildTopics.length > 0) {
        const bi = d - 4;
        if (bi < buildTopics.length) {
          const t = makeTask(`w${w+1}d${d+1}_build1`, buildTopics[bi], 'build', 'hard', 60);
          dayTasks.build.push(t);
          totalTime += 60;
        }
      }

      // College (light, 2 days a week)
      if ((d === 0 || d === 3) && collegeTopics.length > 0) {
        const ci = d === 0 ? 0 : Math.min(1, collegeTopics.length - 1);
        const t = makeTask(`w${w+1}d${d+1}_col1`, collegeTopics[ci], 'college', 'easy', 20);
        dayTasks.college.push(t);
        totalTime += 20;
      }

      days.push({
        day_id: d + 1,
        day_label: DAYS[d],
        tasks: dayTasks,
        estimated_time_min: totalTime
      });
    }

    const bf = BOSS_FIGHTS[w];
    weeks.push({
      week_id: w + 1,
      theme: WEEK_THEMES[w],
      goals: [bTopics[0], mTopics[0], dTopics[0]].filter(Boolean),
      days,
      boss_fight: {
        name: bf.name,
        description: `Week ${w+1} Boss Fight`,
        challenge: bf.challenge,
        xp_reward: bf.xp,
        requirements: [`Complete at least 15 tasks in Week ${w+1}`]
      }
    });
  }
  return weeks;
}

const roadmap = {
  weeks: generateWeeks(),
  xp_system: {
    levels: [
      { level: 1, name: "Novice", xp_required: 0, badge_emoji: "🌱" },
      { level: 2, name: "Apprentice", xp_required: 300, badge_emoji: "📘" },
      { level: 3, name: "Student", xp_required: 700, badge_emoji: "📗" },
      { level: 4, name: "Practitioner", xp_required: 1200, badge_emoji: "⚡" },
      { level: 5, name: "Builder", xp_required: 2000, badge_emoji: "🔨" },
      { level: 6, name: "Engineer", xp_required: 3000, badge_emoji: "⚙️" },
      { level: 7, name: "Architect", xp_required: 4500, badge_emoji: "🏗️" },
      { level: 8, name: "Expert", xp_required: 6500, badge_emoji: "🎯" },
      { level: 9, name: "Master", xp_required: 9000, badge_emoji: "👑" },
      { level: 10, name: "Sage", xp_required: 12000, badge_emoji: "🌟" }
    ],
    task_xp: { easy: 15, medium: 25, hard: 40 },
    streak_bonus: { "3": 1.2, "7": 1.5, "14": 1.8, "30": 2.0 },
    boss_fight_xp: 500
  },
  streak_rules: {
    min_tasks_per_day: 3,
    grace_days: 1,
    freeze_tokens_max: 3
  }
};

const outPath = path.join(__dirname, 'roadmap.json');
fs.writeFileSync(outPath, JSON.stringify(roadmap, null, 2));
console.log(`✅ Generated roadmap with ${roadmap.weeks.length} weeks, written to ${outPath}`);

// Count total tasks
let total = 0;
for (const w of roadmap.weeks) {
  for (const d of w.days) {
    for (const cat of Object.values(d.tasks) as any[]) {
      total += cat.length;
    }
  }
}
console.log(`📊 Total tasks: ${total}`);

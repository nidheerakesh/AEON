import { TopicTrees } from '@/types';

export const topicTrees: TopicTrees = {
  backend: {
    id: "backend", label: "Backend Development", status: "available",
    children: [
      { id: "internet", label: "Internet Fundamentals", status: "available", children: [
        { id: "http", label: "HTTP/HTTPS", status: "available", linked_tasks: ["w1d1_be1","w1d2_be1"] },
        { id: "dns", label: "DNS & Domain Names", status: "available", linked_tasks: ["w1d3_be1"] },
        { id: "browsers", label: "How Browsers Work", status: "locked", linked_tasks: ["w1d4_be1"] },
        { id: "hosting", label: "Hosting & Deployment", status: "locked", linked_tasks: ["w1d5_be1"] },
      ]},
      { id: "apis", label: "APIs", status: "locked", children: [
        { id: "rest", label: "REST APIs", status: "locked", linked_tasks: ["w2d1_be1"] },
        { id: "json", label: "JSON & Serialization", status: "locked", linked_tasks: ["w2d2_be1"] },
        { id: "status_codes", label: "HTTP Status Codes", status: "locked", linked_tasks: ["w2d3_be1"] },
        { id: "api_design", label: "API Design Patterns", status: "locked", linked_tasks: ["w2d4_be1"] },
      ]},
      { id: "frameworks", label: "Backend Frameworks", status: "locked", children: [
        { id: "flask", label: "Flask", status: "locked", linked_tasks: ["w3d1_be1","w3d2_be1","w3d3_be1"] },
        { id: "fastapi", label: "FastAPI", status: "locked", linked_tasks: ["w3d4_be1"] },
      ]},
      { id: "databases", label: "Databases", status: "locked", children: [
        { id: "sql_basics", label: "SQL Fundamentals", status: "locked", linked_tasks: ["w4d1_be1"] },
        { id: "postgres", label: "PostgreSQL", status: "locked", linked_tasks: ["w4d2_be1"] },
        { id: "crud", label: "CRUD Operations", status: "locked", linked_tasks: ["w4d3_be1"] },
        { id: "joins", label: "Joins & Relations", status: "locked", linked_tasks: ["w4d4_be1"] },
        { id: "normalization", label: "Normalization", status: "locked", linked_tasks: ["w4d5_be1"] },
      ]},
      { id: "auth", label: "Authentication & Security", status: "locked", children: [
        { id: "jwt", label: "JWT", status: "locked", linked_tasks: ["w5d1_be1"] },
        { id: "sessions", label: "Sessions & Cookies", status: "locked", linked_tasks: ["w5d2_be1"] },
        { id: "oauth", label: "OAuth 2.0", status: "locked", linked_tasks: ["w5d3_be1"] },
        { id: "cors", label: "CORS & Security", status: "locked", linked_tasks: ["w5d5_be1"] },
      ]},
      { id: "devops", label: "DevOps", status: "locked", children: [
        { id: "docker", label: "Docker", status: "locked", linked_tasks: ["w6d1_be1","w6d2_be1","w6d3_be1"] },
        { id: "cicd", label: "CI/CD", status: "locked", linked_tasks: ["w6d4_be1"] },
      ]},
      { id: "architecture", label: "System Design", status: "locked", children: [
        { id: "caching", label: "Caching (Redis)", status: "locked", linked_tasks: ["w7d1_be1"] },
        { id: "load_balancing", label: "Load Balancing", status: "locked", linked_tasks: ["w7d2_be1"] },
        { id: "microservices", label: "Microservices", status: "locked", linked_tasks: ["w7d4_be1","w8d1_be1"] },
        { id: "message_queues", label: "Message Queues", status: "locked", linked_tasks: ["w7d5_be1"] },
      ]},
      { id: "testing", label: "Testing", status: "locked", children: [
        { id: "unit_testing", label: "Unit Testing", status: "locked", linked_tasks: ["w9d1_be1"] },
        { id: "integration_testing", label: "Integration Testing", status: "locked", linked_tasks: ["w9d2_be1"] },
        { id: "tdd", label: "TDD", status: "locked", linked_tasks: ["w9d3_be1"] },
      ]},
      { id: "cloud", label: "Cloud & Deployment", status: "locked", children: [
        { id: "aws", label: "AWS Basics", status: "locked", linked_tasks: ["w10d1_be1"] },
        { id: "serverless", label: "Serverless", status: "locked", linked_tasks: ["w10d2_be1"] },
      ]},
      { id: "advanced_apis", label: "Advanced APIs", status: "locked", children: [
        { id: "websockets", label: "WebSockets", status: "locked", linked_tasks: ["w11d1_be1"] },
        { id: "graphql", label: "GraphQL", status: "locked", linked_tasks: ["w11d2_be1"] },
      ]},
    ]
  },
  ml: {
    id: "ml", label: "Machine Learning", status: "available",
    children: [
      { id: "foundations", label: "ML Foundations", status: "available", children: [
        { id: "what_is_ml", label: "What is ML?", status: "available", linked_tasks: ["w1d1_ml1"] },
        { id: "supervised_unsupervised", label: "Supervised vs Unsupervised", status: "available", linked_tasks: ["w1d2_ml1"] },
        { id: "ml_pipeline", label: "ML Pipeline", status: "available", linked_tasks: ["w1d3_ml1"] },
      ]},
      { id: "data_science", label: "Data Science Tools", status: "locked", children: [
        { id: "numpy", label: "NumPy", status: "locked", linked_tasks: ["w2d1_ml1"] },
        { id: "pandas", label: "Pandas", status: "locked", linked_tasks: ["w2d2_ml1"] },
        { id: "matplotlib", label: "Matplotlib", status: "locked", linked_tasks: ["w2d4_ml1"] },
        { id: "seaborn", label: "Seaborn", status: "locked", linked_tasks: ["w2d5_ml1"] },
      ]},
      { id: "preprocessing", label: "Data Preprocessing", status: "locked", children: [
        { id: "feature_engineering", label: "Feature Engineering", status: "locked", linked_tasks: ["w3d1_ml1"] },
        { id: "feature_scaling", label: "Feature Scaling", status: "locked", linked_tasks: ["w3d2_ml1"] },
        { id: "cross_validation", label: "Cross-Validation", status: "locked", linked_tasks: ["w3d4_ml1"] },
      ]},
      { id: "classical_ml", label: "Classical ML", status: "locked", children: [
        { id: "linear_reg", label: "Linear Regression", status: "locked", linked_tasks: ["w4d1_ml1","w4d2_ml1"] },
        { id: "logistic_reg", label: "Logistic Regression", status: "locked", linked_tasks: ["w5d1_ml1"] },
        { id: "decision_trees", label: "Decision Trees", status: "locked", linked_tasks: ["w5d3_ml1"] },
        { id: "random_forest", label: "Random Forest", status: "locked", linked_tasks: ["w6d1_ml1"] },
        { id: "gradient_boosting", label: "Gradient Boosting", status: "locked", linked_tasks: ["w6d2_ml1"] },
        { id: "xgboost", label: "XGBoost", status: "locked", linked_tasks: ["w6d3_ml1"] },
        { id: "svm", label: "SVM", status: "locked" },
        { id: "ensemble", label: "Ensemble Methods", status: "locked", linked_tasks: ["w6d4_ml1"] },
      ]},
      { id: "deep_learning", label: "Deep Learning", status: "locked", children: [
        { id: "neural_nets", label: "Neural Networks", status: "locked", linked_tasks: ["w7d1_ml1"] },
        { id: "backprop", label: "Backpropagation", status: "locked", linked_tasks: ["w7d4_ml1"] },
        { id: "cnn", label: "CNN", status: "locked", linked_tasks: ["w8d1_ml1"] },
        { id: "transfer_learning", label: "Transfer Learning", status: "locked", linked_tasks: ["w8d4_ml1"] },
        { id: "rnn_lstm", label: "RNN / LSTM", status: "locked", linked_tasks: ["w9d1_ml1","w9d2_ml1"] },
      ]},
      { id: "nlp", label: "NLP & Transformers", status: "locked", children: [
        { id: "word_embeddings", label: "Word Embeddings", status: "locked", linked_tasks: ["w9d5_ml1"] },
        { id: "attention", label: "Attention Mechanism", status: "locked", linked_tasks: ["w10d1_ml1"] },
        { id: "transformers", label: "Transformers", status: "locked", linked_tasks: ["w10d2_ml1"] },
        { id: "bert", label: "BERT", status: "locked", linked_tasks: ["w10d3_ml1"] },
        { id: "gpt", label: "GPT", status: "locked", linked_tasks: ["w10d4_ml1"] },
      ]},
      { id: "ai_engineering", label: "AI Engineering", status: "locked", children: [
        { id: "embeddings", label: "Embeddings", status: "locked", linked_tasks: ["w11d1_ml1"] },
        { id: "vector_dbs", label: "Vector Databases", status: "locked", linked_tasks: ["w11d2_ml1"] },
        { id: "rag", label: "RAG", status: "locked", linked_tasks: ["w11d3_ml1"] },
        { id: "langchain", label: "LangChain", status: "locked", linked_tasks: ["w11d4_ml1"] },
        { id: "agents", label: "AI Agents", status: "locked", linked_tasks: ["w11d5_ml1"] },
        { id: "prompt_eng", label: "Prompt Engineering", status: "locked", linked_tasks: ["w12d4_ml1"] },
      ]},
    ]
  },
  dsa: {
    id: "dsa", label: "DSA Practice", status: "available",
    children: [
      { id: "arrays_strings", label: "Arrays & Strings", status: "available", children: [
        { id: "arrays_basic", label: "Array Basics", status: "available", linked_tasks: ["w1d1_dsa1"] },
        { id: "two_pointers", label: "Two Pointers", status: "locked", linked_tasks: ["w2d1_dsa1"] },
        { id: "sliding_window", label: "Sliding Window", status: "locked", linked_tasks: ["w2d2_dsa1"] },
        { id: "hash_maps", label: "Hash Maps", status: "locked", linked_tasks: ["w2d3_dsa1"] },
      ]},
      { id: "linked_lists_stacks", label: "Linked Lists & Stacks", status: "locked", children: [
        { id: "linked_list", label: "Linked Lists", status: "locked", linked_tasks: ["w3d1_dsa1"] },
        { id: "stacks", label: "Stacks", status: "locked", linked_tasks: ["w3d3_dsa1"] },
        { id: "queues", label: "Queues", status: "locked", linked_tasks: ["w3d4_dsa1"] },
      ]},
      { id: "sorting_searching", label: "Sorting & Searching", status: "locked", children: [
        { id: "merge_sort", label: "Merge Sort", status: "locked", linked_tasks: ["w4d2_dsa1"] },
        { id: "quick_sort", label: "Quick Sort", status: "locked", linked_tasks: ["w4d3_dsa1"] },
        { id: "binary_search", label: "Binary Search", status: "locked", linked_tasks: ["w4d4_dsa1"] },
      ]},
      { id: "trees_graphs", label: "Trees & Graphs", status: "locked", children: [
        { id: "binary_trees", label: "Binary Trees", status: "locked", linked_tasks: ["w5d1_dsa1"] },
        { id: "bst", label: "BST", status: "locked", linked_tasks: ["w5d3_dsa1"] },
        { id: "bfs_dfs", label: "BFS / DFS", status: "locked", linked_tasks: ["w7d1_dsa1"] },
        { id: "dijkstra", label: "Dijkstra's", status: "locked", linked_tasks: ["w7d3_dsa1"] },
      ]},
      { id: "dp", label: "Dynamic Programming", status: "locked", children: [
        { id: "dp_intro", label: "DP Introduction", status: "locked", linked_tasks: ["w8d1_dsa1"] },
        { id: "coin_change", label: "Coin Change", status: "locked", linked_tasks: ["w8d4_dsa1"] },
        { id: "lcs", label: "LCS", status: "locked", linked_tasks: ["w9d1_dsa1"] },
        { id: "knapsack", label: "Knapsack", status: "locked", linked_tasks: ["w9d2_dsa1"] },
      ]},
      { id: "advanced", label: "Advanced Topics", status: "locked", children: [
        { id: "trie", label: "Trie", status: "locked", linked_tasks: ["w10d1_dsa1"] },
        { id: "greedy", label: "Greedy", status: "locked", linked_tasks: ["w11d1_dsa1"] },
        { id: "backtracking", label: "Backtracking", status: "locked", linked_tasks: ["w11d5_dsa1"] },
      ]},
    ]
  }
};

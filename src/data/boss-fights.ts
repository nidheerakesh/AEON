// Generated from src/bossfight.md by scripts/generate-bossfight-data.mjs
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

export const BOSS_FIGHTS: BossData[] = [
  {
    "week": 1,
    "name": "The Data Golem",
    "emoji": "🧮",
    "difficulty": "⚔️",
    "difficultyLabel": "Normal",
    "phase": "ml",
    "phaseLabel": "Machine Learning",
    "skills": [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Data Cleaning",
      "EDA"
    ],
    "lore": "A raw, dirty dataset that refuses to be tamed. It has missing values for arms, duplicate rows for legs, and wrong data types for a brain. Your job is to give it shape.",
    "winConditions": [
      "A fully cleaned, analysis-ready DataFrame",
      "A Jupyter notebook with 8+ visualizations and markdown explanations",
      "A 3-sentence written summary of what the data is telling you"
    ],
    "failConditions": [
      "Notebook has no markdown cells — plots without explanation are not EDA",
      "df.isnull().sum() still shows missing values at the end",
      "No preprocess.py script — the cleaning must be reproducible, not just in a notebook",
      "Less than 8 visualizations"
    ],
    "bossDrops": [],
    "xpReward": 520,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "Load & Inspect",
        "subtasks": [
          "Download the raw Titanic dataset from Kaggle",
          "Load with Pandas: pd.read_csv()",
          "Print .shape, .dtypes, .info(), .describe()",
          "Count nulls per column: df.isnull().sum()",
          "Identify which columns have > 20% missing values",
          "Write a markdown cell: \"Here is what I found in the raw data\""
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Clean",
        "subtasks": [
          "Drop columns with > 50% missing values and justify why",
          "Impute missing numerics with median (not mean — why?)",
          "Impute missing categoricals with mode",
          "Remove duplicate rows",
          "Fix wrong data types (e.g., convert strings to datetime, IDs to int)",
          "Verify: df.isnull().sum() returns all zeros"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Feature Engineering",
        "subtasks": [
          "Create at least 2 new features from existing columns",
          "Encode categorical columns: one-hot or label encoding",
          "Bin a continuous variable into buckets (e.g., Age → age groups)"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Feature Scaling",
        "subtasks": [
          "Apply StandardScaler to all numeric columns",
          "Apply MinMaxScaler to one column — understand the difference",
          "Save the scaler with joblib — you will need it later"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Visualizations",
        "subtasks": [
          "Plot 1: Distribution of target variable (survival rate)",
          "Plot 2: Missing values heatmap (seaborn.heatmap)",
          "Plot 3: Correlation heatmap",
          "Plot 4: Survival rate by gender (bar chart)",
          "Plot 5: Age distribution (histogram)",
          "Plot 6: Fare vs Survival (box plot)",
          "Plot 7: Pairplot on numeric columns",
          "Plot 8: Survival by passenger class (countplot)",
          "Every plot must have: title, axis labels, and a markdown explanation beneath it"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Consolidate all cleaning steps into a single preprocess.py script",
          "Running python preprocess.py should produce data/processed/clean.csv from data/raw/titanic.csv",
          "Final notebook: clean, with all visualizations and markdown cells",
          "Push to GitHub with a README that describes the dataset and your findings"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Consolidate all cleaning steps into a single preprocess.py script",
          "Running python preprocess.py should produce data/processed/clean.csv from data/raw/titanic.csv",
          "Final notebook: clean, with all visualizations and markdown cells",
          "Push to GitHub with a README that describes the dataset and your findings"
        ]
      }
    ]
  },
  {
    "week": 2,
    "name": "The Model Arena",
    "emoji": "🤖",
    "difficulty": "⚔️⚔️",
    "difficultyLabel": "Hard",
    "phase": "ml",
    "phaseLabel": "Machine Learning",
    "skills": [
      "scikit-learn",
      "Cross-validation",
      "XGBoost",
      "SHAP",
      "Model Evaluation"
    ],
    "lore": "Five models walk into the arena. Only one walks out. You are the judge. Your verdict must be backed by numbers, not instinct.",
    "winConditions": [
      "Train 5 different models",
      "Tune hyperparameters for the top 2",
      "Select the best model using cross-validation",
      "Produce a model card explaining your choice with evidence"
    ],
    "failConditions": [
      "No cross-validation — a single train/test accuracy is not evidence",
      "No SHAP analysis — you must be able to explain the model",
      "Model not saved — if you can't load it later, it doesn't exist",
      "No model card — numbers without interpretation don't count"
    ],
    "bossDrops": [],
    "xpReward": 540,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "Baseline Models",
        "subtasks": [
          "Load your clean dataset from Week 1",
          "Split into train/test (80/20, stratified): train_test_split(..., stratify=y)",
          "Train 5 models with default hyperparameters:",
          "Evaluate each: accuracy, F1, precision, recall",
          "Build a results DataFrame and print it sorted by F1"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Cross-Validation",
        "subtasks": [
          "Replace simple train/test with 5-fold stratified cross-validation for all 5 models",
          "Report mean ± std for accuracy and F1",
          "Understand why cross-validation is more reliable than a single split",
          "Write a markdown cell: \"I am using cross-validation because...\""
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Hyperparameter Tuning",
        "subtasks": [
          "Pick your top 2 models from Day 2",
          "Tune Model 1 with GridSearchCV (exhaustive, small grid)",
          "Tune Model 2 with RandomizedSearchCV (faster, larger grid)",
          "Understand the difference: when to use each",
          "Report best params and new cross-validated score for each"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Model Evaluation Deep Dive",
        "subtasks": [
          "On your best model, produce:",
          "Explain what each metric means for your specific problem"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "SHAP Explainability",
        "subtasks": [
          "Install shap",
          "Compute SHAP values for your best model",
          "Plot: shap.summary_plot() — feature importance bar chart",
          "Plot: shap.waterfall_plot() for one specific prediction",
          "Write: \"The top 3 features driving predictions in this model are X, Y, Z because...\""
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Save best model with joblib.dump(model, 'models/best_model.pkl')",
          "Save scaler: joblib.dump(scaler, 'models/scaler.pkl')",
          "Write model_card.md:"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Save best model with joblib.dump(model, 'models/best_model.pkl')",
          "Save scaler: joblib.dump(scaler, 'models/scaler.pkl')",
          "Write model_card.md:"
        ]
      }
    ]
  },
  {
    "week": 3,
    "name": "The Neural Hydra",
    "emoji": "🧠",
    "difficulty": "⚔️⚔️⚔️",
    "difficultyLabel": "Brutal",
    "phase": "ml",
    "phaseLabel": "Machine Learning",
    "skills": [
      "PyTorch",
      "CNN",
      "LSTM",
      "Training loops",
      "Loss curves"
    ],
    "lore": "Cut one head (a bug), two more appear (vanishing gradients, overfitting). The Hydra doesn't fight you — it waits for you to make mistakes.",
    "winConditions": [
      "A CNN on CIFAR-10 that beats 75% accuracy",
      "An LSTM on a sequential task (text or time series)"
    ],
    "failConditions": [
      "Using Keras .fit() without understanding what it does under the hood",
      "CNN accuracy below 75%",
      "No training problem documented — if nothing went wrong, you didn't try hard enough",
      "Training loop copied from a tutorial without understanding each line"
    ],
    "bossDrops": [],
    "xpReward": 560,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "MLP from Scratch",
        "subtasks": [
          "Build a 2-layer MLP in pure NumPy (no frameworks) for binary classification",
          "Train on your Titanic dataset — watch loss decrease",
          "Plot loss over epochs",
          "Write: \"Now I understand backpropagation because I coded it and saw...\""
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "PyTorch Fundamentals",
        "subtasks": [
          "Tensors: create, reshape, slice, move to GPU",
          "autograd: requires_grad, .backward(), .grad",
          "Build a PyTorch MLP using nn.Module:",
          "Write a full training loop: optimizer, loss, .backward(), .step()",
          "Train on MNIST — target > 97% accuracy"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "CNN on CIFAR-10",
        "subtasks": [
          "Load CIFAR-10 with torchvision.datasets.CIFAR10",
          "Build a CNN:",
          "Add Batch Normalization and Dropout",
          "Train for 20+ epochs with Adam optimizer",
          "Target: > 75% test accuracy",
          "Plot: training loss, validation loss, training accuracy, validation accuracy on same figure",
          "Identify: is your model overfitting, underfitting, or well-fit?"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Fix One Problem",
        "subtasks": [
          "Overfitting: Add Dropout, Data Augmentation (RandomHorizontalFlip, RandomCrop)",
          "Slow convergence: Implement learning rate scheduling (StepLR or CosineAnnealingLR)",
          "Underfitting: Add more layers or increase filter counts",
          "Write: \"The problem was X. I fixed it by doing Y. The effect was Z (with numbers).\""
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "LSTM",
        "subtasks": [
          "Choose a sequential task:",
          "Build an LSTM model:",
          "Train for 30+ epochs",
          "Plot loss curve",
          "Show 5 example predictions vs actual values"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "CNN: final test accuracy printed and confirmed > 75%",
          "LSTM: loss curve showing convergence",
          "Both models saved: torch.save(model.state_dict(), 'models/cnn.pth')",
          "Written section in notebook: \"One thing that went wrong during training and how I fixed it\"",
          "Both notebooks pushed to GitHub with clear README"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "CNN: final test accuracy printed and confirmed > 75%",
          "LSTM: loss curve showing convergence",
          "Both models saved: torch.save(model.state_dict(), 'models/cnn.pth')",
          "Written section in notebook: \"One thing that went wrong during training and how I fixed it\"",
          "Both notebooks pushed to GitHub with clear README"
        ]
      }
    ]
  },
  {
    "week": 4,
    "name": "The Transformer Overlord",
    "emoji": "👾",
    "difficulty": "💀",
    "difficultyLabel": "Phase Boss",
    "phase": "ml",
    "phaseLabel": "Machine Learning",
    "skills": [
      "HuggingFace",
      "BERT",
      "Fine-tuning",
      "Semantic Search",
      "Streamlit",
      "Deployment"
    ],
    "lore": "It has read everything. It understands context. It knows what you meant, not just what you wrote. And it's live on the internet, waiting for anyone to use it.",
    "winConditions": [
      "Fine-tune BERT (or DistilBERT) on a classification task — achieve > 85% test accuracy",
      "Build a Streamlit app: input text → prediction + confidence + SHAP explanation",
      "Deploy it to Hugging Face Spaces — a real public URL"
    ],
    "failConditions": [
      "\"Deployed\" means a localhost screenshot — it must be a real public URL",
      "Accuracy below 85% on test set",
      "No SHAP explanation in the app — prediction alone is not enough",
      "App crashes on any of these inputs: empty string, very long text, non-English text, emojis"
    ],
    "bossDrops": [],
    "xpReward": 1000,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "HuggingFace Fundamentals",
        "subtasks": [
          "Install transformers, datasets, tokenizers",
          "Load a pre-trained model and tokenizer: AutoModelForSequenceClassification",
          "Understand tokenization: tokens, input_ids, attention_mask, token_type_ids",
          "Run zero-shot inference on 5 sentences — see what the pre-trained model predicts without any fine-tuning",
          "Choose your dataset:"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Fine-Tuning Setup",
        "subtasks": [
          "Load your dataset with datasets.load_dataset()",
          "Tokenize with padding and truncation (max_length=128)",
          "Create PyTorch DataLoaders",
          "Set up training:",
          "Train for 3 epochs — watch loss drop"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Evaluate + Improve",
        "subtasks": [
          "Evaluate on test set: accuracy, F1, confusion matrix",
          "If accuracy < 85%:",
          "Save the fine-tuned model: model.save_pretrained('models/bert-classifier')",
          "Save tokenizer: tokenizer.save_pretrained('models/bert-classifier')",
          "Log training run with MLflow"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Semantic Search Bonus",
        "subtasks": [
          "Install sentence-transformers",
          "Load all-MiniLM-L6-v2 (fast, lightweight)",
          "Create embeddings for 50+ sentences from your dataset",
          "Implement a simple semantic search:",
          "Test: query \"great movie\" → should return positive reviews"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Streamlit App",
        "subtasks": [
          "Build app.py with Streamlit:",
          "Run locally: streamlit run app.py",
          "Test with 10 different inputs"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day: Deploy",
        "subtasks": [
          "Create account on Hugging Face",
          "Push model to Hugging Face Hub: model.push_to_hub(\"your-username/bert-classifier\")",
          "Create a new Space (Streamlit type)",
          "Push your app.py and requirements.txt to the Space repo",
          "Verify the app loads at https://huggingface.co/spaces/your-username/your-space",
          "Test from your phone — it must work on mobile",
          "Add the public URL to your GitHub README",
          "Write a model card on Hugging Face with: task, dataset, accuracy, limitations"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day: Deploy",
        "subtasks": [
          "Create account on Hugging Face",
          "Push model to Hugging Face Hub: model.push_to_hub(\"your-username/bert-classifier\")",
          "Create a new Space (Streamlit type)",
          "Push your app.py and requirements.txt to the Space repo",
          "Verify the app loads at https://huggingface.co/spaces/your-username/your-space",
          "Test from your phone — it must work on mobile",
          "Add the public URL to your GitHub README",
          "Write a model card on Hugging Face with: task, dataset, accuracy, limitations"
        ]
      }
    ]
  },
  {
    "week": 5,
    "name": "The HTTP Phantom",
    "emoji": "🌐",
    "difficulty": "⚔️",
    "difficultyLabel": "Normal",
    "phase": "backend",
    "phaseLabel": "Backend",
    "skills": [
      "Node.js or Python",
      "REST API",
      "HTTP",
      "Git",
      "Postman"
    ],
    "lore": "An API that lives in your head but not on the internet. It exists when you describe it. It vanishes the moment someone tries to actually call it.",
    "winConditions": [
      "At least 5 working endpoints (CRUD)",
      "Correct HTTP methods and status codes throughout",
      "Input validation with meaningful error messages",
      "A Postman collection exported and committed",
      "A README with curl examples for every endpoint"
    ],
    "failConditions": [
      "Any endpoint returns 200 when an error occurred",
      "Server crashes on bad input instead of returning 400",
      "No README with curl examples",
      "No Postman collection committed"
    ],
    "bossDrops": [],
    "xpReward": 600,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "Environment + First Route",
        "subtasks": [
          "Choose your stack: Node.js (Express) or Python (FastAPI)",
          "Initialize project: npm init or poetry init",
          "Build a GET /health endpoint that returns {\"status\": \"ok\", \"timestamp\": \"...\"}",
          "Run the server and call the endpoint with curl",
          "Set up .gitignore, commit to GitHub"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Choose a Domain + Schema",
        "subtasks": [
          "Define your data schema (in-memory for now, no database yet):",
          "Build GET /posts → returns list of all items",
          "Build GET /posts/{id} → returns one item or 404 if not found",
          "Test both with Postman"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Write Operations",
        "subtasks": [
          "Build POST /posts → creates a new item, returns 201 with the created object",
          "Build PUT /posts/{id} → updates an item, returns 200; 404 if not found",
          "Build DELETE /posts/{id} → deletes an item, returns 204; 404 if not found",
          "Test all 5 endpoints in Postman"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Input Validation",
        "subtasks": [
          "Add request body validation to POST and PUT:",
          "Add path parameter validation: GET /posts/abc should return 400 \"id must be an integer\"",
          "Test: send bad requests and verify you get 400 with a clear error message, not a 500 crash"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Postman Collection + README",
        "subtasks": [
          "In Postman: create a collection with one request per endpoint",
          "Add example request body and expected response for each",
          "Export as postman_collection.json and commit to repo",
          "Write README with:"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Code review: read every line of your own code as if you're a reviewer",
          "Edge cases: what happens with negative IDs? Empty strings? 10,000 items?",
          "Add a GET /posts?search=keyword query parameter filter",
          "Final test: run through the Postman collection top to bottom, all green"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Code review: read every line of your own code as if you're a reviewer",
          "Edge cases: what happens with negative IDs? Empty strings? 10,000 items?",
          "Add a GET /posts?search=keyword query parameter filter",
          "Final test: run through the Postman collection top to bottom, all green"
        ]
      }
    ]
  },
  {
    "week": 6,
    "name": "The Database Kraken",
    "emoji": "🗄️",
    "difficulty": "⚔️⚔️",
    "difficultyLabel": "Hard",
    "phase": "backend",
    "phaseLabel": "Backend",
    "skills": [
      "PostgreSQL",
      "SQL",
      "Migrations",
      "Redis",
      "JWT Auth",
      "bcrypt"
    ],
    "lore": "Slow queries, N+1 problems, and missing indexes lurk in the deep. It has tentacles in your auth system, your cache, and your query planner. Cut one tentacle: another wraps around your response time.",
    "winConditions": [
      "A PostgreSQL database with migrations (not manual SQL)",
      "JWT authentication (register + login + protected routes)",
      "Redis caching on at least 2 GET endpoints",
      "Zero N+1 problems — verified with EXPLAIN ANALYZE"
    ],
    "failConditions": [
      "Passwords stored in plain text — instant disqualification",
      "JWT secret key hardcoded in source code",
      "No migration files — the schema must be reproducible",
      "Caching with no invalidation strategy"
    ],
    "bossDrops": [],
    "xpReward": 620,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "PostgreSQL Setup",
        "subtasks": [
          "Install PostgreSQL locally or use Docker: docker run -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres",
          "Connect from Python/Node with a database client",
          "Design your schema (at least 3 tables with relationships):",
          "Write migrations/001_create_tables.sql"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Migrations + ORM",
        "subtasks": [
          "Set up a migration tool: Alembic (Python) or Knex (Node)",
          "Convert your raw SQL to migration files",
          "Run migrations: alembic upgrade head",
          "Write a seed script: python seed.py populates 10 users, 20 posts, 50 comments",
          "Verify with psql: SELECT count(*) FROM posts;"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "JWT Authentication",
        "subtasks": [
          "Build POST /auth/register:",
          "Build POST /auth/login:",
          "Build auth middleware that:"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Protected Routes + N+1 Fix",
        "subtasks": [
          "Apply auth middleware to POST, PUT, DELETE routes",
          "POST /posts must associate the post with the logged-in user (user_id from JWT)",
          "Deliberately create an N+1: fetch all posts, then for each post fetch the author separately",
          "Measure the query count (enable query logging)",
          "Fix with a JOIN: fetch posts + authors in a single query",
          "Run EXPLAIN ANALYZE before and after — paste both outputs into your notes"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Redis Caching",
        "subtasks": [
          "Start Redis: docker run -p 6379:6379 redis",
          "Connect from your app",
          "Add caching to GET /posts (60 second TTL):",
          "Add caching to GET /posts/{id} with key posts:{id}",
          "Cache invalidation: delete posts:all cache key when a post is created/updated/deleted",
          "Verify caching works: check Redis CLI: redis-cli KEYS *"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Full flow test:",
          "Add POST /posts/{id}/comments endpoint (authenticated, belongs to a post)",
          "Push to GitHub"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Full flow test:",
          "Add POST /posts/{id}/comments endpoint (authenticated, belongs to a post)",
          "Push to GitHub"
        ]
      }
    ]
  },
  {
    "week": 7,
    "name": "The OWASP Wraith",
    "emoji": "🔐",
    "difficulty": "⚔️⚔️",
    "difficultyLabel": "Hard",
    "phase": "backend",
    "phaseLabel": "Backend",
    "skills": [
      "Nginx",
      "HTTPS",
      "CORS",
      "Rate Limiting",
      "Docker",
      "GitHub Actions"
    ],
    "lore": "A ghost that slips through every gap you forgot to close. It doesn't attack your code — it attacks your assumptions. \"CORS is fine with * for now.\" It waits for statements like that.",
    "winConditions": [
      "Dockerize the full stack (app + DB + Redis + Nginx)",
      "Nginx as reverse proxy with HTTPS",
      "Hardened API: CORS, rate limiting, security headers, input sanitization",
      "GitHub Actions CI pipeline: lint + test, passing on every push"
    ],
    "failConditions": [
      "CORS set to * in any environment",
      "Rate limiting not tested (write the test)",
      "Security headers missing from responses",
      "CI pipeline not set up or not passing"
    ],
    "bossDrops": [],
    "xpReward": 640,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "Docker Compose",
        "subtasks": [
          "Write a Dockerfile for your app:",
          "Write docker-compose.yml with 3 services:",
          "Verify: docker compose up → all 3 services healthy",
          "Database must persist on restart: use a named volume for PostgreSQL data"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Nginx Reverse Proxy",
        "subtasks": [
          "Add Nginx as a 4th service in Docker Compose",
          "Write nginx/nginx.conf:",
          "Verify: curl http://localhost → proxied to your app",
          "Generate self-signed SSL cert: openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes",
          "Add HTTPS to Nginx config (port 443)",
          "Verify: curl -k https://localhost works"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Security Headers",
        "subtasks": [
          "X-Frame-Options: DENY — prevents clickjacking",
          "X-Content-Type-Options: nosniff — prevents MIME sniffing",
          "X-XSS-Protection: 1; mode=block",
          "Strict-Transport-Security: max-age=31536000; includeSubDomains",
          "Content-Security-Policy: default-src 'self'",
          "Referrer-Policy: strict-origin-when-cross-origin",
          "Verify headers with: curl -I https://localhost -k"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "CORS + Rate Limiting",
        "subtasks": [
          "Configure CORS properly — NOT wildcard *:",
          "Add rate limiting on auth endpoints (prevent brute force):",
          "Test: hit the login endpoint 10 times fast → should get 429 after 5"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "GitHub Actions CI",
        "subtasks": [
          "Create .github/workflows/ci.yml:",
          "Write at least 5 tests in tests/:",
          "Verify: push to GitHub → Actions tab shows green"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Security audit — test each OWASP Top 10 item against your API:",
          "Fix anything that fails the audit",
          "Push final version: CI must be green"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Security audit — test each OWASP Top 10 item against your API:",
          "Fix anything that fails the audit",
          "Push final version: CI must be green"
        ]
      }
    ]
  },
  {
    "week": 8,
    "name": "The Distributed Warlord",
    "emoji": "🏰",
    "difficulty": "💀",
    "difficultyLabel": "Phase Boss",
    "phase": "backend",
    "phaseLabel": "Backend",
    "skills": [
      "WebSockets",
      "RabbitMQ",
      "OpenAPI",
      "Cloud Deployment",
      "Load Testing"
    ],
    "lore": "Microservices, message queues, real-time connections — all at once, in production. The Warlord has many armies. You must coordinate them all.",
    "winConditions": [
      "Real-time notification system using WebSockets",
      "Background job queue using RabbitMQ",
      "Full OpenAPI/Swagger documentation for every endpoint",
      "Deployed to a real server with a public HTTPS URL",
      "Survives a load test of 100 concurrent requests"
    ],
    "failConditions": [
      "Live URL doesn't work from someone else's device",
      "WebSocket notifications only work on localhost",
      "Load test shows > 1% error rate",
      "OpenAPI spec missing any endpoints"
    ],
    "bossDrops": [],
    "xpReward": 1000,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "WebSockets",
        "subtasks": [
          "Add a WebSocket endpoint: WS /ws/notifications",
          "When a new post is created via POST /posts, broadcast a notification to all connected WebSocket clients",
          "Test: open two browser tabs connected to ws://localhost/ws/notifications, create a post via Postman → both tabs should receive the notification",
          "Handle disconnections gracefully (no errors when a client disconnects)"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "RabbitMQ Message Queue",
        "subtasks": [
          "Add RabbitMQ to Docker Compose: rabbitmq:3-management",
          "Connect from your app using pika (Python) or amqplib (Node)",
          "Producer: when a new user registers, publish a message to an email_queue",
          "Consumer: a separate worker process that reads from email_queue and \"sends\" a welcome email (log it to console for now)",
          "Test: register a user → check consumer logs show \"Sending welcome email to user@example.com\""
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "OpenAPI Documentation",
        "subtasks": [
          "Add OpenAPI/Swagger to your API:",
          "Every endpoint must have:",
          "Export openapi.json and commit to repo",
          "Verify: the Swagger UI at /docs lets you make a real API call"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Deploy to Cloud",
        "subtasks": [
          "Deploy full Docker Compose stack to a real server:",
          "HTTPS must be working (not self-signed — use Let's Encrypt or platform-provided)",
          "All services must be running: app + DB + Redis + Nginx",
          "Verify from your phone: call POST /auth/login from mobile data (not localhost)"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Load Testing",
        "subtasks": [
          "Install locust or k6",
          "Write a load test:",
          "Run: 100 concurrent users, 1 minute",
          "Target: 0% error rate, p99 latency < 500ms",
          "If it fails: profile, find the bottleneck, fix it (likely missing DB index or missing connection pool)"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "End-to-end test on the live URL (not localhost):",
          "Write DEPLOYMENT.md: exact steps to redeploy from scratch",
          "Add live URL to README header"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "End-to-end test on the live URL (not localhost):",
          "Write DEPLOYMENT.md: exact steps to redeploy from scratch",
          "Add live URL to README header"
        ]
      }
    ]
  },
  {
    "week": 9,
    "name": "The Reproducibility Lich",
    "emoji": "📦",
    "difficulty": "⚔️",
    "difficultyLabel": "Normal",
    "phase": "mlops",
    "phaseLabel": "MLOps",
    "skills": [
      "DVC",
      "MLflow",
      "Docker",
      "GitHub Actions",
      "CML"
    ],
    "lore": "\"It worked on my machine.\" The most ancient curse in ML. The Lich survives by making your experiments irreproducible. Its weakness: a stranger being able to clone your repo and reproduce your exact results.",
    "winConditions": [],
    "failConditions": [
      "Hardcoded file paths that only work on your machine",
      "Data committed directly to git (not DVC-tracked)",
      "MLflow runs not logged — \"I ran it but didn't track it\" is not reproducibility",
      "REPRODUCE.md missing"
    ],
    "bossDrops": [],
    "xpReward": 680,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "DVC Setup",
        "subtasks": [
          "pip install dvc dvc-s3 (or dvc-gdrive)",
          "dvc init in your ML repo",
          "dvc add data/raw/titanic.csv → creates data/raw/titanic.csv.dvc",
          "Set up a DVC remote: dvc remote add -d myremote s3://your-bucket/dvc (or Google Drive)",
          "dvc push → data uploaded to remote",
          "Test: delete data/raw/titanic.csv → dvc pull → file restored",
          "Commit .dvc files and .dvcignore to git (never the data itself)"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "DVC Pipeline",
        "subtasks": [
          "Create dvc.yaml defining your pipeline stages:",
          "Run pipeline: dvc repro",
          "Verify: change src/train.py → dvc repro only reruns affected stages"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "MLflow Tracking",
        "subtasks": [
          "Add MLflow to your training script:",
          "Run training 5 times with different hyperparameters",
          "Open MLflow UI: mlflow ui → compare all 5 runs",
          "Register the best model in the MLflow Model Registry with stage: Staging"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Dockerize Training",
        "subtasks": [
          "Write a training Dockerfile:",
          "Test: docker build -t ml-trainer . + docker run ml-trainer",
          "Training must complete inside the container and produce models/best_model.pkl",
          "Use volume mount for output: docker run -v $(pwd)/models:/app/models ml-trainer"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "GitHub Actions + CML",
        "subtasks": [
          "Create .github/workflows/train.yml:",
          "Push and verify: PR comment appears with model metrics"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Delete your local data/, models/, mlruns/ folders",
          "Run: git clone your-repo && dvc pull && dvc repro",
          "Verify the exact same metrics appear",
          "Write REPRODUCE.md:"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Delete your local data/, models/, mlruns/ folders",
          "Run: git clone your-repo && dvc pull && dvc repro",
          "Verify the exact same metrics appear",
          "Write REPRODUCE.md:"
        ]
      }
    ]
  },
  {
    "week": 10,
    "name": "The Pipeline Titan",
    "emoji": "🏭",
    "difficulty": "⚔️⚔️",
    "difficultyLabel": "Hard",
    "phase": "mlops",
    "phaseLabel": "MLOps",
    "skills": [
      "Airflow",
      "Kubernetes",
      "FastAPI",
      "Terraform",
      "Cloud"
    ],
    "lore": "A fully automated ML factory where every step triggers the next. It doesn't sleep. It doesn't forget. When new data arrives at 3am, it trains, evaluates, and deploys the new model before you wake up.",
    "winConditions": [
      "Airflow DAG orchestrating: ingest → preprocess → train → evaluate → register (if better)",
      "FastAPI model server deployed on Kubernetes (minikube ok)",
      "Cloud storage provisioned with Terraform"
    ],
    "failConditions": [
      "Airflow DAG with no error handling or retries configured",
      "Model hardcoded as a file path instead of loaded from MLflow Registry",
      "Kubernetes pods not running (kubectl get pods shows CrashLoopBackOff)",
      "Terraform config not committed to repo"
    ],
    "bossDrops": [],
    "xpReward": 700,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "Airflow Setup",
        "subtasks": [
          "Start Airflow with Docker Compose (official image)",
          "Open UI at http://localhost:8080",
          "Write your first DAG: a single PythonOperator that prints \"Hello from Airflow\"",
          "Trigger it manually from the UI",
          "Understand: DAGs, tasks, operators, task dependencies, execution dates"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Full ML Pipeline DAG",
        "subtasks": [
          "Write dags/ml_pipeline.py with these tasks in order:",
          "Schedule: @daily",
          "Test: trigger manually and watch each task go green in the UI"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "FastAPI Model Server",
        "subtasks": [
          "Build src/serve.py:",
          "Endpoints: /v1/predict, /health, /version",
          "The model is always loaded from MLflow Registry (not a hardcoded file path)",
          "Test with pytest tests/test_api.py"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Kubernetes Deployment",
        "subtasks": [
          "Start minikube: minikube start",
          "Build Docker image: docker build -t ml-api:v1 .",
          "Load image into minikube: minikube image load ml-api:v1",
          "Write k8s/deployment.yaml:",
          "Write k8s/service.yaml (NodePort)",
          "Deploy: kubectl apply -f k8s/",
          "Verify: kubectl get pods shows 2 running pods",
          "Call predict: curl http://$(minikube ip):$(kubectl get svc ml-api -o jsonpath='{.spec.ports[0].nodePort}')/v1/predict"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Terraform",
        "subtasks": [
          "Write infra/main.tf:",
          "terraform init + terraform plan + terraform apply",
          "Verify bucket created in GCP Console",
          "Update your Airflow DAG to read/write data from this bucket",
          "terraform destroy when done (to avoid charges)"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Full end-to-end test:"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Full end-to-end test:"
        ]
      }
    ]
  },
  {
    "week": 11,
    "name": "The Drift Demon",
    "emoji": "📡",
    "difficulty": "⚔️⚔️⚔️",
    "difficultyLabel": "Brutal",
    "phase": "mlops",
    "phaseLabel": "MLOps",
    "skills": [
      "Prometheus",
      "Grafana",
      "Evidently",
      "SHAP",
      "A/B Testing"
    ],
    "lore": "Your model is silently degrading. The data it sees today is not the data it was trained on. It answers confidently and incorrectly. You won't know until users start complaining — unless you built a system that catches it first.",
    "winConditions": [
      "Prometheus + Grafana monitoring with live dashboards and alerts",
      "Evidently drift report: simulate drift, prove the system detects it",
      "Auto-retraining trigger fires when drift exceeds threshold",
      "A/B test routing 80/20 between model v1 and v2"
    ],
    "failConditions": [
      "Grafana dashboard with no alert rules configured",
      "Drift simulation not done — you must prove the system detects drift, not just that it could",
      "Auto-retraining trigger not tested end-to-end",
      "A/B split not logged per request"
    ],
    "bossDrops": [],
    "xpReward": 720,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "Prometheus Instrumentation",
        "subtasks": [
          "Add prometheus-fastapi-instrumentator to your FastAPI server",
          "Expose /metrics endpoint",
          "Add custom metrics:",
          "Instrument every prediction: increment counter, observe latency",
          "Start Prometheus in Docker Compose, configure it to scrape your app",
          "Verify: curl http://localhost:9090 → Prometheus UI loads"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Grafana Dashboard",
        "subtasks": [
          "Add Grafana to Docker Compose",
          "Add Prometheus as a data source",
          "Build a dashboard with these 5 panels:",
          "Export dashboard JSON and commit to monitoring/grafana-dashboard.json",
          "Add one alert rule: fire if error rate > 1% for 5 minutes"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Evidently Drift Detection",
        "subtasks": [
          "Install evidently",
          "Create src/drift_detection.py:",
          "Simulate drift: create a production_df where you shift feature means by +2 std deviations",
          "Run the report — verify it detects drift",
          "Update DRIFT_SCORE Prometheus gauge with the calculated score",
          "Verify: Grafana dashboard updates with drift score"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Auto-Retraining Trigger",
        "subtasks": [
          "When drift_score > 0.3:",
          "Schedule drift detection to run every hour with a cron job or Airflow sensor",
          "Test end-to-end: inject drift → detection script runs → Airflow DAG triggers → new model trained → promoted if better"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "A/B Testing",
        "subtasks": [
          "Load both model v1 and model v2 in your FastAPI app at startup",
          "A/B routing middleware:",
          "Log which model version served each request (to a DB table or file)",
          "Add model_version to your Prometheus predictions_total label",
          "In Grafana: add a panel showing prediction distribution by model version side-by-side",
          "After 200 test requests: query which version had higher confidence scores"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Fight Day",
        "subtasks": [
          "Full scenario test:",
          "Screenshot everything: Grafana dashboard, Evidently report, Airflow DAG run, MLflow registry",
          "These screenshots go in your README and your demo video"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sat–Sun",
        "title": "Fight Day",
        "subtasks": [
          "Full scenario test:",
          "Screenshot everything: Grafana dashboard, Evidently report, Airflow DAG run, MLflow registry",
          "These screenshots go in your README and your demo video"
        ]
      }
    ]
  },
  {
    "week": 12,
    "name": "The Production Dragon",
    "emoji": "🐉",
    "difficulty": "☠️",
    "difficultyLabel": "Endgame",
    "phase": "mlops",
    "phaseLabel": "MLOps",
    "skills": [
      "Everything",
      "All at once",
      "In production",
      "On the internet"
    ],
    "lore": "It breathes fire made of unresolved CRITICAL vulnerabilities. Its scales are architecture decisions you made in Week 1. Its hoard is a public URL that actually works. Defeat it by shipping something real.",
    "winConditions": [],
    "failConditions": [
      "\"Deployed\" = localhost screenshot",
      "No API auth on endpoints",
      "Architecture diagram has no labels",
      "Runbook can't be followed by someone who hasn't read the code",
      "Demo video is a screencast of a Jupyter notebook",
      "Trivy shows unresolved CRITICAL vulnerabilities"
    ],
    "bossDrops": [],
    "xpReward": 2000,
    "dailyTasks": [
      {
        "day": 1,
        "dayLabel": "Monday",
        "title": "CI/CD Performance Gate",
        "subtasks": [
          "Write src/evaluate.py that exits with code 1 if accuracy < threshold",
          "Add performance_gate job to GitHub Actions — runs after training, before deploy",
          "Test: lower model quality intentionally → verify pipeline fails and blocks deploy",
          "Test: restore quality → verify pipeline passes and deploys",
          "Add pipeline status badge to README"
        ]
      },
      {
        "day": 2,
        "dayLabel": "Tuesday",
        "title": "Edge AI Conversion + Benchmark",
        "subtasks": [
          "Write src/convert_tflite.py: float32 + int8 quantized versions",
          "Write src/convert_onnx.py: export + verify with onnxruntime",
          "Write src/benchmark.py: measure size (MB) + inference time (ms) + accuracy for all formats",
          "Add benchmark table to README with real numbers",
          "Commit all model files (or DVC-track if large)"
        ]
      },
      {
        "day": 3,
        "dayLabel": "Wednesday",
        "title": "Security Hardening + Trivy",
        "subtasks": [
          "Add API key auth to all FastAPI endpoints",
          "Store key in environment variable — never hardcoded",
          "Update Dockerfile: non-root user, latest base image",
          "trivy image your-image:latest → fix all CRITICAL and HIGH findings",
          "Add trivy to GitHub Actions: fails build on CRITICAL",
          "Add rate limiting on /predict: 60 req/min per key",
          "Add X-Request-ID header to all responses"
        ]
      },
      {
        "day": 4,
        "dayLabel": "Thursday",
        "title": "Cloud Deployment",
        "subtasks": [
          "Deploy full system to cloud (Cloud Run / EC2 / Render)",
          "Real HTTPS URL — not self-signed",
          "Auto-deploy from GitHub Actions on push to main",
          "Test from phone on mobile data: POST /v1/predict returns a real prediction",
          "Add URL to top of README"
        ]
      },
      {
        "day": 5,
        "dayLabel": "Friday",
        "title": "Architecture Diagram + Runbook",
        "subtasks": [
          "Draw complete architecture on Excalidraw: all 6 layers (data, training, CI/CD, serving, monitoring, edge)",
          "Export as PNG → docs/architecture.png → embed in README",
          "Write docs/RUNBOOK.md with these 6 sections:"
        ]
      },
      {
        "day": 6,
        "dayLabel": "Saturday–Sunday",
        "title": "Adversarial Testing + Demo Video",
        "subtasks": [
          "Test: malformed JSON → 422",
          "Test: wrong data types → 422",
          "Test: no API key → 401",
          "Test: push bad model → CI blocks deploy",
          "Test: inject drift → detection fires",
          "Test: kill container → Kubernetes restarts it",
          "Fix anything that fails",
          "Record 3-minute demo: architecture → live API call → Grafana → CI gate → edge benchmark"
        ]
      },
      {
        "day": 7,
        "dayLabel": "Sun",
        "title": "Final Polish + README + Ship",
        "subtasks": [
          "README: live URL, demo video, architecture diagram, benchmark table, quick start, tech stack table",
          "All 8 win conditions verified",
          ".env.example committed",
          "GitHub repo set to public",
          "Post on LinkedIn with live URL and GitHub link"
        ]
      }
    ]
  }
];

export const BOSSFIGHT_MARKDOWN = `# ⚔️ All 12 Boss Fights — Complete Battle Guide
### ML → Backend → MLOps · 12 Weeks · 2 hrs/day

> **How to use this:** Each boss drops on Sunday of that week. Read the fight details on Tuesday. Spend the week learning. Move on only after the win condition is met.
>
> **Rule:** A boss is not defeated by reading about it. It is defeated by shipping something.

---

## 📍 Roadmap Overview

| Week | Boss | Phase | Difficulty |
|------|------|-------|------------|
| 1 | The Data Golem | ML | ⚔️ Normal |
| 2 | The Model Arena | ML | ⚔️⚔️ Hard |
| 3 | The Neural Hydra | ML | ⚔️⚔️⚔️ Brutal |
| 4 | The Transformer Overlord | ML · Phase Boss | 💀 |
| 5 | The HTTP Phantom | Backend | ⚔️ Normal |
| 6 | The Database Kraken | Backend | ⚔️⚔️ Hard |
| 7 | The OWASP Wraith | Backend | ⚔️⚔️ Hard |
| 8 | The Distributed Warlord | Backend · Phase Boss | 💀 |
| 9 | The Reproducibility Lich | MLOps | ⚔️ Normal |
| 10 | The Pipeline Titan | MLOps | ⚔️⚔️ Hard |
| 11 | The Drift Demon | MLOps | ⚔️⚔️⚔️ Brutal |
| 12 | The Production Dragon | MLOps · Final Boss | ☠️ Endgame |

---

---

# 🧠 PHASE 1 — MACHINE LEARNING (Weeks 1–4)

---

## Week 1 — 🧮 The Data Golem
**Difficulty:** ⚔️ Normal · **Skills:** NumPy · Pandas · Matplotlib · Seaborn · Data Cleaning · EDA

> *A raw, dirty dataset that refuses to be tamed. It has missing values for arms, duplicate rows for legs, and wrong data types for a brain. Your job is to give it shape.*

---

### Win Condition
Take the Titanic or Housing Prices dataset — completely raw — and produce:
1. A fully cleaned, analysis-ready DataFrame
2. A Jupyter notebook with 8+ visualizations and markdown explanations
3. A 3-sentence written summary of what the data is telling you

---

### Daily Sub-Tasks

**Day 1 (Mon) — Load & Inspect**
- [ ] Download the raw Titanic dataset from Kaggle
- [ ] Load with Pandas: \`pd.read_csv()\`
- [ ] Print \`.shape\`, \`.dtypes\`, \`.info()\`, \`.describe()\`
- [ ] Count nulls per column: \`df.isnull().sum()\`
- [ ] Identify which columns have > 20% missing values
- [ ] Write a markdown cell: "Here is what I found in the raw data"

**Day 2 (Tue) — Clean**
- [ ] Drop columns with > 50% missing values and justify why
- [ ] Impute missing numerics with median (not mean — why?)
- [ ] Impute missing categoricals with mode
- [ ] Remove duplicate rows
- [ ] Fix wrong data types (e.g., convert strings to datetime, IDs to int)
- [ ] Verify: \`df.isnull().sum()\` returns all zeros

**Day 3 (Wed) — Feature Engineering**
- [ ] Create at least 2 new features from existing columns
  - Example: \`FamilySize = SibSp + Parch + 1\`
  - Example: \`IsAlone = 1 if FamilySize == 1 else 0\`
  - Example: \`Title\` extracted from the Name column
- [ ] Encode categorical columns: one-hot or label encoding
- [ ] Bin a continuous variable into buckets (e.g., Age → age groups)

**Day 4 (Thu) — Feature Scaling**
- [ ] Apply \`StandardScaler\` to all numeric columns
- [ ] Apply \`MinMaxScaler\` to one column — understand the difference
- [ ] Save the scaler with \`joblib\` — you will need it later

**Day 5 (Fri) — Visualizations**
- [ ] Plot 1: Distribution of target variable (survival rate)
- [ ] Plot 2: Missing values heatmap (\`seaborn.heatmap\`)
- [ ] Plot 3: Correlation heatmap
- [ ] Plot 4: Survival rate by gender (bar chart)
- [ ] Plot 5: Age distribution (histogram)
- [ ] Plot 6: Fare vs Survival (box plot)
- [ ] Plot 7: Pairplot on numeric columns
- [ ] Plot 8: Survival by passenger class (countplot)
- [ ] Every plot must have: title, axis labels, and a markdown explanation beneath it

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Consolidate all cleaning steps into a single \`preprocess.py\` script
- [ ] Running \`python preprocess.py\` should produce \`data/processed/clean.csv\` from \`data/raw/titanic.csv\`
- [ ] Final notebook: clean, with all visualizations and markdown cells
- [ ] Push to GitHub with a README that describes the dataset and your findings

---

### ☠️ Instant Fail Conditions
- Notebook has no markdown cells — plots without explanation are not EDA
- \`df.isnull().sum()\` still shows missing values at the end
- No \`preprocess.py\` script — the cleaning must be reproducible, not just in a notebook
- Less than 8 visualizations

---

### 🎁 Boss Drop (what you unlock)
A clean, analysis-ready dataset that all future weeks will use. A \`preprocess.py\` script you can plug into any pipeline. The habit of always explaining what you see.

---
---

## Week 2 — 🤖 The Model Arena
**Difficulty:** ⚔️⚔️ Hard · **Skills:** scikit-learn · Cross-validation · XGBoost · SHAP · Model Evaluation

> *Five models walk into the arena. Only one walks out. You are the judge. Your verdict must be backed by numbers, not instinct.*

---

### Win Condition
On the same dataset from Week 1:
1. Train 5 different models
2. Tune hyperparameters for the top 2
3. Select the best model using cross-validation
4. Produce a model card explaining your choice with evidence

---

### Daily Sub-Tasks

**Day 1 (Mon) — Baseline Models**
- [ ] Load your clean dataset from Week 1
- [ ] Split into train/test (80/20, stratified): \`train_test_split(..., stratify=y)\`
- [ ] Train 5 models with default hyperparameters:
  - Logistic Regression
  - K-Nearest Neighbors
  - Support Vector Machine
  - Random Forest
  - XGBoost
- [ ] Evaluate each: accuracy, F1, precision, recall
- [ ] Build a results DataFrame and print it sorted by F1

**Day 2 (Tue) — Cross-Validation**
- [ ] Replace simple train/test with 5-fold stratified cross-validation for all 5 models
- [ ] Report mean ± std for accuracy and F1
- [ ] Understand why cross-validation is more reliable than a single split
- [ ] Write a markdown cell: "I am using cross-validation because..."

**Day 3 (Wed) — Hyperparameter Tuning**
- [ ] Pick your top 2 models from Day 2
- [ ] Tune Model 1 with \`GridSearchCV\` (exhaustive, small grid)
- [ ] Tune Model 2 with \`RandomizedSearchCV\` (faster, larger grid)
- [ ] Understand the difference: when to use each
- [ ] Report best params and new cross-validated score for each

**Day 4 (Thu) — Model Evaluation Deep Dive**
- [ ] On your best model, produce:
  - Confusion matrix (plotted with seaborn)
  - ROC-AUC curve
  - Precision-Recall curve
  - Classification report (\`sklearn.metrics.classification_report\`)
- [ ] Explain what each metric means for your specific problem
  - "I care more about recall than precision here because..."

**Day 5 (Fri) — SHAP Explainability**
- [ ] Install \`shap\`
- [ ] Compute SHAP values for your best model
- [ ] Plot: \`shap.summary_plot()\` — feature importance bar chart
- [ ] Plot: \`shap.waterfall_plot()\` for one specific prediction
- [ ] Write: "The top 3 features driving predictions in this model are X, Y, Z because..."

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Save best model with \`joblib.dump(model, 'models/best_model.pkl')\`
- [ ] Save scaler: \`joblib.dump(scaler, 'models/scaler.pkl')\`
- [ ] Write \`model_card.md\`:

\`\`\`markdown
# Model Card

## Model: XGBoost Classifier v1
## Task: Binary classification — passenger survival

## Performance (5-fold cross-validation)
| Metric | Score |
|--------|-------|
| Accuracy | 0.836 ± 0.018 |
| F1 | 0.812 ± 0.022 |
| AUC-ROC | 0.874 ± 0.015 |

## Why I chose this model over the others
...

## Top 3 most important features
1. Sex — SHAP value: 0.42
2. Fare — SHAP value: 0.28
3. Age — SHAP value: 0.19

## Limitations
...
\`\`\`

---

### ☠️ Instant Fail Conditions
- No cross-validation — a single train/test accuracy is not evidence
- No SHAP analysis — you must be able to explain the model
- Model not saved — if you can't load it later, it doesn't exist
- No model card — numbers without interpretation don't count

---

### 🎁 Boss Drop
A saved, explained, cross-validated model. A model card template you'll use for every future project. The ability to tell an interviewer exactly why you picked your model.

---
---

## Week 3 — 🧠 The Neural Hydra
**Difficulty:** ⚔️⚔️⚔️ Brutal · **Skills:** PyTorch · CNN · LSTM · Training loops · Loss curves

> *Cut one head (a bug), two more appear (vanishing gradients, overfitting). The Hydra doesn't fight you — it waits for you to make mistakes.*

---

### Win Condition
Build two neural networks from scratch in PyTorch — no \`.fit()\`:
1. A CNN on CIFAR-10 that beats 75% accuracy
2. An LSTM on a sequential task (text or time series)
Both must have plotted loss/accuracy curves and a written explanation of one training problem you hit and how you fixed it.

---

### Daily Sub-Tasks

**Day 1 (Mon) — MLP from Scratch**
- [ ] Build a 2-layer MLP in pure NumPy (no frameworks) for binary classification
  - Forward pass: \`z = W·x + b\`, \`a = sigmoid(z)\`
  - Loss: binary cross-entropy
  - Backward pass: derive and implement gradients manually
  - Update: \`W = W - lr * dW\`
- [ ] Train on your Titanic dataset — watch loss decrease
- [ ] Plot loss over epochs
- [ ] Write: "Now I understand backpropagation because I coded it and saw..."

**Day 2 (Tue) — PyTorch Fundamentals**
- [ ] Tensors: create, reshape, slice, move to GPU
- [ ] \`autograd\`: \`requires_grad\`, \`.backward()\`, \`.grad\`
- [ ] Build a PyTorch MLP using \`nn.Module\`:
  \`\`\`python
  class MLP(nn.Module):
      def __init__(self):
          super().__init__()
          self.fc1 = nn.Linear(in, hidden)
          self.fc2 = nn.Linear(hidden, out)
      def forward(self, x):
          return self.fc2(F.relu(self.fc1(x)))
  \`\`\`
- [ ] Write a full training loop: optimizer, loss, \`.backward()\`, \`.step()\`
- [ ] Train on MNIST — target > 97% accuracy

**Day 3 (Wed) — CNN on CIFAR-10**
- [ ] Load CIFAR-10 with \`torchvision.datasets.CIFAR10\`
- [ ] Build a CNN:
  \`\`\`
  Conv2d(3, 32, 3) → ReLU → MaxPool →
  Conv2d(32, 64, 3) → ReLU → MaxPool →
  Flatten → Linear(64*6*6, 512) → ReLU → Linear(512, 10)
  \`\`\`
- [ ] Add Batch Normalization and Dropout
- [ ] Train for 20+ epochs with Adam optimizer
- [ ] Target: > 75% test accuracy
- [ ] Plot: training loss, validation loss, training accuracy, validation accuracy on same figure
- [ ] Identify: is your model overfitting, underfitting, or well-fit?

**Day 4 (Thu) — Fix One Problem**
Pick one of these and fix it (document which you chose and what you did):
- [ ] **Overfitting:** Add Dropout, Data Augmentation (\`RandomHorizontalFlip\`, \`RandomCrop\`)
- [ ] **Slow convergence:** Implement learning rate scheduling (\`StepLR\` or \`CosineAnnealingLR\`)
- [ ] **Underfitting:** Add more layers or increase filter counts
- [ ] Write: "The problem was X. I fixed it by doing Y. The effect was Z (with numbers)."

**Day 5 (Fri) — LSTM**
- [ ] Choose a sequential task:
  - **Option A:** Next-character prediction on a small text file (e.g., Shakespeare)
  - **Option B:** Time series forecasting on stock prices or weather data
- [ ] Build an LSTM model:
  \`\`\`python
  class LSTMModel(nn.Module):
      def __init__(self, input_size, hidden_size, output_size):
          super().__init__()
          self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
          self.fc = nn.Linear(hidden_size, output_size)
  \`\`\`
- [ ] Train for 30+ epochs
- [ ] Plot loss curve
- [ ] Show 5 example predictions vs actual values

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] CNN: final test accuracy printed and confirmed > 75%
- [ ] LSTM: loss curve showing convergence
- [ ] Both models saved: \`torch.save(model.state_dict(), 'models/cnn.pth')\`
- [ ] Written section in notebook: "One thing that went wrong during training and how I fixed it"
- [ ] Both notebooks pushed to GitHub with clear README

---

### ☠️ Instant Fail Conditions
- Using Keras \`.fit()\` without understanding what it does under the hood
- CNN accuracy below 75%
- No training problem documented — if nothing went wrong, you didn't try hard enough
- Training loop copied from a tutorial without understanding each line

---

### 🎁 Boss Drop
Two working neural networks. A manual training loop you wrote yourself. The ability to diagnose and fix training problems. Confidence that you understand what frameworks are doing for you.

---
---

## Week 4 — 👾 The Transformer Overlord *(ML Phase Boss)*
**Difficulty:** 💀 Phase Boss · **Skills:** HuggingFace · BERT · Fine-tuning · Semantic Search · Streamlit · Deployment

> *It has read everything. It understands context. It knows what you meant, not just what you wrote. And it's live on the internet, waiting for anyone to use it.*

---

### Win Condition
1. Fine-tune BERT (or DistilBERT) on a classification task — achieve > 85% test accuracy
2. Build a Streamlit app: input text → prediction + confidence + SHAP explanation
3. Deploy it to Hugging Face Spaces — a real public URL

---

### Daily Sub-Tasks

**Day 1 (Mon) — HuggingFace Fundamentals**
- [ ] Install \`transformers\`, \`datasets\`, \`tokenizers\`
- [ ] Load a pre-trained model and tokenizer: \`AutoModelForSequenceClassification\`
- [ ] Understand tokenization: tokens, input_ids, attention_mask, token_type_ids
- [ ] Run zero-shot inference on 5 sentences — see what the pre-trained model predicts without any fine-tuning
- [ ] Choose your dataset:
  - **Option A:** IMDb sentiment (positive/negative)
  - **Option B:** AG News topic classification (4 classes)
  - **Option C:** SMS Spam detection (binary)

**Day 2 (Tue) — Fine-Tuning Setup**
- [ ] Load your dataset with \`datasets.load_dataset()\`
- [ ] Tokenize with padding and truncation (max_length=128)
- [ ] Create PyTorch DataLoaders
- [ ] Set up training:
  - Model: \`DistilBERT\` (faster than BERT for training)
  - Optimizer: \`AdamW\` with weight decay
  - Scheduler: linear warmup
  - Mixed precision: \`torch.cuda.amp\` if GPU available
- [ ] Train for 3 epochs — watch loss drop

**Day 3 (Wed) — Evaluate + Improve**
- [ ] Evaluate on test set: accuracy, F1, confusion matrix
- [ ] If accuracy < 85%:
  - Try longer training (5 epochs)
  - Try lower learning rate (2e-5)
  - Try unfreezing more layers
- [ ] Save the fine-tuned model: \`model.save_pretrained('models/bert-classifier')\`
- [ ] Save tokenizer: \`tokenizer.save_pretrained('models/bert-classifier')\`
- [ ] Log training run with MLflow

**Day 4 (Thu) — Semantic Search Bonus**
- [ ] Install \`sentence-transformers\`
- [ ] Load \`all-MiniLM-L6-v2\` (fast, lightweight)
- [ ] Create embeddings for 50+ sentences from your dataset
- [ ] Implement a simple semantic search:
  \`\`\`python
  query_embedding = model.encode(query)
  similarities = cosine_similarity([query_embedding], corpus_embeddings)
  top_5 = similarities.argsort()[0][-5:]
  \`\`\`
- [ ] Test: query "great movie" → should return positive reviews

**Day 5 (Fri) — Streamlit App**
- [ ] Build \`app.py\` with Streamlit:
  \`\`\`python
  import streamlit as st
  text = st.text_area("Enter text to classify:")
  if st.button("Predict"):
      prediction, confidence = classify(text)
      st.write(f"**Prediction:** {prediction}")
      st.write(f"**Confidence:** {confidence:.1%}")
      # SHAP explanation
      shap_values = explain(text)
      st_shap(shap.force_plot(shap_values))
  \`\`\`
- [ ] Run locally: \`streamlit run app.py\`
- [ ] Test with 10 different inputs

**Day 6–7 (Sat–Sun) — Fight Day: Deploy**
- [ ] Create account on [Hugging Face](https://huggingface.co)
- [ ] Push model to Hugging Face Hub: \`model.push_to_hub("your-username/bert-classifier")\`
- [ ] Create a new Space (Streamlit type)
- [ ] Push your \`app.py\` and \`requirements.txt\` to the Space repo
- [ ] Verify the app loads at \`https://huggingface.co/spaces/your-username/your-space\`
- [ ] Test from your phone — it must work on mobile
- [ ] Add the public URL to your GitHub README
- [ ] Write a model card on Hugging Face with: task, dataset, accuracy, limitations

---

### ☠️ Instant Fail Conditions
- "Deployed" means a localhost screenshot — it must be a real public URL
- Accuracy below 85% on test set
- No SHAP explanation in the app — prediction alone is not enough
- App crashes on any of these inputs: empty string, very long text, non-English text, emojis

---

### 🎁 Boss Drop (Phase 1 Complete)
A publicly deployed NLP model. A Hugging Face profile with a published model and Space. The ability to go from raw text data to a production-ready classifier. **You are now an ML practitioner.**

---
---
---

# 🖥️ PHASE 2 — BACKEND (Weeks 5–8)

---

## Week 5 — 🌐 The HTTP Phantom
**Difficulty:** ⚔️ Normal · **Skills:** Node.js or Python · REST API · HTTP · Git · Postman

> *An API that lives in your head but not on the internet. It exists when you describe it. It vanishes the moment someone tries to actually call it.*

---

### Win Condition
Build a REST API from scratch with:
1. At least 5 working endpoints (CRUD)
2. Correct HTTP methods and status codes throughout
3. Input validation with meaningful error messages
4. A Postman collection exported and committed
5. A README with curl examples for every endpoint

---

### Daily Sub-Tasks

**Day 1 (Mon) — Environment + First Route**
- [ ] Choose your stack: Node.js (Express) or Python (FastAPI)
- [ ] Initialize project: \`npm init\` or \`poetry init\`
- [ ] Build a \`GET /health\` endpoint that returns \`{"status": "ok", "timestamp": "..."}\`
- [ ] Run the server and call the endpoint with curl
- [ ] Set up \`.gitignore\`, commit to GitHub

**Day 2 (Tue) — Choose a Domain + Schema**
Pick a simple domain (blog posts, todos, products, books):
- [ ] Define your data schema (in-memory for now, no database yet):
  \`\`\`python
  posts = [
    {"id": 1, "title": "First Post", "content": "...", "author": "Alice"}
  ]
  \`\`\`
- [ ] Build \`GET /posts\` → returns list of all items
- [ ] Build \`GET /posts/{id}\` → returns one item or 404 if not found
- [ ] Test both with Postman

**Day 3 (Wed) — Write Operations**
- [ ] Build \`POST /posts\` → creates a new item, returns 201 with the created object
- [ ] Build \`PUT /posts/{id}\` → updates an item, returns 200; 404 if not found
- [ ] Build \`DELETE /posts/{id}\` → deletes an item, returns 204; 404 if not found
- [ ] Test all 5 endpoints in Postman

**Day 4 (Thu) — Input Validation**
- [ ] Add request body validation to \`POST\` and \`PUT\`:
  - Required fields must be present → 400 if missing
  - Field types must be correct → 400 with message "title must be a string"
  - No extra unknown fields accepted
- [ ] Add path parameter validation: \`GET /posts/abc\` should return 400 "id must be an integer"
- [ ] Test: send bad requests and verify you get 400 with a clear error message, not a 500 crash

**Day 5 (Fri) — Postman Collection + README**
- [ ] In Postman: create a collection with one request per endpoint
- [ ] Add example request body and expected response for each
- [ ] Export as \`postman_collection.json\` and commit to repo
- [ ] Write README with:
  - Description of the API
  - How to run it locally
  - curl example for every endpoint

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Code review: read every line of your own code as if you're a reviewer
- [ ] Edge cases: what happens with negative IDs? Empty strings? 10,000 items?
- [ ] Add a \`GET /posts?search=keyword\` query parameter filter
- [ ] Final test: run through the Postman collection top to bottom, all green

---

### ☠️ Instant Fail Conditions
- Any endpoint returns 200 when an error occurred
- Server crashes on bad input instead of returning 400
- No README with curl examples
- No Postman collection committed

---

### 🎁 Boss Drop
A working REST API with proper status codes and validation. A Postman collection as living documentation. The habit of testing edge cases.

---
---

## Week 6 — 🗄️ The Database Kraken
**Difficulty:** ⚔️⚔️ Hard · **Skills:** PostgreSQL · SQL · Migrations · Redis · JWT Auth · bcrypt

> *Slow queries, N+1 problems, and missing indexes lurk in the deep. It has tentacles in your auth system, your cache, and your query planner. Cut one tentacle: another wraps around your response time.*

---

### Win Condition
Add to your Week 5 API:
1. A PostgreSQL database with migrations (not manual SQL)
2. JWT authentication (register + login + protected routes)
3. Redis caching on at least 2 GET endpoints
4. Zero N+1 problems — verified with \`EXPLAIN ANALYZE\`

---

### Daily Sub-Tasks

**Day 1 (Mon) — PostgreSQL Setup**
- [ ] Install PostgreSQL locally or use Docker: \`docker run -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres\`
- [ ] Connect from Python/Node with a database client
- [ ] Design your schema (at least 3 tables with relationships):
  - Example: \`users\`, \`posts\`, \`comments\`
  - Define primary keys, foreign keys, NOT NULL constraints
- [ ] Write \`migrations/001_create_tables.sql\`

**Day 2 (Tue) — Migrations + ORM**
- [ ] Set up a migration tool: Alembic (Python) or Knex (Node)
- [ ] Convert your raw SQL to migration files
- [ ] Run migrations: \`alembic upgrade head\`
- [ ] Write a seed script: \`python seed.py\` populates 10 users, 20 posts, 50 comments
- [ ] Verify with \`psql\`: \`SELECT count(*) FROM posts;\`

**Day 3 (Wed) — JWT Authentication**
- [ ] Build \`POST /auth/register\`:
  - Accept email + password
  - Hash password with bcrypt (\`bcrypt.hashpw\`)
  - Store user in database
  - Return 201
- [ ] Build \`POST /auth/login\`:
  - Verify email + password against database
  - Return a signed JWT: \`jwt.encode({"user_id": id, "exp": ...}, SECRET_KEY)\`
- [ ] Build auth middleware that:
  - Reads \`Authorization: Bearer <token>\` header
  - Verifies and decodes the JWT
  - Attaches user to request context
  - Returns 401 if token missing or invalid

**Day 4 (Thu) — Protected Routes + N+1 Fix**
- [ ] Apply auth middleware to \`POST\`, \`PUT\`, \`DELETE\` routes
- [ ] \`POST /posts\` must associate the post with the logged-in user (\`user_id\` from JWT)
- [ ] Deliberately create an N+1: fetch all posts, then for each post fetch the author separately
- [ ] Measure the query count (enable query logging)
- [ ] Fix with a JOIN: fetch posts + authors in a single query
- [ ] Run \`EXPLAIN ANALYZE\` before and after — paste both outputs into your notes

**Day 5 (Fri) — Redis Caching**
- [ ] Start Redis: \`docker run -p 6379:6379 redis\`
- [ ] Connect from your app
- [ ] Add caching to \`GET /posts\` (60 second TTL):
  \`\`\`python
  cached = redis_client.get("posts:all")
  if cached:
      return json.loads(cached)
  posts = db.query(Post).all()
  redis_client.setex("posts:all", 60, json.dumps(posts))
  return posts
  \`\`\`
- [ ] Add caching to \`GET /posts/{id}\` with key \`posts:{id}\`
- [ ] Cache invalidation: delete \`posts:all\` cache key when a post is created/updated/deleted
- [ ] Verify caching works: check Redis CLI: \`redis-cli KEYS *\`

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Full flow test:
  1. Register a user
  2. Login → get JWT
  3. Create a post with the token
  4. Fetch posts (should be cached after first call)
  5. Update the post (cache should be invalidated)
  6. Fetch posts again (fresh from DB, then cached again)
  7. Delete the post
  8. Try to create a post without a token → 401
- [ ] Add \`POST /posts/{id}/comments\` endpoint (authenticated, belongs to a post)
- [ ] Push to GitHub

---

### ☠️ Instant Fail Conditions
- Passwords stored in plain text — instant disqualification
- JWT secret key hardcoded in source code
- No migration files — the schema must be reproducible
- Caching with no invalidation strategy

---

### 🎁 Boss Drop
A database-backed API with auth and caching. The habit of thinking about query efficiency. An understanding of why caching and auth are not optional in production.

---
---

## Week 7 — 🔐 The OWASP Wraith
**Difficulty:** ⚔️⚔️ Hard · **Skills:** Nginx · HTTPS · CORS · Rate Limiting · Docker · GitHub Actions

> *A ghost that slips through every gap you forgot to close. It doesn't attack your code — it attacks your assumptions. "CORS is fine with * for now." It waits for statements like that.*

---

### Win Condition
1. Dockerize the full stack (app + DB + Redis + Nginx)
2. Nginx as reverse proxy with HTTPS
3. Hardened API: CORS, rate limiting, security headers, input sanitization
4. GitHub Actions CI pipeline: lint + test, passing on every push

---

### Daily Sub-Tasks

**Day 1 (Mon) — Docker Compose**
- [ ] Write a \`Dockerfile\` for your app:
  \`\`\`dockerfile
  FROM python:3.11-slim
  WORKDIR /app
  COPY requirements.txt .
  RUN pip install -r requirements.txt
  COPY . .
  CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
  \`\`\`
- [ ] Write \`docker-compose.yml\` with 3 services:
  - \`app\`: your API
  - \`db\`: PostgreSQL
  - \`redis\`: Redis
- [ ] Verify: \`docker compose up\` → all 3 services healthy
- [ ] Database must persist on restart: use a named volume for PostgreSQL data

**Day 2 (Tue) — Nginx Reverse Proxy**
- [ ] Add Nginx as a 4th service in Docker Compose
- [ ] Write \`nginx/nginx.conf\`:
  \`\`\`nginx
  server {
      listen 80;
      location / {
          proxy_pass http://app:8000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }
  \`\`\`
- [ ] Verify: \`curl http://localhost\` → proxied to your app
- [ ] Generate self-signed SSL cert: \`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\`
- [ ] Add HTTPS to Nginx config (port 443)
- [ ] Verify: \`curl -k https://localhost\` works

**Day 3 (Wed) — Security Headers**
Add these headers to every response (in Nginx or app middleware):
- [ ] \`X-Frame-Options: DENY\` — prevents clickjacking
- [ ] \`X-Content-Type-Options: nosniff\` — prevents MIME sniffing
- [ ] \`X-XSS-Protection: 1; mode=block\`
- [ ] \`Strict-Transport-Security: max-age=31536000; includeSubDomains\`
- [ ] \`Content-Security-Policy: default-src 'self'\`
- [ ] \`Referrer-Policy: strict-origin-when-cross-origin\`
- [ ] Verify headers with: \`curl -I https://localhost -k\`

**Day 4 (Thu) — CORS + Rate Limiting**
- [ ] Configure CORS properly — NOT wildcard \`*\`:
  \`\`\`python
  app.add_middleware(CORSMiddleware,
      allow_origins=["https://your-frontend.com"],
      allow_methods=["GET", "POST", "PUT", "DELETE"],
      allow_headers=["Authorization", "Content-Type"],
  )
  \`\`\`
- [ ] Add rate limiting on auth endpoints (prevent brute force):
  - \`/auth/login\`: max 5 requests per minute per IP
  - \`/auth/register\`: max 3 requests per minute per IP
  - Use \`slowapi\` (Python) or \`express-rate-limit\` (Node)
- [ ] Test: hit the login endpoint 10 times fast → should get 429 after 5

**Day 5 (Fri) — GitHub Actions CI**
- [ ] Create \`.github/workflows/ci.yml\`:
  \`\`\`yaml
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Install dependencies
          run: pip install -r requirements.txt
        - name: Lint
          run: flake8 src/
        - name: Test
          run: pytest tests/ -v
  \`\`\`
- [ ] Write at least 5 tests in \`tests/\`:
  - \`test_health_endpoint_returns_200\`
  - \`test_unauthenticated_request_returns_401\`
  - \`test_register_creates_user\`
  - \`test_login_returns_jwt\`
  - \`test_rate_limit_blocks_excessive_requests\`
- [ ] Verify: push to GitHub → Actions tab shows green

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Security audit — test each OWASP Top 10 item against your API:
  - SQL Injection: try \`' OR '1'='1\` in a text field
  - Broken Auth: try expired JWT, tampered JWT
  - Sensitive Data: verify passwords are bcrypt hashed in DB
  - Security Misconfiguration: verify no stack traces exposed in 500 responses
- [ ] Fix anything that fails the audit
- [ ] Push final version: CI must be green

---

### ☠️ Instant Fail Conditions
- CORS set to \`*\` in any environment
- Rate limiting not tested (write the test)
- Security headers missing from responses
- CI pipeline not set up or not passing

---

### 🎁 Boss Drop
A hardened, containerized API stack. A passing CI pipeline. The ability to explain to an interviewer exactly what each security measure does and why it's there.

---
---

## Week 8 — 🏰 The Distributed Warlord *(Backend Phase Boss)*
**Difficulty:** 💀 Phase Boss · **Skills:** WebSockets · RabbitMQ · OpenAPI · Cloud Deployment · Load Testing

> *Microservices, message queues, real-time connections — all at once, in production. The Warlord has many armies. You must coordinate them all.*

---

### Win Condition
1. Real-time notification system using WebSockets
2. Background job queue using RabbitMQ
3. Full OpenAPI/Swagger documentation for every endpoint
4. Deployed to a real server with a public HTTPS URL
5. Survives a load test of 100 concurrent requests

---

### Daily Sub-Tasks

**Day 1 (Mon) — WebSockets**
- [ ] Add a WebSocket endpoint: \`WS /ws/notifications\`
- [ ] When a new post is created via \`POST /posts\`, broadcast a notification to all connected WebSocket clients
- [ ] Test: open two browser tabs connected to \`ws://localhost/ws/notifications\`, create a post via Postman → both tabs should receive the notification
- [ ] Handle disconnections gracefully (no errors when a client disconnects)

**Day 2 (Tue) — RabbitMQ Message Queue**
- [ ] Add RabbitMQ to Docker Compose: \`rabbitmq:3-management\`
- [ ] Connect from your app using \`pika\` (Python) or \`amqplib\` (Node)
- [ ] Producer: when a new user registers, publish a message to an \`email_queue\`
- [ ] Consumer: a separate worker process that reads from \`email_queue\` and "sends" a welcome email (log it to console for now)
- [ ] Test: register a user → check consumer logs show "Sending welcome email to user@example.com"

**Day 3 (Wed) — OpenAPI Documentation**
- [ ] Add OpenAPI/Swagger to your API:
  - FastAPI: automatic at \`/docs\` and \`/redoc\`
  - Express: use \`swagger-jsdoc\` + \`swagger-ui-express\`
- [ ] Every endpoint must have:
  - Summary and description
  - Request body schema with examples
  - All possible response codes with examples (200, 201, 400, 401, 404, 422, 429)
  - Auth requirement noted
- [ ] Export \`openapi.json\` and commit to repo
- [ ] Verify: the Swagger UI at \`/docs\` lets you make a real API call

**Day 4 (Thu) — Deploy to Cloud**
- [ ] Deploy full Docker Compose stack to a real server:
  - **Option A:** GCP Cloud Run (recommended — free tier)
  - **Option B:** Render (easiest)
  - **Option C:** AWS EC2 (most control)
- [ ] HTTPS must be working (not self-signed — use Let's Encrypt or platform-provided)
- [ ] All services must be running: app + DB + Redis + Nginx
- [ ] Verify from your phone: call \`POST /auth/login\` from mobile data (not localhost)

**Day 5 (Fri) — Load Testing**
- [ ] Install \`locust\` or \`k6\`
- [ ] Write a load test:
  \`\`\`python
  # locustfile.py
  class APIUser(HttpUser):
      @task
      def get_posts(self):
          self.client.get("/posts", headers={"Authorization": f"Bearer {TOKEN}"})
      @task
      def create_post(self):
          self.client.post("/posts", json={"title": "Test", "content": "..."}, headers=...)
  \`\`\`
- [ ] Run: 100 concurrent users, 1 minute
- [ ] Target: 0% error rate, p99 latency < 500ms
- [ ] If it fails: profile, find the bottleneck, fix it (likely missing DB index or missing connection pool)

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] End-to-end test on the live URL (not localhost):
  1. Register → get email notification in consumer logs
  2. Login → get JWT
  3. Connect WebSocket
  4. Create a post → WebSocket notification fires
  5. Fetch posts (cached)
  6. Load test: 100 concurrent → all green
- [ ] Write \`DEPLOYMENT.md\`: exact steps to redeploy from scratch
- [ ] Add live URL to README header

---

### ☠️ Instant Fail Conditions
- Live URL doesn't work from someone else's device
- WebSocket notifications only work on localhost
- Load test shows > 1% error rate
- OpenAPI spec missing any endpoints

---

### 🎁 Boss Drop (Phase 2 Complete)
A production backend with real-time features, async processing, full docs, and load-tested performance. **You are now a backend engineer.**

---
---
---

# ⚙️ PHASE 3 — MLOPS (Weeks 9–12)

---

## Week 9 — 📦 The Reproducibility Lich
**Difficulty:** ⚔️ Normal · **Skills:** DVC · MLflow · Docker · GitHub Actions · CML

> *"It worked on my machine." The most ancient curse in ML. The Lich survives by making your experiments irreproducible. Its weakness: a stranger being able to clone your repo and reproduce your exact results.*

---

### Win Condition
Take your best ML model from Phase 1 and make it 100% reproducible:
A stranger clones your repo, runs one command, and gets the exact same model with the exact same metrics.

---

### Daily Sub-Tasks

**Day 1 (Mon) — DVC Setup**
- [ ] \`pip install dvc dvc-s3\` (or \`dvc-gdrive\`)
- [ ] \`dvc init\` in your ML repo
- [ ] \`dvc add data/raw/titanic.csv\` → creates \`data/raw/titanic.csv.dvc\`
- [ ] Set up a DVC remote: \`dvc remote add -d myremote s3://your-bucket/dvc\` (or Google Drive)
- [ ] \`dvc push\` → data uploaded to remote
- [ ] Test: delete \`data/raw/titanic.csv\` → \`dvc pull\` → file restored
- [ ] Commit \`.dvc\` files and \`.dvcignore\` to git (never the data itself)

**Day 2 (Tue) — DVC Pipeline**
- [ ] Create \`dvc.yaml\` defining your pipeline stages:
  \`\`\`yaml
  stages:
    preprocess:
      cmd: python src/preprocess.py
      deps: [data/raw/titanic.csv, src/preprocess.py]
      outs: [data/processed/clean.csv]
    train:
      cmd: python src/train.py
      deps: [data/processed/clean.csv, src/train.py]
      outs: [models/best_model.pkl]
      metrics: [metrics/scores.json]
  \`\`\`
- [ ] Run pipeline: \`dvc repro\`
- [ ] Verify: change \`src/train.py\` → \`dvc repro\` only reruns affected stages

**Day 3 (Wed) — MLflow Tracking**
- [ ] Add MLflow to your training script:
  \`\`\`python
  mlflow.set_experiment("titanic-classifier")
  with mlflow.start_run():
      mlflow.log_param("n_estimators", 100)
      mlflow.log_param("max_depth", 5)
      mlflow.log_metric("accuracy", accuracy)
      mlflow.log_metric("f1", f1)
      mlflow.sklearn.log_model(model, "model")
  \`\`\`
- [ ] Run training 5 times with different hyperparameters
- [ ] Open MLflow UI: \`mlflow ui\` → compare all 5 runs
- [ ] Register the best model in the MLflow Model Registry with stage: \`Staging\`

**Day 4 (Thu) — Dockerize Training**
- [ ] Write a training \`Dockerfile\`:
  \`\`\`dockerfile
  FROM python:3.11-slim
  WORKDIR /app
  COPY requirements.txt .
  RUN pip install -r requirements.txt
  COPY src/ src/
  CMD ["python", "src/train.py"]
  \`\`\`
- [ ] Test: \`docker build -t ml-trainer .\` + \`docker run ml-trainer\`
- [ ] Training must complete inside the container and produce \`models/best_model.pkl\`
- [ ] Use volume mount for output: \`docker run -v $(pwd)/models:/app/models ml-trainer\`

**Day 5 (Fri) — GitHub Actions + CML**
- [ ] Create \`.github/workflows/train.yml\`:
  \`\`\`yaml
  on: [push]
  jobs:
    train:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: iterative/setup-cml@v1
        - name: Run training
          run: python src/train.py
        - name: Post metrics as PR comment
          env:
            REPO_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          run: |
            echo "## Model Metrics" > report.md
            cat metrics/scores.json >> report.md
            cml comment create report.md
  \`\`\`
- [ ] Push and verify: PR comment appears with model metrics

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Delete your local \`data/\`, \`models/\`, \`mlruns/\` folders
- [ ] Run: \`git clone your-repo && dvc pull && dvc repro\`
- [ ] Verify the exact same metrics appear
- [ ] Write \`REPRODUCE.md\`:
  \`\`\`markdown
  # Reproducing Results
  1. Clone repo
  2. Install deps: pip install -r requirements.txt
  3. Pull data: dvc pull
  4. Run pipeline: dvc repro
  5. View metrics: cat metrics/scores.json
  Expected: accuracy=0.836, f1=0.812
  \`\`\`

---

### ☠️ Instant Fail Conditions
- Hardcoded file paths that only work on your machine
- Data committed directly to git (not DVC-tracked)
- MLflow runs not logged — "I ran it but didn't track it" is not reproducibility
- \`REPRODUCE.md\` missing

---

### 🎁 Boss Drop
A fully reproducible ML experiment. The understanding that reproducibility is not optional in any professional ML context.

---
---

## Week 10 — 🏭 The Pipeline Titan
**Difficulty:** ⚔️⚔️ Hard · **Skills:** Airflow · Kubernetes · FastAPI · Terraform · Cloud

> *A fully automated ML factory where every step triggers the next. It doesn't sleep. It doesn't forget. When new data arrives at 3am, it trains, evaluates, and deploys the new model before you wake up.*

---

### Win Condition
1. Airflow DAG orchestrating: ingest → preprocess → train → evaluate → register (if better)
2. FastAPI model server deployed on Kubernetes (minikube ok)
3. Cloud storage provisioned with Terraform

---

### Daily Sub-Tasks

**Day 1 (Mon) — Airflow Setup**
- [ ] Start Airflow with Docker Compose (official image)
- [ ] Open UI at \`http://localhost:8080\`
- [ ] Write your first DAG: a single \`PythonOperator\` that prints "Hello from Airflow"
- [ ] Trigger it manually from the UI
- [ ] Understand: DAGs, tasks, operators, task dependencies, execution dates

**Day 2 (Tue) — Full ML Pipeline DAG**
- [ ] Write \`dags/ml_pipeline.py\` with these tasks in order:
  \`\`\`python
  download_data >> preprocess >> train >> evaluate >> conditional_register
  \`\`\`
  - \`download_data\`: download or copy latest data
  - \`preprocess\`: run \`preprocess.py\`
  - \`train\`: run \`train.py\`, log to MLflow
  - \`evaluate\`: compare new model vs production model metrics
  - \`conditional_register\`: if new model is better → promote to Production in MLflow Registry
- [ ] Schedule: \`@daily\`
- [ ] Test: trigger manually and watch each task go green in the UI

**Day 3 (Wed) — FastAPI Model Server**
- [ ] Build \`src/serve.py\`:
  \`\`\`python
  @app.post("/v1/predict")
  async def predict(request: PredictRequest):
      model = mlflow.sklearn.load_model("models:/my-model/Production")
      features = preprocess(request.features)
      prediction = model.predict([features])[0]
      confidence = model.predict_proba([features])[0].max()
      return {"prediction": int(prediction), "confidence": float(confidence)}
  \`\`\`
- [ ] Endpoints: \`/v1/predict\`, \`/health\`, \`/version\`
- [ ] The model is always loaded from MLflow Registry (not a hardcoded file path)
- [ ] Test with \`pytest tests/test_api.py\`

**Day 4 (Thu) — Kubernetes Deployment**
- [ ] Start minikube: \`minikube start\`
- [ ] Build Docker image: \`docker build -t ml-api:v1 .\`
- [ ] Load image into minikube: \`minikube image load ml-api:v1\`
- [ ] Write \`k8s/deployment.yaml\`:
  \`\`\`yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: ml-api
  spec:
    replicas: 2
    selector:
      matchLabels:
        app: ml-api
    template:
      spec:
        containers:
        - name: ml-api
          image: ml-api:v1
          ports:
          - containerPort: 8000
  \`\`\`
- [ ] Write \`k8s/service.yaml\` (NodePort)
- [ ] Deploy: \`kubectl apply -f k8s/\`
- [ ] Verify: \`kubectl get pods\` shows 2 running pods
- [ ] Call predict: \`curl http://$(minikube ip):$(kubectl get svc ml-api -o jsonpath='{.spec.ports[0].nodePort}')/v1/predict\`

**Day 5 (Fri) — Terraform**
- [ ] Write \`infra/main.tf\`:
  \`\`\`hcl
  resource "google_storage_bucket" "ml_data" {
    name     = "your-project-ml-data"
    location = "US"
  }
  \`\`\`
- [ ] \`terraform init\` + \`terraform plan\` + \`terraform apply\`
- [ ] Verify bucket created in GCP Console
- [ ] Update your Airflow DAG to read/write data from this bucket
- [ ] \`terraform destroy\` when done (to avoid charges)

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Full end-to-end test:
  1. Trigger Airflow DAG manually
  2. Watch all 5 tasks complete green
  3. Verify new model registered in MLflow
  4. Call \`/v1/predict\` on Kubernetes — get a real prediction
  5. Roll out a new model version (change a hyperparameter, retrain)
  6. Kubernetes rolling update: \`kubectl set image deployment/ml-api ml-api=ml-api:v2\`
  7. Verify: zero-downtime update (one pod stays up while the other updates)

---

### ☠️ Instant Fail Conditions
- Airflow DAG with no error handling or retries configured
- Model hardcoded as a file path instead of loaded from MLflow Registry
- Kubernetes pods not running (\`kubectl get pods\` shows CrashLoopBackOff)
- Terraform config not committed to repo

---

### 🎁 Boss Drop
An automated ML pipeline that runs on a schedule without you. A Kubernetes deployment you can roll forward and back. Infrastructure as code.

---
---

## Week 11 — 📡 The Drift Demon
**Difficulty:** ⚔️⚔️⚔️ Brutal · **Skills:** Prometheus · Grafana · Evidently · SHAP · A/B Testing

> *Your model is silently degrading. The data it sees today is not the data it was trained on. It answers confidently and incorrectly. You won't know until users start complaining — unless you built a system that catches it first.*

---

### Win Condition
1. Prometheus + Grafana monitoring with live dashboards and alerts
2. Evidently drift report: simulate drift, prove the system detects it
3. Auto-retraining trigger fires when drift exceeds threshold
4. A/B test routing 80/20 between model v1 and v2

---

### Daily Sub-Tasks

**Day 1 (Mon) — Prometheus Instrumentation**
- [ ] Add \`prometheus-fastapi-instrumentator\` to your FastAPI server
- [ ] Expose \`/metrics\` endpoint
- [ ] Add custom metrics:
  \`\`\`python
  PREDICTION_COUNTER = Counter('predictions_total', 'Total predictions', ['class', 'model_version'])
  PREDICTION_LATENCY = Histogram('prediction_latency_seconds', 'Prediction latency')
  DRIFT_SCORE = Gauge('drift_score', 'Current data drift score')
  \`\`\`
- [ ] Instrument every prediction: increment counter, observe latency
- [ ] Start Prometheus in Docker Compose, configure it to scrape your app
- [ ] Verify: \`curl http://localhost:9090\` → Prometheus UI loads

**Day 2 (Tue) — Grafana Dashboard**
- [ ] Add Grafana to Docker Compose
- [ ] Add Prometheus as a data source
- [ ] Build a dashboard with these 5 panels:
  - **Request rate:** \`rate(http_requests_total[5m])\`
  - **Latency p99:** \`histogram_quantile(0.99, rate(prediction_latency_seconds_bucket[5m]))\`
  - **Error rate:** \`rate(http_requests_total{status=~"5.."}[5m])\`
  - **Prediction class distribution:** \`predictions_total\` by class label
  - **Drift score:** \`drift_score\` gauge
- [ ] Export dashboard JSON and commit to \`monitoring/grafana-dashboard.json\`
- [ ] Add one alert rule: fire if error rate > 1% for 5 minutes

**Day 3 (Wed) — Evidently Drift Detection**
- [ ] Install \`evidently\`
- [ ] Create \`src/drift_detection.py\`:
  \`\`\`python
  from evidently.report import Report
  from evidently.metric_preset import DataDriftPreset

  report = Report(metrics=[DataDriftPreset()])
  report.run(reference_data=train_df, current_data=production_df)
  report.save_html("reports/drift_report.html")

  drift_score = report.as_dict()["metrics"][0]["result"]["share_of_drifted_columns"]
  if drift_score > 0.3:
      trigger_retraining()
  \`\`\`
- [ ] Simulate drift: create a \`production_df\` where you shift feature means by +2 std deviations
- [ ] Run the report — verify it detects drift
- [ ] Update \`DRIFT_SCORE\` Prometheus gauge with the calculated score
- [ ] Verify: Grafana dashboard updates with drift score

**Day 4 (Thu) — Auto-Retraining Trigger**
- [ ] When \`drift_score > 0.3\`:
  - Log a warning with details of which features drifted
  - Trigger the Airflow DAG via Airflow REST API:
    \`\`\`python
    requests.post(
        "http://airflow:8080/api/v1/dags/ml_pipeline/dagRuns",
        json={"conf": {"reason": "drift_detected", "score": drift_score}},
        auth=("admin", "admin")
    )
    \`\`\`
- [ ] Schedule drift detection to run every hour with a cron job or Airflow sensor
- [ ] Test end-to-end: inject drift → detection script runs → Airflow DAG triggers → new model trained → promoted if better

**Day 5 (Fri) — A/B Testing**
- [ ] Load both model v1 and model v2 in your FastAPI app at startup
- [ ] A/B routing middleware:
  \`\`\`python
  import random
  def get_model(request):
      if random.random() < 0.2:
          return model_v2, "v2"
      return model_v1, "v1"
  \`\`\`
- [ ] Log which model version served each request (to a DB table or file)
- [ ] Add \`model_version\` to your Prometheus \`predictions_total\` label
- [ ] In Grafana: add a panel showing prediction distribution by model version side-by-side
- [ ] After 200 test requests: query which version had higher confidence scores

**Day 6–7 (Sat–Sun) — Fight Day**
- [ ] Full scenario test:
  1. Make 50 normal requests → Grafana shows green metrics
  2. Inject drift data → drift score rises above 0.3 on Grafana
  3. Retraining DAG auto-triggers → watch Airflow
  4. New model registered in MLflow
  5. If new model is better → A/B test splits traffic
  6. Grafana shows two model versions serving traffic
- [ ] Screenshot everything: Grafana dashboard, Evidently report, Airflow DAG run, MLflow registry
- [ ] These screenshots go in your README and your demo video

---

### ☠️ Instant Fail Conditions
- Grafana dashboard with no alert rules configured
- Drift simulation not done — you must prove the system detects drift, not just that it could
- Auto-retraining trigger not tested end-to-end
- A/B split not logged per request

---

### 🎁 Boss Drop
A self-healing ML system. One that watches itself, detects problems, and kicks off fixes automatically. The understanding that monitoring is not a nice-to-have.

---
---

## Week 12 — 🐉 The Production Dragon *(True Final Boss)*
**Difficulty:** ☠️ Endgame · **Skills:** Everything · All at once · In production · On the internet

> *It breathes fire made of unresolved CRITICAL vulnerabilities. Its scales are architecture decisions you made in Week 1. Its hoard is a public URL that actually works. Defeat it by shipping something real.*

---

### Win Condition
All 8 conditions must be true simultaneously by Sunday:

| # | Condition | Verification |
|---|-----------|--------------|
| 1 | CI/CD performance gate | Push bad model → pipeline blocks deploy |
| 2 | TFLite + ONNX with benchmark table | Size + speed numbers in README |
| 3 | API auth on all endpoints | No token → 401 |
| 4 | Container security scan passing | \`trivy\` zero HIGH/CRITICAL |
| 5 | Deployed — real public HTTPS URL | Send to a friend, they can call it |
| 6 | Architecture diagram in README | Committed PNG, all layers labelled |
| 7 | Runbook with 6 sections | Someone else can deploy without asking you |
| 8 | 3-minute demo video | Public link in README |

---

### Daily Sub-Tasks

**Day 1 (Mon) — CI/CD Performance Gate**
- [ ] Write \`src/evaluate.py\` that exits with code 1 if accuracy < threshold
- [ ] Add \`performance_gate\` job to GitHub Actions — runs after training, before deploy
- [ ] Test: lower model quality intentionally → verify pipeline fails and blocks deploy
- [ ] Test: restore quality → verify pipeline passes and deploys
- [ ] Add pipeline status badge to README

**Day 2 (Tue) — Edge AI Conversion + Benchmark**
- [ ] Write \`src/convert_tflite.py\`: float32 + int8 quantized versions
- [ ] Write \`src/convert_onnx.py\`: export + verify with onnxruntime
- [ ] Write \`src/benchmark.py\`: measure size (MB) + inference time (ms) + accuracy for all formats
- [ ] Add benchmark table to README with real numbers
- [ ] Commit all model files (or DVC-track if large)

**Day 3 (Wed) — Security Hardening + Trivy**
- [ ] Add API key auth to all FastAPI endpoints
- [ ] Store key in environment variable — never hardcoded
- [ ] Update Dockerfile: non-root user, latest base image
- [ ] \`trivy image your-image:latest\` → fix all CRITICAL and HIGH findings
- [ ] Add trivy to GitHub Actions: fails build on CRITICAL
- [ ] Add rate limiting on \`/predict\`: 60 req/min per key
- [ ] Add \`X-Request-ID\` header to all responses

**Day 4 (Thu) — Cloud Deployment**
- [ ] Deploy full system to cloud (Cloud Run / EC2 / Render)
- [ ] Real HTTPS URL — not self-signed
- [ ] Auto-deploy from GitHub Actions on push to \`main\`
- [ ] Test from phone on mobile data: \`POST /v1/predict\` returns a real prediction
- [ ] Add URL to top of README

**Day 5 (Fri) — Architecture Diagram + Runbook**
- [ ] Draw complete architecture on Excalidraw: all 6 layers (data, training, CI/CD, serving, monitoring, edge)
- [ ] Export as PNG → \`docs/architecture.png\` → embed in README
- [ ] Write \`docs/RUNBOOK.md\` with these 6 sections:
  1. How to deploy a new model version
  2. How to roll back to previous version
  3. How to debug a failed prediction
  4. How to handle a drift alert
  5. How to add a new API endpoint
  6. How to rotate the API key

**Day 6 (Sat) — Adversarial Testing + Demo Video**
- [ ] Test: malformed JSON → 422
- [ ] Test: wrong data types → 422
- [ ] Test: no API key → 401
- [ ] Test: push bad model → CI blocks deploy
- [ ] Test: inject drift → detection fires
- [ ] Test: kill container → Kubernetes restarts it
- [ ] Fix anything that fails
- [ ] Record 3-minute demo: architecture → live API call → Grafana → CI gate → edge benchmark

**Day 7 (Sun) — Final Polish + README + Ship**
- [ ] README: live URL, demo video, architecture diagram, benchmark table, quick start, tech stack table
- [ ] All 8 win conditions verified
- [ ] \`.env.example\` committed
- [ ] GitHub repo set to public
- [ ] Post on LinkedIn with live URL and GitHub link

---

### ☠️ Instant Fail Conditions
- "Deployed" = localhost screenshot
- No API auth on endpoints
- Architecture diagram has no labels
- Runbook can't be followed by someone who hasn't read the code
- Demo video is a screencast of a Jupyter notebook
- Trivy shows unresolved CRITICAL vulnerabilities

---

### 🎁 Boss Drop (Game Complete)
A production ML system that trains, tracks, serves, monitors, drift-detects, auto-retrains, and runs on the internet. A portfolio centrepiece. The answer to "can you show me something you've built?" for every interview you'll ever do.

---

---

## 🏆 Complete Victory — What You've Proven

| Skill | Evidence |
|-------|----------|
| Data analysis and cleaning | Week 1 notebook — 8+ visualizations, clean pipeline |
| ML model selection and evaluation | Week 2 model card — 5 models compared with cross-validation |
| Deep learning implementation | Week 3 — CNN + LSTM trained from scratch in PyTorch |
| NLP and deployment | Week 4 — Fine-tuned BERT live on Hugging Face Spaces |
| REST API design | Week 5 — CRUD API with validation and Postman collection |
| Database and auth | Week 6 — PostgreSQL + JWT + Redis, N+1 fixed |
| Security hardening | Week 7 — OWASP-hardened, containerized, CI passing |
| Production backend | Week 8 — WebSockets + queues + load tested + live URL |
| Reproducibility | Week 9 — DVC + MLflow + Docker, clone-and-reproduce works |
| Pipeline automation | Week 10 — Airflow DAG + Kubernetes + Terraform |
| Monitoring and drift | Week 11 — Prometheus + Grafana + Evidently + A/B testing |
| Full production system | Week 12 — Everything, live, on the internet |

---

> **The rule that never changes:** A boss is not defeated by reading about it.
> It is defeated by shipping something.
> Ship it.`;

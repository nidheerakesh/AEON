// Generated from src/bossfight.md by scripts/generate-bossfight-data.mjs
import type { BossGuideWeek } from '@/lib/bossfight';

export const bossGuideWeeks = [
  {
    "week_id": 1,
    "name": "The Data Golem",
    "phase": "Machine Learning",
    "difficulty": "Normal",
    "skills": [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Data Cleaning",
      "EDA"
    ],
    "description": "A raw, dirty dataset that refuses to be tamed. It has missing values for arms, duplicate rows for legs, and wrong data types for a brain. Your job is to give it shape.",
    "winConditions": [
      "A fully cleaned, analysis-ready DataFrame",
      "A Jupyter notebook with 8+ visualizations and markdown explanations",
      "A 3-sentence written summary of what the data is telling you"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "Load & Inspect",
        "tasks": [
          "Download the raw Titanic dataset from Kaggle",
          "Load with Pandas: pd.read_csv()",
          "Print .shape, .dtypes, .info(), .describe()",
          "Count nulls per column: df.isnull().sum()",
          "Identify which columns have > 20% missing values",
          "Write a markdown cell: \"Here is what I found in the raw data\""
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Clean",
        "tasks": [
          "Drop columns with > 50% missing values and justify why",
          "Impute missing numerics with median (not mean — why?)",
          "Impute missing categoricals with mode",
          "Remove duplicate rows",
          "Fix wrong data types (e.g., convert strings to datetime, IDs to int)",
          "Verify: df.isnull().sum() returns all zeros"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Feature Engineering",
        "tasks": [
          "Create at least 2 new features from existing columns",
          "Encode categorical columns: one-hot or label encoding",
          "Bin a continuous variable into buckets (e.g., Age → age groups)"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Feature Scaling",
        "tasks": [
          "Apply StandardScaler to all numeric columns",
          "Apply MinMaxScaler to one column — understand the difference",
          "Save the scaler with joblib — you will need it later"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "Visualizations",
        "tasks": [
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
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Consolidate all cleaning steps into a single preprocess.py script",
          "Running python preprocess.py should produce data/processed/clean.csv from data/raw/titanic.csv",
          "Final notebook: clean, with all visualizations and markdown cells",
          "Push to GitHub with a README that describes the dataset and your findings"
        ]
      }
    ],
    "failConditions": [
      "Notebook has no markdown cells — plots without explanation are not EDA",
      "df.isnull().sum() still shows missing values at the end",
      "No preprocess.py script — the cleaning must be reproducible, not just in a notebook",
      "Less than 8 visualizations"
    ],
    "drop": "Boss Drop (what you unlock)"
  },
  {
    "week_id": 2,
    "name": "The Model Arena",
    "phase": "Machine Learning",
    "difficulty": "Hard",
    "skills": [
      "scikit-learn",
      "Cross-validation",
      "XGBoost",
      "SHAP",
      "Model Evaluation"
    ],
    "description": "Five models walk into the arena. Only one walks out. You are the judge. Your verdict must be backed by numbers, not instinct.",
    "winConditions": [
      "Train 5 different models",
      "Tune hyperparameters for the top 2",
      "Select the best model using cross-validation",
      "Produce a model card explaining your choice with evidence"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "Baseline Models",
        "tasks": [
          "Load your clean dataset from Week 1",
          "Split into train/test (80/20, stratified): train_test_split(..., stratify=y)",
          "Train 5 models with default hyperparameters:",
          "Evaluate each: accuracy, F1, precision, recall",
          "Build a results DataFrame and print it sorted by F1"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Cross-Validation",
        "tasks": [
          "Replace simple train/test with 5-fold stratified cross-validation for all 5 models",
          "Report mean ± std for accuracy and F1",
          "Understand why cross-validation is more reliable than a single split",
          "Write a markdown cell: \"I am using cross-validation because...\""
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Hyperparameter Tuning",
        "tasks": [
          "Pick your top 2 models from Day 2",
          "Tune Model 1 with GridSearchCV (exhaustive, small grid)",
          "Tune Model 2 with RandomizedSearchCV (faster, larger grid)",
          "Understand the difference: when to use each",
          "Report best params and new cross-validated score for each"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Model Evaluation Deep Dive",
        "tasks": [
          "On your best model, produce:",
          "Explain what each metric means for your specific problem"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "SHAP Explainability",
        "tasks": [
          "Install shap",
          "Compute SHAP values for your best model",
          "Plot: shap.summary_plot() — feature importance bar chart",
          "Plot: shap.waterfall_plot() for one specific prediction",
          "Write: \"The top 3 features driving predictions in this model are X, Y, Z because...\""
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Save best model with joblib.dump(model, 'models/best_model.pkl')",
          "Save scaler: joblib.dump(scaler, 'models/scaler.pkl')",
          "Write model_card.md:"
        ]
      }
    ],
    "failConditions": [
      "No cross-validation — a single train/test accuracy is not evidence",
      "No SHAP analysis — you must be able to explain the model",
      "Model not saved — if you can't load it later, it doesn't exist",
      "No model card — numbers without interpretation don't count"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 3,
    "name": "The Neural Hydra",
    "phase": "Machine Learning",
    "difficulty": "Brutal",
    "skills": [
      "PyTorch",
      "CNN",
      "LSTM",
      "Training loops",
      "Loss curves"
    ],
    "description": "Cut one head (a bug), two more appear (vanishing gradients, overfitting). The Hydra doesn't fight you — it waits for you to make mistakes.",
    "winConditions": [
      "A CNN on CIFAR-10 that beats 75% accuracy",
      "An LSTM on a sequential task (text or time series)"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "MLP from Scratch",
        "tasks": [
          "Build a 2-layer MLP in pure NumPy (no frameworks) for binary classification",
          "Train on your Titanic dataset — watch loss decrease",
          "Plot loss over epochs",
          "Write: \"Now I understand backpropagation because I coded it and saw...\""
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "PyTorch Fundamentals",
        "tasks": [
          "Tensors: create, reshape, slice, move to GPU",
          "autograd: requires_grad, .backward(), .grad",
          "Build a PyTorch MLP using nn.Module:",
          "Write a full training loop: optimizer, loss, .backward(), .step()",
          "Train on MNIST — target > 97% accuracy"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "CNN on CIFAR-10",
        "tasks": [
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
        "day_id": 4,
        "label": "Thu",
        "title": "Fix One Problem",
        "tasks": [
          "Overfitting: Add Dropout, Data Augmentation (RandomHorizontalFlip, RandomCrop)",
          "Slow convergence: Implement learning rate scheduling (StepLR or CosineAnnealingLR)",
          "Underfitting: Add more layers or increase filter counts",
          "Write: \"The problem was X. I fixed it by doing Y. The effect was Z (with numbers).\""
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "LSTM",
        "tasks": [
          "Choose a sequential task:",
          "Build an LSTM model:",
          "Train for 30+ epochs",
          "Plot loss curve",
          "Show 5 example predictions vs actual values"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "CNN: final test accuracy printed and confirmed > 75%",
          "LSTM: loss curve showing convergence",
          "Both models saved: torch.save(model.state_dict(), 'models/cnn.pth')",
          "Written section in notebook: \"One thing that went wrong during training and how I fixed it\"",
          "Both notebooks pushed to GitHub with clear README"
        ]
      }
    ],
    "failConditions": [
      "Using Keras .fit() without understanding what it does under the hood",
      "CNN accuracy below 75%",
      "No training problem documented — if nothing went wrong, you didn't try hard enough",
      "Training loop copied from a tutorial without understanding each line"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 4,
    "name": "The Transformer Overlord",
    "phase": "Machine Learning",
    "difficulty": "Phase Boss",
    "skills": [
      "HuggingFace",
      "BERT",
      "Fine-tuning",
      "Semantic Search",
      "Streamlit",
      "Deployment"
    ],
    "description": "It has read everything. It understands context. It knows what you meant, not just what you wrote. And it's live on the internet, waiting for anyone to use it.",
    "winConditions": [
      "Fine-tune BERT (or DistilBERT) on a classification task — achieve > 85% test accuracy",
      "Build a Streamlit app: input text → prediction + confidence + SHAP explanation",
      "Deploy it to Hugging Face Spaces — a real public URL"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "HuggingFace Fundamentals",
        "tasks": [
          "Install transformers, datasets, tokenizers",
          "Load a pre-trained model and tokenizer: AutoModelForSequenceClassification",
          "Understand tokenization: tokens, input_ids, attention_mask, token_type_ids",
          "Run zero-shot inference on 5 sentences — see what the pre-trained model predicts without any fine-tuning",
          "Choose your dataset:"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Fine-Tuning Setup",
        "tasks": [
          "Load your dataset with datasets.load_dataset()",
          "Tokenize with padding and truncation (max_length=128)",
          "Create PyTorch DataLoaders",
          "Set up training:",
          "Train for 3 epochs — watch loss drop"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Evaluate + Improve",
        "tasks": [
          "Evaluate on test set: accuracy, F1, confusion matrix",
          "If accuracy < 85%:",
          "Save the fine-tuned model: model.save_pretrained('models/bert-classifier')",
          "Save tokenizer: tokenizer.save_pretrained('models/bert-classifier')",
          "Log training run with MLflow"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Semantic Search Bonus",
        "tasks": [
          "Install sentence-transformers",
          "Load all-MiniLM-L6-v2 (fast, lightweight)",
          "Create embeddings for 50+ sentences from your dataset",
          "Implement a simple semantic search:",
          "Test: query \"great movie\" → should return positive reviews"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "Streamlit App",
        "tasks": [
          "Build app.py with Streamlit:",
          "Run locally: streamlit run app.py",
          "Test with 10 different inputs"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day: Deploy",
        "tasks": [
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
    ],
    "failConditions": [
      "\"Deployed\" means a localhost screenshot — it must be a real public URL",
      "Accuracy below 85% on test set",
      "No SHAP explanation in the app — prediction alone is not enough",
      "App crashes on any of these inputs: empty string, very long text, non-English text, emojis"
    ],
    "drop": "Boss Drop (Phase 1 Complete)"
  },
  {
    "week_id": 5,
    "name": "The HTTP Phantom",
    "phase": "Backend",
    "difficulty": "Normal",
    "skills": [
      "Node.js or Python",
      "REST API",
      "HTTP",
      "Git",
      "Postman"
    ],
    "description": "An API that lives in your head but not on the internet. It exists when you describe it. It vanishes the moment someone tries to actually call it.",
    "winConditions": [
      "At least 5 working endpoints (CRUD)",
      "Correct HTTP methods and status codes throughout",
      "Input validation with meaningful error messages",
      "A Postman collection exported and committed",
      "A README with curl examples for every endpoint"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "Environment + First Route",
        "tasks": [
          "Choose your stack: Node.js (Express) or Python (FastAPI)",
          "Initialize project: npm init or poetry init",
          "Build a GET /health endpoint that returns {\"status\": \"ok\", \"timestamp\": \"...\"}",
          "Run the server and call the endpoint with curl",
          "Set up .gitignore, commit to GitHub"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Choose a Domain + Schema",
        "tasks": [
          "Define your data schema (in-memory for now, no database yet):",
          "Build GET /posts → returns list of all items",
          "Build GET /posts/{id} → returns one item or 404 if not found",
          "Test both with Postman"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Write Operations",
        "tasks": [
          "Build POST /posts → creates a new item, returns 201 with the created object",
          "Build PUT /posts/{id} → updates an item, returns 200; 404 if not found",
          "Build DELETE /posts/{id} → deletes an item, returns 204; 404 if not found",
          "Test all 5 endpoints in Postman"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Input Validation",
        "tasks": [
          "Add request body validation to POST and PUT:",
          "Add path parameter validation: GET /posts/abc should return 400 \"id must be an integer\"",
          "Test: send bad requests and verify you get 400 with a clear error message, not a 500 crash"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "Postman Collection + README",
        "tasks": [
          "In Postman: create a collection with one request per endpoint",
          "Add example request body and expected response for each",
          "Export as postman_collection.json and commit to repo",
          "Write README with:"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Code review: read every line of your own code as if you're a reviewer",
          "Edge cases: what happens with negative IDs? Empty strings? 10,000 items?",
          "Add a GET /posts?search=keyword query parameter filter",
          "Final test: run through the Postman collection top to bottom, all green"
        ]
      }
    ],
    "failConditions": [
      "Any endpoint returns 200 when an error occurred",
      "Server crashes on bad input instead of returning 400",
      "No README with curl examples",
      "No Postman collection committed"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 6,
    "name": "The Database Kraken",
    "phase": "Backend",
    "difficulty": "Hard",
    "skills": [
      "PostgreSQL",
      "SQL",
      "Migrations",
      "Redis",
      "JWT Auth",
      "bcrypt"
    ],
    "description": "Slow queries, N+1 problems, and missing indexes lurk in the deep. It has tentacles in your auth system, your cache, and your query planner. Cut one tentacle: another wraps around your response time.",
    "winConditions": [
      "A PostgreSQL database with migrations (not manual SQL)",
      "JWT authentication (register + login + protected routes)",
      "Redis caching on at least 2 GET endpoints",
      "Zero N+1 problems — verified with EXPLAIN ANALYZE"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "PostgreSQL Setup",
        "tasks": [
          "Install PostgreSQL locally or use Docker: docker run -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres",
          "Connect from Python/Node with a database client",
          "Design your schema (at least 3 tables with relationships):",
          "Write migrations/001_create_tables.sql"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Migrations + ORM",
        "tasks": [
          "Set up a migration tool: Alembic (Python) or Knex (Node)",
          "Convert your raw SQL to migration files",
          "Run migrations: alembic upgrade head",
          "Write a seed script: python seed.py populates 10 users, 20 posts, 50 comments",
          "Verify with psql: SELECT count(*) FROM posts;"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "JWT Authentication",
        "tasks": [
          "Build POST /auth/register:",
          "Build POST /auth/login:",
          "Build auth middleware that:"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Protected Routes + N+1 Fix",
        "tasks": [
          "Apply auth middleware to POST, PUT, DELETE routes",
          "POST /posts must associate the post with the logged-in user (user_id from JWT)",
          "Deliberately create an N+1: fetch all posts, then for each post fetch the author separately",
          "Measure the query count (enable query logging)",
          "Fix with a JOIN: fetch posts + authors in a single query",
          "Run EXPLAIN ANALYZE before and after — paste both outputs into your notes"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "Redis Caching",
        "tasks": [
          "Start Redis: docker run -p 6379:6379 redis",
          "Connect from your app",
          "Add caching to GET /posts (60 second TTL):",
          "Add caching to GET /posts/{id} with key posts:{id}",
          "Cache invalidation: delete posts:all cache key when a post is created/updated/deleted",
          "Verify caching works: check Redis CLI: redis-cli KEYS *"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Full flow test:",
          "Add POST /posts/{id}/comments endpoint (authenticated, belongs to a post)",
          "Push to GitHub"
        ]
      }
    ],
    "failConditions": [
      "Passwords stored in plain text — instant disqualification",
      "JWT secret key hardcoded in source code",
      "No migration files — the schema must be reproducible",
      "Caching with no invalidation strategy"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 7,
    "name": "The OWASP Wraith",
    "phase": "Backend",
    "difficulty": "Hard",
    "skills": [
      "Nginx",
      "HTTPS",
      "CORS",
      "Rate Limiting",
      "Docker",
      "GitHub Actions"
    ],
    "description": "A ghost that slips through every gap you forgot to close. It doesn't attack your code — it attacks your assumptions. \"CORS is fine with * for now.\" It waits for statements like that.",
    "winConditions": [
      "Dockerize the full stack (app + DB + Redis + Nginx)",
      "Nginx as reverse proxy with HTTPS",
      "Hardened API: CORS, rate limiting, security headers, input sanitization",
      "GitHub Actions CI pipeline: lint + test, passing on every push"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "Docker Compose",
        "tasks": [
          "Write a Dockerfile for your app:",
          "Write docker-compose.yml with 3 services:",
          "Verify: docker compose up → all 3 services healthy",
          "Database must persist on restart: use a named volume for PostgreSQL data"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Nginx Reverse Proxy",
        "tasks": [
          "Add Nginx as a 4th service in Docker Compose",
          "Write nginx/nginx.conf:",
          "Verify: curl http://localhost → proxied to your app",
          "Generate self-signed SSL cert: openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes",
          "Add HTTPS to Nginx config (port 443)",
          "Verify: curl -k https://localhost works"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Security Headers",
        "tasks": [
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
        "day_id": 4,
        "label": "Thu",
        "title": "CORS + Rate Limiting",
        "tasks": [
          "Configure CORS properly — NOT wildcard *:",
          "Add rate limiting on auth endpoints (prevent brute force):",
          "Test: hit the login endpoint 10 times fast → should get 429 after 5"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "GitHub Actions CI",
        "tasks": [
          "Create .github/workflows/ci.yml:",
          "Write at least 5 tests in tests/:",
          "Verify: push to GitHub → Actions tab shows green"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Security audit — test each OWASP Top 10 item against your API:",
          "Fix anything that fails the audit",
          "Push final version: CI must be green"
        ]
      }
    ],
    "failConditions": [
      "CORS set to * in any environment",
      "Rate limiting not tested (write the test)",
      "Security headers missing from responses",
      "CI pipeline not set up or not passing"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 8,
    "name": "The Distributed Warlord",
    "phase": "Backend",
    "difficulty": "Phase Boss",
    "skills": [
      "WebSockets",
      "RabbitMQ",
      "OpenAPI",
      "Cloud Deployment",
      "Load Testing"
    ],
    "description": "Microservices, message queues, real-time connections — all at once, in production. The Warlord has many armies. You must coordinate them all.",
    "winConditions": [
      "Real-time notification system using WebSockets",
      "Background job queue using RabbitMQ",
      "Full OpenAPI/Swagger documentation for every endpoint",
      "Deployed to a real server with a public HTTPS URL",
      "Survives a load test of 100 concurrent requests"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "WebSockets",
        "tasks": [
          "Add a WebSocket endpoint: WS /ws/notifications",
          "When a new post is created via POST /posts, broadcast a notification to all connected WebSocket clients",
          "Test: open two browser tabs connected to ws://localhost/ws/notifications, create a post via Postman → both tabs should receive the notification",
          "Handle disconnections gracefully (no errors when a client disconnects)"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "RabbitMQ Message Queue",
        "tasks": [
          "Add RabbitMQ to Docker Compose: rabbitmq:3-management",
          "Connect from your app using pika (Python) or amqplib (Node)",
          "Producer: when a new user registers, publish a message to an email_queue",
          "Consumer: a separate worker process that reads from email_queue and \"sends\" a welcome email (log it to console for now)",
          "Test: register a user → check consumer logs show \"Sending welcome email to user@example.com\""
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "OpenAPI Documentation",
        "tasks": [
          "Add OpenAPI/Swagger to your API:",
          "Every endpoint must have:",
          "Export openapi.json and commit to repo",
          "Verify: the Swagger UI at /docs lets you make a real API call"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Deploy to Cloud",
        "tasks": [
          "Deploy full Docker Compose stack to a real server:",
          "HTTPS must be working (not self-signed — use Let's Encrypt or platform-provided)",
          "All services must be running: app + DB + Redis + Nginx",
          "Verify from your phone: call POST /auth/login from mobile data (not localhost)"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "Load Testing",
        "tasks": [
          "Install locust or k6",
          "Write a load test:",
          "Run: 100 concurrent users, 1 minute",
          "Target: 0% error rate, p99 latency < 500ms",
          "If it fails: profile, find the bottleneck, fix it (likely missing DB index or missing connection pool)"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "End-to-end test on the live URL (not localhost):",
          "Write DEPLOYMENT.md: exact steps to redeploy from scratch",
          "Add live URL to README header"
        ]
      }
    ],
    "failConditions": [
      "Live URL doesn't work from someone else's device",
      "WebSocket notifications only work on localhost",
      "Load test shows > 1% error rate",
      "OpenAPI spec missing any endpoints"
    ],
    "drop": "Boss Drop (Phase 2 Complete)"
  },
  {
    "week_id": 9,
    "name": "The Reproducibility Lich",
    "phase": "MLOps",
    "difficulty": "Normal",
    "skills": [
      "DVC",
      "MLflow",
      "Docker",
      "GitHub Actions",
      "CML"
    ],
    "description": "\"It worked on my machine.\" The most ancient curse in ML. The Lich survives by making your experiments irreproducible. Its weakness: a stranger being able to clone your repo and reproduce your exact results.",
    "winConditions": [],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "DVC Setup",
        "tasks": [
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
        "day_id": 2,
        "label": "Tue",
        "title": "DVC Pipeline",
        "tasks": [
          "Create dvc.yaml defining your pipeline stages:",
          "Run pipeline: dvc repro",
          "Verify: change src/train.py → dvc repro only reruns affected stages"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "MLflow Tracking",
        "tasks": [
          "Add MLflow to your training script:",
          "Run training 5 times with different hyperparameters",
          "Open MLflow UI: mlflow ui → compare all 5 runs",
          "Register the best model in the MLflow Model Registry with stage: Staging"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Dockerize Training",
        "tasks": [
          "Write a training Dockerfile:",
          "Test: docker build -t ml-trainer . + docker run ml-trainer",
          "Training must complete inside the container and produce models/best_model.pkl",
          "Use volume mount for output: docker run -v $(pwd)/models:/app/models ml-trainer"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "GitHub Actions + CML",
        "tasks": [
          "Create .github/workflows/train.yml:",
          "Push and verify: PR comment appears with model metrics"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Delete your local data/, models/, mlruns/ folders",
          "Run: git clone your-repo && dvc pull && dvc repro",
          "Verify the exact same metrics appear",
          "Write REPRODUCE.md:"
        ]
      }
    ],
    "failConditions": [
      "Hardcoded file paths that only work on your machine",
      "Data committed directly to git (not DVC-tracked)",
      "MLflow runs not logged — \"I ran it but didn't track it\" is not reproducibility",
      "REPRODUCE.md missing"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 10,
    "name": "The Pipeline Titan",
    "phase": "MLOps",
    "difficulty": "Hard",
    "skills": [
      "Airflow",
      "Kubernetes",
      "FastAPI",
      "Terraform",
      "Cloud"
    ],
    "description": "A fully automated ML factory where every step triggers the next. It doesn't sleep. It doesn't forget. When new data arrives at 3am, it trains, evaluates, and deploys the new model before you wake up.",
    "winConditions": [
      "Airflow DAG orchestrating: ingest → preprocess → train → evaluate → register (if better)",
      "FastAPI model server deployed on Kubernetes (minikube ok)",
      "Cloud storage provisioned with Terraform"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "Airflow Setup",
        "tasks": [
          "Start Airflow with Docker Compose (official image)",
          "Open UI at http://localhost:8080",
          "Write your first DAG: a single PythonOperator that prints \"Hello from Airflow\"",
          "Trigger it manually from the UI",
          "Understand: DAGs, tasks, operators, task dependencies, execution dates"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Full ML Pipeline DAG",
        "tasks": [
          "Write dags/ml_pipeline.py with these tasks in order:",
          "Schedule: @daily",
          "Test: trigger manually and watch each task go green in the UI"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "FastAPI Model Server",
        "tasks": [
          "Build src/serve.py:",
          "Endpoints: /v1/predict, /health, /version",
          "The model is always loaded from MLflow Registry (not a hardcoded file path)",
          "Test with pytest tests/test_api.py"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Kubernetes Deployment",
        "tasks": [
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
        "day_id": 5,
        "label": "Fri",
        "title": "Terraform",
        "tasks": [
          "Write infra/main.tf:",
          "terraform init + terraform plan + terraform apply",
          "Verify bucket created in GCP Console",
          "Update your Airflow DAG to read/write data from this bucket",
          "terraform destroy when done (to avoid charges)"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Full end-to-end test:"
        ]
      }
    ],
    "failConditions": [
      "Airflow DAG with no error handling or retries configured",
      "Model hardcoded as a file path instead of loaded from MLflow Registry",
      "Kubernetes pods not running (kubectl get pods shows CrashLoopBackOff)",
      "Terraform config not committed to repo"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 11,
    "name": "The Drift Demon",
    "phase": "MLOps",
    "difficulty": "Brutal",
    "skills": [
      "Prometheus",
      "Grafana",
      "Evidently",
      "SHAP",
      "A/B Testing"
    ],
    "description": "Your model is silently degrading. The data it sees today is not the data it was trained on. It answers confidently and incorrectly. You won't know until users start complaining — unless you built a system that catches it first.",
    "winConditions": [
      "Prometheus + Grafana monitoring with live dashboards and alerts",
      "Evidently drift report: simulate drift, prove the system detects it",
      "Auto-retraining trigger fires when drift exceeds threshold",
      "A/B test routing 80/20 between model v1 and v2"
    ],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "Prometheus Instrumentation",
        "tasks": [
          "Add prometheus-fastapi-instrumentator to your FastAPI server",
          "Expose /metrics endpoint",
          "Add custom metrics:",
          "Instrument every prediction: increment counter, observe latency",
          "Start Prometheus in Docker Compose, configure it to scrape your app",
          "Verify: curl http://localhost:9090 → Prometheus UI loads"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Grafana Dashboard",
        "tasks": [
          "Add Grafana to Docker Compose",
          "Add Prometheus as a data source",
          "Build a dashboard with these 5 panels:",
          "Export dashboard JSON and commit to monitoring/grafana-dashboard.json",
          "Add one alert rule: fire if error rate > 1% for 5 minutes"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Evidently Drift Detection",
        "tasks": [
          "Install evidently",
          "Create src/drift_detection.py:",
          "Simulate drift: create a production_df where you shift feature means by +2 std deviations",
          "Run the report — verify it detects drift",
          "Update DRIFT_SCORE Prometheus gauge with the calculated score",
          "Verify: Grafana dashboard updates with drift score"
        ]
      },
      {
        "day_id": 4,
        "label": "Thu",
        "title": "Auto-Retraining Trigger",
        "tasks": [
          "When drift_score > 0.3:",
          "Schedule drift detection to run every hour with a cron job or Airflow sensor",
          "Test end-to-end: inject drift → detection script runs → Airflow DAG triggers → new model trained → promoted if better"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "A/B Testing",
        "tasks": [
          "Load both model v1 and model v2 in your FastAPI app at startup",
          "A/B routing middleware:",
          "Log which model version served each request (to a DB table or file)",
          "Add model_version to your Prometheus predictions_total label",
          "In Grafana: add a panel showing prediction distribution by model version side-by-side",
          "After 200 test requests: query which version had higher confidence scores"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Fight Day",
        "tasks": [
          "Full scenario test:",
          "Screenshot everything: Grafana dashboard, Evidently report, Airflow DAG run, MLflow registry",
          "These screenshots go in your README and your demo video"
        ]
      }
    ],
    "failConditions": [
      "Grafana dashboard with no alert rules configured",
      "Drift simulation not done — you must prove the system detects drift, not just that it could",
      "Auto-retraining trigger not tested end-to-end",
      "A/B split not logged per request"
    ],
    "drop": "Boss Drop"
  },
  {
    "week_id": 12,
    "name": "The Production Dragon",
    "phase": "MLOps",
    "difficulty": "Endgame",
    "skills": [
      "Everything",
      "All at once",
      "In production",
      "On the internet"
    ],
    "description": "It breathes fire made of unresolved CRITICAL vulnerabilities. Its scales are architecture decisions you made in Week 1. Its hoard is a public URL that actually works. Defeat it by shipping something real.",
    "winConditions": [],
    "days": [
      {
        "day_id": 1,
        "label": "Mon",
        "title": "CI/CD Performance Gate",
        "tasks": [
          "Write src/evaluate.py that exits with code 1 if accuracy < threshold",
          "Add performance_gate job to GitHub Actions — runs after training, before deploy",
          "Test: lower model quality intentionally → verify pipeline fails and blocks deploy",
          "Test: restore quality → verify pipeline passes and deploys",
          "Add pipeline status badge to README"
        ]
      },
      {
        "day_id": 2,
        "label": "Tue",
        "title": "Edge AI Conversion + Benchmark",
        "tasks": [
          "Write src/convert_tflite.py: float32 + int8 quantized versions",
          "Write src/convert_onnx.py: export + verify with onnxruntime",
          "Write src/benchmark.py: measure size (MB) + inference time (ms) + accuracy for all formats",
          "Add benchmark table to README with real numbers",
          "Commit all model files (or DVC-track if large)"
        ]
      },
      {
        "day_id": 3,
        "label": "Wed",
        "title": "Security Hardening + Trivy",
        "tasks": [
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
        "day_id": 4,
        "label": "Thu",
        "title": "Cloud Deployment",
        "tasks": [
          "Deploy full system to cloud (Cloud Run / EC2 / Render)",
          "Real HTTPS URL — not self-signed",
          "Auto-deploy from GitHub Actions on push to main",
          "Test from phone on mobile data: POST /v1/predict returns a real prediction",
          "Add URL to top of README"
        ]
      },
      {
        "day_id": 5,
        "label": "Fri",
        "title": "Architecture Diagram + Runbook",
        "tasks": [
          "Draw complete architecture on Excalidraw: all 6 layers (data, training, CI/CD, serving, monitoring, edge)",
          "Export as PNG → docs/architecture.png → embed in README",
          "Write docs/RUNBOOK.md with these 6 sections:"
        ]
      },
      {
        "day_id": 6,
        "label": "Sat-Sun",
        "title": "Adversarial Testing + Demo Video",
        "tasks": [
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
        "day_id": 7,
        "label": "Sun",
        "title": "Final Polish + README + Ship",
        "tasks": [
          "README: live URL, demo video, architecture diagram, benchmark table, quick start, tech stack table",
          "All 8 win conditions verified",
          ".env.example committed",
          "GitHub repo set to public",
          "Post on LinkedIn with live URL and GitHub link"
        ]
      }
    ],
    "failConditions": [
      "\"Deployed\" = localhost screenshot",
      "No API auth on endpoints",
      "Architecture diagram has no labels",
      "Runbook can't be followed by someone who hasn't read the code",
      "Demo video is a screencast of a Jupyter notebook",
      "Trivy shows unresolved CRITICAL vulnerabilities"
    ],
    "drop": "Boss Drop (Game Complete)"
  }
] satisfies BossGuideWeek[];

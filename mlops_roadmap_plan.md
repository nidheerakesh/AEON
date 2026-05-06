# ⚙️ MLOps Roadmap — 4-Week Study Plan
> **Schedule:** 2 hours/day · 4 Weeks · ~56 hours total  
> **Pre-requisites:** Basic Python · Git · Some ML knowledge (sklearn, PyTorch/TF)  
> **Goal:** Go from ML practitioner → MLOps engineer who can build, deploy, monitor, and scale ML systems

---

## 📋 How to Study (Methodology)

| Principle | Details |
|-----------|---------|
| **Infrastructure-First Mindset** | Every concept → spin up a real tool, not just read about it |
| **One Project Thread** | Use the same ML model (e.g., a classifier) throughout all 4 weeks — keep adding MLOps layers to it |
| **Docker Before Everything** | If something can run in a container, run it in a container |
| **Break Things on Purpose** | Simulate failures, bad data, model drift — this is how MLOps thinking develops |
| **Daily Recap** | 5 min: What did I set up? What broke? What did I fix? |
| **Weekly Review** | Sunday: review infra, clean up Docker containers, push all configs to GitHub |
| **Resources** | Made With ML (madewithml.com), Full Stack Deep Learning, MLOps Zoomcamp (free), official docs |

---

## 🗓️ WEEK 1 — Foundations: Programming, Git, CI/CD & Cloud (Days 1–7)

**Weekly Goal:** Master the engineering fundamentals that sit beneath all MLOps work.

### Day 1 — What is MLOps? + MLOps Principles
- [ ] What is MLOps? Why it exists (the gap between model training and production)
- [ ] MLOps Components overview: Version Control, CI/CD, Orchestration, Experiment Tracking, Data Lineage, Model Training & Serving, Monitoring & Observability
- [ ] MLOps maturity levels (Level 0 → Level 2)
- [ ] How MLOps relates to DevOps
- **Task:** Draw (on paper or Excalidraw) the full lifecycle of an ML model from training to production monitoring
- **Read:** [madewithml.com — MLOps overview](https://madewithml.com)

### Day 2 — Programming Fundamentals for MLOps
- [ ] Bash scripting: variables, loops, conditionals, functions, `$PATH`, `chmod`, `cron`
- [ ] Python for MLOps: virtual environments (`venv`, `conda`), `requirements.txt`, `pyproject.toml`
- [ ] SQL: SELECT, JOINs, GROUP BY, window functions (for data pipelines)
- [ ] Go: awareness only — read what it's used for in MLOps tooling (Kubernetes, Terraform)
- **Task:** Write a Bash script that: creates a Python venv, installs dependencies, runs a training script, and logs output to a file

### Day 3 — Version Control: Git, GitHub, DVC
- [ ] Git advanced: branching strategies, rebase, cherry-pick, tagging releases
- [ ] GitHub: pull requests, code reviews, GitHub Actions (intro)
- [ ] DVC (Data Version Control): what it is, `dvc init`, `dvc add`, `dvc push`, remotes
- [ ] DVC pipelines: `dvc.yaml`, `dvc repro`
- [ ] Difference: Git versions code, DVC versions data + models
- **Task:** Set up a repo with DVC tracking a dataset and a trained model file; push both to a DVC remote (local or Google Drive)

### Day 4 — CI/CD for ML
- [ ] What is CI/CD in an ML context? (test data, test model, deploy pipeline)
- [ ] GitHub Actions: workflows, triggers (push, PR, schedule), jobs, steps
- [ ] GitLab CI: `.gitlab-ci.yml` basics (awareness)
- [ ] Jenkins: awareness only
- [ ] CML (Continuous Machine Learning): auto-generate model reports in PRs
- [ ] What to test in ML CI: data validation, model performance gates, code linting
- **Task:** Create a GitHub Actions workflow that: runs `pytest` on your ML code, trains a model, and posts accuracy as a PR comment using CML

### Day 5 — Cloud Computing: AWS / Azure / GCP
- [ ] Cloud fundamentals: regions, availability zones, IAM, billing
- [ ] AWS core services for ML: S3, EC2, SageMaker (overview)
- [ ] GCP core services: GCS, Compute Engine, Vertex AI (overview)
- [ ] Azure: Azure ML overview
- [ ] Cloud-native ML Services: managed training, HPO, model registry
- [ ] Free tier setup: create accounts on AWS and/or GCP
- **Task:** Upload a dataset to S3 or GCS from Python using `boto3` or `google-cloud-storage`; load it back in a training script

### Day 6 — Infrastructure as Code (IaC)
- [ ] What is IaC and why it matters (reproducible environments)
- [ ] Terraform: `main.tf`, `variables.tf`, `terraform init`, `plan`, `apply`, `destroy`
- [ ] Ansible: playbooks, inventory, tasks (awareness level)
- [ ] Terraform vs Ansible: when to use each
- **Task:** Write a Terraform config that provisions an S3 bucket (or GCS bucket) and an EC2/GCE instance; `apply` and `destroy` it

### Day 7 — Week 1 Review + Mini Project
- [ ] Review all notes, fix gaps
- [ ] Clean up GitHub repos
- **Mini Project:** Build a fully versioned ML project with:
  - DVC tracking data + model
  - GitHub Actions CI (lint + test + train)
  - CML report on PR
  - Data stored on S3 or GCS
  - Terraform config for cloud resources
- **Push everything to GitHub with a README**

---

## 🗓️ WEEK 2 — Containerization, Experiment Tracking & Data Engineering (Days 8–14)

**Weekly Goal:** Package ML workloads in containers, track experiments properly, and build data pipelines.

### Day 8 — Docker for MLOps
- [ ] Docker fundamentals: images, containers, layers, volumes, networks
- [ ] Writing ML Dockerfiles: base image selection, COPY, RUN pip install, CMD
- [ ] Docker Compose: multi-container apps (app + database + Redis)
- [ ] Best practices: `.dockerignore`, multi-stage builds, minimal images
- [ ] Docker Hub vs private registries (ECR, GCR, GHCR)
- **Task:** Dockerize your ML training script; build image, run container, verify training completes and model is saved to a mounted volume

### Day 9 — Kubernetes for MLOps
- [ ] Why Kubernetes? Scaling beyond a single container
- [ ] Core concepts: pods, deployments, services, ingress, namespaces
- [ ] `kubectl` basics: `apply`, `get`, `describe`, `logs`, `exec`
- [ ] Helm: package manager for Kubernetes (awareness)
- [ ] Local Kubernetes: minikube or kind for development
- [ ] Kubernetes for ML: serving models, scaling inference
- **Task:** Deploy your Dockerized ML model server (FastAPI) to a local minikube cluster; expose it with a NodePort service and call the `/predict` endpoint

### Day 10 — Experiment Tracking with MLflow
- [ ] Why track experiments? Reproducibility, comparison, collaboration
- [ ] MLflow components: Tracking, Projects, Models, Model Registry
- [ ] `mlflow.start_run()`, logging params, metrics, artifacts, tags
- [ ] MLflow UI: comparing runs, visualizing metrics
- [ ] MLflow Model Registry: staging → production → archived
- [ ] Self-hosted vs Databricks-managed MLflow
- **Task:** Instrument your existing ML model with MLflow; run 5 experiments with different hyperparameters; compare in the UI; register the best model

### Day 11 — Data Engineering Fundamentals
- [ ] Data Pipelines: ETL vs ELT, batch vs streaming
- [ ] Data Lakes vs Data Warehouses vs Lakehouses
- [ ] Data Ingestion Architecture: push vs pull, connectors, CDC
- [ ] Data quality: schema validation, null checks, distribution drift
- [ ] Feature Stores concept (Feast, Tecton — awareness)
- **Task:** Build a simple ETL pipeline in Python that: pulls data from an API → cleans it → validates schema → saves to a local "data lake" folder structure (`raw/`, `processed/`, `features/`)

### Day 12 — Data Engineering Tools: Spark, Kafka, Flink
- [ ] Apache Spark: RDDs, DataFrames, PySpark basics, when to use Spark
- [ ] Apache Kafka: topics, producers, consumers, consumer groups, offsets
- [ ] Apache Flink: stream processing, awareness of differences from Spark
- [ ] When to use each: Spark (batch, large-scale), Kafka (event streaming), Flink (stateful stream processing)
- **Task:** Set up Kafka locally with Docker Compose; create a producer that sends "new data" events and a consumer that triggers a model retraining script

### Day 13 — Orchestration & Deployment: Airflow & KubeFlow
- [ ] What is pipeline orchestration? DAGs (Directed Acyclic Graphs)
- [ ] Apache Airflow: DAGs, operators, sensors, XComs, schedulers
- [ ] Writing your first Airflow DAG: data ingestion → training → evaluation → deployment
- [ ] KubeFlow Pipelines: ML-specific orchestration on Kubernetes
- [ ] Airflow vs KubeFlow: when to use each
- **Task:** Write an Airflow DAG with 4 tasks: download_data → preprocess → train_model → evaluate_and_save; run it locally with the Airflow Docker Compose setup

### Day 14 — Week 2 Review + Intermediate Project
- [ ] Review Docker, Kubernetes, MLflow, Airflow
- **Intermediate Project:** Extend your Week 1 project with:
  - Dockerized training + serving containers
  - MLflow experiment tracking (5+ logged runs)
  - Best model registered in MLflow Model Registry
  - Airflow DAG orchestrating the full pipeline
  - Docker Compose file spinning up: app + MLflow server + Airflow
- **Push to GitHub**

---

## 🗓️ WEEK 3 — Model Serving, Monitoring & Observability (Days 15–21)

**Weekly Goal:** Get models into production and keep them healthy with monitoring and alerting.

### Day 15 — Model Serving Patterns
- [ ] Serving patterns: REST API, gRPC, batch inference, streaming inference
- [ ] FastAPI for model serving: request validation with Pydantic, async endpoints
- [ ] Model loading strategies: load on startup, lazy loading
- [ ] Serving frameworks overview: TorchServe, TF Serving, Triton Inference Server, BentoML
- [ ] Latency vs throughput trade-offs
- **Task:** Build a production-grade FastAPI model server with: health check endpoint, versioned routes (`/v1/predict`), input validation, request logging, and graceful error handling

### Day 16 — Cloud Model Deployment
- [ ] Deploy to AWS: EC2 + Docker, or SageMaker endpoint
- [ ] Deploy to GCP: Cloud Run (serverless containers) or Vertex AI endpoint
- [ ] Environment variables and secrets management (AWS Secrets Manager, `.env` files)
- [ ] Load balancing and auto-scaling concepts
- [ ] Blue/green and canary deployments for ML models
- **Task:** Deploy your FastAPI model server to GCP Cloud Run or AWS EC2 with Docker; get a public URL and test it

### Day 17 — Monitoring & Observability: Prometheus + Grafana
- [ ] What to monitor in ML systems: infrastructure + model performance
- [ ] Prometheus: metrics types (counter, gauge, histogram, summary), scraping, `prometheus_client` in Python
- [ ] Grafana: dashboards, data sources, panels, alerting
- [ ] Instrumenting a FastAPI app with Prometheus metrics
- [ ] Key ML metrics to track: request latency, error rate, prediction distribution
- **Task:** Add Prometheus metrics to your FastAPI server (`/metrics` endpoint); set up Grafana dashboard showing request rate, latency p99, and prediction class distribution

### Day 18 — Data & Model Drift Detection
- [ ] What is data drift? Covariate shift, label drift, concept drift
- [ ] Drift detection tools: Evidently AI, WhyLogs, NannyML
- [ ] Statistical tests for drift: KS test, chi-squared, PSI
- [ ] Setting up drift alerts and retraining triggers
- [ ] Data lineage: tracking where data came from and how it was transformed
- **Task:** Use Evidently AI to generate a data drift report comparing your training data vs a simulated "production" dataset with injected drift; identify which features drifted

### Day 19 — Model Training & Serving at Scale
- [ ] Distributed training concepts: data parallelism, model parallelism
- [ ] Hyperparameter optimization at scale: Optuna, Ray Tune
- [ ] Model versioning best practices
- [ ] A/B testing models in production
- [ ] Shadow mode deployment: run new model alongside old model without serving its predictions
- **Task:** Set up an A/B test configuration in your FastAPI server that routes 20% of traffic to model v2 and 80% to model v1; log which model served each request

### Day 20 — Explainable AI (XAI) in Production
- [ ] Why explainability matters in production (regulation, debugging, trust)
- [ ] LIME: local explanations, `lime` Python library
- [ ] SHAP: global + local explanations, `shap` Python library, TreeExplainer, DeepExplainer
- [ ] Serving explanations alongside predictions
- [ ] Building an explanation endpoint: `/v1/predict/explain`
- **Task:** Add a `/explain` endpoint to your FastAPI server that returns SHAP values for any prediction; test with 5 different inputs and compare explanations

### Day 21 — Week 3 Review + Monitoring Project
- [ ] Review serving, monitoring, drift, and explainability
- **Mini Project:** Production ML System with full observability:
  - FastAPI server with `/predict`, `/explain`, `/health`, `/metrics` endpoints
  - Prometheus + Grafana dashboard (Docker Compose)
  - Evidently drift report generated on a schedule
  - SHAP explanations for every prediction
  - Deployed to cloud (Cloud Run or EC2)
- **Push to GitHub**

---

## 🗓️ WEEK 4 — Edge AI, Advanced MLOps & Full Pipeline (Days 22–28)

**Weekly Goal:** Complete the roadmap with Edge AI, full pipeline integration, and capstone project.

### Day 22 — Edge AI: TFLite, PyTorch Mobile, Jetson
- [ ] What is Edge AI? Running models on-device vs in the cloud
- [ ] When to use edge: latency, privacy, offline requirements
- [ ] TFLite: model conversion, quantization (int8, float16), TFLite interpreter
- [ ] PyTorch Mobile: `torch.jit.script`, `torch.jit.trace`, mobile optimization
- [ ] ONNX: framework-agnostic model format, ONNX Runtime
- [ ] NVIDIA Jetson: edge AI hardware for vision/robotics (awareness)
- **Task:** Convert your trained PyTorch or TF model to TFLite and ONNX; compare model size and inference speed before and after quantization

### Day 23 — Full MLOps Pipeline Integration
- [ ] Connecting all components: data ingestion → training → evaluation → registration → deployment → monitoring → retraining trigger
- [ ] Event-driven retraining: Kafka event → Airflow DAG trigger → retrain → evaluate → promote if better
- [ ] Model governance: approval workflows before promotion to production
- [ ] Cost optimization: spot instances for training, serverless for inference
- **Task:** Map out your full pipeline on paper; identify the weakest link; strengthen it with an additional automated step

### Day 24 — Advanced CI/CD for ML
- [ ] Multi-stage ML pipelines in GitHub Actions: data validation → training → model testing → staging deployment → production promotion
- [ ] Testing ML systems: unit tests for transformations, integration tests for endpoints, performance tests
- [ ] Model performance gates: block deployment if accuracy drops below threshold
- [ ] Rollback strategies: how to quickly revert a bad model deployment
- **Task:** Add a model performance gate to your GitHub Actions pipeline: if test accuracy < 85%, fail the workflow and block deployment

### Day 25 — Security & Compliance in MLOps
- [ ] Secrets management: never hardcode keys, use environment variables or vaults
- [ ] Container security: non-root users in Docker, image scanning
- [ ] ML-specific compliance: data privacy (GDPR awareness), model audit trails
- [ ] Supply chain security: dependency scanning, SBOM
- [ ] Network security for ML APIs: rate limiting, authentication (API keys, JWT)
- **Task:** Audit your Docker images with `docker scout` or `trivy`; add API key authentication to your FastAPI server; move all secrets to environment variables

### Day 26 — MLOps at Scale: Patterns & Architecture
- [ ] Feature Store architecture deep dive (Feast)
- [ ] Online vs offline feature stores
- [ ] ML Platform architecture: how companies like Uber, Airbnb, Netflix built their ML platforms
- [ ] Multi-model serving: model router, ensemble serving
- [ ] Cost monitoring and FinOps for ML
- **Task:** Write a 1-page architecture document for your capstone project describing every component, why you chose it, and what you'd change at 10x scale

### Day 27 — Final Review + Documentation
- [ ] Review all 4 weeks — identify gaps
- [ ] Clean up all repos, add proper READMEs with architecture diagrams
- [ ] Write runbooks for your systems (how to deploy, how to roll back, how to debug)
- [ ] Review the full MLOps Components checklist (Version Control ✓, CI/CD ✓, Orchestration ✓, Experiment Tracking ✓, Data Lineage ✓, Model Serving ✓, Monitoring ✓)
- **Task:** Create a personal "MLOps Cheat Sheet" — one page per major tool (Docker, Kubernetes, MLflow, Airflow, Prometheus) with key commands

### Day 28 — Capstone Project Finalization
- [ ] Complete capstone (see below)
- [ ] Write full README with architecture diagram
- [ ] Record a short demo video (optional but impresses interviewers)
- [ ] Push to GitHub, share on LinkedIn

---

## 🏆 Capstone Project Ideas

---

### 🥉 Beginner Capstone — MLOps Pipeline for Sentiment Analysis
**Stack:** Python + Docker + MLflow + GitHub Actions + FastAPI  
**Model:** Fine-tuned sentiment classifier (positive/negative)  
**Pipeline:**
- DVC-tracked dataset + model artifacts
- MLflow experiment tracking (10+ runs, hyperparameter sweep)
- Best model registered in MLflow Model Registry
- FastAPI serving endpoint with input validation
- Dockerized app with Docker Compose
- GitHub Actions CI: lint → test → train → register if better
- Basic `/health` and `/metrics` endpoints
- README with setup instructions

---

### 🥈 Intermediate Capstone — End-to-End ML Platform for Fraud Detection
**Stack:** Python + Docker + Kubernetes (minikube) + MLflow + Airflow + Prometheus + Grafana + FastAPI  
**Model:** Binary fraud classifier (XGBoost or LightGBM)  
**Pipeline:**
- Airflow DAG: data ingestion → feature engineering → training → evaluation → conditional deployment
- DVC for data + model versioning
- MLflow tracking + Model Registry with staging/production stages
- Kubernetes deployment with rolling updates
- Prometheus metrics + Grafana dashboard (request rate, latency, prediction distribution)
- Evidently drift detection report on weekly schedule
- SHAP explainability endpoint
- GitHub Actions CI/CD with performance gate
- Terraform config for cloud resources
- Full README + architecture diagram

---

### 🥇 Advanced Capstone — Production ML Platform with Edge Deployment
**Stack:** Python + Docker + Kubernetes + MLflow + Airflow + Kafka + Prometheus + Grafana + TFLite + FastAPI + Cloud (GCP or AWS)  
**Model:** Image classification or NLP model  
**Pipeline:**
- Kafka-driven data ingestion → Airflow DAG trigger → automated retraining
- Feature store (Feast) for online + offline features
- Distributed hyperparameter tuning with Optuna/Ray Tune
- Multi-model A/B testing in production (80/20 split)
- Full Prometheus + Grafana observability stack
- Evidently drift monitoring with auto-retraining trigger
- Shadow mode deployment for new model versions
- Edge deployment: TFLite + ONNX conversion with benchmark report
- SHAP + LIME explainability endpoints
- Full CI/CD pipeline with model performance gates and rollback
- Deployed on GCP Cloud Run + GKE
- Terraform IaC for all cloud resources
- Security: API auth, container scanning, secrets management
- Full documentation: README + runbook + architecture diagram

---

## 🛠️ Tools & Commands Quick Reference

### Docker
```bash
docker build -t my-model:v1 .
docker run -p 8000:8000 -v $(pwd)/models:/app/models my-model:v1
docker compose up -d
docker logs -f container_name
```

### DVC
```bash
dvc init
dvc add data/raw/dataset.csv
dvc push
dvc pull
dvc repro          # re-run changed pipeline stages
```

### MLflow
```python
import mlflow
mlflow.set_experiment("fraud-detection")
with mlflow.start_run():
    mlflow.log_param("n_estimators", 100)
    mlflow.log_metric("accuracy", 0.94)
    mlflow.sklearn.log_model(model, "model")
```

### kubectl
```bash
kubectl apply -f deployment.yaml
kubectl get pods
kubectl logs pod-name
kubectl describe pod pod-name
kubectl port-forward svc/my-service 8000:80
```

### Terraform
```bash
terraform init
terraform plan
terraform apply
terraform destroy
```

---

## 📚 Recommended Resources by Topic

| Topic | Resource |
|-------|---------|
| MLOps Overview | [Made With ML](https://madewithml.com) — free, excellent |
| MLOps Zoomcamp | [DataTalks.Club MLOps Zoomcamp](https://github.com/DataTalks-Club/mlops-zoomcamp) — free |
| Docker | Official Docker Get Started docs |
| Kubernetes | [Kubernetes.io interactive tutorials](https://kubernetes.io/docs/tutorials/) |
| MLflow | [MLflow official docs + quickstart](https://mlflow.org/docs/latest/index.html) |
| Airflow | [Astronomer Airflow tutorials](https://www.astronomer.io/docs/) |
| Prometheus + Grafana | Grafana Labs Play environment (free sandbox) |
| Terraform | [HashiCorp Learn](https://developer.hashicorp.com/terraform/tutorials) — free |
| Evidently AI | [Evidently AI docs + examples](https://docs.evidentlyai.com) |
| Edge AI / TFLite | TensorFlow Lite official guides |
| Full Stack Deep Learning | [FSDL Course](https://fullstackdeeplearning.com) — free |

---

## ✅ Weekly Checkpoints

| Week | Milestone |
|------|-----------|
| End of Week 1 | DVC repo set up, CI/CD pipeline running, cloud storage connected, Terraform working |
| End of Week 2 | Dockerized app running on Kubernetes, MLflow tracking experiments, Airflow DAG orchestrating pipeline |
| End of Week 3 | Model served via FastAPI on cloud, Prometheus + Grafana monitoring live, drift detection running |
| End of Week 4 | Capstone project complete, edge model deployed, full pipeline from data → production → monitoring |

---

## 🔄 The MLOps Flywheel (Your Mental Model)

```
New Data Arrives
      ↓
Kafka / Airflow ingests it
      ↓
DVC versions the data
      ↓
MLflow tracks the experiment
      ↓
CI/CD runs tests + performance gates
      ↓
Model promoted to production (Kubernetes)
      ↓
Prometheus monitors predictions
      ↓
Evidently detects drift
      ↓
Retraining trigger fires
      ↓
(Repeat)
```

---

## 📝 Daily Habit Tracker Template

```
📅 Date: ___________
✅ Topics Covered:
  1.
  2.
🛠️  Tool/System Set Up:

💥 What Broke & How I Fixed It:

💡 3 Things I Learned:
  1.
  2.
  3.
❓ Questions / Gaps to Revisit:

⏱️  Time Spent: _____ hrs
```

---

> 💡 **MLOps Mindset:** An ML model that can't be reliably deployed, monitored, and retrained is just a science experiment. MLOps is what turns experiments into products.  
> 🎯 **After this plan, explore:** DevOps Roadmap · AI Engineer Roadmap · Data Engineer Roadmap

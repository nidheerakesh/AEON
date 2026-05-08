# 🤖 Machine Learning Roadmap — 4-Week Study Plan
> **Schedule:** 2 hours/day · 4 Weeks · ~56 hours total  
> **Pre-requisite:** Basic Python knowledge (if not, add 3–5 days before Week 1)  
> **Goal:** Cover the full ML roadmap from math foundations to deep learning & NLP

---

## 📋 How to Study (Methodology)

| Principle | Details |
|-----------|---------|
| **70/30 Rule** | 70% coding/implementation, 30% theory/reading |
| **Notebook-First** | Use Jupyter notebooks for every concept — see the data, see the output |
| **Kaggle Learn** | Use free Kaggle micro-courses to supplement (Pandas, ML Intro, Deep Learning) |
| **Implement from Scratch First** | Before using sklearn, code algorithms manually (e.g., linear regression with NumPy) |
| **Daily Recap** | Last 5 min: write what you learned + one "aha moment" |
| **Weekly Review** | Sunday: redo one exercise you found hard, push all notebooks to GitHub |
| **Resources** | StatQuest (YouTube), Andrej Karpathy, fast.ai, scikit-learn docs, 3Blue1Brown |

---

## 🗓️ WEEK 1 — Math Foundations + Python + Data (Days 1–7)

**Weekly Goal:** Solidify the math and Python tools that underpin all of ML.

### Day 1 — ML Introduction + Calculus Foundations
- [ ] What is an ML Engineer? vs AI Engineer — roles and responsibilities
- [ ] Derivatives and Partial Derivatives (concept + intuition)
- [ ] Chain Rule of Derivation
- [ ] Gradient, Jacobian, Hessian (conceptual understanding)
- **Task:** Implement a simple numerical gradient calculator in Python using NumPy
- **Watch:** 3Blue1Brown "Essence of Calculus" (first 3 videos)

### Day 2 — Linear Algebra
- [ ] Scalars, Vectors, Tensors — definitions and notation
- [ ] Matrix & Matrix Operations (add, multiply, transpose)
- [ ] Determinants and Inverse of a Matrix
- [ ] Eigenvalues and Diagonalization (intuition)
- [ ] Singular Value Decomposition (SVD) — what and why
- **Task:** Implement matrix multiplication and transposition from scratch using nested loops, then verify with NumPy

### Day 3 — Statistics & Probability
- [ ] Descriptive Statistics: mean, median, mode, variance, std deviation
- [ ] Graphs & Charts: histogram, box plot, scatter plot
- [ ] Inferential Statistics: confidence intervals, hypothesis testing
- [ ] Basics of Probability: events, sample space, conditional probability
- [ ] Bayes' Theorem
- [ ] Random Variables, PDFs, CDFs
- [ ] Types of Distributions: Normal, Binomial, Poisson
- **Task:** Using a real dataset (e.g., Titanic CSV), compute and plot descriptive statistics with Pandas and Matplotlib

### Day 4 — Discrete Mathematics + Python Fundamentals
- [ ] Sets, logic, combinatorics (quick overview)
- [ ] Python: Variables, Data Types, Data Structures (list, dict, set, tuple)
- [ ] Loops, Conditionals, Exceptions
- [ ] Functions and Built-in Functions
- [ ] Object-Oriented Programming: classes, objects, inheritance
- **Task:** Build a Python class `Dataset` that loads a CSV, prints shape, and returns basic statistics

### Day 5 — NumPy & Pandas
- [ ] NumPy: arrays, slicing, broadcasting, vectorized operations
- [ ] Pandas: DataFrames, Series, read_csv, groupby, merge, fillna, dropna
- [ ] Indexing: loc vs iloc
- **Task:** Load the Iris dataset, clean it, compute group statistics, and export a cleaned CSV

### Day 6 — Matplotlib & Seaborn + Data Sources
- [ ] Matplotlib: line, bar, scatter, histogram, subplots
- [ ] Seaborn: heatmap, pairplot, violin plot, countplot
- [ ] Data Sources: Databases (SQL, NoSQL), APIs, IoT, Mobile Apps
- [ ] Data Formats: CSV, Excel, JSON, Parquet — how to read each in Pandas
- **Task:** Create a full EDA (Exploratory Data Analysis) notebook on the Titanic dataset with 8+ visualizations

### Day 7 — Week 1 Review + Data Cleaning
- [ ] Preprocessing Techniques: encoding, imputation, outlier removal
- [ ] Data Cleaning: handling missing values, duplicates, wrong data types
- [ ] Feature Engineering: creating new features from existing ones
- [ ] Feature Scaling & Normalization: Min-Max, StandardScaler, RobustScaler
- [ ] Dimensionality Reduction concepts (preview)
- [ ] Feature Selection: filter, wrapper, embedded methods
- **Mini Project:** Clean a raw messy dataset (e.g., Housing Prices from Kaggle), produce a fully preprocessed, analysis-ready DataFrame
- **Push notebook to GitHub**

---

## 🗓️ WEEK 2 — Core Machine Learning (Days 8–14)

**Weekly Goal:** Understand and implement supervised and unsupervised ML algorithms.

### Day 8 — What is Machine Learning? + Types
- [ ] What is Machine Learning? (definition, why it works)
- [ ] Supervised Learning — labeled data, prediction tasks
- [ ] Unsupervised Learning — finding structure in unlabeled data
- [ ] Semi-supervised Learning
- [ ] Self-supervised Learning
- [ ] Reinforcement Learning (overview only today)
- [ ] Scikit-learn workflow: load data → split → fit → predict → evaluate
- **Task:** Run your first end-to-end sklearn pipeline on the Iris dataset (train/test split, KNN, accuracy score)

### Day 9 — Regression Algorithms
- [ ] Linear Regression: equation, cost function (MSE), gradient descent intuition
- [ ] Polynomial Regression
- [ ] Regularization: Lasso (L1), Ridge (L2), ElasticNet
- [ ] Train-Test Split, Cross-Validation preview
- **Task:** Implement Linear Regression from scratch using NumPy (gradient descent loop), then compare with sklearn's result on the Boston/California Housing dataset

### Day 10 — Classification Algorithms
- [ ] K-Nearest Neighbors (KNN): distance metrics, k selection
- [ ] Logistic Regression: sigmoid, decision boundary, log loss
- [ ] Support Vector Machines (SVM): hyperplane, kernel trick
- [ ] Decision Trees: Gini impurity, information gain, overfitting
- [ ] Random Forest: bagging, feature importance
- [ ] Gradient Boosting Machines (GBM): XGBoost preview
- **Task:** Compare KNN, Logistic Regression, and Random Forest on the Titanic dataset; report accuracy for each

### Day 11 — Model Evaluation
- [ ] What is Model Evaluation and why it matters
- [ ] Accuracy, Precision, Recall, F1-Score — when to use each
- [ ] ROC-AUC curve and Log Loss
- [ ] Confusion Matrix — reading and interpreting
- [ ] Validation Techniques: K-Fold Cross Validation, LOOCV
- [ ] Bias-Variance Tradeoff, Overfitting vs Underfitting
- **Task:** Plot confusion matrix, ROC curve, and run 5-fold cross-validation for your best Day 10 model

### Day 12 — Unsupervised Learning: Clustering
- [ ] What is Unsupervised Learning?
- [ ] Clustering types: Exclusive (K-Means), Overlapping, Hierarchical, Probabilistic (GMM)
- [ ] K-Means algorithm: centroids, inertia, elbow method
- [ ] Hierarchical Clustering: dendrograms
- [ ] DBSCAN: density-based, noise points
- **Task:** Cluster the Mall Customer dataset using K-Means; find optimal k with the elbow method and visualize clusters

### Day 13 — Dimensionality Reduction
- [ ] Why reduce dimensions? Curse of dimensionality
- [ ] Principal Component Analysis (PCA): explained variance, components
- [ ] Autoencoders as dimensionality reduction (preview for Week 3)
- [ ] t-SNE for visualization (hands-on)
- [ ] Feature Selection revisited: SelectKBest, RFE
- **Task:** Apply PCA to reduce the MNIST dataset to 2D and plot the class clusters; compare accuracy with and without PCA

### Day 14 — Week 2 Review + Scikit-learn Pipelines
- [ ] sklearn Pipeline: chaining preprocessing + model steps
- [ ] Model Selection: GridSearchCV, RandomizedSearchCV, hyperparameter tuning
- [ ] Saving/loading models with joblib
- [ ] Review all Week 2 algorithms
- **Mini Project:** Build a complete ML pipeline for a classification problem of your choice:
  - Data loading → EDA → Cleaning → Feature Engineering → Model Training → Evaluation → Save model
  - Use at least 3 models, pick the best one with cross-validation
- **Push to GitHub with a clean notebook**

---

## 🗓️ WEEK 3 — Deep Learning Foundations (Days 15–21)

**Weekly Goal:** Understand neural networks, CNNs, RNNs, and build models with PyTorch/TensorFlow.

### Day 15 — Neural Network Basics
- [ ] Biological neuron → Perceptron → Multi-layer Perceptron (MLP)
- [ ] Forward Propagation: weighted sum + activation
- [ ] Activation Functions: Sigmoid, ReLU, Tanh, Softmax — when to use each
- [ ] Loss Functions: MSE (regression), Cross-Entropy (classification)
- **Task:** Build a 2-layer neural network from scratch in NumPy (no frameworks) for binary classification

### Day 16 — Backpropagation & Training
- [ ] Backpropagation: chain rule applied to networks, computing gradients
- [ ] Gradient Descent: batch, stochastic (SGD), mini-batch
- [ ] Optimizers: Adam, RMSprop, Momentum
- [ ] Learning Rate: scheduling, warmup, decay
- [ ] Regularization: Dropout, Batch Normalization, L2
- **Task:** Train your Day 15 network using backprop you coded manually; watch the loss decrease over epochs

### Day 17 — Deep Learning Libraries
- [ ] TensorFlow + Keras: Sequential API, layers, compile, fit, evaluate
- [ ] PyTorch: tensors, autograd, nn.Module, DataLoader, training loop
- [ ] Scikit-learn integration with deep learning
- **Choose one framework (PyTorch recommended) and stick with it**
- **Task:** Reproduce the Day 15 network in PyTorch; train on MNIST and hit >97% accuracy

### Day 18 — Convolutional Neural Networks (CNNs)
- [ ] Why CNNs? Spatial hierarchy in images
- [ ] Convolution operation: kernel/filter, feature maps
- [ ] Pooling: Max Pooling, Average Pooling
- [ ] Padding and Strides
- [ ] Classic architectures: LeNet, VGG, ResNet (conceptual)
- [ ] Applications: Image Classification, Object Detection, Segmentation, Recommendation
- **Task:** Build a CNN in PyTorch/Keras for CIFAR-10 image classification; target >75% accuracy

### Day 19 — Recurrent Neural Networks (RNNs)
- [ ] Why RNNs? Sequential/temporal data
- [ ] Vanilla RNN: hidden state, unrolling, vanishing gradient problem
- [ ] LSTM: cell state, forget/input/output gates
- [ ] GRU: simplified LSTM
- [ ] Applications: text generation, time series, speech
- **Task:** Build an LSTM in PyTorch to predict the next word in a small text corpus (e.g., Shakespeare)

### Day 20 — Attention Mechanisms & Transformers
- [ ] Intuition: why attention? Problem with fixed-length context in RNNs
- [ ] Self-Attention mechanism
- [ ] Multi-head Attention
- [ ] Transformer architecture: encoder, decoder, positional encoding
- [ ] How modern LLMs (GPT, BERT) are built on Transformers
- **Task:** Use HuggingFace `transformers` library to fine-tune a pre-trained BERT model for sentiment classification

### Day 21 — Autoencoders & GANs
- [ ] Autoencoders: encoder-decoder structure, latent space, reconstruction loss
- [ ] Variational Autoencoders (VAE) overview
- [ ] Generative Adversarial Networks (GANs): generator vs discriminator, adversarial loss
- [ ] Applications of GANs: image synthesis, data augmentation
- **Mini Project:** Build a Variational Autoencoder on MNIST — encode digits to 2D latent space and visualize; decode random latent points to generate new digits
- **Push to GitHub**

---

## 🗓️ WEEK 4 — Advanced ML, RL & NLP (Days 22–28)

**Weekly Goal:** Reinforcement learning, NLP pipeline, explainability, and capstone project.

### Day 22 — Reinforcement Learning
- [ ] What is RL? Agent, environment, state, action, reward, policy
- [ ] Exploration vs Exploitation (epsilon-greedy)
- [ ] Q-Learning: Q-table, Bellman equation
- [ ] Deep-Q Networks (DQN): Q-network, replay buffer, target network
- [ ] Policy Gradient methods: REINFORCE algorithm
- [ ] Actor-Critic Methods: combining value and policy
- **Task:** Implement Q-Learning on OpenAI Gym's `CartPole-v1` environment; plot reward over episodes

### Day 23 — Natural Language Processing (NLP) — Fundamentals
- [ ] Tokenization: word-level, subword (BPE), character-level
- [ ] Lemmatization and Stemming
- [ ] Stop word removal, vocabulary building
- [ ] Text Vectorization: Bag of Words, TF-IDF
- [ ] Word Embeddings: Word2Vec, GloVe concept
- **Task:** Build a text classification pipeline (spam detection) using TF-IDF + Logistic Regression on the SMS Spam dataset

### Day 24 — NLP with Deep Learning + Embeddings
- [ ] Embeddings deep dive: dense vector representations, semantic similarity
- [ ] Attention Models for NLP
- [ ] BERT: pre-training (masked LM + NSP), fine-tuning
- [ ] GPT architecture (decoder-only transformers)
- [ ] Sentence Transformers for semantic search
- **Task:** Use Sentence Transformers to build a semantic search engine on a small document corpus

### Day 25 — Explainable AI (XAI)
- [ ] Why explainability matters (trust, regulation, debugging)
- [ ] LIME: Local Interpretable Model-agnostic Explanations
- [ ] SHAP: SHapley Additive exPlanations — feature importance
- [ ] Partial Dependence Plots
- [ ] Fairness and bias in ML models
- **Task:** Apply SHAP to your Week 2 best classification model; identify the top 5 most important features and visualize

### Day 26 — MLOps Awareness + Model Deployment
- [ ] What is MLOps? (awareness — full roadmap is separate)
- [ ] Experiment tracking: MLflow or Weights & Biases (intro)
- [ ] Model versioning and reproducibility
- [ ] Serving a model: FastAPI + sklearn/PyTorch model as a REST endpoint
- [ ] Containerizing an ML app with Docker (brief)
- **Task:** Wrap your Week 2 best model in a FastAPI app with a `/predict` endpoint; test it with Postman

### Day 27 — Full Review + Gap Filling
- [ ] Go back to any topic that felt unclear across 4 weeks
- [ ] Re-read key notebook sections
- [ ] Review all GitHub notebooks — clean them up with markdown explanations
- [ ] Compare your implementations with reference implementations online
- **Task:** Write a 1-page "ML Cheat Sheet" summarizing every algorithm you've learned (type, use case, pros, cons)

### Day 28 — Capstone Project Finalization
- [ ] Complete capstone project (see below)
- [ ] Write a detailed README.md
- [ ] Add visualizations, metrics table, and results to the notebook
- [ ] Push final project to GitHub

---

## 🏆 Capstone Projects

### 🥉 Baseline Capstone — Real Estate Price Predictor
**Stack:** Python + Pandas + Scikit-learn + Matplotlib + Streamlit  
**Dataset:** Kaggle House Prices or California Housing  
**Features:**
- Full EDA with 10+ visualizations
- Data cleaning and feature engineering
- Train and compare 5 models (Linear Regression, Ridge, Lasso, Random Forest, XGBoost)
- K-Fold cross-validation and hyperparameter tuning
- SHAP feature importance plot
- Streamlit web app for live predictions
- Clean GitHub repo with notebook + README

### 🥈 Intermediate Capstone — Customer Churn Prediction Platform
**Stack:** Python + Scikit-learn + XGBoost + SHAP + FastAPI + Docker  
**Dataset:** Telco Customer Churn (Kaggle)  
**Features:**
- EDA identifying key churn drivers
- Feature engineering (tenure buckets, contract encoding)
- Imbalanced class handling (SMOTE or class weights)
- Model comparison with ROC-AUC, F1 as primary metric
- SHAP explainability dashboard
- FastAPI REST endpoint (`/predict` and `/explain`)
- Dockerized application
- Experiment tracking with MLflow

### 🥇 Advanced Capstone — Multi-Modal Sentiment & Review Intelligence System
**Stack:** Python + PyTorch + HuggingFace + Streamlit + FastAPI + Docker + FAISS  
**Dataset:** Amazon Reviews, IMDb, or Yelp  
**Features:**
- NLP pipeline: BERT fine-tuned for multi-class sentiment classification
- Aspect-based sentiment analysis to extract specific features liked/disliked
- Semantic search engine for reviews using Sentence Transformers + FAISS
- MLOps pipeline including model versioning and experiment tracking
- SHAP/LIME explainability dashboard to visualize token importance
- Streamlit UI: paste a review to get sentiment, aspects, and similar reviews
- FastAPI backend for real-time inference, containerized via Docker
- Comprehensive evaluation: Confusion matrix, F1-score, and Latency benchmarks
- Full README with architecture diagram, API documentation, and results analysis

---

## 📚 Recommended Resources by Topic

| Topic | Resource |
|-------|---------|
| Calculus & Linear Algebra | 3Blue1Brown YouTube series (free) |
| Statistics & Probability | StatQuest with Josh Starmer (YouTube) |
| Python for ML | Kaggle Learn — Python & Pandas (free) |
| Machine Learning Algorithms | Hands-On ML with Scikit-Learn & TensorFlow (book) |
| Deep Learning Theory | Deep Learning Book — Goodfellow (free online) |
| PyTorch | official PyTorch tutorials (pytorch.org) |
| NLP | HuggingFace Course (huggingface.co/learn) — free |
| Reinforcement Learning | David Silver RL Course (YouTube, DeepMind) |
| Explainable AI | SHAP documentation + Christoph Molnar's Interpretable ML Book |
| Datasets | Kaggle, UCI ML Repository, HuggingFace Datasets |
| Practice | Kaggle Competitions (Titanic, Housing, Digit Recognizer) |

---

## ✅ Weekly Checkpoints

| Week | Milestone |
|------|-----------|
| End of Week 1 | EDA notebook complete, data cleaning pipeline built, pushed to GitHub |
| End of Week 2 | 3+ ML models trained, evaluated, best model saved with sklearn Pipeline |
| End of Week 3 | Neural network trained on image data (CNN), LSTM or Transformer demo working |
| End of Week 4 | Capstone project complete, deployed or demo-ready, README written |

---

## 🔬 Algorithm Quick Reference

| Algorithm | Type | Best For | Key Hyperparameters |
|-----------|------|----------|---------------------|
| Linear Regression | Supervised | Continuous output | Regularization (C) |
| Logistic Regression | Supervised | Binary classification | C, solver |
| KNN | Supervised | Small datasets | k, distance metric |
| SVM | Supervised | High-dim data | C, kernel, gamma |
| Decision Tree | Supervised | Interpretable models | max_depth, min_samples |
| Random Forest | Supervised | Tabular data, robust | n_estimators, max_features |
| XGBoost/GBM | Supervised | Competitions, tabular | learning_rate, n_estimators |
| K-Means | Unsupervised | Flat clustering | k (n_clusters) |
| PCA | Unsupervised | Dimensionality reduction | n_components |
| Neural Network (MLP) | Supervised | Complex patterns | layers, LR, optimizer |
| CNN | Supervised | Image data | filters, kernel_size |
| LSTM/GRU | Supervised | Sequential data | hidden_size, layers |
| Transformer | Supervised | Text, sequences | heads, d_model, layers |
| Q-Learning / DQN | RL | Discrete action spaces | epsilon, gamma, LR |

---

## 📝 Daily Habit Tracker Template

```
📅 Date: ___________
✅ Topics Covered:
  1.
  2.
🛠️  Notebook / Code Task Done:

📊 Dataset Used:

💡 3 Things I Learned:
  1.
  2.
  3.
❓ Questions / Gaps to Revisit:

⏱️  Time Spent: _____ hrs
```

---

## 🧠 Learning Philosophy for ML

> **Math intuition > Math memorization.** You don't need to derive every formula — understand *why* it works.  
> **A model you can explain > A model with better accuracy.** Always be able to defend your choices.  
> **Kaggle is your gym.** After Week 2, submit to at least one competition — even a tutorial one.  
> **After completing this plan, explore:** AI Engineer Roadmap · MLOps Roadmap · AI & Data Scientist Roadmap.

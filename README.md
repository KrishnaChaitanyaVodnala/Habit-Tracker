<p align="center">
  <img src="https://img.shields.io/badge/🔥_HabitFlow_AI-Habit_Tracker-00D4AA?style=for-the-badge&labelColor=0A0A0F" alt="HabitFlow AI" />
</p>

<h1 align="center">HabitFlow AI — Intelligent Habit Tracker</h1>

<p align="center">
  <em>Build habits that actually stick — powered by streak psychology, behavioral analytics, and AI coaching.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JWT-Auth-FB015B?logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧠 Overview

**HabitFlow AI** is a full-stack habit tracking application that combines behavioral science with modern web technologies. It helps users build, track, and sustain habits through an intelligent system featuring daily streak tracking, GitHub-style calendar heatmaps, interactive analytics dashboards, and an AI coach that provides personalized behavioral insights and streak-break risk detection.

The application uses an **in-memory data store** with realistic seeded data (60 days of completion patterns), making it instantly runnable without any database setup.

---

## ✨ Features

### 🏠 Dashboard
- **Personalized Greeting** — Time-aware greetings with the user's first name
- **Live Stat Cards** — Total habits, today's completion count, completion rate %, and longest streak
- **Today's Habits** — One-click tracking with animated check-in and "already tracked" prevention
- **Progress Ring** — SVG circular progress bar for daily completion visualization
- **Top Streaks Panel** — Ranked list of active habit streaks with 🔥 indicators
- **AI Motivation Widget** — Daily motivational quote and actionable tip

### 📊 Analytics
- **Weekly Bar Chart** — Habits completed per day for the last 7 days
- **Habit Completion Rates** — Radial bar chart showing per-habit averages
- **30-Day Trend Line** — Overall completion rate trend over the past month
- All charts are interactive with custom dark-themed tooltips (powered by **Recharts**)

### 🗓️ Calendar Heatmap
- **GitHub-style Contribution Grid** — 90-day activity visualization
- **Color Intensity Mapping** — Darker cells = higher completion percentage
- **Milestone Markers** — 🔥 for 10-day streaks, 🏆 for 30-day milestones
- **Summary Stats** — Active days, average completion rate, and period covered

### 🤖 AI Coach
- **Behavioral Insights** — Pattern detection (e.g., "Wednesday Workout Gap")
- **Streak-Break Risk Detection** — Predictive alerts with actionable recommendations
- **LLM-Ready Architecture** — Hardcoded mock insights with clearly marked TODO hooks for OpenAI / Gemini / Anthropic integration

### 📝 Notes
- **Per-Habit Journals** — Write reflections, observations, and notes for each habit
- **Local Persistence** — Notes saved to `localStorage` for instant access
- **Keyboard Shortcut** — `Ctrl+Enter` to save notes quickly

### ⚙️ Settings
- **Profile Display** — View account name and email
- **Notification Preferences** — Toggle daily reminders, streak warnings, and weekly reports (UI scaffold)
- **Theme Selector** — Dark / Light mode toggle (CSS variable–based theming)
- **Danger Zone** — Account deletion placeholder with confirmation flow

### 🔐 Authentication
- **JWT-Based Auth** — Secure token-based authentication with 7-day expiry
- **Registration & Login** — Full forms with validation and error handling
- **Password Hashing** — bcrypt with salt rounds of 10
- **Protected Routes** — Automatic redirect for unauthenticated access
- **Forgot Password** — UI scaffold for password recovery flow

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router DOM 7** | Client-side routing |
| **Recharts 3** | Data visualization (bar, line, radial charts) |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **JSON Web Tokens** | Authentication |
| **bcryptjs** | Password hashing |
| **uuid** | Unique ID generation |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
Habit Tracker/
├── backend/
│   ├── data/
│   │   └── store.js              # In-memory data store + seed logic
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── routes/
│   │   ├── auth.js               # POST /register, /login
│   │   ├── habits.js             # CRUD + tracking endpoints
│   │   ├── analytics.js          # Timeline + dashboard aggregation
│   │   └── ai.js                 # AI coach, motivation, risk analysis
│   ├── server.js                 # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── api/                  # Axios API client modules
│   │   │   ├── client.js         # Axios instance with auth interceptor
│   │   │   ├── auth.js           # Auth API calls
│   │   │   ├── habits.js         # Habits API calls
│   │   │   ├── analytics.js      # Analytics API calls
│   │   │   └── ai.js             # AI Coach API calls
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Layout.jsx        # App shell with sidebar
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── StatCard.jsx      # Animated stat display
│   │   │   ├── HabitCard.jsx     # Single habit with track button
│   │   │   ├── HeatmapGrid.jsx   # GitHub-style calendar grid
│   │   │   ├── InsightCard.jsx   # AI behavioral insight card
│   │   │   ├── RiskAlert.jsx     # Streak-break risk alert
│   │   │   └── StreakBadge.jsx    # Streak counter badge
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state provider
│   │   ├── pages/                # Route-level page components
│   │   │   ├── Landing.jsx       # Marketing / hero page
│   │   │   ├── Login.jsx         # Login form
│   │   │   ├── Register.jsx      # Registration form
│   │   │   ├── ForgotPassword.jsx# Password recovery
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── Habits.jsx        # Habit CRUD management
│   │   │   ├── Analytics.jsx     # Charts & analytics
│   │   │   ├── Heatmap.jsx       # Calendar heatmap
│   │   │   ├── AICoach.jsx       # AI insights & risk detection
│   │   │   ├── Notes.jsx         # Per-habit notes journal
│   │   │   └── Settings.jsx      # Account preferences
│   │   ├── App.jsx               # Router + providers
│   │   ├── App.css               # Component-specific styles
│   │   ├── index.css             # Global theme & design system
│   │   └── main.jsx              # React DOM entry point
│   ├── index.html                # HTML shell
│   ├── vite.config.js            # Vite config with API proxy
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/KrishnaChaitanyaVodnala/Habit-Tracker.git
cd Habit-Tracker
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000` and automatically seed the in-memory database with a demo user, 5 habits, and ~60 days of realistic completion data.

### 4. Start the Frontend Dev Server

```bash
# In a new terminal
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` with API requests automatically proxied to the backend.

### 5. Open in Browser

Navigate to **http://localhost:5173** to access the application.

---

## 🔑 Demo Credentials

The app auto-seeds a demo account on startup:

| Field | Value |
|---|---|
| **Email** | `demo@habitflow.ai` |
| **Password** | `demo1234` |

> **Note:** Data is stored in-memory. Restarting the backend server resets all data to the seeded state.

---

## 📡 API Reference

All endpoints (except auth) require a `Bearer` token in the `Authorization` header.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Habits

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/habits` | List all habits with stats |
| `POST` | `/api/habits` | Create a new habit |
| `PUT` | `/api/habits/:id` | Update a habit |
| `DELETE` | `/api/habits/:id` | Delete a habit and its logs |
| `POST` | `/api/habits/:id/track` | Track a habit for today |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/timeline` | 90-day daily completion data |
| `GET` | `/api/dashboard` | Today's stats + habit streaks |

### AI Coach

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/ai/motivation` | Daily motivational quote & tip |
| `GET` | `/api/ai/coach` | Behavioral pattern insights |
| `GET` | `/api/ai/risk-analysis` | Streak-break risk predictions |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status and timestamp |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│                                                     │
│  Landing ─── Login/Register ─── Protected Routes    │
│                                    │                │
│              ┌─────────────────────┼────────────┐   │
│              │    Dashboard  │  Habits  │ Notes  │   │
│              │    Analytics  │ Heatmap  │ Coach  │   │
│              │    Settings                       │   │
│              └─────────────────────┼────────────┘   │
│                                    │                │
│                    Axios + JWT Interceptor           │
└────────────────────────┬────────────────────────────┘
                         │  HTTP (proxied via Vite)
                         ▼
┌─────────────────────────────────────────────────────┐
│                  Backend (Express)                   │
│                                                     │
│  /api/auth/*      ── Auth Routes (bcrypt + JWT)     │
│  /api/habits/*    ── Habit CRUD + Tracking          │
│  /api/analytics/* ── Timeline + Dashboard Stats     │
│  /api/ai/*        ── AI Coach (LLM-ready stubs)     │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │        In-Memory Store (store.js)             │  │
│  │  users[] ─── habits[] ─── habitLogs[]         │  │
│  │  Seeded with 60 days of realistic data        │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 🗺️ Roadmap

- [ ] **Database Integration** — Migrate from in-memory store to MongoDB / PostgreSQL
- [ ] **LLM Integration** — Wire AI Coach endpoints to OpenAI, Gemini, or Anthropic APIs
- [ ] **Push Notifications** — Daily reminders and streak-break warnings
- [ ] **Light Mode** — Full CSS variable theming for light theme
- [ ] **Profile Editing** — Allow users to update name, email, and password
- [ ] **Data Export** — CSV / JSON export of habit logs
- [ ] **Mobile Responsiveness** — Optimized layouts for tablets and phones
- [ ] **Habit Categories** — Custom categories with color/icon selection
- [ ] **Social Features** — Share streaks and compete with friends

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with 🔥 and behavioral science
</p>

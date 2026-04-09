# GitHub Explorer — MERN Stack

A full-stack GitHub user and repository explorer built with **MongoDB, Express, React, Node.js**.

---

## Features

- 🔍 **Debounced user search** (400ms) via GitHub API
- 📋 **Repository listing** with name, stars, forks, language, description, topics
- 🔀 **Sort** by stars, forks, last updated, or name
- 🌐 **Filter** by language
- 🔎 **Filter** repos by name/description text
- 📄 **Pagination** (Load More)
- ★ **Bookmark** repositories (stored in MongoDB)
- 🌙 **Dark / Light mode** (persisted in localStorage)
- ⚡ **Loading, Error, Empty states** on all async operations
- 🧩 **Custom hooks**: `useDebounce`, `useGithubSearch`, `useRepos`, `useBookmarks`

---

## Project Structure

```
github-explorer/
├── backend/
│   ├── controllers/
│   │   ├── githubController.js     # GitHub API proxy logic
│   │   └── bookmarkController.js   # CRUD for bookmarks
│   ├── middleware/
│   │   └── githubApi.js            # Axios instance with auth headers
│   ├── models/
│   │   └── Bookmark.js             # Mongoose schema
│   ├── routes/
│   │   ├── github.js
│   │   └── bookmarks.js
│   ├── .env.example
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── SearchBar.jsx
        │   ├── UserCard.jsx
        │   ├── UserProfile.jsx
        │   ├── RepoCard.jsx
        │   ├── RepoFilters.jsx
        │   ├── Spinner.jsx
        │   ├── ErrorState.jsx
        │   └── EmptyState.jsx
        ├── context/
        │   └── ThemeContext.jsx
        ├── hooks/
        │   ├── useDebounce.js
        │   ├── useGithubSearch.js
        │   ├── useRepos.js
        │   └── useBookmarks.js
        ├── pages/
        │   ├── HomePage.jsx
        │   └── BookmarksPage.jsx
        ├── utils/
        │   ├── api.js
        │   └── helpers.js
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

---

## Setup & Run

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Optional: GitHub Personal Access Token (for higher API rate limits — 60 req/hr unauthenticated vs 5000/hr authenticated)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: add MONGODB_URI and optionally GITHUB_TOKEN
npm run dev
# Runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/github/search?q=&page=` | Search GitHub users |
| GET | `/api/github/users/:username` | Get user profile |
| GET | `/api/github/users/:username/repos` | Get user repositories |
| GET | `/api/bookmarks` | List all bookmarks |
| POST | `/api/bookmarks` | Add a bookmark |
| DELETE | `/api/bookmarks/:repoId` | Remove a bookmark |
| GET | `/api/bookmarks/check/:repoId` | Check if bookmarked |
| GET | `/api/health` | Health check |

---

## Why MERN over plain React?

| Concern | Solution |
|---------|----------|
| GitHub token security | Stored server-side in `.env`, never exposed to client |
| Rate limiting | Express `rate-limit` middleware protects the API |
| Persistent bookmarks | MongoDB persists across sessions/devices |
| Proxy | Vite dev proxy routes `/api` → Express — no CORS issues |

---

## Tech Stack

- **MongoDB** — Bookmark persistence
- **Express.js** — REST API + GitHub API proxy
- **React 18** — Functional components, hooks
- **Node.js** — Server runtime
- **Axios** — HTTP client (both server + client)
- **React Router v6** — Client-side routing
- **Vite** — Frontend build tool

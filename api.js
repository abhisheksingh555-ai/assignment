import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// GitHub
export const searchUsers = (q, page = 1) =>
  api.get(`/github/search?q=${encodeURIComponent(q)}&page=${page}&per_page=12`);

export const getUserProfile = (username) => api.get(`/github/users/${username}`);

export const getUserRepos = (username, sort = "updated") =>
  api.get(`/github/users/${username}/repos?sort=${sort}&per_page=100`);

// Bookmarks
export const getBookmarks = () => api.get("/bookmarks");
export const addBookmark = (data) => api.post("/bookmarks", data);
export const removeBookmark = (repoId) => api.delete(`/bookmarks/${repoId}`);
export const checkBookmark = (repoId) => api.get(`/bookmarks/check/${repoId}`);

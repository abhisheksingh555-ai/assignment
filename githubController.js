const githubAxios = require("../middleware/githubApi");

// Search GitHub users
const searchUsers = async (req, res) => {
  const { q, page = 1, per_page = 12 } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: "Query must be at least 2 characters." });
  }

  try {
    const { data } = await githubAxios.get("/search/users", {
      params: { q: q.trim(), page, per_page },
    });
    res.json({
      total_count: data.total_count,
      users: data.items.map((u) => ({
        id: u.id,
        login: u.login,
        avatar_url: u.avatar_url,
        html_url: u.html_url,
        type: u.type,
      })),
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || "Failed to fetch users from GitHub.";
    res.status(status).json({ error: message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const { data } = await githubAxios.get(`/users/${username}`);
    res.json({
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      location: data.location,
      company: data.company,
      blog: data.blog,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url,
      created_at: data.created_at,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || "Failed to fetch user profile.";
    res.status(status).json({ error: message });
  }
};

// Get user repositories
const getUserRepos = async (req, res) => {
  const { username } = req.params;
  const { sort = "updated", direction = "desc", per_page = 100, page = 1 } = req.query;

  try {
    const { data } = await githubAxios.get(`/users/${username}/repos`, {
      params: { sort, direction, per_page, page },
    });
    res.json(
      data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        html_url: repo.html_url,
        updated_at: repo.updated_at,
        topics: repo.topics,
        open_issues: repo.open_issues_count,
        license: repo.license?.name || null,
        visibility: repo.visibility,
        size: repo.size,
      }))
    );
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || "Failed to fetch repositories.";
    res.status(status).json({ error: message });
  }
};

module.exports = { searchUsers, getUserProfile, getUserRepos };

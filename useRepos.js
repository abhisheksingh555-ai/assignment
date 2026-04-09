import { useState, useEffect } from "react";
import { getUserRepos, getUserProfile } from "../utils/api";

export const useRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const [repoRes, profileRes] = await Promise.all([
          getUserRepos(username),
          getUserProfile(username),
        ]);
        setRepos(repoRes.data);
        setProfile(profileRes.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load repositories.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [username]);

  return { repos, profile, loading, error };
};

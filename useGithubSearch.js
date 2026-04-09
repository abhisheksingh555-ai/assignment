import { useState, useEffect, useCallback } from "react";
import { searchUsers } from "../utils/api";
import { useDebounce } from "./useDebounce";

export const useGithubSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);

  const fetchUsers = useCallback(async (q, p = 1) => {
    if (!q || q.trim().length < 2) {
      setUsers([]);
      setTotalCount(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await searchUsers(q, p);
      setUsers(p === 1 ? data.users : (prev) => [...prev, ...data.users]);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchUsers(debouncedQuery, 1);
  }, [debouncedQuery, fetchUsers]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(debouncedQuery, nextPage);
  };

  return { query, setQuery, users, totalCount, loading, error, loadMore, hasMore: users.length < totalCount };
};

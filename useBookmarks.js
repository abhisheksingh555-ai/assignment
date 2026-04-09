import { useState, useEffect, useCallback } from "react";
import { getBookmarks, addBookmark, removeBookmark } from "../utils/api";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getBookmarks();
      setBookmarks(data);
      setBookmarkedIds(new Set(data.map((b) => b.repoId)));
    } catch (err) {
      console.error("Bookmark fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookmarks(); }, [fetchBookmarks]);

  const toggle = useCallback(async (repo) => {
    const repoId = repo.id;
    if (bookmarkedIds.has(repoId)) {
      await removeBookmark(repoId);
      setBookmarkedIds((prev) => { const s = new Set(prev); s.delete(repoId); return s; });
      setBookmarks((prev) => prev.filter((b) => b.repoId !== repoId));
    } else {
      const payload = {
        repoId, name: repo.name, fullName: repo.full_name,
        description: repo.description || "", stars: repo.stars,
        forks: repo.forks, language: repo.language, htmlUrl: repo.html_url,
        ownerAvatar: repo.owner?.avatar_url, ownerLogin: repo.owner?.login,
      };
      const { data } = await addBookmark(payload);
      setBookmarkedIds((prev) => new Set([...prev, repoId]));
      setBookmarks((prev) => [data, ...prev]);
    }
  }, [bookmarkedIds]);

  return { bookmarks, bookmarkedIds, loading, toggle, refresh: fetchBookmarks };
};

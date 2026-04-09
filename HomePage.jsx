import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import UserProfile from "../components/UserProfile";
import RepoCard from "../components/RepoCard";
import RepoFilters from "../components/RepoFilters";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useGithubSearch } from "../hooks/useGithubSearch";
import { useRepos } from "../hooks/useRepos";
import { useBookmarks } from "../hooks/useBookmarks";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [sort, setSort] = useState("stars");
  const [filterLang, setFilterLang] = useState("");
  const [searchRepo, setSearchRepo] = useState("");

  const { query, setQuery, users, totalCount, loading: searchLoading, error: searchError, loadMore, hasMore } = useGithubSearch();
  const { repos, profile, loading: repoLoading, error: repoError } = useRepos(selectedUser);
  const { bookmarkedIds, toggle } = useBookmarks();

  const languages = useMemo(() => {
    const langs = [...new Set(repos.map((r) => r.language).filter(Boolean))];
    return langs.sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let result = [...repos];
    if (filterLang) result = result.filter((r) => r.language === filterLang);
    if (searchRepo) result = result.filter((r) =>
      r.name.toLowerCase().includes(searchRepo.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(searchRepo.toLowerCase())
    );
    result.sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "forks") return b.forks - a.forks;
      if (sort === "updated") return new Date(b.updated_at) - new Date(a.updated_at);
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return result;
  }, [repos, sort, filterLang, searchRepo]);

  const handleSelectUser = (user) => {
    setSelectedUser(user.login);
    setSort("stars");
    setFilterLang("");
    setSearchRepo("");
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {!selectedUser ? (
        <>
          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Explore <span style={{ color: "var(--accent)" }}>GitHub</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
              Search developers, discover repositories, bookmark favorites.
            </p>
          </div>

          <div style={{ maxWidth: 600, margin: "0 auto 2rem" }}>
            <SearchBar value={query} onChange={setQuery} />
            {query && !searchLoading && (
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 8,
                fontFamily: "var(--font-mono)" }}>
                {totalCount.toLocaleString()} results for "{query}"
              </p>
            )}
          </div>

          {searchLoading && users.length === 0 && <Spinner message="Searching users..." />}
          {searchError && <ErrorState message={searchError} />}

          {!searchLoading && !searchError && query && users.length === 0 && (
            <EmptyState icon="👤" title="No users found" subtitle={`No GitHub users matched "${query}". Try a different search.`} />
          )}

          {!query && !searchLoading && (
            <EmptyState icon="🔭" title="Start exploring" subtitle="Type a username or name to search GitHub users." />
          )}

          {users.length > 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
                {users.map((user, i) => (
                  <UserCard key={user.id} user={user} onClick={handleSelectUser} index={i} />
                ))}
              </div>
              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                  <button onClick={loadMore} disabled={searchLoading} style={{
                    background: "transparent", border: "1.5px solid var(--accent)", color: "var(--accent)",
                    borderRadius: 8, padding: "0.6rem 2rem", fontFamily: "var(--font-heading)",
                    fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s",
                  }}>
                    {searchLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {repoLoading && <Spinner message={`Loading ${selectedUser}'s repos...`} />}
          {repoError && <ErrorState message={repoError} onRetry={() => setSelectedUser(selectedUser)} />}

          {!repoLoading && !repoError && profile && (
            <>
              <UserProfile profile={profile} onBack={() => setSelectedUser(null)} />
              <RepoFilters sort={sort} setSort={setSort} filterLang={filterLang}
                setFilterLang={setFilterLang} searchRepo={searchRepo}
                setSearchRepo={setSearchRepo} languages={languages} />

              {filteredRepos.length === 0 ? (
                <EmptyState icon="📦" title="No repositories found"
                  subtitle="Try adjusting your filters." />
              ) : (
                <>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem",
                    fontFamily: "var(--font-mono)", marginBottom: "0.75rem" }}>
                    Showing {filteredRepos.length} of {repos.length} repositories
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.75rem" }}>
                    {filteredRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo}
                        isBookmarked={bookmarkedIds.has(repo.id)}
                        onBookmark={toggle} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;

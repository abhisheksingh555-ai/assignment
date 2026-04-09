import { useBookmarks } from "../hooks/useBookmarks";
import { getLanguageColor, formatNumber } from "../utils/helpers";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";

const BookmarksPage = () => {
  const { bookmarks, bookmarkedIds, loading, toggle } = useBookmarks();

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
          ★ Bookmarks
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.9rem" }}>
          {bookmarks.length} saved {bookmarks.length === 1 ? "repository" : "repositories"}
        </p>
      </div>

      {loading && <Spinner message="Loading bookmarks..." />}

      {!loading && bookmarks.length === 0 && (
        <EmptyState icon="★" title="No bookmarks yet"
          subtitle="Star repositories from the search page to save them here." />
      )}

      {!loading && bookmarks.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.75rem" }}>
          {bookmarks.map((b, i) => (
            <div key={b.repoId} className="animate-fade"
              style={{ animationDelay: `${i * 0.04}s`, background: "var(--surface)",
                border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem",
                display: "flex", flexDirection: "column", gap: "0.75rem",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--star)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  {b.ownerAvatar && (
                    <img src={b.ownerAvatar} alt={b.ownerLogin}
                      style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0 }} />
                  )}
                  <a href={b.htmlUrl} target="_blank" rel="noreferrer"
                    style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none",
                      fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {b.name}
                  </a>
                </div>
                <button onClick={() => toggle({ id: b.repoId, name: b.name, full_name: b.fullName,
                  description: b.description, stars: b.stars, forks: b.forks,
                  language: b.language, html_url: b.htmlUrl })}
                  style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6,
                    padding: "0.3rem 0.5rem", cursor: "pointer", color: "var(--star)",
                    fontSize: "0.9rem", flexShrink: 0 }}>★</button>
              </div>

              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden" }}>
                {b.description || "No description."}
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap",
                paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                {b.language && (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%",
                      background: getLanguageColor(b.language) }} />
                    {b.language}
                  </span>
                )}
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>⭐ {formatNumber(b.stars)}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>🍴 {formatNumber(b.forks)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;

import { getLanguageColor, formatNumber } from "../utils/helpers";

const RepoCard = ({ repo, isBookmarked, onBookmark }) => (
  <div className="animate-fade" style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius)", padding: "1.25rem",
    display: "flex", flexDirection: "column", gap: "0.75rem",
    transition: "border-color 0.2s",
  }}
  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
  >
    {/* Header */}
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
      <a href={repo.html_url} target="_blank" rel="noreferrer"
        style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none",
          fontSize: "0.95rem", wordBreak: "break-word",
          flex: 1,
        }}
        onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
        onMouseLeave={(e) => e.target.style.textDecoration = "none"}
      >
        {repo.name}
      </a>
      <button onClick={() => onBookmark(repo)}
        title={isBookmarked ? "Remove bookmark" : "Bookmark"}
        style={{
          background: "none", border: "1px solid var(--border)", borderRadius: 6,
          padding: "0.3rem 0.5rem", cursor: "pointer", fontSize: "0.9rem",
          color: isBookmarked ? "var(--star)" : "var(--text-muted)",
          transition: "all 0.2s", flexShrink: 0,
        }}>
        {isBookmarked ? "★" : "☆"}
      </button>
    </div>

    {/* Description */}
    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5,
      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
      overflow: "hidden", minHeight: "2.5em" }}>
      {repo.description || "No description provided."}
    </p>

    {/* Topics */}
    {repo.topics?.length > 0 && (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {repo.topics.slice(0, 4).map((t) => (
          <span key={t} style={{
            background: "rgba(0,255,136,0.08)", color: "var(--accent)",
            border: "1px solid rgba(0,255,136,0.2)", borderRadius: 4,
            padding: "1px 7px", fontSize: "0.7rem", fontWeight: 600,
            fontFamily: "var(--font-mono)",
          }}>{t}</span>
        ))}
      </div>
    )}

    {/* Stats */}
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
      marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
      {repo.language && (
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
            background: getLanguageColor(repo.language) }} />
          {repo.language}
        </span>
      )}
      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
        ⭐ {formatNumber(repo.stars)}
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
        🍴 {formatNumber(repo.forks)}
      </span>
      {repo.open_issues > 0 && (
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          🔴 {repo.open_issues} issues
        </span>
      )}
    </div>
  </div>
);

export default RepoCard;

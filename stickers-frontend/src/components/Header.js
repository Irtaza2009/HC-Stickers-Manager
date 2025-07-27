function Header({
  showAll,
  setShowAll,
  username,
  isProfileView = false,
  ownedCount,
  totalStickers,
  percentOwned,
}) {
  return (
    <header className="header dreamscape-header">
      {showAll ? (
        <>
          <button
            className="back-btn"
            onClick={() => setShowAll(false)}
            aria-label="Back"
          >
            ← Back
          </button>
          <h1 className="all-stickers-heading">
            All Hack Club <span className="username">Stickers</span>!
          </h1>
        </>
      ) : (
        <div>
          <a
            href={`https://stickers.irtaza.xyz/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-link"
          >
            Share Profile
          </a>
          <h1>
            Welcome, <span className="username">{username}</span>!{" "}
            <span className="wave"></span>
          </h1>
          <div className="progress-container">
            <div className="progress-label">
              {ownedCount}/{totalStickers} Stickers Collected ({percentOwned}
              %)
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${percentOwned}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

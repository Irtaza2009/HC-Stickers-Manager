// Header.js

function Header({ showAll, setShowAll, username }) {
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
          <h1 className="all-stickers-heading">All Hack Club Stickers</h1>
        </>
      ) : (
        <h1>
          Welcome, <span className="username">{username}</span>!{" "}
          <span className="wave"></span>
        </h1>
      )}
    </header>
  );
}

export default Header;

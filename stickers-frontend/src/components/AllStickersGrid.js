import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AllStickersGrid({ stickers, hasSticker, inWishlist, toggleWishlist }) {
  const [search, setSearch] = useState("");
  const [onlyNotOwned, setOnlyNotOwned] = useState(false);

  const filteredStickers = stickers.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesOwnership = !onlyNotOwned || !hasSticker(s.sku);
    return matchesSearch && matchesOwnership;
  });

  return (
    <div>
      {/* Search and filter */}
      <div className="search-wrapper">
        <input
          className="sticker-search"
          type="text"
          placeholder="Search stickers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div
        className="filter-wrapper"
        style={{ textAlign: "center", margin: "1rem 0" }}
      >
        <label style={{ fontSize: "0.9rem", color: "#555" }}>
          <input
            type="checkbox"
            checked={onlyNotOwned}
            onChange={(e) => setOnlyNotOwned(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Only show stickers I don't own
        </label>
      </div>

      {/* Sticker grid */}
      <div className="all-stickers-grid">
        {filteredStickers.map((s) => (
          <div className="sticker-card dreamscape-card" key={s.sku}>
            <img
              src={s.picture}
              onError={(e) => {
                if (s.pictureData) {
                  e.target.src = s.pictureData;
                }
              }}
              width={64}
              alt={s.name}
              className="sticker-img"
            />
            <p className="sticker-name">{s.name}</p>
            {hasSticker(s.sku) ? (
              <span className="already-have-text">Already have</span>
            ) : (
              <button
                className={`wishlist-btn dreamscape-wishlist ${
                  inWishlist(s.sku) ? "wishlisted" : ""
                }`}
                onClick={() => toggleWishlist(s.sku)}
              >
                {inWishlist(s.sku) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllStickersGrid;

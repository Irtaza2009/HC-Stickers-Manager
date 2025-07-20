import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AllStickersGrid({ stickers, hasSticker, inWishlist, toggleWishlist }) {
  const [search, setSearch] = useState("");

  const filteredStickers = stickers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
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

      <div className="all-stickers-grid">
        {filteredStickers.map((s) => (
          <div className="sticker-card dreamscape-card" key={s.sku}>
            <img
              src={s.picture}
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

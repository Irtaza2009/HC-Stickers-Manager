import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AddStickerPopup({
  show,
  stickers,
  selectedSticker,
  setSelectedSticker,
  selectedQty,
  setSelectedQty,
  handlePopupSubmit,
  handleClose,
  activeTab,
}) {
  const [search, setSearch] = useState("");

  if (!show) return null;

  const filteredStickers = stickers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>Select a Sticker</h3>

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

        <div className="popup-sticker-list">
          {filteredStickers.map((s) => (
            <div
              key={s.sku}
              className={`popup-sticker-item ${
                selectedSticker?.sku === s.sku ? "selected" : ""
              }`}
              onClick={() => setSelectedSticker(s)}
            >
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
              <span>{s.name}</span>
            </div>
          ))}
        </div>

        {activeTab === "stickers" && (
          <div className="popup-qty-row">
            <label htmlFor="popup-qty">Quantity:</label>
            <input
              type="number"
              id="popup-qty"
              value={selectedQty}
              min="0"
              max="999"
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
              disabled={!selectedSticker}
            />
          </div>
        )}

        <div className="popup-actions">
          <button
            className="popup-btn"
            disabled={!selectedSticker}
            onClick={handlePopupSubmit}
          >
            Add
          </button>
          <button className="popup-btn cancel" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStickerPopup;

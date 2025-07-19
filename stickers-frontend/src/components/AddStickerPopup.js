import React from "react";
import "../App.css";

function AddStickerPopup({
  show,
  stickers,
  selectedSticker,
  setSelectedSticker,
  selectedQty,
  setSelectedQty,
  handlePopupSubmit,
  handleClose,
}) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>Select a Sticker</h3>
        <div className="popup-sticker-list">
          {stickers.map((s) => (
            <div
              key={s.sku}
              className={`popup-sticker-item ${
                selectedSticker?.sku === s.sku ? "selected" : ""
              }`}
              onClick={() => setSelectedSticker(s)}
            >
              <img src={s.picture} alt={s.name} width={48} />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
        <div className="popup-qty-row">
          <label htmlFor="popup-qty">Quantity:</label>
          <select
            id="popup-qty"
            value={selectedQty}
            onChange={(e) => setSelectedQty(parseInt(e.target.value))}
            disabled={!selectedSticker}
          >
            {[...Array(11)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
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

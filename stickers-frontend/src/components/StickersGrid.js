import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function StickersGrid({
  userStickers,
  user,
  updateSticker,
  handleAddSticker,
  readOnly = false,
}) {
  const [editingSku, setEditingSku] = useState(null);
  const [newQty, setNewQty] = useState(1);

  return (
    <div className="stickers-grid">
      {!readOnly && userStickers.length === 0 && (
        <div
          className="sticker-card plus-card dreamscape-card"
          style={{ cursor: "pointer" }}
          onClick={handleAddSticker}
        >
          <span className="plus-icon">＋</span>
          <p className="add-sticker-text">Add Sticker</p>
        </div>
      )}
      {userStickers.map((s) => {
        const qty = user.stickers.find((st) => st.sku === s.sku)?.quantity || 0;
        return (
          <div
            className="sticker-card dreamscape-card"
            key={s.sku}
            style={{ position: "relative" }}
          >
            <span className="sticker-qty">{qty}</span>

            {!readOnly && (
              <span
                className="update-icon"
                title="Update quantity"
                onClick={() => {
                  setEditingSku(s.sku);
                  setNewQty(qty);
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </span>
            )}

            <img
              src={s.picture}
              width={64}
              alt={s.name}
              className="sticker-img"
            />
            <p className="sticker-name">{s.name}</p>

            {!readOnly && editingSku === s.sku && (
              <div className="update-qty-col">
                <select
                  className="sticker-select"
                  value={newQty}
                  onChange={(e) => setNewQty(parseInt(e.target.value))}
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <button
                  className="update-btn"
                  onClick={() => {
                    updateSticker(s.sku, newQty);
                    setEditingSku(null);
                  }}
                >
                  Save
                </button>
                <button
                  className="update-btn cancel"
                  onClick={() => setEditingSku(null)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}
      {!readOnly && userStickers.length > 0 && (
        <div
          className="sticker-card plus-card dreamscape-card"
          style={{ cursor: "pointer" }}
          onClick={handleAddSticker}
        >
          <span className="plus-icon">＋</span>
          <p className="add-sticker-text">Add Sticker</p>
        </div>
      )}
    </div>
  );
}

export default StickersGrid;

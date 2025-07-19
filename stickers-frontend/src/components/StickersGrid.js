import { useState } from "react";

function StickersGrid({ userStickers, user, updateSticker, handleAddSticker }) {
  const [editingSku, setEditingSku] = useState(null);
  const [newQty, setNewQty] = useState(1);

  return (
    <div className="stickers-grid">
      {userStickers.length === 0 && (
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
            {/* Quantity top left */}
            <span className="sticker-qty">{qty}</span>
            {/* Update icon top right */}
            <span
              className="update-icon"
              title="Update quantity"
              onClick={() => {
                setEditingSku(s.sku);
                setNewQty(qty);
              }}
            >
              &#x21bb;
            </span>
            <img
              src={s.picture}
              width={64}
              alt={s.name}
              className="sticker-img"
            />
            <p className="sticker-name">{s.name}</p>
            {/* Show select only if editing */}
            {editingSku === s.sku ? (
              <div className="update-qty-row">
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
            ) : null}
          </div>
        );
      })}
      {userStickers.length > 0 && (
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

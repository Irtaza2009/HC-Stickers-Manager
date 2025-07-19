function WishlistGrid({ wishlistStickers, toggleWishlist, handleAddSticker }) {
  return (
    <div className="stickers-grid">
      {wishlistStickers.length === 0 && (
        <div
          className="sticker-card plus-card dreamscape-card"
          style={{ cursor: "pointer" }}
          onClick={handleAddSticker}
        >
          <span className="plus-icon">＋</span>
          <p className="add-sticker-text">Add to Wishlist</p>
        </div>
      )}
      {wishlistStickers.map((s) => (
        <div className="sticker-card dreamscape-card" key={s.sku}>
          <img src={s.picture} width={64} alt={s.name} className="sticker-img" />
          <p className="sticker-name">{s.name}</p>
          <button
            className={`wishlist-btn dreamscape-wishlist wishlisted`}
            onClick={() => toggleWishlist(s.sku)}
          >
            💖 Remove
          </button>
        </div>
      ))}
      {wishlistStickers.length > 0 && (
        <div
          className="sticker-card plus-card dreamscape-card"
          style={{ cursor: "pointer" }}
          onClick={handleAddSticker}
        >
          <span className="plus-icon">＋</span>
          <p className="add-sticker-text">Add to Wishlist</p>
        </div>
      )}
    </div>
  );
}
export default WishlistGrid;
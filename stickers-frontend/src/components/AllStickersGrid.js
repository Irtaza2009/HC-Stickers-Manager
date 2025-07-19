function AllStickersGrid({ stickers, hasSticker, inWishlist, toggleWishlist }) {
  return (
    <div className="all-stickers-grid">
      {stickers.map((s) => (
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
  );
}
export default AllStickersGrid;

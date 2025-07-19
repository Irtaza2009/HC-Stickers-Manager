function TabsRow({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-row">
      <button
        className={`tab-btn ${activeTab === "stickers" ? "active" : ""}`}
        onClick={() => setActiveTab("stickers")}
      >
        Your Stickers
      </button>
      <button
        className={`tab-btn ${activeTab === "wishlist" ? "active" : ""}`}
        onClick={() => setActiveTab("wishlist")}
      >
        Wishlist
      </button>
    </div>
  );
}
export default TabsRow;
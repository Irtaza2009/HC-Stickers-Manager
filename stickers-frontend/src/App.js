import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import AddStickerPopup from "./components/AddStickerPopup";
import StickersGrid from "./components/StickersGrid";
import WishlistGrid from "./components/WishlistGrid";
import AllStickersGrid from "./components/AllStickersGrid";
import TabsRow from "./components/TabsRow";
import Footer from "./components/Footer";
import Header from "./components/Header";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState("stickers");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((res) => setUser(res.data));
    axios
      .get("http://localhost:5000/api/stickers")
      .then((res) => setStickers(res.data));
  }, []);

  const updateSticker = (sku, quantity) => {
    axios
      .post("http://localhost:5000/api/user/stickers", { sku, quantity })
      .then((res) => setUser(res.data))
      .catch((err) => alert("Error updating sticker"));
  };

  const toggleWishlist = (sku) => {
    axios
      .post("http://localhost:5000/api/user/wishlist", { sku })
      .then((res) => setUser(res.data))
      .catch((err) => alert("Error updating wishlist"));
  };

  const handleAddSticker = () => {
    setShowPopup(true);
    setSelectedSticker(null);
    setSelectedQty(1);
  };

  const handlePopupSubmit = () => {
    if (selectedSticker) {
      if (activeTab === "stickers") {
        updateSticker(selectedSticker.sku, selectedQty);
      } else {
        toggleWishlist(selectedSticker.sku);
      }
      setShowPopup(false);
    }
  };

  if (!user)
    return (
      <div className="centered">
        <a className="login-btn" href="http://localhost:5000/auth/slack">
          Login with Slack
        </a>
      </div>
    );

  // Filter stickers for "Your Stickers" tab
  const userStickers = stickers.filter((s) =>
    user.stickers.some((us) => us.sku === s.sku && us.quantity > 0)
  );

  // Filter stickers for "Wishlist" tab
  const wishlistStickers = stickers.filter((s) =>
    user.wishlist.includes(s.sku)
  );

  // Helper: do you own this sticker?
  const hasSticker = (sku) =>
    user.stickers.some((us) => us.sku === sku && us.quantity > 0);

  // Helper: is sticker in wishlist?
  const inWishlist = (sku) => user.wishlist.includes(sku);

  return (
    <div className="app-container dreamscape-bg">
      <Header
        showAll={showAll}
        setShowAll={setShowAll}
        username={user.username}
      />
      <main className="main-content">
        {!showAll ? (
          <>
            <TabsRow activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "stickers" ? (
              <StickersGrid
                userStickers={userStickers}
                user={user}
                updateSticker={updateSticker}
                toggleWishlist={toggleWishlist}
                inWishlist={inWishlist}
                handleAddSticker={handleAddSticker}
              />
            ) : (
              <WishlistGrid
                wishlistStickers={wishlistStickers}
                toggleWishlist={toggleWishlist}
                handleAddSticker={handleAddSticker}
              />
            )}
            <AddStickerPopup
              show={showPopup}
              stickers={stickers}
              selectedSticker={selectedSticker}
              setSelectedSticker={setSelectedSticker}
              selectedQty={selectedQty}
              setSelectedQty={setSelectedQty}
              handlePopupSubmit={handlePopupSubmit}
              handleClose={() => setShowPopup(false)}
            />
            <button
              className="view-all-btn"
              onClick={() => setShowAll(true)}
              style={{ margin: "2rem auto 0 auto", display: "block" }}
            >
              View All Stickers
            </button>
          </>
        ) : (
          <AllStickersGrid
            stickers={stickers}
            hasSticker={hasSticker}
            inWishlist={inWishlist}
            toggleWishlist={toggleWishlist}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

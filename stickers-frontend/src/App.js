import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddStickerPopup from "./components/AddStickerPopup";
import StickersGrid from "./components/StickersGrid";
import WishlistGrid from "./components/WishlistGrid";
import AllStickersGrid from "./components/AllStickersGrid";
import TabsRow from "./components/TabsRow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";

axios.defaults.withCredentials = true;

function MainStickerManager({
  user,
  setUser,
  stickers,
  updateSticker,
  toggleWishlist,
  showPopup,
  setShowPopup,
  selectedSticker,
  setSelectedSticker,
  selectedQty,
  setSelectedQty,
  activeTab,
  setActiveTab,
  showAll,
  setShowAll,
  handlePopupSubmit,
  handleAddSticker,
}) {
  const userStickers = stickers.filter((s) =>
    user.stickers.some((us) => us.sku === s.sku && us.quantity > 0)
  );

  const wishlistStickers = stickers.filter((s) =>
    user.wishlist.includes(s.sku)
  );

  const hasSticker = (sku) =>
    user.stickers.some((us) => us.sku === sku && us.quantity > 0);

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
              activeTab={activeTab}
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
      .get("https://stickers-backend.irtaza.xyz/api/user", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));

    axios
      .get("https://stickers-backend.irtaza.xyz/api/stickers")
      .then((res) => setStickers(res.data));
  }, []);

  const updateSticker = (sku, quantity) => {
    axios
      .post("https://stickers-backend.irtaza.xyz/api/user/stickers", {
        sku,
        quantity,
      })
      .then((res) => setUser(res.data))
      .catch((err) => alert("Error updating sticker"));
  };

  const toggleWishlist = (sku) => {
    axios
      .post("https://stickers-backend.irtaza.xyz/api/user/wishlist", { sku })
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          !user ? (
            <div className="app-container dreamscape-bg">
              <header className="header dreamscape-header">
                <h1>
                  Hack Club <span className="username">Stickers</span> Manager
                </h1>
              </header>
              <div className="centered">
                <a
                  className="login-btn"
                  href="https://stickers-backend.irtaza.xyz/auth/slack"
                >
                  Login with Slack
                </a>
              </div>
              <Footer />
            </div>
          ) : (
            <MainStickerManager
              user={user}
              setUser={setUser}
              stickers={stickers}
              updateSticker={updateSticker}
              toggleWishlist={toggleWishlist}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              selectedSticker={selectedSticker}
              setSelectedSticker={setSelectedSticker}
              selectedQty={selectedQty}
              setSelectedQty={setSelectedQty}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showAll={showAll}
              setShowAll={setShowAll}
              handlePopupSubmit={handlePopupSubmit}
              handleAddSticker={handleAddSticker}
            />
          )
        }
      />
      <Route path="/u/:username" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;

// TODO:
// used stickers list!

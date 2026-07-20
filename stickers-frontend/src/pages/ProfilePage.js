import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StickersGrid from "../components/StickersGrid";
import WishlistGrid from "../components/WishlistGrid";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { preloadStickerImages } from "../utils/preloadStickerImages";

function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function loadProfile() {
      const [profileResult, stickersResult] = await Promise.allSettled([
        axios.get(`https://stickers-backend.irtaza.xyz/api/user/${username}`),
        axios.get("https://stickers-backend.irtaza.xyz/api/stickers"),
      ]);
      const loadedStickers =
        stickersResult.status === "fulfilled" ? stickersResult.value.data : [];
      await preloadStickerImages(loadedStickers);

      if (!isCurrent) return;
      setProfile(profileResult.status === "fulfilled" ? profileResult.value.data : null);
      setStickers(loadedStickers);
      setIsLoading(false);
    }

    loadProfile();
    return () => {
      isCurrent = false;
    };
  }, [username]);

  if (isLoading) return <LoadingScreen label="Loading this collection" />;

  if (!profile) {
    return <div className="profile-message">This profile could not be found.</div>;
  }

  const userStickers = stickers.filter((s) =>
    profile.stickers.some((us) => us.sku === s.sku && us.quantity > 0)
  );

  const wishlistStickers = stickers.filter((s) =>
    profile.wishlist.includes(s.sku)
  );

  const ownedCount = userStickers.length;
  const totalStickers = stickers.length;
  const percentOwned = totalStickers
    ? ((ownedCount / totalStickers) * 100).toFixed(1)
    : 0;

  return (
    <div className="app-container dreamscape-bg">
      <a
        href={`https://stickers.irtaza.xyz/`}
        target="_blank"
        rel="noopener noreferrer"
        className="back-btn"
      >
        ← Back
      </a>
      <header className="header dreamscape-header">
        <h1>
          <span className="username">{profile.name || profile.username}</span>'s
          Sticker Collection
        </h1>
        <div className="progress-container">
          <div className="progress-label">
            {ownedCount}/{totalStickers} Stickers Collected ({percentOwned}
            %)
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${percentOwned}%` }}
            ></div>
          </div>
        </div>
      </header>

      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Owned Stickers</h2>
      <StickersGrid userStickers={userStickers} user={profile} readOnly />

      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Wishlist</h2>
      <WishlistGrid wishlistStickers={wishlistStickers} readOnly />
      <Footer />
    </div>
  );
}

export default ProfilePage;

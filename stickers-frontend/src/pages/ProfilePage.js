import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StickersGrid from "../components/StickersGrid";
import WishlistGrid from "../components/WishlistGrid";
import Footer from "../components/Footer";

function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://stickers-backend.irtaza.xyz/api/user/${username}`)
      .then((res) => {
        setProfile(res.data);
      });

    axios
      .get("https://stickers-backend.irtaza.xyz/api/stickers")
      .then((res) => {
        setStickers(res.data);
      });
  }, [username]);

  if (!profile) return <div>Loading profile...</div>;

  const userStickers = stickers.filter((s) =>
    profile.stickers.some((us) => us.sku === s.sku && us.quantity > 0)
  );

  const wishlistStickers = stickers.filter((s) =>
    profile.wishlist.includes(s.sku)
  );

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

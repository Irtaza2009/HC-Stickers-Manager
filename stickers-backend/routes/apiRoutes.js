const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");
const Sticker = require("../models/Sticker");
const sharp = require("sharp");

const router = express.Router();

// Middleware to protect private routes
function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}
/*
// Sync stickers from Hack Club
router.get("/sync", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://arcade-stickers.hackclub.dev/api/skus/all"
    );

    for (let s of data.items) {
      await Sticker.updateOne({ sku: s.sku }, { $set: s }, { upsert: true });
    }

    res.send("Stickers synced!");
  } catch (err) {
    console.error("Sticker sync failed:", err.message);
    res.status(500).send("Failed to sync stickers");
  }
});
*/

async function convertImageUrlToBase64(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const resizedBuffer = await sharp(response.data)
      .resize({ width: 300 }) // Resize to 300px width
      .jpeg({ quality: 70 }) // Compress to JPEG
      .toBuffer();

    return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
  } catch (err) {
    console.error("Failed to convert image with sharp:", url, err.message);
    return null;
  }
}

router.get("/sync", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://stickers.dld.hackclub.app/api/all"
    );

    for (let item of data.items) {
      const sku = item.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const base64Image = await convertImageUrlToBase64(item.picture);

      const sticker = {
        name: item.name,
        sku,
        picture: item.picture,
        pictureData: base64Image,
      };

      await Sticker.updateOne({ sku }, { $set: sticker }, { upsert: true });
    }

    res.send("Stickers synced with base64-optimized images!");
  } catch (err) {
    console.error("Sticker sync failed:", err.message);
    res.status(500).send("Failed to sync stickers");
  }
});

// Get all stickers
router.get("/stickers", async (req, res) => {
  const stickers = await Sticker.find();
  res.json(stickers);
});

// Get logged-in user's info
router.get("/user", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// Update owned sticker quantity
router.post("/user/stickers", auth, async (req, res) => {
  const { sku, quantity } = req.body;
  const user = await User.findById(req.userId);

  const existing = user.stickers.find((s) => s.sku === sku);
  if (existing) {
    existing.quantity = quantity;
  } else {
    user.stickers.push({ sku, quantity });
  }

  await user.save();
  res.json(user);
});

// Toggle wishlist sticker
router.post("/user/wishlist", auth, async (req, res) => {
  const { sku } = req.body;
  const user = await User.findById(req.userId);

  if (!user.wishlist.includes(sku)) {
    user.wishlist.push(sku);
  } else {
    user.wishlist = user.wishlist.filter((s) => s !== sku);
  }

  await user.save();
  res.json(user);
});

// Public user profile by username
router.get("/user/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json(user);
});

module.exports = router;

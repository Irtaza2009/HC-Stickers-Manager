const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 🔗 Redirect to Slack OAuth
router.get("/slack", (req, res) => {
  const redirectUrl = `https://slack.com/oauth/v2/authorize?client_id=${
    process.env.SLACK_CLIENT_ID
  }&user_scope=${encodeURIComponent(
    "identity.basic,identity.avatar,identity.team"
  )}&redirect_uri=${process.env.SLACK_REDIRECT_URI}`;
  res.redirect(redirectUrl);
});

// 🔐 Slack OAuth Callback
router.get("/slack/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("Authorization code is missing");

  try {
    // 1. Exchange code for access token
    const response = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          code,
          redirect_uri: process.env.SLACK_REDIRECT_URI,
        },
      }
    );

    if (!response.data.ok) {
      throw new Error("Failed to exchange code for access token");
    }

    const accessToken = response.data.authed_user.access_token;

    // 2. Fetch Slack user info
    const userInfo = await axios.get("https://slack.com/api/users.identity", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userInfo.data.ok) {
      throw new Error("Failed to fetch user information");
    }

    const { id, name, image_72 } = userInfo.data.user;

    // 3. Find or create user
    let user = await User.findOne({ slackId: id });
    if (!user) {
      user = await User.create({
        slackId: id,
        username: name,
        avatar: image_72,
        stickers: [],
        wishlist: [],
        accessToken,
      });
    }

    // 4. Create JWT & Set Cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // 5. Redirect to frontend sticker collection page
    res.redirect("https://stickers.irtaza.xyz/"); // update for prod if needed
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Slack authentication failed");
  }
});

// 🚪 Log out route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
});

module.exports = router;

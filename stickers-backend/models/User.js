const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  slackId: String,
  username: String,
  avatar: String,
  stickers: [{ sku: String, quantity: Number }],
  wishlist: [String],
});

module.exports = mongoose.model("User", userSchema);

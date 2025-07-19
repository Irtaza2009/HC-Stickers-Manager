const mongoose = require("mongoose");

const stickerSchema = new mongoose.Schema({
  name: String,
  sku: { type: String, unique: true },
  picture: String,
  stock: Number,
  start: Number,
  end: Number,
});

module.exports = mongoose.model("Sticker", stickerSchema);

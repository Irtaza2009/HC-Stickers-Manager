const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

connectDB();

const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://stickers.irtaza.xyz"],
    credentials: true,
  })
);

// Use Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});

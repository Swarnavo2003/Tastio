import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server running on port 3000");
});

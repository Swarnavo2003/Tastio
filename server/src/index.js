import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import { errorHandler } from "./utils/error-handler.js";
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log("Server running on port 3000");
});

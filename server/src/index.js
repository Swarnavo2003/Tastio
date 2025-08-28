import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import { errorHandler } from "./utils/error-handler.js";
dotenv.config({ path: "./.env", quiet: true });

import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api
app.use("/api/v1/auth", authRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

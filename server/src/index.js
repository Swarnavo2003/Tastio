import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.config.js";
import { errorHandler } from "./utils/error-handler.js";

import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// api
app.use("/api/v1/auth", authRouter);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

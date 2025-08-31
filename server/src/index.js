import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./auth/google.js";

import connectDB from "./config/db.config.js";
import { errorHandler } from "./utils/error-handler.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// api
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 5000;
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/youtube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful....");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(port, () => {
  console.log("Connected to....", port);
});

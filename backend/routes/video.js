import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideo,
  subVideo,
  trendVideo,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", addVideo);
router.put("/view/:id", addView);
router.get("/trend", trendVideo);
router.get("/random", randomVideo);
router.get("/sub", verifyToken, subVideo);

export default router;

import express from "express";
import {
  addSearchTag,
  getSearchHistory,
  deleteSearchTag,
} from "../controllers/weatherController.js";
import { authenticate as auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/search", auth, addSearchTag);
router.get("/history", auth, getSearchHistory);
router.delete("/history/:id", auth, deleteSearchTag);

export default router;

import express from "express";
import { extractBodyInfo } from "../controllers/ai.controller.js";

const router = express.Router();

// POST /api/ai/extract
router.post("/extract", extractBodyInfo);

export default router;

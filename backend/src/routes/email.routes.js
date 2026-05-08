import express from "express";
import { sendContactEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/", sendContactEmail);

export default router;

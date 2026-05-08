// -------------------- USER UPLOAD ROUTES (PLACEHOLDER) -------------------- //
// This file is currently unused - file upload functionality commented out
// Future implementation:
// import { Router } from "express";
// import { authenticate } from "../middlewares/auth.middleware.js";
// import multer from "multer";
// import { uploadUserPhoto } from "../controllers/userUpload.controller.js";

// const router = Router();

// -------------------- MULTER SETUP -------------------- //
// Store files in memory for now (can later switch to cloud storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// -------------------- UPLOAD USER PHOTO -------------------- //
// router.post("/", authenticate, upload.single("photo"), uploadUserPhoto);

// export default router;

import express from "express";
import verifyToken from "../middleware/VerifyToken.js";

import { addBook } from "../controllers/BookController.js";

const router = express.Router();

router.post("/add", verifyToken, addBook);

export default router;

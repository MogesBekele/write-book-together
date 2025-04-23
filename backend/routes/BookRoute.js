import express from "express";
import verifyToken from "../middleware/VerifyToken.js";

import { addBook, contributeToBook } from "../controllers/BookController.js";

const router = express.Router();

router.post("/add", verifyToken, addBook);
router.post('/contribute/:bookId', verifyToken, contributeToBook);


export default router;

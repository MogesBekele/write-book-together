import express from "express";
import verifyToken from "../middleware/VerifyToken.js";

import { addBook, contributeToBook, getAllBooks } from "../controllers/BookController.js";

const router = express.Router();

router.post("/add", verifyToken, addBook);
router.post('/contribute/:bookId', verifyToken, contributeToBook);
router.get('/', getAllBooks);



export default router;


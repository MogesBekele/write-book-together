import express from "express";
import verifyToken from "../middleware/VerifyToken.js";
import { addBook, getAllBooks, getBookById } from "../controllers/BookController.js";

const router = express.Router();

// Book Routes
router.post("/add", verifyToken, addBook); // Add a new book

router.get("/", getAllBooks); // Get all books
router.get("/:bookId", verifyToken, getBookById); // Get a book by ID

export default router;


import express from "express";
import VerifyToken from "../middleware/VerifyToken.js"; // Ensure the file name matches exactly
import {
  addBook,
  getAllBooks,
  getBookById,
} from "../controllers/BookController.js";

const router = express.Router();

// Book Routes
router.post("/add", VerifyToken, addBook); // Add a new book
router.get("/", VerifyToken, getAllBooks); // Get all books
router.get("/:bookId", VerifyToken, getBookById); // Get a book by ID

export default router;

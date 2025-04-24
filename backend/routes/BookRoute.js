import express from "express";
import verifyToken from "../middleware/VerifyToken.js";
import {
  addBook,
  contributeToBook,
  getAllBooks,
  getBookById,
} from "../controllers/BookController.js";

const router = express.Router();

// Book Routes
router.post("/add", verifyToken, addBook); // Add a new book
router.post("/contribute/:bookId", verifyToken, contributeToBook); // Contribute to a book
router.get("/", getAllBooks); // Get all books
router.get("/:bookId", getBookById); // Get a specific book by ID

export default router;

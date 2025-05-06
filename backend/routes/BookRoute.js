import express from "express";
import VerifyToken from "../middleware/VerifyToken.js"; // Ensure the file name matches exactly
import {
  addBook,
  getAllBooks,
  getBookById,
  addContribution,
  getContributions,
  editContribution,
  deleteContribution,
} from "../controllers/BookController.js";

const router = express.Router();

// Book Routes
router.post("/add", VerifyToken, addBook); // Add a new book
router.get("/", VerifyToken, getAllBooks); // Get all books
router.get("/:bookId", VerifyToken, getBookById); // Get a book by ID
// Contribution Routes
router.post("/:bookId/contributions", VerifyToken, addContribution); // Add a contribution to a book
router.get("/:bookId/contributions", VerifyToken, getContributions); // Get contributions for a book

router.put(
  "/:bookId/contributions/:contributionId",
  VerifyToken,
  editContribution
);
router.delete(
  "/:bookId/contributions/:contributionId",
  VerifyToken,
  deleteContribution
);

export default router;

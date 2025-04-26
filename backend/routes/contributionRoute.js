import VerifyToken from "../middleware/VerifyToken.js";
import express from "express";
import {
  addContribution,
  getContributionsByBook,
} from "../controllers/ContributionController.js";

const router = express.Router(); // Properly declare the router

// Add a contribution to a book
router.post("/:bookId/contribute", VerifyToken, addContribution);

// Get all contributions for a specific book
router.get("/:bookId/contributions", getContributionsByBook);

export default router;

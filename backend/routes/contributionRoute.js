import verifyToken from "../middleware/verifyToken.js";
import express from "express";
import {
  addContribution,
  getContributionsByBook,
} from "../controllers/contributionController.js";

const router = express.Router(); // Properly declare the router

// Add a contribution to a book
router.post("/:bookId/contribute", verifyToken, addContribution);

// Get all contributions for a specific book
router.get("/:bookId/contributions", getContributionsByBook);

export default router;

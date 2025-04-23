import express from "express";
import verifyToken from "../middleware/VerifyToken.js";
import {
  contributeToBook,
  getBookContent,
  deleteContribution,
  editContribution,
} from "../controller/BookController.js";

const router = express.Router();

router.post("/contribute", verifyToken, contributeToBook);
router.get("/", getBookContent);
router.delete("/contribution/:id", verifyToken, deleteContribution);
router.put("/contribution/:id", verifyToken, editContribution);

export default router;

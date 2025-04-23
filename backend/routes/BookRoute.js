import express from "express";
import verifyToken from "../middleware/VerifyToken.js";
import {
  contributeToBook,
  getBookContent,
} from "../controllers/BookController.js";

const router = express.Router();

router.post("/contribute", verifyToken, contributeToBook);
router.get("/", getBookContent);

export default router;

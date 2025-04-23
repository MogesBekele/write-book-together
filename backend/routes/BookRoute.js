import express from "express";
import verifyToken from "../middleware/VerifyToken.js";
import {
  contributeToBook,
  getBookContent,
} from "../controller/BookController.js";

const router = express.Router();

router.post("/contribute", verifyToken, contributeToBook);
router.get("/", getBookContent);

export default router;

import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  contributeToBook,
  getBookContent,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/contribute", verifyToken, contributeToBook);
router.get("/", getBookContent);

export default router;

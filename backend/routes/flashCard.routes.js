import express from "express";
import { createFlashcard, getFlashcards, getDueFlashcards, updateFlashcard, deleteFlashcard } from "../controllers/flashcard.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", protectRoute, createFlashcard);
router.get("/",protectRoute, getFlashcards);
router.get("/due",protectRoute, getDueFlashcards); 
router.put("/:id",protectRoute, updateFlashcard);
router.delete("/:id",protectRoute, deleteFlashcard);

export default router;

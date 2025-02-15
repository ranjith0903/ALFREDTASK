import Flashcard from "../models/flashCard.model.js";


export const createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const userId = req.user.id;

    const flashcard = new Flashcard({ userId, question, answer });
    const savedFlashcard = await flashcard.save();

    res.status(201).json({ id: savedFlashcard._id, message: "Flashcard created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating flashcard" });
  }
};


export const getFlashcards = async (req, res) => {
  try {
    const userId = req.user.id;
    const flashcards = await Flashcard.find({ userId });

    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flashcards" });
  }
};


export const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { correct } = req.body;
    const userId = req.user.id;

    let flashcard = await Flashcard.findOne({ _id: id, userId });
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });

    flashcard.box = correct==="true"? Math.min(flashcard.box + 1, 5) : 1;

    const intervals = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 };
    flashcard.nextReview = new Date(Date.now() + intervals[flashcard.box] * 24 * 60 * 60 * 1000);

    await flashcard.save();
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ error: "Error updating flashcard" });
  }
};


export const getDueFlashcards = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const flashcards = await Flashcard.find({ userId, nextReview: { $lte: now } }).sort("nextReview");

    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching due flashcards" });
  }
};



export const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const flashcard = await Flashcard.findOneAndDelete({ _id: id, userId });
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });

    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting flashcard" });
  }
};


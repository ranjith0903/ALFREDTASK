import Flashcard from "../models/flashCard.model.js";

// Controller to create a new flashcard
export const createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const userId = req.user.id;

    // Create a new flashcard document
    const flashcard = new Flashcard({ userId, question, answer });
    const savedFlashcard = await flashcard.save();

    // Respond with success message
    res.status(201).json({ id: savedFlashcard._id, message: "Flashcard created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating flashcard" });
  }
};

// Controller to retrieve all flashcards for a user
export const getFlashcards = async (req, res) => {
  try {
    const userId = req.user.id;
    const flashcards = await Flashcard.find({ userId });

    // Respond with user's flashcards
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flashcards" });
  }
};

// Controller to update a flashcard's review status
export const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { correct } = req.body;
    const userId = req.user.id;

    // Find the flashcard by ID and user
    let flashcard = await Flashcard.findOne({ _id: id, userId });
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });

    // Update the review box and next review date
    flashcard.box = correct === "true" ? Math.min(flashcard.box + 1, 5) : 1;
    const intervals = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 };
    flashcard.nextReview = new Date(Date.now() + intervals[flashcard.box] * 24 * 60 * 60 * 1000);

    await flashcard.save();
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ error: "Error updating flashcard" });
  }
};

// Controller to fetch flashcards due for review
export const getDueFlashcards = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // Find flashcards with a next review date less than or equal to now
    const flashcards = await Flashcard.find({ userId, nextReview: { $lte: now } }).sort("nextReview");

    // Respond with due flashcards
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching due flashcards" });
  }
};

// Controller to delete a flashcard
export const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find and delete the flashcard by ID and user
    const flashcard = await Flashcard.findOneAndDelete({ _id: id, userId });
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });

    // Respond with success message
    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting flashcard" });
  }
};


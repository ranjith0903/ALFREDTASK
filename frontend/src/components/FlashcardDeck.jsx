import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaCheck, FaEye } from "react-icons/fa";
import useFlashcardsStore from "../store/useFlashCardsStore";
import "./FlashcardDeck.css";
import { Link } from "react-router-dom";

const FlashcardDeck = () => {
  const { flashcards, fetchFlashcards, updateFlashcard, isLoading, currentIndex } = useFlashcardsStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  useEffect(() => {
    setShowAnswer(false);
  }, [flashcards]);

  const handleResponse = (correct, direction) => {
    if (!flashcards[currentIndex]) return;

    setSwipeDirection(direction);

    setTimeout(() => {
      updateFlashcard(flashcards[currentIndex]._id, correct);
      setSwipeDirection(null);
    }, 300);
  };

  if (isLoading) {
    return <p className="text-lg text-center text-gray-500 mt-10">Loading flashcards...</p>;
  }

  // ✅ Show message when there are no due flashcards
  if (flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 text-center">
          No cards to review. Create one!
        </p>
        <Link to="/create">
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            Create a flashcard
          </button>
        </Link>
      </div>
    );
  }

  const flashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <motion.div
        key={flashcard._id}
        className="flashcard-card"
        animate={swipeDirection ? { x: swipeDirection === "left" ? -300 : 300, rotate: swipeDirection === "left" ? -15 : 15, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flashcard-card-header text-lg font-bold text-gray-900 dark:text-white">
          Flashcard
        </div>
        <div className="flashcard-card-body text-xl text-gray-700 dark:text-gray-300">
          {showAnswer ? `Answer: ${flashcard.answer}` : flashcard.question}
        </div>
      </motion.div>

      <div className="flex gap-12 mt-8">
        <button onClick={() => handleResponse(false, "left")} className="flashcard-btn bg-red-500 hover:bg-red-600">
          <FaTimes size={30} />
        </button>
        <button onClick={() => setShowAnswer(!showAnswer)} className="flashcard-btn bg-gray-500 hover:bg-gray-600">
          <FaEye size={30} />
        </button>
        <button onClick={() => handleResponse(true, "right")} className="flashcard-btn bg-green-500 hover:bg-green-600">
          <FaCheck size={30} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;

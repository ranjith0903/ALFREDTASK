import { useEffect } from "react";
import useFlashcardsStore from "../store/useFlashCardsStore";
import { FaTrash } from "react-icons/fa";

const Manage = () => {
  const { flashcards, fetchAllFlashcards, deleteFlashcard } = useFlashcardsStore();

  useEffect(() => {
    fetchAllFlashcards();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Flashcards</h2>

      {flashcards.length === 0 ? (
        <p className="text-gray-500">No flashcards available.</p>
      ) : (
        <ul className="space-y-4">
          {flashcards.map((flashcard) => (
            <li key={flashcard._id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{flashcard.question}</p>
                <p className="text-gray-600 dark:text-gray-400">{flashcard.answer}</p>
              </div>
              <button
                onClick={() => deleteFlashcard(flashcard._id)}
                className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Manage;


import { useState } from "react";
import useFlashcardsStore from "../store/useFlashCardsStore";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateFlashcard = () => {
  const { createFlashcard } = useFlashcardsStore();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    await createFlashcard({ question, answer });
    setQuestion("");
    setAnswer("");
    navigate("/manage");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Create Flashcard
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Question
            </label>
            <input 
              type="text" 
              placeholder="Enter question" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Answer
            </label>
            <input 
              type="text" 
              placeholder="Enter answer" 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add Flashcard
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFlashcard;


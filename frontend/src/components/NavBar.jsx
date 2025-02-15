import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useFlashcardsStore from "../store/useFlashCardsStore";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { fetchAllFlashcards } = useFlashcardsStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/manage") {
      fetchAllFlashcards();
    }
  }, [location.pathname, fetchAllFlashcards]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">LeitnerLearn</h1>

      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:underline">Home</Link>
        <Link to="/manage" className="hover:underline">Manage</Link>
        <Link to="/create" className="hover:underline">Create</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="font-medium">{user.name}</span>
            <button 
              onClick={logout} 
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition">
            Login
          </Link>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;


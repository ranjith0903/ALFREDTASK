import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useFlashcardsStore from "../store/useFlashCardsStore";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { fetchAllFlashcards, isLoading } = useFlashcardsStore();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/manage") {
      setLoading(true);
      fetchAllFlashcards().finally(() => setLoading(false));
    }
  }, [location.pathname, fetchAllFlashcards]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">LeitnerLearn</h1>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/manage" className="hover:underline">Manage</Link>
        <Link to="/create" className="hover:underline">Create</Link>
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
      
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 dark:bg-gray-900 p-4 flex flex-col items-center space-y-4 md:hidden">
          <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/manage" className="hover:underline" onClick={() => setIsOpen(false)}>Manage</Link>
          <Link to="/create" className="hover:underline" onClick={() => setIsOpen(false)}>Create</Link>
          {user ? (
            <div className="flex flex-col items-center space-y-2">
              <span className="font-medium">{user.name}</span>
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
          <DarkModeToggle />
        </div>
      )}
      
      {loading && <div className="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>}
    </nav>
  );
};

export default Navbar;


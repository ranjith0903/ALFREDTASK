import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setLoading(false);
  }, [darkMode]);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition md:p-3 md:flex md:items-center md:justify-center"
    >
      {loading ? <div className="animate-spin h-5 w-5 border-b-2 border-gray-900 dark:border-gray-300 mx-auto"></div> : darkMode ? <MdLightMode size={24} className="text-yellow-400" /> : <MdDarkMode size={24} className="text-gray-900" />}
    </button>
  );
};

export default DarkModeToggle;


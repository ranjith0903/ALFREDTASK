import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition"
    >
      {darkMode ? <MdLightMode size={24} className="text-yellow-400" /> : <MdDarkMode size={24} className="text-gray-900" />}
    </button>
  );
};

export default DarkModeToggle;


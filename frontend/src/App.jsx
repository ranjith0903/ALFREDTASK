import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/SignUpPage";
import Manage from "./pages/Manage";
import Login from "./pages/LoginPage";
import FlashcardDeck from "./components/FlashcardDeck";
import Navbar from "./components/NavBar";
import CreateFlashcard from "./pages/CreateFlashCard";
import NoLogin from "./pages/NoLogin";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";


function App() {
  const { user, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <Router>
      <div className="relative min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Navbar /> 
        <Routes>
         
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        ></Route>
          <Route
            path="/manage"
            element={user ? <Manage /> : <Navigate to="/nologin" />}
          />
          <Route
            path="/create"
            element={user ? <CreateFlashcard /> : <Navigate to="/nologin" />}
          />
          <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
          <Route path="/" element={user ? <FlashcardDeck /> : <Navigate to="/login" />} />
          <Route path="/nologin" element={<NoLogin />} />
        </Routes>
      <Toaster/>
      </div>
    </Router>
  );
}

export default App;


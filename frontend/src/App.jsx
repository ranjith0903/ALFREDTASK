import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUpPage";
import Manage from "./pages/Manage";
import Login from "./pages/LoginPage";
import FlashcardDeck from "./components/FlashcardDeck";
import Navbar from "./components/NavBar";
import CreateFlashcard from "./pages/CreateFlashCard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="relative">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/create" element={<CreateFlashcard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<FlashcardDeck />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;


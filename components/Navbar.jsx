import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Authentication from "./Authentication";
import FeedbackForm from "./FeedbackForm";

export default function Navbar({ userType, setUserType }) {
  const [showAuth, setShowAuth] = useState(false); 
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleFeedbackClick = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be signed in to give feedback.");
    return;
  }
  setShowFeedback(true);
  };


  useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userType");
      if (token && role) {
        setUserType(role);
      }
    }, []);

  return (
    <>
      <header className="flex bg-black justify-between items-center px-4 py-2 shadow-md">
        <h1 className="text-4xl font-bold text-white flex items-center">
          <Rocket className="w-8 h-8" /> Velox
        </h1>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-md text-white font-semibold hover:underline">
            Home
          </Link>
          <>
            <button onClick={handleFeedbackClick} className="text-white hover:underline font-semibold bg-black px-4 py-2 rounded-md">
              Give Feedback
            </button>
              {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
          </>
        </nav>
      </header>

      {showAuth && (
        <Authentication onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}

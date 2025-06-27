import { Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Authentication from "./Authentication";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = !!
  localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Authentication");
  };

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
          <Link to="/feedbackpage" className="text-md text-white font-semibold hover:underline">
            Feedback 
          </Link>
          {isAuthenticated? (
            <button onClick={handleLogout} className="text-sm text-white font-semibold hover:underline">
              Sign Out
            </button>
              ):(
            <button onClick={() => setShowAuth(true)} className="text-sm text-white font-semibold hover:underline">
            Sign In
            </button>
          )}
        </nav>
      </header>

      {showAuth && (
        <Authentication onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}

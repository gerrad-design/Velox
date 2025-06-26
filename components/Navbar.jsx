import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Authentication from "./Authentication";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);

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
          <Link to="/feedback" className="text-md text-white font-semibold hover:underline">
            Feedback 
          </Link>
          <button
            onClick={() => setShowAuth(true)}
            className="text-sm text-white font-semibold hover:underline"
          >
            Sign In
          </button>
        </nav>
      </header>

      {showAuth && (
        <Authentication onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}

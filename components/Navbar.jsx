import { Rocket } from "lucide-react";
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-4xl font-bold text-indigo-600 flex items-center gap-2">
        <Rocket className="w-13 h-13" /> Velox
      </h1>
      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className="text-2xl text-indigo-600 font-semibold hover:underline"
        >
          Home
        </Link>
      <Link
      to="/feedback"
      className=" text-2xl text-indigo-600 font-semibold hover:underline"
      >
        Feedback 
      </Link>

      <a href="#" className="text-2xl text-indigo-600 font-semibold hover:underline">
        Sign In
      </a>
      </nav>
    </header>
  );
}


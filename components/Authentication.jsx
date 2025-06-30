import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Authentication({ onClose, onLogin }) {
  const [userType, setUserType] = useState("rider");
  const [authMode, setAuthMode] = useState("signin");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

   const login = (user, token, userType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = authMode === "signin" ? "/login" : "/signup";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userType }),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        login(data.user, data.access_token, data.userType);
        localStorage.setItem("userType", data.userType);
        alert("Sign in successful");

        if (onLogin) onLogin(data.userType); 

        if (data.userType === "rider") {
          navigate("/");
        } else if (data.userType === "driver") {
          navigate("/DashBoardPage");
        } else {
          navigate("/");
        }

      } else {
        alert(data.msg || "Authentication failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="shadow-xl fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[400px] rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl text-black font-semibold">Join Velox</h2>
            <p className="text-sm text-gray-500">Sign in or create an account to get started</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-xl">×</button>
        </div>

        <div className="flex gap-2 my-4">
          <button className={`flex-1 py-2 rounded-md ${userType === "rider" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`} onClick={() => setUserType("rider")}>
            Rider
          </button>
          <button className={`flex-1 py-2 rounded-md ${userType === "driver" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`} onClick={() => setUserType("driver")}>
            Driver
          </button>
        </div>

        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-md">
          <button className={`flex-1 py-2 rounded ${ authMode === "signin" ? "bg-white text-black font-semibold" : "text-gray-500"}`}
            onClick={() => setAuthMode("signin")}>
            Sign In
          </button>
          <button className={`flex-1 py-2 rounded ${  authMode === "signup" ? "bg-white text-black font-semibold" : "text-gray-500"}`}
            onClick={() => setAuthMode("signup")}>
            Sign Up
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="text-gray-500 w-full px-4 py-2 border rounded-md"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
          <input type="password" placeholder="Password" className="text-gray-500 w-full px-4 py-2 border rounded-md"
            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
            {authMode === "signin"
              ? `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
              : `Sign Up as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Authentication;

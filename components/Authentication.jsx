import React from 'react';
import { useState } from "react";

function Authentication({ onClose }) {
  const [userType, setUserType] = useState("rider");
  const [authMode, setAuthMode] = useState("signin");

  const [formData, setFormData] = useState({
    fullName: "", 
    email: "", 
    password: "", 
    phone: "", 
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = authMode === "signin" ? "/login" : "/signup";

  const res = await fetch(`http://localhost:5000${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (res.ok && data.access_token) {
    localStorage.setItem("token", data.access_token);
    alert("Signed in successfully!");
  } else {
    alert(data.msg || "Authentication failed");
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center shadow-xl bg-gray-200 bg-opacity-50 z-50">
      <div className="bg-white w-[400px] rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl text-black text-left font-semibold">Join Velox</h2>
            <p className="text-sm text-gray-500">Sign in or create an account to get started</p>
          </div>
          <button onClick={ onClose } className="text-gray-400 hover:border-black hover:text-black text-xl">×</button>
        </div>

        {/* Rider / Driver Toggle */}
        <div className="flex gap-2 my-4">
          <button className={`flex-1 py-2 rounded-md ${userType === "rider" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`} onClick={() => setUserType("rider")}>
            Rider
          </button>
          <button className={`flex-1 py-2 rounded-md ${userType === "driver" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`} onClick={() => setUserType("driver")}>
             Driver
          </button>
        </div>

        {/* Sign In / Sign Up Toggle */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-md">
          <button className={`flex-1 py-2 rounded ${authMode === "signin" ? "bg-white text-black font-semibold" : "text-gray-500"}`} onClick={() => setAuthMode("signin")}>
            Sign In
          </button>
          <button className={`flex-1 py-2 rounded ${authMode === "signup" ? "bg-white text-black font-semibold" : "text-gray-500"}`} onClick={() => setAuthMode("signup")}>
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="text-gray-500 w-full px-4 py-2 border rounded-md"
            value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <input type="email" placeholder="Email" className="text-gray-500 w-full px-4 py-2 border rounded-md"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {authMode === "signup" && (
            <input type="tel" placeholder="Phone Number" className="text-gray-500 w-full px-4 py-2 border rounded-md"
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          )}
          <input type="password" placeholder="Password" className="text-gray-500 w-full px-4 py-2 border rounded-md"
            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
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


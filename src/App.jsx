import { Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import FeedbackPage from '../pages/FeedbackPage';

function App() {
  const [userType, setUserType] = useState(null);
  return (
    <>
      <Navbar  userType={userType} setUserType={setUserType} />
      <Routes>
        <Route path="/" element={<HomePage userType={userType} setUserType={setUserType} />} />
        <Route path="/feedbackpage" element={<FeedbackPage />} />
      </Routes>
    </>
  );
}

export default App;

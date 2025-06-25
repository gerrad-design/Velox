import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import FeedbackPage from '../pages/FeedbackPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </>
  );
}

export default App;

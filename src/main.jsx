import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HomePage from '../pages/HomePage.jsx';
import RidersPage from '../pages/RidersPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App/>} />
        <Route path="/RidersPage" element={<RidersPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

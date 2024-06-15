// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const App = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isAuthenticated = !!token;

  console.log('Token:', token);
  console.log('Username:', username);
  console.log('Is authenticated:', isAuthenticated);

  return (
    <Router>
      <div className="header">
        <h1>Stonk-o-Matic!</h1>
        {isAuthenticated && (
          <button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
          }}>
            Logout
          </button>
        )}
      </div>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to={`/portfolio/${username}`} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio/:username" element={isAuthenticated ? <Portfolio /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;








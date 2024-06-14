import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to={`/portfolio/${localStorage.getItem('username')}`} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio/:username" element={isAuthenticated ? <Portfolio /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;







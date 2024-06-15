// frontend/src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import API from '../services/api';
import { getLocation, getWeather, weatherCodeToDescription } from '../services/WeatherService';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
// add weather functionality
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const locationData = await getLocation();
        const weatherData = await getWeather(locationData.latitude, locationData.longitude);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchWeather();
  }, []);

  // on submit of login info set token and username in local storage and navigate forward. Currently requires refresh and resubmission. Must troubleshoot.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/login/', { username, password });
      localStorage.setItem('token', response.data.token); // Store token
      localStorage.setItem('username', username); // Store username
      navigate(`/portfolio/${username}`);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      {weather && (
        <div className="weather-container">
          <h2>Current Weather</h2>
          <p>{weather.temperature}°C</p>
          <p>{weatherCodeToDescription(weather.weathercode)}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
















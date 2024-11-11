// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import MoviesPage from './components/MoviesPage';
import WebSeriesPage from './components/WebSeriesPage';
import MovieDetail from './components/MovieDetail';
import NetflixPage from './components/NetflixPage';
import AnimePage from './components/AnimePage';
import MXPlayerPage from './components/MXPlayerPage';
import DisneyPage from './components/DisneyPage';
import AmazonPrimePage from './components/AmazonPrimePage';
import KDramaPage from './components/KDramaPage';
import AdultPage from './components/AdultPage';
import Privacy from './components/Privacy';
import HollywoodPage from './components/HollywoodPage';
import BollywoodPage from './components/BollywoodPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists in local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/webseries" element={<WebSeriesPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/netflix" element={<NetflixPage />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/mxplayer" element={<MXPlayerPage />} />
        <Route path="/disney" element={<DisneyPage />} />
        <Route path="/amazonprime" element={<AmazonPrimePage />} />
        <Route path="/kdrama" element={<KDramaPage />} />
        <Route path="/adult" element={<AdultPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/Hollywood" element={<HollywoodPage />} />
        <Route path="/Bollywood" element={<BollywoodPage />} />

        <Route path="/webseries/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

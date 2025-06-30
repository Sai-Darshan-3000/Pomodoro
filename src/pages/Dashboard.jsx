// src/pages/Dashboard.jsx
import React from 'react';
import '../styles/dashboard.css';
import Timer from '../components/Pomodoro';
import QuoteBox from '../components/QuotesBox';
//import MusicPlayer from '../components/MusicPlayer';
// import BackgroundSelector from '../components/ThemeSelector';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar glass-nav">
        <h2 className="app-title">Pomodoro App</h2>
        <div className="nav-controls">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="glass-box">
          <Timer />
          <QuoteBox />
        </div>
      </main>
    </div>
  );
}

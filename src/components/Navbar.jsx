// src/components/Navbar.jsx
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import BackgroundSelector from './ThemeSelector';
import '../styles/dashboard.css'; 
import MusicPlayer from './MusicPlayer';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav>
      <h3>Pomodoro App</h3>
      <button ><MusicPlayer /></button>
      <button ><BackgroundSelector /></button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;

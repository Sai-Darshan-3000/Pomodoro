// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a loader/spinner
  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;

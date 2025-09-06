import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import CitizenDashboard from './pages/CitizenDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WasteScanner from './pages/WasteScanner';
import TrainingModule from './pages/TrainingModule';
import CommunityPage from './pages/CommunityPage';
import MapTracking from './pages/MapTracking';
import FacilityLocator from './pages/FacilityLocator';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check token whenever App loads
  useEffect(() => {
    const token = localStorage.getItem('swachh_token');
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Listen for token changes (login/logout) using storage event
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('swachh_token');
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {isAuthenticated && <Header />}
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={isAuthenticated ? <CitizenDashboard /> : <Navigate to="/login" />} />
              <Route path="/worker-dashboard" element={isAuthenticated ? <WorkerDashboard /> : <Navigate to="/login" />} />
              <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
              <Route path="/scanner" element={isAuthenticated ? <WasteScanner /> : <Navigate to="/login" />} />
              <Route path="/training" element={isAuthenticated ? <TrainingModule /> : <Navigate to="/login" />} />
              <Route path="/community" element={isAuthenticated ? <CommunityPage /> : <Navigate to="/login" />} />
              <Route path="/tracking" element={isAuthenticated ? <MapTracking /> : <Navigate to="/login" />} />
              <Route path="/facilities" element={isAuthenticated ? <FacilityLocator /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;

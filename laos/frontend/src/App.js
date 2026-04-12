import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCreateDestination from './pages/AdminCreateDestination';
import AdminEditDestination from './pages/AdminEditDestination';
import AdminCreateCategory from './pages/AdminCreateCategory';
import AdminCategories from './pages/AdminCategories';
import AdminDestinations from './pages/AdminDestinations';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/destinations" element={<ProtectedRoute requiredRole="ADMIN"><AdminDestinations /></ProtectedRoute>} />
          <Route path="/admin/destinations/create" element={<ProtectedRoute requiredRole="ADMIN"><AdminCreateDestination /></ProtectedRoute>} />
          <Route path="/admin/destinations/edit/:id" element={<ProtectedRoute requiredRole="ADMIN"><AdminEditDestination /></ProtectedRoute>} />
          <Route path="/admin/categories/create" element={<ProtectedRoute requiredRole="ADMIN"><AdminCreateCategory /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute requiredRole="ADMIN"><AdminCategories /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

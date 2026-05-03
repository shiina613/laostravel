import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCreateDestination from './pages/AdminCreateDestination';
import AdminEditDestination from './pages/AdminEditDestination';
import AdminCreateCategory from './pages/AdminCreateCategory';
import AdminCategories from './pages/AdminCategories';
import AdminDestinations from './pages/AdminDestinations';
import AdminFestivals from './pages/AdminFestivals';
import AdminCreateFestival from './pages/AdminCreateFestival';
import AdminEditFestival from './pages/AdminEditFestival';
import AdminArticles from './pages/AdminArticles';
import AdminCreateArticle from './pages/AdminCreateArticle';
import AdminEditArticle from './pages/AdminEditArticle';
import AdminUsers from './pages/AdminUsers';
import AdminReviews from './pages/AdminReviews';
import FestivalsPage from './pages/FestivalsPage';

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
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/festivals/:slug" element={<FestivalDetailPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/destinations" element={<ProtectedRoute requiredRole="ADMIN"><AdminDestinations /></ProtectedRoute>} />
          <Route path="/admin/destinations/create" element={<ProtectedRoute requiredRole="ADMIN"><AdminCreateDestination /></ProtectedRoute>} />
          <Route path="/admin/destinations/edit/:id" element={<ProtectedRoute requiredRole="ADMIN"><AdminEditDestination /></ProtectedRoute>} />
          <Route path="/admin/categories/create" element={<ProtectedRoute requiredRole="ADMIN"><AdminCreateCategory /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute requiredRole="ADMIN"><AdminCategories /></ProtectedRoute>} />
          <Route path="/admin/festivals" element={<ProtectedRoute requiredRole="ADMIN"><AdminFestivals /></ProtectedRoute>} />
          <Route path="/admin/festivals/create" element={<ProtectedRoute requiredRole="ADMIN"><AdminCreateFestival /></ProtectedRoute>} />
          <Route path="/admin/festivals/edit/:id" element={<ProtectedRoute requiredRole="ADMIN"><AdminEditFestival /></ProtectedRoute>} />
          <Route path="/admin/articles" element={<ProtectedRoute requiredRole="ADMIN"><AdminArticles /></ProtectedRoute>} />
          <Route path="/admin/articles/create" element={<ProtectedRoute requiredRole="ADMIN"><AdminCreateArticle /></ProtectedRoute>} />
          <Route path="/admin/articles/edit/:id" element={<ProtectedRoute requiredRole="ADMIN"><AdminEditArticle /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="ADMIN"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute requiredRole="ADMIN"><AdminReviews /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

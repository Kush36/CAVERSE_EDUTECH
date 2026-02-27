import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// Layouts
import DashboardLayout from '../components/layouts/DashboardLayout';

// Auth Pages
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

// Admin Pages
import AdminDashboard from '../components/admin/AdminDashboard';
import StudentManagement from '../components/admin/StudentManagement';

// Student Pages
import StudentDashboard from '../components/dashboard/StudentDashboard';

// Preloader
import Preloader from '../common/Preloader';

/**
 * Protected Route Component
 * Handles authentication and authorization checks
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * Route wrapper for admin routes
 */
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
);

/**
 * Route wrapper for student routes
 */
const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="student">{children}</ProtectedRoute>
);

/**
 * Root route handler with auth-aware redirects
 */
const RootRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

/**
 * Not Found Page
 */
const NotFound: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href={isAuthenticated ? '/dashboard' : '/login'}>
        Go back home
      </a>
    </div>
  );
};

/**
 * Main App Routes Component
 */
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES - No protection needed */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED ROUTES - Requires authentication */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <AdminRoute>
                  <StudentManagement />
                </AdminRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/dashboard"
              element={
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              }
            />

            {/* Root redirect for authenticated users */}
            <Route path="/" element={<RootRoute />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;

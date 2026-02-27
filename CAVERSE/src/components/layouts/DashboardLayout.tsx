import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './DashboardLayout.module.scss';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = user?.role === 'admin';

  const navLinks = isAdmin
    ? [
        { path: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
        { path: '/admin/students', label: 'Students', icon: 'fa-users' },
        { path: '/admin/test-papers', label: 'Test Papers', icon: 'fa-file-alt' },
        { path: '/admin/results', label: 'Results', icon: 'fa-chart-bar' },
        { path: '/admin/activity-logs', label: 'Activity Logs', icon: 'fa-history' },
      ]
    : [
        { path: '/dashboard', label: 'Dashboard', icon: 'fa-home' },
        { path: '/my-tests', label: 'My Tests', icon: 'fa-file-alt' },
        { path: '/results', label: 'Results', icon: 'fa-chart-bar' },
        { path: '/profile', label: 'Profile', icon: 'fa-user-circle' },
      ];

  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.logo}>
            <i className="fas fa-graduation-cap"></i>
            <span>Eduspace</span>
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={styles.navLink}
            >
              <i className={`fas ${link.icon}`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className={styles.userMenu}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </div>
              <div>
                <p className={styles.userName}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className={styles.userRole}>{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

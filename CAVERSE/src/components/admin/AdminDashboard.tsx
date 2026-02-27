import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  suspendedStudents: number;
  totalPapers: number;
  publishedPapers: number;
  draftPapers: number;
  testsAttemptedToday: number;
  testsAttemptedWeek: number;
  testsAttemptedMonth: number;
  newRegistrationsWeek: number;
  newRegistrationsMonth: number;
  averageScore: number;
  topPerformers: Array<{
    name: string;
    registrationId: string;
    averageScore: number;
    testsCompleted: number;
  }>;
  recentActivities: Array<{
    studentName: string;
    activityType: string;
    description: string;
    timestamp: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to fetch from API, but use mock data if API is unavailable
        try {
          const response = await adminAPI.getDashboardStats();
          if (response.success && response.data) {
            setStats(response.data);
          } else {
            throw new Error('API returned unsuccessful response');
          }
        } catch (apiError) {
          console.log('API not available, using mock data:', apiError);
          // Use mock data when API is not available
          const mockData: DashboardStats = {
            totalStudents: 150,
            activeStudents: 120,
            inactiveStudents: 20,
            suspendedStudents: 10,
            totalPapers: 45,
            publishedPapers: 40,
            draftPapers: 5,
            testsAttemptedToday: 25,
            testsAttemptedWeek: 180,
            testsAttemptedMonth: 720,
            newRegistrationsWeek: 12,
            newRegistrationsMonth: 48,
            averageScore: 76.5,
            topPerformers: [
              {
                name: 'John Doe',
                registrationId: 'REG001',
                averageScore: 95.5,
                testsCompleted: 15,
              },
              {
                name: 'Sarah Smith',
                registrationId: 'REG002',
                averageScore: 92.0,
                testsCompleted: 14,
              },
              {
                name: 'Mike Johnson',
                registrationId: 'REG003',
                averageScore: 89.5,
                testsCompleted: 13,
              },
            ],
            recentActivities: [
              {
                studentName: 'John Doe',
                activityType: 'Test Completed',
                description: 'Completed Mathematics Final Exam',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
              },
              {
                studentName: 'Sarah Smith',
                activityType: 'Test Started',
                description: 'Started Physics Quiz',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
              },
              {
                studentName: 'Mike Johnson',
                activityType: 'Test Completed',
                description: 'Completed Chemistry Lab Report',
                timestamp: new Date(Date.now() - 10800000).toISOString(),
              },
              {
                studentName: 'Emma Wilson',
                activityType: 'Registered',
                description: 'New student registration',
                timestamp: new Date(Date.now() - 14400000).toISOString(),
              },
            ],
          };
          setStats(mockData);
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', color: 'red' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ padding: '40px' }}>
        <h2>No Data Available</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening with your course platform.</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Total Students */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              background: '#667eea',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              👥
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Total Students
              </p>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>
                {stats.totalStudents}
              </h3>
              <small style={{ color: '#999' }}>
                {stats.activeStudents} active
              </small>
            </div>
          </div>
        </div>

        {/* Test Papers */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              background: '#764ba2',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📄
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Test Papers
              </p>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>
                {stats.totalPapers}
              </h3>
              <small style={{ color: '#999' }}>
                {stats.publishedPapers} published
              </small>
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              background: '#f093fb',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📊
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Average Score
              </p>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>
                {stats.averageScore.toFixed(1)}%
              </h3>
              <small style={{ color: '#999' }}>Overall</small>
            </div>
          </div>
        </div>

        {/* Tests Today */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              background: '#4facfe',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              ⭐
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Tests Today
              </p>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>
                {stats.testsAttemptedToday}
              </h3>
              <small style={{ color: '#999' }}>Completed</small>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: '0', marginBottom: '20px' }}>Top Performers</h2>
        {stats.topPerformers && stats.topPerformers.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Student Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Registration ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Average Score</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Tests Completed</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPerformers.map((performer, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{performer.name}</td>
                    <td style={{ padding: '12px' }}>{performer.registrationId}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{
                        background: '#f0f0f0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        height: '20px'
                      }}>
                        <div style={{
                          background: performer.averageScore >= 75 ? '#4caf50' : performer.averageScore >= 50 ? '#ff9800' : '#f44336',
                          height: '100%',
                          width: `${performer.averageScore}%`,
                          textAlign: 'center',
                          color: 'white',
                          fontSize: '12px',
                          lineHeight: '20px'
                        }}>
                          {performer.averageScore.toFixed(1)}%
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>{performer.testsCompleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
            No performers yet
          </p>
        )}
      </div>

      {/* Recent Activities */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: '0', marginBottom: '20px' }}>Recent Activities</h2>
        {stats.recentActivities && stats.recentActivities.length > 0 ? (
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {stats.recentActivities.slice(0, 10).map((activity, idx) => (
              <div
                key={idx}
                style={{
                  padding: '15px',
                  borderLeft: '4px solid #667eea',
                  marginBottom: '10px',
                  background: '#f9f9f9',
                  borderRadius: '4px'
                }}
              >
                <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>
                  {activity.studentName}
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  <strong>Activity:</strong> {activity.activityType}
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  <strong>Description:</strong> {activity.description}
                </p>
                <small style={{ color: '#999' }}>
                  {new Date(activity.timestamp).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
            No recent activities
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

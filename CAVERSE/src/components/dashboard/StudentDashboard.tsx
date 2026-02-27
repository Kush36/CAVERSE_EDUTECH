import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface StudentStats {
  totalTests: number;
  completedTests: number;
  averageScore: number;
  currentStreak: number;
}

interface TestPaper {
  id: string;
  title: string;
  description: string;
  course: string;
  duration: number;
  totalQuestions: number;
  status: 'active' | 'inactive' | 'completed';
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [testPapers, setTestPapers] = useState<TestPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use mock data since there's no backend
        const mockStats: StudentStats = {
          totalTests: 15,
          completedTests: 12,
          averageScore: 82.5,
          currentStreak: 5,
        };

        const mockPapers: TestPaper[] = [
          {
            id: '1',
            title: 'Introduction to React',
            description: 'Learn the basics of React framework',
            course: 'Web Development',
            duration: 60,
            totalQuestions: 20,
            status: 'active',
          },
          {
            id: '2',
            title: 'JavaScript Advanced Concepts',
            description: 'Master advanced JavaScript topics',
            course: 'Programming',
            duration: 90,
            totalQuestions: 30,
            status: 'active',
          },
          {
            id: '3',
            title: 'CSS Mastery',
            description: 'Complete guide to CSS styling',
            course: 'Web Development',
            duration: 45,
            totalQuestions: 15,
            status: 'completed',
          },
        ];

        setStats(mockStats);
        setTestPapers(mockPapers);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading your dashboard...</h2>
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

  return (
    <div style={{ padding: '20px' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fc', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Keep up the good work on your learning journey</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#667eea',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>{user?.email}</p>
              <p style={{ margin: '0', color: '#666' }}>{user?.course}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '15px'
          }}>
            <div style={{
              background: '#667eea',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📝
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Tests Completed</p>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>
                {stats.completedTests}/{stats.totalTests}
              </h3>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '15px'
          }}>
            <div style={{
              background: '#764ba2',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📊
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Average Score</p>
              <h3 style={{ margin: '0', fontSize: '28px' }}>{stats.averageScore.toFixed(1)}%</h3>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '15px'
          }}>
            <div style={{
              background: '#f093fb',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🔥
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Current Streak</p>
              <h3 style={{ margin: '0', fontSize: '28px' }}>{stats.currentStreak} days</h3>
            </div>
          </div>
        </div>
      )}

      {/* Available Tests */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ marginTop: '0' }}>Available Tests</h2>
          <p style={{ color: '#666' }}>Choose a test to begin</p>
        </div>

        {testPapers.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {testPapers.map((test) => (
              <div key={test.id} style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{test.title}</h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: test.status === 'completed' ? '#4caf50' : test.status === 'active' ? '#667eea' : '#ccc',
                    color: 'white'
                  }}>
                    {test.status}
                  </span>
                </div>

                <p style={{ color: '#666', margin: '0 0 15px 0' }}>{test.description}</p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  paddingTop: '15px',
                  borderTop: '1px solid #eee',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <div>
                    <span style={{ fontWeight: '600' }}>Duration</span><br />{test.duration} mins
                  </div>
                  <div>
                    <span style={{ fontWeight: '600' }}>Questions</span><br />{test.totalQuestions}
                  </div>
                  <div>
                    <span style={{ fontWeight: '600' }}>Course</span><br />{test.course}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px 20px' }}>
            No tests available yet
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

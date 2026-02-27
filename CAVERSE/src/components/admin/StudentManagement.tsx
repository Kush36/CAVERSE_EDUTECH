import React, { useState, useEffect } from 'react';

interface Student {
  id: string;
  registrationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActive?: string;
}

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Mock students data
  const mockStudents: Student[] = [
    {
      id: '1',
      registrationId: 'REG001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      course: 'Web Development',
      status: 'active',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      registrationId: 'REG002',
      firstName: 'Sarah',
      lastName: 'Smith',
      email: 'sarah.smith@example.com',
      phone: '+1234567891',
      course: 'Data Science',
      status: 'active',
      lastActive: '30 minutes ago',
    },
    {
      id: '3',
      registrationId: 'REG003',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1234567892',
      course: 'Mobile Development',
      status: 'inactive',
      lastActive: '3 days ago',
    },
    {
      id: '4',
      registrationId: 'REG004',
      firstName: 'Emma',
      lastName: 'Wilson',
      email: 'emma.wilson@example.com',
      phone: '+1234567893',
      course: 'UI/UX Design',
      status: 'active',
      lastActive: '1 hour ago',
    },
    {
      id: '5',
      registrationId: 'REG005',
      firstName: 'Alex',
      lastName: 'Brown',
      email: 'alex.brown@example.com',
      phone: '+1234567894',
      course: 'Cloud Computing',
      status: 'suspended',
      lastActive: '1 week ago',
    },
  ];

  const fetchStudents = async (page = 1, search = '') => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filtered = mockStudents;
      
      // Filter if search term exists
      if (search) {
        filtered = mockStudents.filter((student) =>
          student.firstName.toLowerCase().includes(search.toLowerCase()) ||
          student.lastName.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()) ||
          student.registrationId.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Pagination
      const itemsPerPage = 10;
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedStudents = filtered.slice(startIndex, endIndex);

      setStudents(paginatedStudents);
      setPagination({
        total: filtered.length,
        pages: totalPages,
        currentPage: page,
        limit: itemsPerPage,
      });
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1, searchTerm);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    await fetchStudents(1, value);
  };

  const handleStatusChange = async (studentId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    try {
      setActionLoading(studentId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId ? { ...student, status: newStatus } : student
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchStudents(currentPage - 1, searchTerm);
    }
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.pages) {
      fetchStudents(currentPage + 1, searchTerm);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0 0 5px 0' }}>Student Management</h1>
        <p style={{ color: '#666', margin: '0' }}>Manage all students in the system</p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd',
          padding: '10px 15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <span style={{ color: '#999', marginRight: '10px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, or registration ID..."
            value={searchTerm}
            onChange={handleSearch}
            disabled={isLoading}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {error && (
        <div style={{
          background: '#fee',
          color: '#c33',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

      {/* Students Table */}
      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          Loading students...
        </div>
      ) : students.length > 0 ? (
        <>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ background: '#f8f9fc', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Registration ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Phone</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Course</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#667eea' }}>{student.registrationId}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: '#667eea',
                          color: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>
                            {student.firstName} {student.lastName}
                          </div>
                          <div style={{ color: '#999', fontSize: '13px' }}>{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: '#666' }}>{student.email}</td>
                    <td style={{ padding: '12px' }}>{student.phone}</td>
                    <td style={{ padding: '12px' }}>{student.course}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={student.status}
                        onChange={(e) =>
                          handleStatusChange(
                            student.id,
                            e.target.value as 'active' | 'inactive' | 'suspended'
                          )
                        }
                        disabled={actionLoading === student.id}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          fontSize: '13px',
                          fontFamily: 'inherit',
                          background: student.status === 'active' ? '#e8f5e9' : student.status === 'inactive' ? '#fff3e0' : '#ffebee',
                          color: student.status === 'active' ? '#2e7d32' : student.status === 'inactive' ? '#f57f17' : '#c62828',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        disabled={actionLoading === student.id}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          background: '#667eea',
                          color: 'white',
                          cursor: actionLoading === student.id ? 'not-allowed' : 'pointer',
                          fontSize: '13px',
                          opacity: actionLoading === student.id ? 0.6 : 1
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '20px'
            }}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  background: currentPage === 1 ? '#f5f5f5' : 'white',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                Previous
              </button>
              <span style={{
                padding: '8px 16px',
                color: '#666'
              }}>
                Page {currentPage} of {pagination.pages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === pagination.pages}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  background: currentPage === pagination.pages ? '#f5f5f5' : 'white',
                  cursor: currentPage === pagination.pages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === pagination.pages ? 0.5 : 1
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#999'
        }}>
          <p style={{ fontSize: '16px' }}>No students found</p>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;

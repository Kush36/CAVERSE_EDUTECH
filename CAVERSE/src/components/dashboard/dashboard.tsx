/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, FileText, Upload, BarChart3,
  Settings, Bell, Search, Menu, X, LogOut, TrendingUp,
  UserPlus, FileQuestion, Activity, Calendar, Download,
  Eye, Edit, Trash2, Plus, Filter, ChevronDown, CheckCircle,
  AlertCircle, XCircle
} from 'lucide-react';
import AdminService, { Student, QuestionPaper, StudentActivity, DashboardStats } from '../admin/AdminService';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  // State management
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    suspendedStudents: 0,
    totalPapers: 0,
    publishedPapers: 0,
    draftPapers: 0,
    testsAttemptedToday: 0,
    testsAttemptedWeek: 0,
    testsAttemptedMonth: 0,
    newRegistrationsWeek: 0,
    newRegistrationsMonth: 0,
    averageScore: 0,
    topPerformers: [],
    recentActivities: []
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [activities, setActivities] = useState<StudentActivity[]>([]);

  // Filter states
  const [studentFilters, setStudentFilters] = useState({
    search: '',
    course: '',
    status: ''
  });

  const [paperFilters, setPaperFilters] = useState({
    course: '',
    status: '',
    subject: ''
  });

  // Toast notification
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  // Modal states
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showViewStudentModal, setShowViewStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Load initial data
  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'students') {
      loadStudents();
    } else if (activeTab === 'papers') {
      loadQuestionPapers();
    } else if (activeTab === 'activity') {
      loadActivities();
    }
  }, [activeTab, studentFilters, paperFilters]);

  // Data loading functions
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const dashboardStats = await AdminService.getDashboardStats();
      setStats(dashboardStats);
      const recentActivities = await AdminService.getActivities({ limit: 5 });
      setActivities(recentActivities);
    } catch (error) {
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const result = await AdminService.getStudents({
        search: studentFilters.search,
        course: studentFilters.course,
        status: studentFilters.status
      });
      setStudents(result.students);
    } catch (error) {
      showToast('Error loading students', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadQuestionPapers = async () => {
    setLoading(true);
    try {
      const papers = await AdminService.getQuestionPapers({
        course: paperFilters.course,
        status: paperFilters.status,
        subject: paperFilters.subject
      });
      setQuestionPapers(papers);
    } catch (error) {
      showToast('Error loading question papers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadActivities = async () => {
    setLoading(true);
    try {
      const activityLog = await AdminService.getActivities({ limit: 50 });
      setActivities(activityLog);
    } catch (error) {
      showToast('Error loading activities', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Add Student Modal Component
  const AddStudentModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      course: '',
      dateOfBirth: '',
      gender: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.phone || !formData.course) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      try {
        const newStudent = await AdminService.createStudent(formData as any);
        setStudents([newStudent, ...students]);
        showToast('Student added successfully!', 'success');
        setShowAddStudentModal(false);
        await loadDashboardData();
      } catch (error) {
        showToast('Error adding student', 'error');
      }
    };

    if (!showAddStudentModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={() => setShowAddStudentModal(false)}
      >
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              Add New Student
            </h2>
            <X size={24} color="#6b7280" style={{ cursor: 'pointer' }} onClick={() => setShowAddStudentModal(false)} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Course *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select Course</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // View Student Modal Component
  const ViewStudentModal = () => {
    if (!showViewStudentModal || !selectedStudent) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={() => setShowViewStudentModal(false)}
      >
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              Student Details
            </h2>
            <X size={24} color="#6b7280" style={{ cursor: 'pointer' }} onClick={() => setShowViewStudentModal(false)} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '2px solid #f3f4f6' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '32px',
                margin: '0 auto 16px'
              }}>
                {selectedStudent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: '0 0 4px 0' }}>
                {selectedStudent.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {selectedStudent.registrationId}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Email</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{selectedStudent.email}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Phone</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{selectedStudent.phone}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Course</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{selectedStudent.course}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Status</p>
                <span style={{
                  background: `${getStatusColor(selectedStudent.status)}15`,
                  color: getStatusColor(selectedStudent.status),
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {selectedStudent.status}
                </span>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Enrollment Date</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                  {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Last Active</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                  {new Date(selectedStudent.lastActive).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Tests Attempted</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                  {selectedStudent.testsAttempted}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>Average Score</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: 0,
                  color: selectedStudent.averageScore >= 75 ? '#10b981' : selectedStudent.averageScore >= 50 ? '#f59e0b' : '#ef4444'
                }}>
                  {selectedStudent.averageScore}%
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowViewStudentModal(false);
                setShowEditStudentModal(true);
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Edit Student
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Edit Student Modal Component
  const EditStudentModal = () => {
    const [formData, setFormData] = useState({
      name: selectedStudent?.name || '',
      email: selectedStudent?.email || '',
      phone: selectedStudent?.phone || '',
      course: selectedStudent?.course || '',
      status: selectedStudent?.status || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedStudent) return;

      try {
        const updatedStudent = await AdminService.updateStudent(selectedStudent.id, formData as any);
        setStudents(students.map(s => s.id === selectedStudent.id ? updatedStudent : s));
        showToast('Student updated successfully!', 'success');
        setShowEditStudentModal(false);
        setSelectedStudent(null);
      } catch (error) {
        showToast('Error updating student', 'error');
      }
    };

    if (!showEditStudentModal || !selectedStudent) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={() => setShowEditStudentModal(false)}
      >
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              Edit Student
            </h2>
            <X size={24} color="#6b7280" style={{ cursor: 'pointer' }} onClick={() => setShowEditStudentModal(false)} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Course
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Foundation">Foundation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setShowEditStudentModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Update Student
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Student handlers
  const handleDeleteStudent = async (studentId: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await AdminService.deleteStudent(studentId);
      setStudents(students.filter(s => s.id !== studentId));
      showToast('Student deleted successfully', 'success');
      await loadDashboardData(); // Refresh stats
    } catch (error) {
      showToast('Error deleting student', 'error');
    }
  };

  const handleToggleStudentStatus = async (studentId: string) => {
    try {
      const updatedStudent = await AdminService.toggleStudentStatus(studentId);
      setStudents(students.map(s => s.id === studentId ? updatedStudent : s));
      showToast(`Student status updated to ${updatedStudent.status}`, 'success');
      await loadDashboardData();
    } catch (error) {
      showToast('Error updating student status', 'error');
    }
  };

  // Paper handlers
  const handleDeletePaper = async (paperId: string) => {
    if (!window.confirm('Are you sure you want to delete this question paper?')) return;

    try {
      await AdminService.deleteQuestionPaper(paperId);
      setQuestionPapers(questionPapers.filter(p => p.id !== paperId));
      showToast('Question paper deleted successfully', 'success');
      await loadDashboardData();
    } catch (error) {
      showToast('Error deleting question paper', 'error');
    }
  };

  const handlePublishPaper = async (paperId: string) => {
    try {
      const updatedPaper = await AdminService.publishQuestionPaper(paperId);
      setQuestionPapers(questionPapers.map(p => p.id === paperId ? updatedPaper : p));
      showToast('Question paper published successfully', 'success');
      await loadDashboardData();
    } catch (error) {
      showToast('Error publishing question paper', 'error');
    }
  };

  const handleArchivePaper = async (paperId: string) => {
    try {
      const updatedPaper = await AdminService.archiveQuestionPaper(paperId);
      setQuestionPapers(questionPapers.map(p => p.id === paperId ? updatedPaper : p));
      showToast('Question paper archived successfully', 'success');
      await loadDashboardData();
    } catch (error) {
      showToast('Error archiving question paper', 'error');
    }
  };

  // Export handler
  const handleExportData = async (type: 'students' | 'papers' | 'results' | 'activities') => {
    try {
      const blob = await AdminService.exportData(type);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      showToast('Data exported successfully', 'success');
    } catch (error) {
      showToast('Error exporting data', 'error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return '#10b981';
      case 'inactive':
      case 'draft':
        return '#f59e0b';
      case 'suspended':
      case 'archived':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'papers', label: 'Question Papers', icon: <FileText size={20} /> },
    { id: 'upload', label: 'Upload Paper', icon: <Upload size={20} /> },
    { id: 'activity', label: 'Activity Log', icon: <Activity size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  // Components
  const Toast = () => {
    if (!toast.show) return null;

    const bgColor = toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6';
    const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? XCircle : AlertCircle;

    return (
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        background: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9999,
        animation: 'slideIn 0.3s ease-out',
        borderLeft: `4px solid ${bgColor}`
      }}>
        <Icon size={20} color={bgColor} />
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
          {toast.message}
        </span>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );

  const DashboardOverview = () => (
    <div>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '8px'
      }}>
        Dashboard Overview
      </h2>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
        Welcome back! Here's what's happening with CaVerse Edutech today.
      </p>

      {loading ? <LoadingSpinner /> : (
        <>
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {[
              {
                label: 'Total Students',
                value: stats.totalStudents.toLocaleString(),
                change: '+12.5%',
                icon: <Users size={24} />,
                color: '#3b82f6',
                bgColor: '#eff6ff'
              },
              {
                label: 'Active Students',
                value: stats.activeStudents.toLocaleString(),
                change: '+8.2%',
                icon: <UserPlus size={24} />,
                color: '#10b981',
                bgColor: '#d1fae5'
              },
              {
                label: 'Question Papers',
                value: stats.totalPapers.toLocaleString(),
                change: `+${stats.draftPapers}`,
                icon: <FileQuestion size={24} />,
                color: '#8b5cf6',
                bgColor: '#ede9fe'
              },
              {
                label: 'Tests Today',
                value: stats.testsAttemptedToday.toLocaleString(),
                change: '+18.3%',
                icon: <TrendingUp size={24} />,
                color: '#f59e0b',
                bgColor: '#fef3c7'
              },
              {
                label: 'New This Week',
                value: stats.newRegistrationsWeek.toLocaleString(),
                change: '+23.1%',
                icon: <UserPlus size={24} />,
                color: '#ec4899',
                bgColor: '#fce7f3'
              },
              {
                label: 'Average Score',
                value: `${stats.averageScore.toFixed(1)}%`,
                change: '+2.4%',
                icon: <BarChart3 size={24} />,
                color: '#06b6d4',
                bgColor: '#cffafe'
              }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #f3f4f6',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>
                      {stat.label}
                    </p>
                    <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
                      {stat.value}
                    </h3>
                    <span style={{
                      fontSize: '13px',
                      color: '#10b981',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <TrendingUp size={14} />
                      {stat.change} from last month
                    </span>
                  </div>
                  <div style={{
                    background: stat.bgColor,
                    color: stat.color,
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                Recent Activity
              </h3>
              <button
                onClick={() => setActiveTab('activity')}
                style={{
                  padding: '8px 16px',
                  background: '#eff6ff',
                  color: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: activity.activityType === 'test_attempted' ? '#dbeafe'
                      : activity.activityType === 'registration' ? '#d1fae5'
                      : '#fef3c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activity.activityType === 'test_attempted' ? '#3b82f6'
                      : activity.activityType === 'registration' ? '#10b981'
                      : '#f59e0b'
                  }}>
                    <Activity size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      {activity.studentName}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0 0' }}>
                      {activity.description}
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const StudentsManagement = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Students Management
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Manage all student accounts and activities ({students.length} students)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => handleExportData('students')}
            style={{
              background: 'white',
              color: '#3b82f6',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid #3b82f6',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#3b82f6';
            }}
          >
            <Download size={18} />
            Export
          </button>
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => setShowAddStudentModal(true)}
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search students by name, email, or ID..."
            value={studentFilters.search}
            onChange={(e) => setStudentFilters({ ...studentFilters, search: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        <select
          value={studentFilters.course}
          onChange={(e) => setStudentFilters({ ...studentFilters, course: e.target.value })}
          style={{
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="">All Courses</option>
          <option value="Foundation">Foundation</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Final">Final</option>
        </select>
        <select
          value={studentFilters.status}
          onChange={(e) => setStudentFilters({ ...studentFilters, status: e.target.value })}
          style={{
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        {(studentFilters.search || studentFilters.course || studentFilters.status) && (
          <button
            onClick={() => setStudentFilters({ search: '', course: '', status: '' })}
            style={{
              padding: '12px 16px',
              background: '#fee2e2',
              color: '#ef4444',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Students Table */}
      {loading ? <LoadingSpinner /> : (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Student
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Registration ID
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Course
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Tests
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Avg Score
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Status
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                      No students found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr
                      key={student.id}
                      style={{
                        borderBottom: index < students.length - 1 ? '1px solid #f3f4f6' : 'none',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>
                              {student.name}
                            </p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                        {student.registrationId}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          background: '#eff6ff',
                          color: '#3b82f6',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {student.course}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {student.testsAttempted}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: student.averageScore >= 75 ? '#10b981' : student.averageScore >= 50 ? '#f59e0b' : '#ef4444'
                        }}>
                          {student.averageScore}%
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span
                          onClick={() => handleToggleStudentStatus(student.id)}
                          style={{
                            background: `${getStatusColor(student.status)}15`,
                            color: getStatusColor(student.status),
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            style={{
                              padding: '8px',
                              background: '#eff6ff',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              color: '#3b82f6',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#dbeafe'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#eff6ff'}
                            title="View Details"
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowViewStudentModal(true);
                            }}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            style={{
                              padding: '8px',
                              background: '#fef3c7',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              color: '#f59e0b',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fde68a'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#fef3c7'}
                            title="Edit Student"
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowEditStudentModal(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            style={{
                              padding: '8px',
                              background: '#fee2e2',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              color: '#ef4444',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
                            title="Delete Student"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const QuestionPapersManagement = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Question Papers
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Manage test papers and assignments ({questionPapers.length} papers)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => handleExportData('papers')}
            style={{
              background: 'white',
              color: '#10b981',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '2px solid #10b981',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#10b981';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#10b981';
            }}
          >
            <Download size={18} />
            Export
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Upload size={18} />
            Upload New Paper
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <select
          value={paperFilters.course}
          onChange={(e) => setPaperFilters({ ...paperFilters, course: e.target.value })}
          style={{
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="">All Courses</option>
          <option value="Foundation">Foundation</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Final">Final</option>
        </select>
        <select
          value={paperFilters.status}
          onChange={(e) => setPaperFilters({ ...paperFilters, status: e.target.value })}
          style={{
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        {(paperFilters.course || paperFilters.status || paperFilters.subject) && (
          <button
            onClick={() => setPaperFilters({ course: '', status: '', subject: '' })}
            style={{
              padding: '12px 16px',
              background: '#fee2e2',
              color: '#ef4444',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Papers Grid */}
      {loading ? <LoadingSpinner /> : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {questionPapers.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              padding: '60px',
              textAlign: 'center',
              background: 'white',
              borderRadius: '16px',
              color: '#6b7280'
            }}>
              No question papers found. Try adjusting your filters or upload a new paper.
            </div>
          ) : (
            questionPapers.map((paper) => (
              <div
                key={paper.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #f3f4f6',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '12px',
                    borderRadius: '12px'
                  }}>
                    <FileText size={24} color="white" />
                  </div>
                  <span style={{
                    background: `${getStatusColor(paper.status)}15`,
                    color: getStatusColor(paper.status),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {paper.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                  {paper.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                  {paper.subject} • {paper.course}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '16px',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Duration</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: '4px 0 0 0' }}>
                      {paper.duration} min
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Total Marks</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: '4px 0 0 0' }}>
                      {paper.totalMarks}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Questions</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: '4px 0 0 0' }}>
                      {paper.totalQuestions}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Attempts</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: '4px 0 0 0' }}>
                      {paper.attemptCount}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {paper.status === 'draft' && (
                    <button
                      onClick={() => handlePublishPaper(paper.id)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#10b981'}
                    >
                      Publish
                    </button>
                  )}
                  {paper.status === 'published' && (
                    <button
                      onClick={() => handleArchivePaper(paper.id)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#d97706'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#f59e0b'}
                    >
                      Archive
                    </button>
                  )}
                  <button
                    style={{
                      flex: paper.status === 'draft' ? 0 : 1,
                      padding: '10px',
                      background: '#f3f4f6',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    onClick={() => showToast('Edit functionality: Update paper details, questions, and settings', 'info')}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePaper(paper.id)}
                    style={{
                      padding: '10px',
                      background: '#fee2e2',
                      color: '#ef4444',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  const UploadPaper = () => {
    const [formData, setFormData] = useState({
      title: '',
      subject: '',
      course: '',
      duration: '',
      totalMarks: '',
      totalQuestions: '',
      difficulty: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
      e.preventDefault();

      if (!formData.title || !formData.subject || !formData.course) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      try {
        const paperData = {
          title: formData.title,
          subject: formData.subject,
          course: formData.course as 'Foundation' | 'Intermediate' | 'Final',
          duration: parseInt(formData.duration),
          totalMarks: parseInt(formData.totalMarks),
          totalQuestions: parseInt(formData.totalQuestions),
          difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard',
          status: isDraft ? 'draft' : 'published'
        };

        const newPaper = await AdminService.uploadQuestionPaper(paperData, selectedFile || undefined);
        showToast(`Question paper ${isDraft ? 'saved as draft' : 'published'} successfully!`, 'success');
        
        // Reset form
        setFormData({
          title: '',
          subject: '',
          course: '',
          duration: '',
          totalMarks: '',
          totalQuestions: '',
          difficulty: ''
        });
        setSelectedFile(null);

        // Navigate to papers tab
        setTimeout(() => {
          setActiveTab('papers');
          loadQuestionPapers();
        }, 1500);
      } catch (error) {
        showToast('Error uploading question paper', 'error');
      }
    };

    return (
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          Upload Question Paper
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
          Create a new test paper or upload existing questions
        </p>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          maxWidth: '800px'
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Paper Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mock Test - January 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Accounting"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Course Level *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select Course</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  placeholder="180"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Total Marks *
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Total Questions *
                </label>
                <input
                  type="number"
                  placeholder="50"
                  value={formData.totalQuestions}
                  onChange={(e) => setFormData({ ...formData, totalQuestions: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Difficulty Level *
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Upload Question Paper (PDF)
              </label>
              <div style={{
                border: '3px dashed #d1d5db',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'pointer',
                background: selectedFile ? '#f0fdf4' : 'transparent',
                borderColor: selectedFile ? '#10b981' : '#d1d5db'
              }}
              onClick={() => document.getElementById('paperUpload')?.click()}
              >
                <Upload size={40} color={selectedFile ? '#10b981' : '#3b82f6'} style={{ margin: '0 auto 16px' }} />
                <p style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600', margin: 0 }}>
                  {selectedFile ? selectedFile.name : 'Drag and drop your file here or click to browse'}
                </p>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                  PDF format only (Max 20MB)
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  id="paperUpload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      showToast('File selected successfully', 'success');
                    }
                  }}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Publish Paper
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ActivityLog = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Activity Log
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Track all student activities and system events ({activities.length} activities)
          </p>
        </div>
        <button
          onClick={() => handleExportData('activities')}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Download size={18} />
          Export Log
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          {activities.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
              No activities recorded yet.
            </div>
          ) : (
            activities.map((activity, index) => (
              <div
                key={activity.id}
                style={{
                  padding: '20px',
                  borderBottom: index < activities.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: activity.activityType === 'test_attempted' ? '#dbeafe'
                    : activity.activityType === 'registration' ? '#d1fae5'
                    : activity.activityType === 'login' ? '#fef3c7'
                    : '#ede9fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activity.activityType === 'test_attempted' ? '#3b82f6'
                    : activity.activityType === 'registration' ? '#10b981'
                    : activity.activityType === 'login' ? '#f59e0b'
                    : '#8b5cf6',
                  flexShrink: 0
                }}>
                  <Activity size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    {activity.studentName}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                    {activity.description}
                  </p>
                  {activity.ipAddress && (
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                      IP: {activity.ipAddress}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '13px', color: '#1f2937', fontWeight: '600', margin: 0 }}>
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [analyticsPeriod, setAnalyticsPeriod] = useState<'week' | 'month' | 'year'>('month');

    useEffect(() => {
      loadAnalytics();
    }, [analyticsPeriod]);

    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const data = await AdminService.getAnalytics(analyticsPeriod);
        setAnalyticsData(data);
      } catch (error) {
        showToast('Error loading analytics', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (loading || !analyticsData) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              Analytics & Reports
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Detailed insights into student performance and platform usage
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setAnalyticsPeriod(period)}
                style={{
                  padding: '10px 20px',
                  background: analyticsPeriod === period ? '#3b82f6' : 'white',
                  color: analyticsPeriod === period ? 'white' : '#6b7280',
                  border: analyticsPeriod === period ? 'none' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Course Distribution */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            Course Distribution
          </h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', height: '300px' }}>
            {analyticsData.courseDistribution.map((course: any, index: number) => {
              const maxCount = Math.max(...analyticsData.courseDistribution.map((c: any) => c.count));
              const height = (course.count / maxCount) * 250;
              const colors = ['#3b82f6', '#10b981', '#f59e0b'];
              
              return (
                <div key={course.course} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${height}px`,
                    background: `linear-gradient(to top, ${colors[index]}, ${colors[index]}dd)`,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '12px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1.05)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
                      {course.count}
                    </span>
                  </div>
                  <div style={{
                    marginTop: '12px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      {course.course}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {((course.count / analyticsData.courseDistribution.reduce((a: number, b: any) => a + b.count, 0)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Performance */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            Subject Performance
          </h3>
          {analyticsData.subjectPerformance.map((subject: any) => {
            const percentage = subject.averageScore;
            const color = percentage >= 75 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444';
            
            return (
              <div key={subject.subject} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                    {subject.subject}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color }}>
                    {subject.averageScore.toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: color,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-out'
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Trends */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {/* Student Growth */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
              Student Growth
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {analyticsData.studentGrowth.map((data: any, _index: number) => {
                const maxCount = Math.max(...analyticsData.studentGrowth.map((d: any) => d.count));
                const width = (data.count / maxCount) * 100;
                
                return (
                  <div key={data.month} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', minWidth: '40px' }}>
                      {data.month}
                    </span>
                    <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '4px', height: '24px', position: 'relative' }}>
                      <div style={{
                        width: `${width}%`,
                        height: '100%',
                        background: 'linear-gradient(to right, #3b82f6, #1e3a8a)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '8px'
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>
                          {data.count}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Attempts Trend */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
              Test Attempts (Last 7 Days)
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '200px' }}>
              {analyticsData.testAttemptsTrend.slice(-7).map((data: any, _index: number) => {
                const maxCount = Math.max(...analyticsData.testAttemptsTrend.map((d: any) => d.count));
                const height = (data.count / maxCount) * 160;
                
                return (
                  <div key={data.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${height}px`,
                      background: 'linear-gradient(to top, #10b981, #059669)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingTop: '8px',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleY(1)'}
                    >
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'white' }}>
                        {data.count}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#6b7280', marginTop: '8px' }}>
                      {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Settings = () => {
    const [settings, setSettings] = useState({
      instituteName: 'CaVerse Edutech',
      instituteEmail: 'admin@caverse.edu',
      institutePhone: '+91 9876543210',
      allowRegistration: true,
      requireEmailVerification: true,
      testDuration: '180',
      passingPercentage: '40',
      allowRetake: true,
      maxRetakes: '3',
      showResults: true,
      showAnswers: false,
      enableNotifications: true,
      notificationEmail: 'notifications@caverse.edu'
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
      setSaved(true);
      showToast('Settings saved successfully!', 'success');
      setTimeout(() => setSaved(false), 2000);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              System Settings
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Configure platform settings and preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            style={{
              background: saved ? '#10b981' : 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
              transition: 'all 0.3s'
            }}
          >
            {saved ? <CheckCircle size={18} /> : null}
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Institute Information */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
              Institute Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Institute Name
                </label>
                <input
                  type="text"
                  value={settings.instituteName}
                  onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.instituteEmail}
                  onChange={(e) => setSettings({ ...settings, instituteEmail: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.institutePhone}
                  onChange={(e) => setSettings({ ...settings, institutePhone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Registration Settings */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
              Registration Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  Allow new student registrations
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  Require email verification for new accounts
                </span>
              </label>
            </div>
          </div>

          {/* Test Settings */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
              Test Configuration
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Default Test Duration (minutes)
                </label>
                <input
                  type="number"
                  value={settings.testDuration}
                  onChange={(e) => setSettings({ ...settings, testDuration: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Passing Percentage
                </label>
                <input
                  type="number"
                  value={settings.passingPercentage}
                  onChange={(e) => setSettings({ ...settings, passingPercentage: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Maximum Retakes
                </label>
                <input
                  type="number"
                  value={settings.maxRetakes}
                  onChange={(e) => setSettings({ ...settings, maxRetakes: e.target.value })}
                  disabled={!settings.allowRetake}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    opacity: settings.allowRetake ? 1 : 0.5
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.allowRetake}
                  onChange={(e) => setSettings({ ...settings, allowRetake: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  Allow students to retake tests
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.showResults}
                  onChange={(e) => setSettings({ ...settings, showResults: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  Show results immediately after test completion
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.showAnswers}
                  onChange={(e) => setSettings({ ...settings, showAnswers: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  Show correct answers after test completion
                </span>
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
              Notifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                  Enable email notifications for admin activities
                </span>
              </label>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Notification Email Address
                </label>
                <input
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                  disabled={!settings.enableNotifications}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    opacity: settings.enableNotifications ? 1 : 0.5
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsManagement />;
      case 'papers':
        return <QuestionPapersManagement />;
      case 'upload':
        return <UploadPaper />;
      case 'activity':
        return <ActivityLog />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <Toast />
      <AddStudentModal />
      <ViewStudentModal />
      <EditStudentModal />

      {/* Top Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        padding: '16px 24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Menu
            size={24}
            color="white"
            style={{ cursor: 'pointer' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <h1 style={{
            color: 'white',
            margin: 0,
            fontSize: '24px',
            fontWeight: '700'
          }}>
            CaVerse Admin
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} color="white" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px 12px 8px 40px',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                width: '250px'
              }}
            />
          </div>

          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={22} color="white" />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              3
            </span>
          </div>

          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            <Users size={20} color="white" />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <aside style={{
            width: '260px',
            background: 'white',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            padding: '24px 0',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <nav style={{ flex: 1 }}>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    background: activeTab === item.id ? '#eff6ff' : 'transparent',
                    borderLeft: activeTab === item.id ? '4px solid #3b82f6' : '4px solid transparent',
                    color: activeTab === item.id ? '#3b82f6' : '#6b7280',
                    fontWeight: activeTab === item.id ? '600' : '500',
                    fontSize: '15px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </nav>

            <div
              style={{
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                color: '#ef4444',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  showToast('Logging out...', 'info');
                  setTimeout(() => {
                    window.location.href = '/login';
                  }, 1000);
                }
              }}
            >
              <LogOut size={20} />
              Logout
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '32px',
          overflowY: 'auto'
        }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
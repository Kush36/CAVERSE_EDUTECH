/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Complete API Service for Eduspace Frontend
 * Handles all backend API calls with proper error handling and token management
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  registrationId: string;
  profilePhoto?: string;
  role: 'student' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  lastActive?: string;
  createdAt?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

// Storage keys
const TOKEN_KEY = 'eduspace_token';
const USER_KEY = 'eduspace_user';

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Get user from localStorage
export const getStoredUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Set user in localStorage
export const setStoredUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Remove user from localStorage
export const removeStoredUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Helper function to make API requests
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 - Token expired or invalid
  if (response.status === 401) {
    removeToken();
    removeStoredUser();
    window.location.href = '/login';
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
};

// Auth Services
export const authAPI = {
  /**
   * Register new user
   */
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    course: string;
  }): Promise<LoginResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.data?.user && response.data?.token) {
      setToken(response.data.token);
      setStoredUser(response.data.user);
    }

    return response;
  },

  /**
   * Login user
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.user && response.data?.token) {
      setToken(response.data.token);
      setStoredUser(response.data.user);
    }

    return response;
  },

  /**
   * Get current user profile
   */
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest('/auth/me', { method: 'GET' });
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    course?: string;
    profilePhoto?: string;
  }): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Change password
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> => {
    return apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse> => {
    const response = await apiRequest('/auth/logout', { method: 'POST' });
    removeToken();
    removeStoredUser();
    return response;
  },
};

// Admin Services
export const adminAPI = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    return apiRequest('/admin/dashboard-stats', { method: 'GET' });
  },

  /**
   * Get all students with pagination
   */
  getAllStudents: async (page = 1, limit = 10): Promise<ApiResponse<any[]>> => {
    return apiRequest(`/admin/students?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  /**
   * Search students
   */
  searchStudents: async (
    search: string,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<any[]>> => {
    return apiRequest(
      `/admin/students?search=${search}&page=${page}&limit=${limit}`,
      { method: 'GET' }
    );
  },

  /**
   * Get student details
   */
  getStudentDetail: async (studentId: string): Promise<ApiResponse> => {
    return apiRequest(`/admin/students/${studentId}`, { method: 'GET' });
  },

  /**
   * Update student status
   */
  updateStudentStatus: async (
    studentId: string,
    status: 'active' | 'inactive' | 'suspended'
  ): Promise<ApiResponse<User>> => {
    return apiRequest(`/admin/students/${studentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Get all test papers
   */
  getAllTestPapers: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/admin/test-papers', { method: 'GET' });
  },

  /**
   * Get test paper details
   */
  getTestPaperDetail: async (paperId: string): Promise<ApiResponse> => {
    return apiRequest(`/admin/test-papers/${paperId}`, { method: 'GET' });
  },

  /**
   * Create test paper
   */
  createTestPaper: async (paperData: any): Promise<ApiResponse> => {
    return apiRequest('/admin/test-papers', {
      method: 'POST',
      body: JSON.stringify(paperData),
    });
  },

  /**
   * Update test paper
   */
  updateTestPaper: async (paperId: string, paperData: any): Promise<ApiResponse> => {
    return apiRequest(`/admin/test-papers/${paperId}`, {
      method: 'PUT',
      body: JSON.stringify(paperData),
    });
  },

  /**
   * Delete test paper
   */
  deleteTestPaper: async (paperId: string): Promise<ApiResponse> => {
    return apiRequest(`/admin/test-papers/${paperId}`, { method: 'DELETE' });
  },

  /**
   * Get all results
   */
  getAllResults: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/admin/results', { method: 'GET' });
  },

  /**
   * Get result details
   */
  getResultDetail: async (resultId: string): Promise<ApiResponse> => {
    return apiRequest(`/admin/results/${resultId}`, { method: 'GET' });
  },

  /**
   * Export students to CSV
   */
  exportStudents: async (): Promise<void> => {
    const token = getToken();
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/admin/export/students`, {
      headers,
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  },

  /**
   * Export results to CSV
   */
  exportResults: async (): Promise<void> => {
    const token = getToken();
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/admin/export/results`, {
      headers,
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'results.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  },

  /**
   * Get activity logs
   */
  getActivityLogs: async (page = 1, limit = 20): Promise<ApiResponse<any[]>> => {
    return apiRequest(`/admin/activity-logs?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },
};

// Student Services
export const studentAPI = {
  /**
   * Get student profile
   */
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest('/students/me', { method: 'GET' });
  },

  /**
   * Update student profile
   */
  updateProfile: async (profileData: any): Promise<ApiResponse> => {
    return apiRequest('/students/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Get student statistics
   */
  getStatistics: async (): Promise<ApiResponse> => {
    return apiRequest('/students/me/statistics', { method: 'GET' });
  },
};

// Test Paper Services
export const testAPI = {
  /**
   * Get all test papers
   */
  getAllPapers: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/test-papers', { method: 'GET' });
  },

  /**
   * Get test paper details
   */
  getPaperDetail: async (paperId: string): Promise<ApiResponse> => {
    return apiRequest(`/test-papers/${paperId}`, { method: 'GET' });
  },
};

// Result Services
export const resultAPI = {
  /**
   * Get all results
   */
  getAllResults: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/results', { method: 'GET' });
  },

  /**
   * Get result details
   */
  getResultDetail: async (resultId: string): Promise<ApiResponse> => {
    return apiRequest(`/results/${resultId}`, { method: 'GET' });
  },

  /**
   * Submit test result
   */
  submitResult: async (resultData: any): Promise<ApiResponse> => {
    return apiRequest('/results', {
      method: 'POST',
      body: JSON.stringify(resultData),
    });
  },
};

// Course Services
export const courseAPI = {
  /**
   * Get all courses
   */
  getAllCourses: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/courses', { method: 'GET' });
  },

  /**
   * Get course details
   */
  getCourseDetail: async (courseId: string): Promise<ApiResponse> => {
    return apiRequest(`/courses/${courseId}`, { method: 'GET' });
  },
};

// Activity Services
export const activityAPI = {
  /**
   * Get my activities
   */
  getMyActivities: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest('/activities/my-activities', { method: 'GET' });
  },
};

// Upload Services
export const uploadAPI = {
  /**
   * Upload profile photo
   */
  uploadProfilePhoto: async (file: File): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('profilePhoto', file);

    const token = getToken();
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/upload/profile-photo`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },

  /**
   * Upload document
   */
  uploadDocument: async (file: File): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('document', file);

    const token = getToken();
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/upload/document`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:5000/health`);
    return response.ok;
  } catch {
    return false;
  }
};

export default {
  authAPI,
  adminAPI,
  studentAPI,
  testAPI,
  resultAPI,
  courseAPI,
  activityAPI,
  uploadAPI,
  healthCheck,
};

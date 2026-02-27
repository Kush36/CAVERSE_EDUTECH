# Eduspace Backend - Complete API Reference

**Base URL**: `http://localhost:5000/api/v1`

## Table of Contents
1. [Authentication](#authentication)
2. [Admin Endpoints](#admin-endpoints)
3. [Student Endpoints](#student-endpoints)
4. [Test Papers](#test-papers)
5. [Results](#results)
6. [Uploads](#uploads)
7. [Error Handling](#error-handling)

---

## Authentication

### Register User
**POST** `/auth/register`

Register a new student account.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "1234567890",
  "course": "Web Development"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "course": "Web Development",
      "registrationId": "EDU000001",
      "role": "student",
      "status": "active"
    },
    "token": "eyJhbGc..."
  }
}
```

**Validation**:
- Email must be unique and valid
- Password minimum 6 characters
- Phone must be 10 digits (numeric)
- All fields required

---

### Login
**POST** `/auth/login`

Authenticate and receive JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "student",
      "status": "active"
    },
    "token": "eyJhbGc..."
  }
}
```

**Headers Required**: None

---

### Get Current User
**GET** `/auth/me`

Get authenticated user's profile.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "student",
      "status": "active",
      "lastActive": "2024-01-15T10:30:00Z",
      "registrationId": "EDU000001"
    }
  }
}
```

---

### Update Profile
**PUT** `/auth/profile`

Update authenticated user's profile information.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Request Body**:
```json
{
  "firstName": "Jonathan",
  "lastName": "Doe",
  "phone": "9876543210",
  "course": "Mobile Development"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "Jonathan",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "course": "Mobile Development"
    }
  }
}
```

---

### Change Password
**PUT** `/auth/change-password`

Change authenticated user's password.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Request Body**:
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Validation**:
- Current password must match
- New password minimum 6 characters
- Passwords must be different

---

### Logout
**POST** `/auth/logout`

Logout user (invalidates session).

**Headers Required**:
```
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Admin Endpoints

**All admin endpoints require**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**User must have role: `admin`**

---

### Dashboard Statistics
**GET** `/admin/dashboard-stats`

Get dashboard overview statistics.

**Query Parameters**: None

**Response** (200):
```json
{
  "success": true,
  "message": "Dashboard stats fetched",
  "data": {
    "totalStudents": 45,
    "activeStudents": 42,
    "totalTestPapers": 12,
    "averageScore": 76.5,
    "topPerformers": [
      {
        "name": "Jane Smith",
        "score": 95.5,
        "course": "Web Development"
      }
    ],
    "recentActivity": [
      {
        "id": "activity_id",
        "action": "Test submitted",
        "user": "John Doe",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### List All Students
**GET** `/admin/students`

Retrieve paginated list of students.

**Query Parameters**:
```
page=1&limit=10
```

**Response** (200):
```json
{
  "success": true,
  "message": "Students fetched",
  "data": [
    {
      "id": "user_id",
      "registrationId": "EDU000001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "course": "Web Development",
      "status": "active",
      "lastActive": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "pages": 5,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### Search Students
**GET** `/admin/students?search={query}`

Search students by name, email, or registration ID.

**Query Parameters**:
```
search=john&page=1&limit=10
```

**Response** (200): Same as List All Students

---

### Get Student Details
**GET** `/admin/students/{studentId}`

Get detailed information about a specific student.

**Response** (200):
```json
{
  "success": true,
  "message": "Student fetched",
  "data": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "course": "Web Development",
    "registrationId": "EDU000001",
    "status": "active",
    "profilePhoto": "url/to/photo.jpg",
    "lastActive": "2024-01-15T10:30:00Z",
    "statistics": {
      "totalTests": 5,
      "completedTests": 4,
      "averageScore": 78.5
    }
  }
}
```

---

### Update Student Status
**PUT** `/admin/students/{studentId}/status`

Change student's status (active/inactive/suspended).

**Request Body**:
```json
{
  "status": "suspended"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Student status updated",
  "data": {
    "id": "user_id",
    "status": "suspended"
  }
}
```

**Valid Status Values**: `active`, `inactive`, `suspended`

---

### List Test Papers
**GET** `/admin/test-papers`

Get all test papers.

**Response** (200):
```json
{
  "success": true,
  "message": "Test papers fetched",
  "data": [
    {
      "id": "paper_id",
      "title": "JavaScript Fundamentals",
      "description": "Test your knowledge of JS basics",
      "course": "Web Development",
      "duration": 60,
      "totalQuestions": 20,
      "totalMarks": 100,
      "passingMarks": 40,
      "status": "active",
      "createdAt": "2024-01-10T14:00:00Z"
    }
  ]
}
```

---

### Create Test Paper
**POST** `/admin/test-papers`

Create a new test paper.

**Request Body**:
```json
{
  "title": "Python Advanced",
  "description": "Advanced Python concepts",
  "course": "Backend Development",
  "duration": 90,
  "totalMarks": 150,
  "passingMarks": 75,
  "questions": [
    {
      "text": "What is a decorator in Python?",
      "options": [
        "A function wrapper",
        "A class wrapper",
        "A module wrapper",
        "A package wrapper"
      ],
      "correctOption": 0,
      "marks": 3
    }
  ]
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Test paper created",
  "data": {
    "id": "paper_id",
    "title": "Python Advanced",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update Test Paper
**PUT** `/admin/test-papers/{paperId}`

Update an existing test paper.

**Request Body**: Same format as Create Test Paper

**Response** (200): Same as Create Test Paper

---

### Delete Test Paper
**DELETE** `/admin/test-papers/{paperId}`

Delete a test paper.

**Response** (200):
```json
{
  "success": true,
  "message": "Test paper deleted"
}
```

---

### List Results
**GET** `/admin/results`

Get all test results.

**Query Parameters**:
```
page=1&limit=20
```

**Response** (200):
```json
{
  "success": true,
  "message": "Results fetched",
  "data": [
    {
      "id": "result_id",
      "studentId": "user_id",
      "studentName": "John Doe",
      "testPaperId": "paper_id",
      "testTitle": "JavaScript Fundamentals",
      "score": 78,
      "percentage": 78,
      "status": "passed",
      "submittedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Result Details
**GET** `/admin/results/{resultId}`

Get detailed result information with all answers.

**Response** (200):
```json
{
  "success": true,
  "message": "Result fetched",
  "data": {
    "id": "result_id",
    "studentId": "user_id",
    "studentName": "John Doe",
    "testPaperId": "paper_id",
    "testTitle": "JavaScript Fundamentals",
    "score": 78,
    "percentage": 78,
    "status": "passed",
    "duration": 3420,
    "selectedAnswers": [0, 1, 2, 0, 1],
    "correctAnswers": [0, 1, 2, 1, 1],
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Export Students to CSV
**GET** `/admin/export/students`

Export all student data as CSV file.

**Response**: CSV file download

```
registrationId,firstName,lastName,email,phone,course,status,enrolledDate
EDU000001,John,Doe,john@example.com,1234567890,Web Development,active,2024-01-01
```

---

### Export Results to CSV
**GET** `/admin/export/results`

Export all test results as CSV file.

**Response**: CSV file download

```
studentName,registrationId,testTitle,score,percentage,status,submittedDate
John Doe,EDU000001,JavaScript Fundamentals,78,78,passed,2024-01-15
```

---

### Get Activity Logs
**GET** `/admin/activity-logs`

Get user activity audit trail.

**Query Parameters**:
```
page=1&limit=20
```

**Response** (200):
```json
{
  "success": true,
  "message": "Activity logs fetched",
  "data": [
    {
      "id": "activity_id",
      "userId": "user_id",
      "userName": "John Doe",
      "action": "login",
      "resource": "auth",
      "status": "success",
      "ipAddress": "192.168.1.1",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Student Endpoints

**All student endpoints require**:
```
Authorization: Bearer {token}
```

---

### Get Student Profile
**GET** `/students/me`

Get authenticated student's profile.

**Response** (200):
```json
{
  "success": true,
  "message": "Profile fetched",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "course": "Web Development",
      "registrationId": "EDU000001",
      "profilePhoto": "url/to/photo.jpg"
    }
  }
}
```

---

### Update Student Profile
**PUT** `/students/me`

Update authenticated student's profile.

**Request Body**:
```json
{
  "firstName": "Jonathan",
  "phone": "9876543210",
  "profilePhoto": "url/to/new/photo.jpg"
}
```

**Response** (200): Same as Get Student Profile

---

### Get Student Statistics
**GET** `/students/me/statistics`

Get student's performance statistics.

**Response** (200):
```json
{
  "success": true,
  "message": "Statistics fetched",
  "data": {
    "totalTests": 5,
    "completedTests": 4,
    "averageScore": 78.5,
    "currentStreak": 3,
    "bestScore": 95,
    "worstScore": 65,
    "recentResults": [
      {
        "testTitle": "JavaScript Fundamentals",
        "score": 78,
        "percentage": 78,
        "submittedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## Test Papers

---

### List Available Tests
**GET** `/test-papers`

Get all available test papers for students.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Test papers fetched",
  "data": [
    {
      "id": "paper_id",
      "title": "JavaScript Fundamentals",
      "description": "Test your knowledge of JS basics",
      "course": "Web Development",
      "duration": 60,
      "totalQuestions": 20,
      "totalMarks": 100,
      "difficulty": "intermediate",
      "status": "active"
    }
  ]
}
```

---

### Get Test Paper Details
**GET** `/test-papers/{paperId}`

Get detailed test paper with all questions.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Test paper fetched",
  "data": {
    "id": "paper_id",
    "title": "JavaScript Fundamentals",
    "description": "Test your knowledge of JS basics",
    "course": "Web Development",
    "duration": 60,
    "totalMarks": 100,
    "passingMarks": 40,
    "totalQuestions": 20,
    "questions": [
      {
        "id": "q1",
        "text": "What does JS stand for?",
        "options": [
          "JavaScript",
          "Java Source",
          "Joint Script",
          "JavaScript System"
        ],
        "marks": 5
      }
    ]
  }
}
```

---

## Results

---

### Submit Test Result
**POST** `/results`

Submit student's test answers and get evaluated.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Request Body**:
```json
{
  "testPaperId": "paper_id",
  "selectedAnswers": [0, 1, 2, 0, 1, 2, 1, 0, 2, 1],
  "duration": 3420
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Result submitted successfully",
  "data": {
    "id": "result_id",
    "studentId": "user_id",
    "testPaperId": "paper_id",
    "score": 78,
    "percentage": 78,
    "status": "passed",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get Student Results
**GET** `/results`

Get all test results for authenticated student.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Query Parameters**:
```
page=1&limit=10
```

**Response** (200):
```json
{
  "success": true,
  "message": "Results fetched",
  "data": [
    {
      "id": "result_id",
      "testTitle": "JavaScript Fundamentals",
      "score": 78,
      "percentage": 78,
      "status": "passed",
      "submittedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Result Details
**GET** `/results/{resultId}`

Get detailed result with feedback.

**Headers Required**:
```
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Result fetched",
  "data": {
    "id": "result_id",
    "testTitle": "JavaScript Fundamentals",
    "score": 78,
    "percentage": 78,
    "status": "passed",
    "duration": 3420,
    "feedback": "Great performance!",
    "questionReview": [
      {
        "question": "What does JS stand for?",
        "selectedAnswer": "JavaScript",
        "correctAnswer": "JavaScript",
        "isCorrect": true,
        "marks": 5
      }
    ],
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Uploads

---

### Upload Profile Photo
**POST** `/upload/profile-photo`

Upload user profile photo.

**Headers Required**:
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data**:
- `profilePhoto`: File (JPEG, PNG, GIF, WebP, max 5MB)

**Response** (200):
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "user_id_1234567890.jpg",
    "url": "/uploads/profile-photos/user_id_1234567890.jpg",
    "size": 245632
  }
}
```

---

### Upload Document
**POST** `/upload/document`

Upload student document.

**Headers Required**:
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data**:
- `document`: File (any format, max 5MB)

**Response** (200): Same as Upload Profile Photo

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (duplicate email, etc) |
| 429 | Too Many Requests (rate limited) |
| 500 | Server Error |

### Rate Limiting

- **General**: 100 requests per 15 minutes
- **Auth**: 5 requests per 15 minutes
- **Upload**: 10 requests per hour

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705329000
```

---

## Authentication Flow

```
1. User Registration
   POST /auth/register → Get token

2. User Login
   POST /auth/login → Get token

3. Authenticated Requests
   GET /auth/me
   Authorization: Bearer {token}

4. Token Expiry
   401 Response → Redirect to /login
```

---

## Best Practices

1. **Always include Bearer token** in Authorization header
2. **Store token securely** in browser localStorage or sessionStorage
3. **Handle 401 responses** - redirect to login
4. **Implement retry logic** for failed requests
5. **Validate input** before sending to API
6. **Use gzip compression** for large responses
7. **Implement request timeout** (30 seconds default)
8. **Log all errors** for debugging

---

**API Version**: 1.0  
**Last Updated**: 2024-01-15  
**Status**: Production Ready ✅

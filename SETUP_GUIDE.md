# Eduspace - Complete Production Setup Guide

## Overview

Eduspace is a full-stack online course education platform with admin panel, student dashboard, and comprehensive testing system. The project includes:

- **Backend**: Express.js REST API with MongoDB
- **Frontend**: React with TypeScript and Vite
- **Authentication**: JWT-based secure authentication
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Docker support for easy deployment

## Project Structure

```
eduspace/
├── backend/                    # Express.js REST API
│   ├── src/
│   │   ├── server.js          # Main server entry
│   │   ├── config/            # Configuration management
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API endpoints
│   │   ├── models/            # Database models
│   │   ├── middleware/        # Custom middleware
│   │   └── utils/             # Helper functions
│   ├── package.json
│   └── Dockerfile
│
└── eduspace-react/             # React Frontend
    ├── src/
    │   ├── components/         # React components
    │   ├── contexts/           # Context API
    │   ├── services/           # API service layer
    │   ├── routes/             # Route configuration
    │   ├── styles/             # Global styles
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

## Prerequisites

- Node.js 16+ and npm 7+
- MongoDB 5.0+ (local or cloud)
- Docker & Docker Compose (optional, for containerization)

## Installation & Setup

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eduspace
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
```

### 2. Frontend Setup

```bash
cd eduspace-react

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env
# VITE_API_URL=http://localhost:5000/api/v1
```

## Running the Project

### Local Development (Without Docker)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

The API will be available at: `http://localhost:5000/api/v1`

**Terminal 2 - Frontend:**
```bash
cd eduspace-react
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### Using Docker Compose

```bash
cd backend
docker-compose up --build
```

This will start:
- MongoDB: `mongodb://localhost:27017`
- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## Seeding Database

Initialize the database with sample data:

```bash
cd backend
npm run seed
```

**Demo Credentials:**
- **Admin**: admin@example.com / password123
- **Student**: student1@example.com / password123

## API Documentation

### Authentication Endpoints

```
POST   /api/v1/auth/register          - Register new user
POST   /api/v1/auth/login             - Login user
GET    /api/v1/auth/me                - Get current user
PUT    /api/v1/auth/profile           - Update profile
PUT    /api/v1/auth/change-password   - Change password
POST   /api/v1/auth/logout            - Logout
```

### Admin Endpoints

```
GET    /api/v1/admin/dashboard-stats  - Dashboard statistics
GET    /api/v1/admin/students         - List all students
GET    /api/v1/admin/test-papers      - List test papers
POST   /api/v1/admin/test-papers      - Create test paper
PUT    /api/v1/admin/students/:id/status - Update student status
GET    /api/v1/admin/export/students  - Export students to CSV
```

### Student Endpoints

```
GET    /api/v1/students/me            - Get student profile
PUT    /api/v1/students/me            - Update student profile
GET    /api/v1/students/me/statistics - Get student statistics
```

### Test & Results

```
GET    /api/v1/test-papers            - List available tests
GET    /api/v1/test-papers/:id        - Get test details
POST   /api/v1/results                - Submit test result
GET    /api/v1/results                - Get my results
```

### Authentication Headers

All protected endpoints require:
```
Authorization: Bearer {token}
```

## Frontend Pages & Routes

### Public Routes
- `/login` - Login page
- `/signup` - Registration page

### Student Routes (Role: student)
- `/dashboard` - Student dashboard
- `/my-tests` - Available tests
- `/results` - Test results
- `/profile` - Student profile

### Admin Routes (Role: admin)
- `/admin/dashboard` - Admin dashboard with stats
- `/admin/students` - Student management
- `/admin/test-papers` - Test paper management
- `/admin/results` - Result viewing
- `/admin/activity-logs` - Activity logs

## Building for Production

### Backend Production Build

```bash
cd backend

# Using Docker
docker build -t eduspace-backend .
docker run -p 5000:5000 eduspace-backend

# Or direct build
npm install --production
npm run start
```

### Frontend Production Build

```bash
cd eduspace-react

npm run build
npm run preview
```

## Security Features

✅ JWT-based authentication with 24-hour tokens  
✅ bcryptjs password hashing (10 salt rounds)  
✅ Rate limiting (100 req/15min general, 5 req/15min auth)  
✅ CORS protection with origin validation  
✅ Helmet.js for HTTP security headers  
✅ Input validation using express-validator  
✅ MongoDB injection prevention  
✅ XSS protection  
✅ Request timeout handling (30s)  
✅ Graceful shutdown with SIGTERM/SIGINT

## File Upload

File uploads are supported with the following specs:
- **Max Size**: 5MB
- **Allowed Types**: JPEG, PNG, GIF, WebP
- **Processing**: Images are optimized using sharp

Upload endpoint:
```
POST /api/v1/upload/profile-photo
POST /api/v1/upload/document
```

## Database Models

### User
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  registrationId: String (auto-increment),
  profilePhoto: String,
  role: 'student' | 'admin',
  status: 'active' | 'inactive' | 'suspended',
  lastActive: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Student (extends User)
```javascript
{
  userId: ObjectId (ref: User),
  courses: [String],
  bio: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  documents: [String],
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  totalTests: Number,
  completedTests: Number,
  averageScore: Number
}
```

### TestPaper
```javascript
{
  title: String,
  description: String,
  course: String,
  duration: Number (minutes),
  totalMarks: Number,
  passingMarks: Number,
  questions: [{
    _id: ObjectId,
    text: String,
    options: [String],
    correctOption: Number,
    marks: Number
  }],
  status: 'active' | 'inactive',
  createdBy: ObjectId (ref: User, admin),
  createdAt: Date
}
```

### Result
```javascript
{
  studentId: ObjectId (ref: User),
  testPaperId: ObjectId (ref: TestPaper),
  selectedAnswers: [Number],
  score: Number,
  percentage: Number,
  status: 'pending' | 'evaluated' | 'passed' | 'failed',
  duration: Number (seconds taken),
  submittedAt: Date
}
```

### Activity
```javascript
{
  userId: ObjectId (ref: User),
  action: String (e.g., 'login', 'test_submitted'),
  resource: String,
  resourceId: ObjectId,
  ipAddress: String,
  userAgent: String,
  status: 'success' | 'failure',
  timestamp: Date
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- Verify network connectivity

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### JWT Token Issues
- Clear localStorage in browser
- Delete old .env file and create new from .env.example
- Regenerate JWT_SECRET

### CORS Errors
- Check CORS_ORIGIN in backend .env
- Ensure frontend is accessing correct API_URL
- Verify API_URL matches CORS_ORIGIN

## Development Commands

### Backend
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run seed         # Seed database with sample data
npm run logs         # View application logs
npm test             # Run tests (if configured)
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

## Performance Optimization

- MongoDB indexes on frequently queried fields
- Connection pooling (10 connections for production)
- Request compression with gzip
- Static asset caching headers
- Image optimization with sharp
- Code splitting in React build
- CSS modules for style isolation

## Monitoring & Logging

- Console logging with custom logger
- Log files saved to `logs/` directory
- Activity tracking for all user actions
- Request logging with Morgan
- Error tracking and reporting

## Support & Documentation

- API Documentation: See API Endpoints section above
- Database Schema: See Database Models section above
- Frontend Components: Check component files for JSDoc comments
- Backend Controllers: See controller files for implementation details

## License

This project is provided as-is for educational and commercial use.

## Contact & Support

For issues, feature requests, or support, please contact the development team.

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅

# Eduspace - File Structure & Navigation Guide

## 📋 Quick Navigation

### 📚 Documentation Files (READ THESE FIRST!)
```
QUICK_START.md          ← Start here! 5-minute setup guide
SETUP_GUIDE.md          ← Detailed production setup (40 pages)
API_REFERENCE.md        ← Complete API documentation (80+ endpoints)
DEPLOYMENT_GUIDE.md     ← How to deploy to production
PROJECT_SUMMARY.md      ← What's included in this project
```

---

## 🗂️ Complete Project File Structure

### Backend Files

#### Configuration & Setup
```
backend/
├── .env.example              ← Copy to .env and configure
├── package.json              ← Dependencies, scripts, version
├── Dockerfile                ← Docker image for production
├── docker-compose.yml        ← Local dev environment with MongoDB
├── .gitignore                ← Git configuration
└── README.md                 ← Backend-specific documentation
```

#### Main Application
```
backend/src/
├── server.js                 ← Express app, graceful shutdown
├── config/
│   ├── config.js            ← Centralized configuration validation
│   ├── database.js          ← MongoDB connection & pooling
│   └── env.js               ← Legacy environment setup
├── controllers/
│   ├── auth.controller.js   ← Authentication logic (7 methods)
│   └── admin.controller.js  ← Admin operations (16 methods)
├── models/
│   ├── User.js              ← User schema with helpers
│   ├── Student.model.js     ← Student profile schema
│   ├── TestPaper.model.js   ← Test questions & metadata
│   ├── Result.model.js      ← Test results & evaluation
│   └── Activity.model.js    ← Audit trail logging
├── routes/
│   ├── auth.routes.js       ← /auth endpoints
│   ├── admin.routes.js      ← /admin endpoints
│   ├── testPaper.routes.js  ← /test-papers endpoints
│   ├── result.routes.js     ← /results endpoints
│   ├── student.routes.js    ← /students endpoints
│   ├── activity.routes.js   ← /activities endpoints
│   ├── upload.routes.js     ← /upload endpoints
│   └── course.routes.js     ← /courses endpoints
├── middleware/
│   ├── auth.middleware.js         ← JWT verification
│   ├── error.middleware.js        ← Error handling & logging
│   ├── validation.middleware.js   ← Input validation rules
│   └── rateLimiter.middleware.js  ← Rate limiting config
└── utils/
    ├── logger.js            ← Custom logging system
    ├── response.js          ← Standardized API responses
    ├── constants.js         ← 100+ application constants
    ├── validators.js        ← Express-validator rules
    ├── fileUpload.js        ← Multer & image optimization
    └── seed.js              ← Database seeding script
```

### Frontend Files

#### Configuration & Setup
```
eduspace-react/
├── .env.example             ← Copy to .env and configure
├── vite.config.ts           ← Vite build configuration
├── tsconfig.json            ← TypeScript configuration
├── tsconfig.app.json        ← App-specific TS config
├── tsconfig.node.json       ← Node TS config
├── eslint.config.js         ← Linting rules
├── package.json             ← Dependencies, scripts, version
├── index.html               ← Entry HTML file
├── vercel.json              ← Vercel deployment config
├── README.md                ← Frontend documentation
└── .gitignore               ← Git configuration
```

#### Source Code
```
eduspace-react/src/
├── App.tsx                  ← Main application component
├── main.tsx                 ← Vite entry point
├── index.css                ← Global styles
├── style.scss               ← Additional global styles
├── vite-env.d.ts            ← Vite type definitions
├── custom.d.ts              ← Custom type definitions
│
├── services/
│   └── api.ts               ← 30+ API methods with types
│                             ├── authAPI (6 methods)
│                             ├── adminAPI (13 methods)
│                             ├── studentAPI (3 methods)
│                             ├── testAPI (2 methods)
│                             ├── resultAPI (3 methods)
│                             ├── courseAPI (2 methods)
│                             ├── activityAPI (1 method)
│                             ├── uploadAPI (2 methods)
│                             └── Token management
│
├── contexts/
│   └── AuthContext.tsx      ← Auth state management
│                             ├── useAuth hook
│                             ├── AuthProvider component
│                             └── Login/logout logic
│
├── routes/
│   └── AppRoutes.tsx        ← React Router configuration
│                             ├── Public routes
│                             ├── Protected routes
│                             └── Admin/Student routes
│
├── components/
│   ├── ProtectedRoute.tsx   ← Route protection wrappers
│   │   ├── PrivateRoute
│   │   ├── AdminRoute
│   │   └── StudentRoute
│   │
│   ├── auth/
│   │   ├── Login.tsx        ← Login page with validation
│   │   ├── Signup.tsx       ← Registration page
│   │   └── Auth.module.scss ← Auth page styling
│   │
│   ├── admin/
│   │   ├── AdminDashboard.tsx ← Dashboard with stats
│   │   ├── AdminDashboard.module.scss
│   │   ├── StudentManagement.tsx ← Manage students
│   │   └── StudentManagement.module.scss
│   │
│   ├── dashboard/
│   │   ├── StudentDashboard.tsx ← Student portal
│   │   └── StudentDashboard.module.scss
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.tsx ← Main layout with sidebar
│   │   └── DashboardLayout.module.scss
│   │
│   ├── about/               ← Marketing pages
│   ├── contact/
│   ├── courses/
│   ├── gallery/
│   ├── news/
│   ├── pricing/
│   └── [other pages]
│
├── common/
│   ├── Count.tsx
│   ├── Preloader.tsx        ← Loading component
│   ├── ScrollTop.tsx
│   └── [other utilities]
│
├── styles/
│   ├── index.scss           ← Global SCSS
│   └── [style modules]
│
└── types/
    └── wowjs.d.ts
```

#### Public Assets
```
eduspace-react/public/
├── _redirects               ← Vercel routing
├── bootstrap/
│   └── css/
├── assets/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   ├── scss/
│   └── [images & media]
```

---

## 📊 What Each File Does

### 🔐 Authentication Files
- `AuthContext.tsx` - Manages user login state globally
- `ProtectedRoute.tsx` - Prevents unauthorized access to pages
- `Login.tsx` - Login form with validation
- `Signup.tsx` - Registration form with validation

### 📡 API Communication
- `api.ts` - All backend API calls (30+ methods)
  - Token management (getToken, setToken, removeToken)
  - User storage (getStoredUser, setStoredUser)
  - All API endpoints from 7 service modules

### 🎨 UI Components
- `AdminDashboard.tsx` - Shows stats, top performers, activity
- `StudentDashboard.tsx` - Available tests, performance metrics
- `StudentManagement.tsx` - Admin interface for managing students
- `DashboardLayout.tsx` - Sidebar navigation and header

### 🔧 Backend Logic
- `server.js` - Express app initialization and middleware
- `auth.controller.js` - Registration, login, profile logic
- `admin.controller.js` - Admin operations (16 methods)
- Model files (User.js, TestPaper.model.js, etc.) - Database schemas

### ⚙️ Configuration
- `config.js` - Validates environment variables at startup
- `database.js` - MongoDB connection with pooling
- `logger.js` - Custom logging to console and files
- `constants.js` - 100+ application constants

### 🚀 Deployment
- `Dockerfile` - Docker image for backend
- `docker-compose.yml` - Local development stack
- `.env.example` - Template for environment variables
- Nginx config - Reverse proxy setup

---

## 📖 How to Read the Documentation

### For Quick Setup (5 minutes)
1. Read [QUICK_START.md](./QUICK_START.md)
2. Run the commands in order
3. Visit http://localhost:5173

### For Understanding the Project (30 minutes)
1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - What's included
2. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) - How everything works
3. Check [API_REFERENCE.md](./API_REFERENCE.md) - Available endpoints

### For Production Deployment (1 hour)
1. Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Choose your deployment option (Docker, AWS, Heroku, etc)
3. Follow step-by-step instructions

### For Backend Development
1. Check `backend/README.md` - Backend-specific info
2. Review `API_REFERENCE.md` - All endpoints documented
3. Look at `backend/src/routes/` - Endpoint implementations

### For Frontend Development
1. Check `eduspace-react/README.md` - Frontend-specific info
2. Review `src/components/` - Component examples
3. Check `src/services/api.ts` - API method examples

---

## 🔗 File Dependencies

```
Login Page
├── AuthContext.tsx (login method)
├── api.ts (authAPI.login)
├── React Router (navigate to dashboard)
└── localStorage (store token)

Student Dashboard
├── AuthContext.tsx (user info, logout)
├── api.ts (studentAPI, testAPI)
├── DashboardLayout.tsx (sidebar, header)
└── StudentDashboard.tsx (display)

Admin Dashboard
├── AuthContext.tsx (admin check)
├── api.ts (adminAPI)
├── DashboardLayout.tsx (sidebar, header)
└── AdminDashboard.tsx (display)

API Calls
├── api.ts (service methods)
├── AuthContext.tsx (token management)
├── localStorage (token persistence)
└── Backend (routes, controllers)
```

---

## 🚀 Starting Points by Role

### I'm a Student
1. Login: http://localhost:5173/login
2. Credentials: student1@example.com / password123
3. Go to Dashboard to see available tests
4. See [QUICK_START.md](./QUICK_START.md)

### I'm an Admin
1. Login: http://localhost:5173/login
2. Credentials: admin@example.com / password123
3. Go to Admin Dashboard to see metrics and manage students
4. See [API_REFERENCE.md](./API_REFERENCE.md)

### I'm a Developer
1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Check `backend/README.md` for backend details
3. Check `eduspace-react/README.md` for frontend details
4. Review the component source code in `src/components/`

### I'm Deploying to Production
1. Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Choose your deployment platform
3. Follow the step-by-step instructions
4. Configure SSL/TLS certificates

---

## 📝 Files by Category

### Configuration Files
- `.env.example` - Environment variables template
- `vite.config.ts` - Frontend build config
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies
- `.gitignore` - Git ignore rules

### Source Code (Frontend)
- `App.tsx` - Entry component
- `main.tsx` - Vite entry
- JavaScript/TypeScript files in `src/`
- SCSS files for styling

### Source Code (Backend)
- `server.js` - Express server
- Files in `src/` directory
- Controllers, models, routes, middleware

### Documentation
- `QUICK_START.md` - 5-minute setup
- `SETUP_GUIDE.md` - Detailed setup
- `API_REFERENCE.md` - API documentation
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `PROJECT_SUMMARY.md` - Project overview
- `FILE_STRUCTURE.md` - This file!
- `README.md` files in each folder

### Docker
- `Dockerfile` - Backend image
- `docker-compose.yml` - Local dev stack
- `.dockerignore` - Docker ignore file

---

## 🎯 Tips for Navigation

### To Find an Endpoint
1. Go to [API_REFERENCE.md](./API_REFERENCE.md)
2. Search for the endpoint
3. See curl examples and responses

### To Find a React Component
1. Go to `eduspace-react/src/components/`
2. Find the folder matching the page
3. Open the `.tsx` file

### To Find a Backend Route
1. Go to `backend/src/routes/`
2. Find the file matching the endpoint group
3. Open and find the specific route

### To Understand Data Flow
1. Frontend makes API call
2. Check `src/services/api.ts` for the method
3. Check backend route in `backend/src/routes/`
4. Check controller in `backend/src/controllers/`
5. Check model in `backend/src/models/`

---

## ✅ Verification Checklist

After setup, verify these files exist:

### Backend
- [ ] `backend/.env` exists (created from .env.example)
- [ ] `backend/src/server.js` exists
- [ ] `backend/src/config/config.js` exists
- [ ] `backend/src/controllers/` has 2 files
- [ ] `backend/src/models/` has 5 files
- [ ] `backend/src/routes/` has 8 files
- [ ] `backend/src/middleware/` has 4 files
- [ ] `backend/src/utils/` has 6 files

### Frontend
- [ ] `eduspace-react/.env` exists (created from .env.example)
- [ ] `eduspace-react/src/services/api.ts` exists
- [ ] `eduspace-react/src/contexts/AuthContext.tsx` exists
- [ ] `eduspace-react/src/routes/AppRoutes.tsx` exists
- [ ] `eduspace-react/src/components/auth/` has 2 pages
- [ ] `eduspace-react/src/components/admin/` has 2 pages
- [ ] `eduspace-react/src/components/dashboard/` has 1 page
- [ ] `eduspace-react/src/components/layouts/` has 1 layout

### Documentation
- [ ] `QUICK_START.md` exists
- [ ] `SETUP_GUIDE.md` exists
- [ ] `API_REFERENCE.md` exists
- [ ] `DEPLOYMENT_GUIDE.md` exists
- [ ] `PROJECT_SUMMARY.md` exists

---

## 🔗 Quick Links

| Document | Purpose | Time |
|----------|---------|------|
| [QUICK_START.md](./QUICK_START.md) | Get running in 5 minutes | 5 min |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Complete setup & features | 30 min |
| [API_REFERENCE.md](./API_REFERENCE.md) | All endpoints documented | Reference |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Deploy to production | 1 hour |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | What's included | 10 min |

---

## 📞 Getting Help

### If Setup Fails
1. Check [QUICK_START.md](./QUICK_START.md) troubleshooting section
2. Check backend logs: `docker-compose logs backend`
3. Verify .env files are created
4. Ensure MongoDB is running

### If API Returns Errors
1. Check [API_REFERENCE.md](./API_REFERENCE.md) for endpoint details
2. Verify Authorization header with token
3. Check backend logs for errors
4. Review input validation requirements

### If Frontend Won't Load
1. Verify backend is running (`npm run dev` in backend folder)
2. Check browser console for errors (F12)
3. Verify .env has correct VITE_API_URL
4. Clear browser cache and localStorage

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅

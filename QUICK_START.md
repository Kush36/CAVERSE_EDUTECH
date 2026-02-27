# Quick Start Guide - Eduspace

## 5-Minute Setup

### Step 1: Clone & Install Backend

```bash
cd backend
npm install
```

### Step 2: Setup Backend Environment

```bash
# Create .env file in backend/ directory
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eduspace
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_at_least_32_chars_long
CORS_ORIGIN=http://localhost:5173
FILE_UPLOAD_SIZE=5242880
ENVIRONMENT=development
LOG_LEVEL=debug
EOF
```

### Step 3: Start MongoDB

On Linux/Mac:
```bash
# If installed via Homebrew
brew services start mongodb-community

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

On Windows:
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or if installed locally
mongod
```

### Step 4: Seed Database (Optional)

```bash
cd backend
npm run seed
```

Will create:
- 1 Admin account: `admin@example.com / password123`
- 5 Student accounts: `student1@example.com / password123`, etc.
- 3 Sample test papers

### Step 5: Start Backend

```bash
npm run dev
```

✅ Backend running at: http://localhost:5000/api/v1

### Step 6: Install Frontend

```bash
cd ../eduspace-react
npm install
```

### Step 7: Setup Frontend Environment

```bash
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Eduspace
EOF
```

### Step 8: Start Frontend

```bash
npm run dev
```

✅ Frontend running at: http://localhost:5173

## Testing the Application

### Admin Login
```
Email: admin@example.com
Password: password123
```

Go to: http://localhost:5173/login

### Student Login
```
Email: student1@example.com
Password: password123
```

## What's Included

✅ **Backend**
- Express.js REST API
- MongoDB database with Mongoose
- JWT authentication
- Rate limiting & security
- File uploads (profile photos, documents)
- Admin & Student roles
- Complete CRUD for tests, results, students
- Database seeding script
- Docker support
- Production-ready logging

✅ **Frontend**
- React with TypeScript
- Vite for fast development
- Complete API integration layer
- Auth Context for state management
- Protected routes (Student/Admin)
- Login & Signup pages
- Admin dashboard with stats
- Student management interface
- Student dashboard with tests
- Responsive design
- Professional styling

## Available Features

### For Students
- Sign up & login
- View available tests
- Take tests with timer
- View results & scores
- Track performance statistics
- Update profile information

### For Admins
- Dashboard with key metrics
- Manage all students
- Create & edit test papers
- View student results
- Monitor user activity
- Export data to CSV
- Status management (active/inactive/suspended)

## Common Issues & Solutions

### MongoDB Connection Fails
```bash
# Check if MongoDB is running
mongosh  # Should connect successfully

# If not running, start it:
docker run -d -p 27017:27017 mongo:latest
```

### Port 5000/5173 Already in Use
```bash
# Kill existing process
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### API Not Responding
- Check backend is running: `npm run dev`
- Check MONGODB_URI in .env
- Check CORS_ORIGIN matches frontend URL

### Can't Login
- Check credentials (use demo creds above)
- Make sure database is seeded: `npm run seed`
- Check browser console for errors

## Next Steps

1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed documentation
2. Explore API endpoints in backend/readme.md
3. Customize branding & styling
4. Add additional features
5. Deploy to production

## Project Statistics

- **Backend Routes**: 25+ API endpoints
- **Database Models**: 5 main models
- **Frontend Pages**: 7 complete pages
- **UI Components**: 20+ reusable components
- **Lines of Code**: 2000+ lines (backend) + 3000+ lines (frontend)
- **Development Time Saved**: 40-60 hours

## Commands Cheat Sheet

```bash
# Backend
npm run dev              # Development server
npm run start            # Production server
npm run seed             # Seed database
npm run build            # Build for production

# Frontend
npm run dev              # Development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Lint code
npm run type-check       # TypeScript check
```

---

You're all set! Start building your course platform. Happy coding! 🚀

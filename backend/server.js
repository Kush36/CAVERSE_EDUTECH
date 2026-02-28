require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const helmet      = require('helmet');
const morgan      = require('morgan');
const rateLimit   = require('express-rate-limit');
const path        = require('path');

const connectDB      = require('./src/config/db');
const errorHandler   = require('./src/middleware/errorHandler');

// ── routes ────────────────────────────────────────────────────────────────────
const authRoutes       = require('./src/routes/auth');
const studentRoutes    = require('./src/routes/students');
const courseRoutes     = require('./src/routes/courses');
const questionRoutes   = require('./src/routes/questions');
const submissionRoutes = require('./src/routes/submissions');
const newsRoutes       = require('./src/routes/news');
const eventRoutes      = require('./src/routes/events');
const contactRoutes    = require('./src/routes/contact');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── security & logging ────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── body parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── static uploads ────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) =>
  res.json({ success: true, message: 'CAVERSE EduTech API is running', timestamp: new Date() })
);

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/students',    studentRoutes);
app.use('/api/courses',     courseRoutes);
app.use('/api/questions',   questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/news',        newsRoutes);
app.use('/api/events',      eventRoutes);
app.use('/api/contact',     contactRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
);

// ── global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── seed data ─────────────────────────────────────────────────────────────────
const seedData = async () => {
  const Course = require('./src/models/Course');
  const User   = require('./src/models/User');

  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    await Course.insertMany([
      {
        title: 'CA Foundation',
        description:
          'The entry-level course for CA aspirants covering Principles and Practices of Accounting, Business Laws, Business Mathematics, and Business Economics.',
        level: 'Foundation',
        syllabus:
          'Paper 1: Principles and Practices of Accounting | Paper 2: Business Laws & Business Correspondence | Paper 3: Business Mathematics | Paper 4: Business Economics',
        totalQuestions: 200,
        durationWeeks: 16,
        price: 4999,
        instructor: 'Prof. Ramesh Sharma',
        isActive: true,
      },
      {
        title: 'CA Intermediate',
        description:
          'The intermediate level covering Accounting, Corporate Laws, Cost & Management Accounting, Taxation, and Auditing.',
        level: 'Intermediate',
        syllabus:
          'Group 1: Accounting, Corporate & Other Laws, Cost & Mgt. Accounting, Taxation | Group 2: Advanced Accounting, Auditing & Assurance, Enterprise IT & SM, Financial Management',
        totalQuestions: 400,
        durationWeeks: 32,
        price: 9999,
        instructor: 'CA Priya Nair',
        isActive: true,
      },
      {
        title: 'CA Final',
        description:
          'The final and most advanced level of CA covering Financial Reporting, Strategic Financial Management, Advanced Auditing, and more.',
        level: 'Final',
        syllabus:
          'Group 1: Financial Reporting, SFM, Advanced Auditing & Professional Ethics, Corporate & Economic Laws | Group 2: Strategic Cost Management, Elective Paper, Direct Tax Laws, Indirect Tax Laws',
        totalQuestions: 600,
        durationWeeks: 48,
        price: 14999,
        instructor: 'CA Anil Mehta',
        isActive: true,
      },
    ]);
    console.log('✅  Seeded 3 courses');
  }

  const adminCount = await User.countDocuments({ role: 'admin' });
  if (adminCount === 0) {
    await User.create({
      firstName: 'Admin',
      lastName:  'CAVERSE',
      email:     'admin@caverse.in',
      password:  'Admin@123456',
      phone:     '9999999999',
      role:      'admin',
      isVerified: true,
      status:    'active',
    });
    console.log('✅  Seeded admin user  →  admin@caverse.in / Admin@123456');
  }
};

// ── start server ──────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  await seedData();
  app.listen(PORT, () => {
    console.log(`🚀  Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
};

start();

const Course          = require('../models/Course');
const Question        = require('../models/Question');
const QuestionAttempt = require('../models/QuestionAttempt');
const User            = require('../models/User');

// ── list courses ──────────────────────────────────────────────────────────────
exports.getCourses = async (req, res, next) => {
  try {
    const { level, search, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true };

    if (level)  filter.level = level;
    if (search) filter.$or = [
      { title:       { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .select('-enrolledStudents')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        courses,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── course detail ─────────────────────────────────────────────────────────────
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).select('-enrolledStudents');
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: { course } });
  } catch (err) {
    next(err);
  }
};

// ── questions for a course (student must be enrolled) ────────────────────────
exports.getCourseQuestions = async (req, res, next) => {
  try {
    const { id: courseId } = req.params;
    const { page = 1, limit = 10, difficulty } = req.query;

    // Check enrollment
    const user = await User.findById(req.user._id);
    const enrolled = user.enrolledCourses.map(String).includes(String(courseId));
    if (!enrolled && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You must be enrolled in this course' });
    }

    const filter = { courseId, isActive: true };
    if (difficulty) filter.difficulty = difficulty;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Question.countDocuments(filter);
    const questions = await Question.find(filter)
      .select('-solution -explanation')
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: {
        questions,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── progress in a course ──────────────────────────────────────────────────────
exports.getCourseProgress = async (req, res, next) => {
  try {
    const { id: courseId } = req.params;
    const studentId = req.user._id;

    const [course, totalQuestions, solvedAttempts] = await Promise.all([
      Course.findById(courseId).select('title level totalQuestions'),
      Question.countDocuments({ courseId, isActive: true }),
      QuestionAttempt.countDocuments({ studentId, solved: true }),
    ]);

    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const progress = totalQuestions > 0 ? Math.round((solvedAttempts / totalQuestions) * 100) : 0;

    res.json({
      success: true,
      data: { course, totalQuestions, solvedAttempts, progress },
    });
  } catch (err) {
    next(err);
  }
};

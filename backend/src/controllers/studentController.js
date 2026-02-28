const User            = require('../models/User');
const Course          = require('../models/Course');
const QuestionAttempt = require('../models/QuestionAttempt');
const Submission      = require('../models/Submission');
const { validationResult } = require('express-validator');

// ── dashboard ─────────────────────────────────────────────────────────────────
exports.getDashboard = async (req, res, next) => {
  try {
    const studentId = req.user._id;

    const [user, questionsSolved, submissions] = await Promise.all([
      User.findById(studentId).populate('enrolledCourses', 'title level durationWeeks totalQuestions'),
      QuestionAttempt.countDocuments({ studentId, solved: true }),
      Submission.find({ studentId }).select('status courseId submissionDate').populate('courseId', 'title'),
    ]);

    // Progress per enrolled course
    const courseProgress = await Promise.all(
      (user.enrolledCourses || []).map(async (course) => {
        const Question = require('../models/Question');
        const courseQuestions = await Question.find({ courseId: course._id, isActive: true }).select('_id');
        const questionIds = courseQuestions.map((q) => q._id);
        const solved = await QuestionAttempt.countDocuments({
          studentId,
          questionId: { $in: questionIds },
          solved: true,
        });
        const total = questionIds.length;
        return {
          course,
          questionsAttempted: solved,
          totalQuestions: total,
          progress: total > 0 ? Math.round((solved / total) * 100) : 0,
        };
      })
    );

    res.json({
      success: true,
      data: {
        enrolledCoursesCount: user.enrolledCourses.length,
        questionsSolved,
        submissionsCount: submissions.length,
        courseProgress,
        recentSubmissions: submissions.slice(-5).reverse(),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── profile ───────────────────────────────────────────────────────────────────
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses', 'title level');
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const allowed = ['firstName', 'lastName', 'phone', 'profilePicture'];
    const updates = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).populate('enrolledCourses', 'title level');

    res.json({ success: true, message: 'Profile updated', data: { user } });
  } catch (err) {
    next(err);
  }
};

// ── enrollments ───────────────────────────────────────────────────────────────
exports.getEnrollments = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'enrolledCourses',
      select: 'title level description durationWeeks price instructor isActive',
    });
    res.json({ success: true, data: { courses: user.enrolledCourses } });
  } catch (err) {
    next(err);
  }
};

exports.enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'courseId is required' });
    }

    const course = await Course.findById(courseId);
    if (!course || !course.isActive) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    if (user.enrolledCourses.map(String).includes(String(courseId))) {
      return res.status(409).json({ success: false, message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save({ validateBeforeSave: false });

    // Also push to course's enrolledStudents
    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: user._id } });

    res.status(201).json({ success: true, message: 'Enrolled successfully', data: { courseId } });
  } catch (err) {
    next(err);
  }
};

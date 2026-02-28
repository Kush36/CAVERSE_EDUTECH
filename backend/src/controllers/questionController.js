const Question        = require('../models/Question');
const QuestionAttempt = require('../models/QuestionAttempt');
const User            = require('../models/User');

// ── list questions ────────────────────────────────────────────────────────────
exports.getQuestions = async (req, res, next) => {
  try {
    const { courseId, difficulty, category, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true };

    if (courseId)   filter.courseId   = courseId;
    if (difficulty) filter.difficulty = difficulty;
    if (category)   filter.category   = category;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Question.countDocuments(filter);
    const questions = await Question.find(filter)
      .select('-solution -explanation')
      .skip(skip)
      .limit(Number(limit))
      .populate('courseId', 'title level');

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

// ── student solving statistics ────────────────────────────────────────────────
exports.getStatistics = async (req, res, next) => {
  try {
    const studentId = req.user._id;

    const [total, solved, byDifficulty] = await Promise.all([
      QuestionAttempt.countDocuments({ studentId }),
      QuestionAttempt.countDocuments({ studentId, solved: true }),
      QuestionAttempt.aggregate([
        { $match: { studentId: req.user._id } },
        { $lookup: { from: 'questions', localField: 'questionId', foreignField: '_id', as: 'q' } },
        { $unwind: '$q' },
        { $group: { _id: '$q.difficulty', count: { $sum: 1 }, solved: { $sum: { $cond: ['$solved', 1, 0] } } } },
      ]),
    ]);

    res.json({
      success: true,
      data: { totalAttempts: total, solved, unsolved: total - solved, byDifficulty },
    });
  } catch (err) {
    next(err);
  }
};

// ── question detail ────────────────────────────────────────────────────────────
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id).populate('courseId', 'title level');
    if (!question || !question.isActive) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Verify enrollment before showing solution
    const user     = await User.findById(req.user._id);
    const enrolled = user.enrolledCourses.map(String).includes(String(question.courseId._id));
    if (!enrolled && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You must be enrolled in this course' });
    }

    res.json({ success: true, data: { question } });
  } catch (err) {
    next(err);
  }
};

// ── attempt a question ────────────────────────────────────────────────────────
exports.attemptQuestion = async (req, res, next) => {
  try {
    const studentId  = req.user._id;
    const questionId = req.params.id;
    const { solved = false, timeTaken = 0, marksObtained = 0 } = req.body;

    const question = await Question.findById(questionId);
    if (!question || !question.isActive) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Upsert attempt
    const attempt = await QuestionAttempt.findOneAndUpdate(
      { studentId, questionId },
      { solved, timeTaken, marksObtained, attemptDate: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Attempt recorded', data: { attempt } });
  } catch (err) {
    next(err);
  }
};

const path       = require('path');
const Submission = require('../models/Submission');
const Course     = require('../models/Course');

// ── upload answer sheet ───────────────────────────────────────────────────────
exports.uploadSubmission = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'courseId is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const submission = await Submission.create({
      studentId: req.user._id,
      courseId,
      fileUrl:   `/uploads/${req.file.filename}`,
      fileName:  req.file.originalname,
    });

    res.status(201).json({ success: true, message: 'Submission uploaded', data: { submission } });
  } catch (err) {
    next(err);
  }
};

// ── list student's submissions (paginated) ────────────────────────────────────
exports.getSubmissions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = { studentId: req.user._id };
    if (status) filter.status = status;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Submission.countDocuments(filter);
    const submissions = await Submission.find(filter)
      .populate('courseId', 'title level')
      .skip(skip)
      .limit(Number(limit))
      .sort({ submissionDate: -1 });

    res.json({
      success: true,
      data: {
        submissions,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── submission detail ─────────────────────────────────────────────────────────
exports.getSubmissionById = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('courseId', 'title level')
      .populate('evaluatedBy', 'firstName lastName');

    if (!submission) return res.status(404).json({ success: false, message: 'Submission not found' });

    // Students can only view their own; admins can view all
    if (req.user.role !== 'admin' && String(submission.studentId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: { submission } });
  } catch (err) {
    next(err);
  }
};

// ── update status (admin) ─────────────────────────────────────────────────────
exports.updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'under_review', 'evaluated', 'revision_required'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ success: false, message: 'Submission not found' });

    res.json({ success: true, message: 'Status updated', data: { submission } });
  } catch (err) {
    next(err);
  }
};

// ── evaluate submission (admin) ───────────────────────────────────────────────
exports.evaluateSubmission = async (req, res, next) => {
  try {
    const { score, feedback } = req.body;
    if (score === undefined) {
      return res.status(400).json({ success: false, message: 'score is required' });
    }

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      {
        evaluationScore: score,
        feedback,
        evaluatedBy:   req.user._id,
        evaluatedDate: new Date(),
        status:        'evaluated',
      },
      { new: true }
    );
    if (!submission) return res.status(404).json({ success: false, message: 'Submission not found' });

    res.json({ success: true, message: 'Submission evaluated', data: { submission } });
  } catch (err) {
    next(err);
  }
};

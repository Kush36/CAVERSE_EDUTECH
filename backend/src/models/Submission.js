const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },
    courseId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    fileUrl:   { type: String, required: true },
    fileName:  { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'evaluated', 'revision_required'],
      default: 'pending',
    },
    evaluationScore: { type: Number, default: null },
    feedback:        { type: String, default: null },
    evaluatedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    evaluatedDate:   { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);

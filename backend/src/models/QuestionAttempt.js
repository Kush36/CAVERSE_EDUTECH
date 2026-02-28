const mongoose = require('mongoose');

const questionAttemptSchema = new mongoose.Schema(
  {
    studentId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',     required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    solved:     { type: Boolean, default: false },
    attemptDate:{ type: Date, default: Date.now },
    timeTaken:  { type: Number, default: 0 }, // seconds
    marksObtained: { type: Number, default: 0 },
  },
  { timestamps: true }
);

questionAttemptSchema.index({ studentId: 1, questionId: 1 });

module.exports = mongoose.model('QuestionAttempt', questionAttemptSchema);

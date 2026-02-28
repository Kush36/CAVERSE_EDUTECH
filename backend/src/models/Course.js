const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ['Foundation', 'Intermediate', 'Final'],
      required: true,
    },
    syllabus:       { type: String },
    totalQuestions: { type: Number, default: 0 },
    durationWeeks:  { type: Number },
    price:          { type: Number, default: 0 },
    instructor:     { type: String },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title:      { type: String, required: true, trim: true },
    content:    { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    marks:      { type: Number, default: 1 },
    solution:   { type: String },
    explanation:{ type: String },
    category:   { type: String },
    tags:       [{ type: String }],
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);

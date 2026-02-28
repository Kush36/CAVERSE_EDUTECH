const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date:        { type: Date,   required: true },
    time:        { type: String },
    location:    { type: String },
    registrationLimit: { type: Number, default: null },
    registeredStudents:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    googleFormUrl:{ type: String },
    category:    { type: String },
    image:       { type: String },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);

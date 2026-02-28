const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, select: false },
    phone:     { type: String, trim: true },
    role:      { type: String, enum: ['student', 'admin'], default: 'student' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    profilePicture:  { type: String, default: null },
    isVerified:      { type: Boolean, default: false },
    resetToken:      { type: String, default: null },
    resetTokenExpiry:{ type: Date,   default: null },
    enrollmentDate:  { type: Date,   default: Date.now },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    refreshToken: { type: String, default: null, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.resetToken;
  delete obj.resetTokenExpiry;
  return obj;
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  description: { type: String },
  maxSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
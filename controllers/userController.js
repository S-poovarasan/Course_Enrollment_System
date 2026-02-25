const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createInstructor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'instructor' });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' });
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

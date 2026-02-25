const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Course.deleteMany();

  const admin = new User({ name: 'Admin', email: 'admin@gmail.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });
  const instructor = new User({ name: 'Instructor', email: 'instructor@mail.com', password: await bcrypt.hash('instructor123', 10), role: 'instructor' });
  const student = new User({ name: 'Student', email: 'student@mail.com', password: await bcrypt.hash('student123', 10), role: 'student' });
  await admin.save();
  await instructor.save();
  await student.save();

  const course1 = new Course({
    courseName: 'Math 101',
    courseCode: 'MATH101',
    description: 'Basic Mathematics',
    maxSeats: 2,
    availableSeats: 2,
    instructor: instructor._id,
    students: [],
  });
  await course1.save();

  console.log('Seed data created');
  process.exit();
};

seed();

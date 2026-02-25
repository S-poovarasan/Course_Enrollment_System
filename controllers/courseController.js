const Course = require('../models/Course');
const User = require('../models/User');

// Admin: Create course
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseCode, description, maxSeats, instructor } = req.body;
    const course = new Course({
      courseName,
      courseCode,
      description,
      maxSeats,
      availableSeats: maxSeats,
      instructor,
      students: [],
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.maxSeats) {
      const course = await Course.findById(id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      const diff = updates.maxSeats - course.maxSeats;
      updates.availableSeats = course.availableSeats + diff;
    }
    const updated = await Course.findByIdAndUpdate(id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Assign instructor
exports.assignInstructor = async (req, res) => {
  try {
    const { courseId, instructorId } = req.body;
    const course = await Course.findByIdAndUpdate(courseId, { instructor: instructorId }, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: View enrollments
exports.getEnrollments = async (req, res) => {
  try {
    const courses = await Course.find().populate('students', 'name email');
    const result = courses.map(c => ({
      courseName: c.courseName,
      courseCode: c.courseCode,
      totalEnrolled: c.students.length,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Instructor: View assigned courses
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Instructor: View enrolled students
exports.getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('students', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course.students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: View own enrolled courses
exports.getMyCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courses = await Course.find({ students: studentId }).populate('instructor', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: View all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: Enroll in course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.availableSeats <= 0) return res.status(400).json({ message: 'No seats available' });
    if (course.students.includes(studentId)) return res.status(400).json({ message: 'Already enrolled' });
    course.students.push(studentId);
    course.availableSeats -= 1;
    await course.save();
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: Drop course
exports.dropCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.students.includes(studentId)) return res.status(400).json({ message: 'Not enrolled in this course' });
    course.students = course.students.filter(s => s.toString() !== studentId);
    course.availableSeats += 1;
    await course.save();
    res.json({ message: 'Dropped course successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const courseCtrl = require('../controllers/courseController');

// Admin
router.post('/', auth('admin'), courseCtrl.createCourse);
router.put('/:id', auth('admin'), courseCtrl.updateCourse);
router.delete('/:id', auth('admin'), courseCtrl.deleteCourse);
router.post('/assign-instructor', auth('admin'), courseCtrl.assignInstructor);
router.get('/enrollments', auth('admin'), courseCtrl.getEnrollments);

// Instructor
router.get('/instructor', auth('instructor'), courseCtrl.getInstructorCourses);
router.get('/:id/students', auth('instructor'), courseCtrl.getCourseStudents);

// Student
router.get('/', auth(['student', 'admin', 'instructor']), courseCtrl.getAllCourses);
router.get('/my', auth('student'), courseCtrl.getMyCourses);
router.post('/enroll', auth('student'), courseCtrl.enrollCourse);
router.post('/drop', auth('student'), courseCtrl.dropCourse);

module.exports = router;

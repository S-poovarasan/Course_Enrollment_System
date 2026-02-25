const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createInstructor, getInstructors, getStudents } = require('../controllers/userController');

// Admin only
router.post('/instructors', auth('admin'), createInstructor);
router.get('/instructors', auth(['admin']), getInstructors);
router.get('/students', auth(['admin', 'instructor']), getStudents);

module.exports = router;

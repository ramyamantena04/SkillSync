const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');  // <-- new import

// Get all courses (no change)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

// Enroll user in a course (updated to use authMiddleware)
router.post('/enroll', authMiddleware, async (req, res) => {
try {
    const userId = req.userId; // from auth middleware
    const { courseId, pace, level } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses?.some(
    (ec) => ec.course.toString() === courseId
    );
    if (alreadyEnrolled) return res.status(400).json({ message: 'Already enrolled' });

    // Add new enrollment
    user.enrolledCourses = user.enrolledCourses || [];
    user.enrolledCourses.push({
    course: courseId,
    pace: pace || 'medium',
    level: level || 'beginner',
      roadmap: {}, // you will generate this later
    progress: 0,
    });

    await user.save();

    res.json({ message: 'Enrolled successfully' });
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

module.exports = router;
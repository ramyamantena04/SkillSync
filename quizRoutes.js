const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all quiz questions (for recommendation quiz)
router.get('/questions', async (req, res) => {
try {
    const questions = await Question.find();
    res.json(questions);
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});

// Submit quiz answers & return recommended courses (dummy example)
router.post('/submit', (req, res) => {
const { answers } = req.body;

  // TODO: implement quiz logic here to recommend courses
  // For now, send dummy recommended courses
const recommendedCourses = [
    { id: 'courseId1', title: 'JavaScript Basics' },
    { id: 'courseId2', title: 'React for Beginners' }
];

res.json({ recommendedCourses });
});

module.exports = router;
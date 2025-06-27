const mongoose = require('mongoose');
const Course = require('../SkillSync/Course');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected for seeding');

  const courses = [
    {
      title: 'JavaScript Basics',
      platform: 'YouTube',
      level: 'Beginner',
      url: 'https://youtube.com/playlist?list=JS-Basics',
      description: 'Learn JavaScript from scratch',
      tags: ['JavaScript', 'Beginner', 'Frontend']
    },
    {
      title: 'React for Beginners',
      platform: 'Coursera',
      level: 'Intermediate',
      url: 'https://coursera.org/react-course',
      description: 'Hands-on React course for frontend developers',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      title: 'Node.js Fundamentals',
      platform: 'Udemy',
      level: 'Advanced',
      url: 'https://udemy.com/nodejs-course',
      description: 'Backend development using Node.js',
      tags: ['Node.js', 'Backend', 'JavaScript']
    }
  ];

  await Course.deleteMany({});
  await Course.insertMany(courses);

  console.log('✅ Seed data inserted');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Seeding error:', err.message);
});
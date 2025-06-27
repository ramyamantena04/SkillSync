const path = require('path');
console.log('⏳ Trying to import Course model from:', path.resolve(__dirname, '../SkillSync/Course'));

try {
  const Course = require('../SkillSync/Course'); // Adjust path here as per structure
  console.log('✅ Successfully imported Course model!');
} catch (err) {
  console.error('❌ Failed to import Course model:', err.message);
}
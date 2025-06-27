const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true }, // eg: YouTube, Coursera
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  url: { type: String, required: true },
  description: { type: String },
  tags: [String]
});

module.exports = mongoose.model("Course", courseSchema);

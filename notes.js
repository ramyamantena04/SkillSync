const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  content: { type: String },
  drawings: { type: String }, // base64 or image reference
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", noteSchema);

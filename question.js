const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    {
      label: { type: String },
      value: { type: String }
    }
  ],
  category: { type: String } // example: "interests", "skills", etc.
});

module.exports = mongoose.model("Question", questionSchema);

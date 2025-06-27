const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Sample test route
app.get("/", (req, res) => {
    res.send("SkillSync Backend is running 🧠✨");
});

// Import and use routes here (after you create them)
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/quiz", require("./routes/quizRoutes"));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


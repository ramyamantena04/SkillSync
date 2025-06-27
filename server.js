const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
//Routes
app.use("/api/auth", require("./routes/authRoutes"));



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Sample test route
const path = require("path");

// Serve static files from client folder

app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index1.html"));
});



// Uncomment when routes are ready
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/quiz", require("./routes/quizRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
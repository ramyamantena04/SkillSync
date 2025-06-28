// const express = require('express');
// const router = express.Router();
// const User = require('../models/user'); // path may change depending on your folder structure

// router.post('/', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     const savedUser = await newUser.save();
//     res.status(201).json({ message: "User created", user: savedUser });
// } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Make sure path is correct

// 🧪 Test route
router.get('/test', async (req, res) => {
try {
    const users = await User.find(); // Fetch all users
    res.json(users); // Return them as JSON
} catch (err) {
    res.status(500).send("Error fetching users");
}
});

module.exports = router;
const mongoose = require("mongoose");
const User = require("./user"); // not ./models/User since you're already in models/

mongoose.connect("mongodb://localhost:27017/skillSyncDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const newUser = new User({
  name: "Sweety",
  email: "sweety123@example.com",
  password: "securepassword123"
});

newUser.save()
  .then(doc => {
    console.log("User inserted:", doc);
  })
  .catch(err => {
    console.error("Error:", err);
  });

const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  loginAt: {
    type: Date,
    default: Date.now,
  },
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
const mongoose = require("mongoose");

// definisikan model
exports.UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
        name: { type: String, default: null },
      email: { type: String, unique: true },
      password: { type: String },
    }
  )
);
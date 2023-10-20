const mongoose = require("mongoose");

// definisikan model
exports.UserModel = mongoose.model(
  "User",
  new mongoose.Schema({
    nama: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: {type: String, default: 'admin'}
  })
);

const mongoose = require("mongoose");

// definisikan model
exports.BarangModel = mongoose.model(
  "Barang",
  new mongoose.Schema({
    nama: { type: String },
    tipeKerusakan: { type: String },
    harga: { type: Number, default: 0 },
  })
);

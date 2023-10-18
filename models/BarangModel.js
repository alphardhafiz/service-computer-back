const mongoose = require("mongoose");

// definisikan model
exports.BarangModel = mongoose.model(
  "Barang",
  new mongoose.Schema({
    namaBarang: { type: String },
    tipeKerusakan: { type: String },
    harga: { type: Number, default: 0 },
    status: {type: String, default: "belum dikerjakan"},
    hpCustomer: {type: String},
    namaCustomer: { type: String}
  })
);

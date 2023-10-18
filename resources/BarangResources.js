const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BarangModel } = require("../models/BarangModel");
const IsAuthenticated = require("../middleware/IsAuthenticated");
const { default: mongoose } = require("mongoose");


app.post("/", [IsAuthenticated], async (req, res) => {
  const response = await BarangModel.create(req.body);
  return res.status(201).json(response);
});

app.get("", [IsAuthenticated], async (req, res) => {
  const barangs = await BarangModel.find();
  return res.status(200).json(barangs);
});



app.get("/:hpCustomer", async (req, res) => {


  const barang = await BarangModel.find({
    "hpCustomer": req.params.hpCustomer});
  if (!barang) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }
  return res.status(200).json(barang);
});

app.put("/:id", [IsAuthenticated], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }

  const result = await BarangModel.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );

  return res.status(200).json(result);
});

app.delete("/:id", [IsAuthenticated], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }
  await BarangModel.findOneAndDelete({ _id: req.params.id });

  return res.status(204).json({message: 'barang berhasil dihapus'});
});

module.exports = app;

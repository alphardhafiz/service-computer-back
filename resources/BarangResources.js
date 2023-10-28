const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BarangModel } = require("../models/BarangModel");
const IsAuthenticated = require("../middleware/IsAuthenticated");
const { default: mongoose } = require("mongoose");
const { sendEmail } = require("../utils/EmailUtils");

app.post("/", [IsAuthenticated], async (req, res) => {
  const response = await BarangModel.create(req.body);
  return res.status(201).json(response);
});

app.get("", [IsAuthenticated], async (req, res) => {
  const barangs = await BarangModel.find();
  return res.status(200).json(barangs);
});

app.get("/:id", [IsAuthenticated], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }

  const barang = await BarangModel.findById(req.params.id, { __v: 0 });
  if (!barang) {
    return res.status(404).json({ detail: "404 Resource not found" });
  }
  return res.status(200).json(barang);
});

app.get("/customerList/:hpCustomer", async (req, res) => {
  const barang = await BarangModel.find({
    hpCustomer: req.params.hpCustomer,
  });
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

  return res.status(204).json({ message: "barang berhasil dihapus" });
});

app.put("/:id/dikerjakan", [IsAuthenticated], async (req, res) => {
  const barang1 = await BarangModel.findOne({ _id: req.params.id });
  if (barang1.status !== "belum dikerjakan") {
    return res.status(403).json({ message: "barang belum bisa dikerjakan" });
  }

  const barang = await BarangModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "sedang dikerjakan" },
    { new: true }
  );

  return res.status(200).json(barang);
});

app.put("/:id/selesai", [IsAuthenticated], async (req, res) => {
  const barang1 = await BarangModel.findOne({ _id: req.params.id });
  if (barang1.status !== "sedang dikerjakan") {
    return res.status(403).json({ message: "barang belum selesai dikerjakan" });
  }
  const barang = await BarangModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "selesai dikerjakan" },
    { new: true }
  );

  return res.status(200).json(barang);
});

app.put("/:id/ambil", [IsAuthenticated], async (req, res) => {
  const barang1 = await BarangModel.findOne({ _id: req.params.id });
  if (barang1.status !== "selesai dikerjakan") {
    return res.status(403).json({ message: "barang belum bisa diambil" });
  }
  const barang = await BarangModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "sudah diambil" },
    { new: true }
  );

  return res.status(200).json(barang);
});

app.put("/:id/antar", [IsAuthenticated], async (req, res) => {
  const barang1 = await BarangModel.findOne({ _id: req.params.id });
  if (barang1.status !== "selesai dikerjakan") {
    return res.status(403).json({ message: "barang belum bisa diantar" });
  }
  const barang = await BarangModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "sedang diantar" },
    { new: true }
  );

  return res.status(200).json(barang);
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, phone, message } = req.body;

  if (!name || !email || !subject || !phone || !message)
    return res.status(422).json({ message: "isi form dengan lengkap" });

  sendEmail(name, email, subject, phone, message)

  return res.status(200).json({message: `Email Berhasil Dikiim`})
});

module.exports = app;

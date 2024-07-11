const express = require("express");
const router = express.Router();
const Label = require("../models/Label.model");

// Get all labels
router.get("/", async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new label
router.post("/", async (req, res) => {
  const { id, label } = req.body;

  if (!id || !label) {
    return res.status(400).json({ message: "Both id and label are required" });
  }

  const newLabel = new Label({ id, label });

  try {
    const savedLabel = await newLabel.save();
    res.status(201).json(savedLabel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

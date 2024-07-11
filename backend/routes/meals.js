const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal.model");

// Get all meals
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new meal
router.post("/", async (req, res) => {
  const { id, title, starter, desert, price, labels, img, drinks } = req.body;

  // Check if all required fields are provided
  if (
    !id ||
    !title ||
    !starter ||
    !desert ||
    !price ||
    !labels ||
    !img ||
    !drinks
  ) {
    return res
      .status(400)
      .json({ message: "All details are required to create a meal" });
  }

  const newMeal = new Meal({
    id,
    title,
    starter,
    desert,
    price,
    labels,
    img,
    drinks,
  });

  try {
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

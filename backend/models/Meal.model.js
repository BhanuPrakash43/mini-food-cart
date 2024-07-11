const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
});

const mealSchema = new mongoose.Schema({
  id: String,
  title: String,
  starter: String,
  desert: String,
  price: Number,
  labels: [String],
  img: String,
  drinks: [drinkSchema],
});

module.exports = mongoose.model('Meal', mealSchema);

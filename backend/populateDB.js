require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");
const Label = require("./models/Label.model");
const Meal = require("./models/Meal.model");
const data = require("./data.json");

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB Database");

    await Label.deleteMany({});
    await Meal.deleteMany({});

    await Label.insertMany(data.labels);
    console.log("Labels inserted");

    await Meal.insertMany(data.meals);
    console.log("Meals inserted");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

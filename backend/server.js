const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const labelsRouter = require("./routes/labels");
const mealsRouter = require("./routes/meals");

app.use("/api/labels", labelsRouter);
app.use("/api/meals", mealsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
  id: String,
  label: String,
});

module.exports = mongoose.model("Label", labelSchema);

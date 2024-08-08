const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  complete: Boolean,
});

module.exports = mongoose.model("Todo", todoSchema);

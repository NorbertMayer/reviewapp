const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  title: String,
  description: String,
  domainId: String,
  userId: String,
  score: Number
});

module.exports = mongoose.model("review", reviewSchema);

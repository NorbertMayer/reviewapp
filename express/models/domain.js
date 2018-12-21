const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const domainSchema = new Schema({
  url: String,
  name: String
});

module.exports = mongoose.model("domain", domainSchema);

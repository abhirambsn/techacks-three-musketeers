const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  investedIn: [{ type: String }],
});

module.exports = mongoose.model("investor", investorSchema);

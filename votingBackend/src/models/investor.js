const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  investedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: "campaign" }],
});

module.exports = mongoose.model("investor", investorSchema);

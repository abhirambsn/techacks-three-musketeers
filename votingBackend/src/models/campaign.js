const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  stages: { type: Number, required: true },
});

module.exports = mongoose.model("campaign", campaignSchema);

const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "campaign",
    required: true,
  },
  stage: { type: Number, required: true },
  votes: [
    {
      investorAddress: { type: String },
      vote: { type: Boolean, default: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date },
  ended: { type: Boolean, default: false },
});

module.exports = mongoose.model("vote", voteSchema);

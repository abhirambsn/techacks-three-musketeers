const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  campaign: {
    type: String,
    required: true,
  },
  stage: { type: Number, required: true },
  votes: [
    {
      investorAddress: { type: String },
      vote: { type: Boolean, default: true }, // true if yes, false if no
    },
  ],
  proofOfWork: {text: {type: String, required: true}, files: [{type: String}]},
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date },
  ended: { type: Boolean, default: false },
});

module.exports = mongoose.model("vote", voteSchema);

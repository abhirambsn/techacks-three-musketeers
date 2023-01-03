const express = require("express");
const router = express.Router();

const checkForDeadline = async (campaignId, stage) => {
  // TODO: Check if the voting period is within the deadline
};

router.get("/:campaignId", async (req, res) => {
  // TODO: get all votes of a campaign
});

router.post("/:campaignId", async (req, res) => {
  // TODO: Add a vote for a campaign
});

router.post("/:campaignId/registerInvestor", async (req, res) => {
  // TODO: Register an investor for a campaign
});

router.post("/:campaignId/vote", async (req, res) => {
  // TODO: Vote for a campaign with the given stage
});

router.put("/:campaignId/vote", async (req, res) => {
    // TODO: Change the vote of an investor
});

router.get("/:campaignId/:stage/vote", async (req, res) => {
    // TODO: Get the vote of an investor
})

router.get("/:campaignId/:stage/stats", async (req, res) => {
  // TODO: Get Stats for the voting of a stage
});

module.exports = router;

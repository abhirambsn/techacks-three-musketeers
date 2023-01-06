//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.16;

import {Voting} from "./Voting.sol";

contract VotingFactory {
    struct VoteFactory {
        Voting[] stageVotes;
        bool isValid;
    }
    mapping (address => VoteFactory) public campaignRegister;
    address[] public campaignAddressLUT;
    uint public voteCount;

    constructor() {
        voteCount = 0;
    }

    function getAllStageVotesOfCampaign(address _campaign) external view returns(Voting[] memory) {
        return campaignRegister[_campaign].stageVotes;
    }
    
    function createVote(address _campaign, uint stage, string memory powLink) external {
        campaignRegister[_campaign].stageVotes.push(new Voting(_campaign, stage, powLink));
    }

    function getStageVote(address _campaign, uint _stage) external view returns(Voting) {
        return campaignRegister[_campaign].stageVotes[_stage - 1];
    }

    function checkVote(address _campaign, uint _stage) external view returns (bool) {
        return campaignRegister[_campaign].stageVotes[_stage - 1].isValid();
    }

    function checkUserVote(address _campaign, address _user, uint _stage) external view returns(bool) {
        return campaignRegister[_campaign].stageVotes[_stage - 1].checkUserVote(_user);
    }

    function getVoteOfUser(address _campaign, address _user, uint _stage) external view returns(bool) {
        return campaignRegister[_campaign].stageVotes[_stage - 1].getVoteOfUser(_user);
    }

    function vote(address _campaign, address _user, uint _stage, bool yes) external {
        campaignRegister[_campaign].stageVotes[_stage - 1].vote(_user, yes);
    }

    function getResult(address _campaign, uint _stage) external view returns(Voting.Result memory) {
        return campaignRegister[_campaign].stageVotes[_stage - 1].getResult();
    }

    function createCampaign(address _campaign) external {
        Voting[] memory v;
        campaignRegister[_campaign] = VoteFactory(v, true);
        voteCount++;
    }
}
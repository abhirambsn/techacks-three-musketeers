//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.16;

contract Voting {
    // Variables
    address c; // Campaign Address
    uint public stage;

    struct Vote {
        bool vote; // true = YES, false = NO
        bool isValid;
    }

    struct Result {
        uint yes;
        uint no;
    }

    mapping(address => Vote) public votes;
    address[] public voters;
    uint public voterIndex;
    
    string public proofOfWorkURL;
    uint public createdAt;
    uint public deadline;
    bool public ended;
    bool public isValid;

    // Events
    event Voted(address, bool);

    // constructor
    constructor(address _c, uint _stage, string memory _proofOfWorkURL) {
        c = _c;
        stage = _stage;
        voterIndex = 0;
        proofOfWorkURL = _proofOfWorkURL;
        createdAt = block.timestamp;
        deadline = block.timestamp + 2 days;
        ended = false;
        isValid = true;
    }

    function vote(address voter, bool yes) external {
        require(votes[voter].isValid != true, "V");
        require(block.timestamp <= deadline, "E");
        votes[voter] = Vote(yes, true);
        voters.push(voter);
        voterIndex++;
    }

    function getVoteOfUser(address user) external view returns (bool) {
        return votes[user].vote;
    }

    function checkUserVote(address user) external view returns (bool) {
        return votes[user].isValid;
    }

    function getResult() external view returns (Result memory) {
        uint yes = 0;
        uint no = 0;
        for (uint i = 0; i < voters.length; i++) {
            if (votes[voters[i]].vote) {
                yes++;
            } else {
                no++;
            }
        }
        Result memory r = Result(yes, no);
        return r;
    }
}
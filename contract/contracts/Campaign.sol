//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.16;

import {Escrow} from "./Escrow.sol";

contract Campaign {
    // Variables
    string public name; // Campaign Name
    string public description; // Idea Description
    address payable author; // Wallet Address of the author
    Escrow public escrow; // Escrow Linked with the campaign
    uint public stagePeriod; // Each Stage Period of the campaign
    uint public totalProjectTime; // Total Project Time in Days
    uint256 public totalAmountNeeded;
    bool isValid; // Is the campaign valid

    address payable _owner;
    
    struct Investor {
        string name;
        address addr;
        bool isValid;
    }

    struct Stage {
        uint amountNeeded;
        uint deadline;
    }

    mapping(address => Investor) public investors;
    address[] public investorLUT; // Array which acts as a lookup table of investors

    Stage[] stages;
    uint public currentStage = 1;
    // Events

    event CampaignRaised();
    event CampaignCompleted();
    event FundsPledged(Investor i, uint amount);
    event FundsReleased(Stage s);
    event FundsPulledOut(Investor i);
    
    constructor(string memory _name, string memory _description, address _author, uint _sPeriod, uint _totalProjectTime, uint _totalAmountNeeded, uint[] memory _stages) {
        name = _name;
        description = _description;
        author = payable(_author);
        stagePeriod = _sPeriod * 1 days;
        totalProjectTime = _totalProjectTime * 1 days;
        totalAmountNeeded =_totalAmountNeeded;
        escrow = new Escrow(payable(_author));
        uint nStages = totalProjectTime / stagePeriod;
        require(nStages > 0, "Invalid Period");
        uint curTime = block.timestamp;
        for (uint i = 0; i < nStages; i++) {
            stages.push(Stage(_stages[i], curTime + stagePeriod));
            curTime += stagePeriod;
        }
        isValid = true;
    }

    function registerInvestor(string memory _name) external {
        require(!investors[msg.sender].isValid, "Already Registered");
        investors[msg.sender].addr = msg.sender;
        investors[msg.sender].name = _name;
        investors[msg.sender].isValid = true;
        investorLUT.push(msg.sender);
    }

    function pledgeFunds() external payable {
        require(investors[msg.sender].isValid, "Please Register as investor before pledging funds");
        escrow.deposit{value:msg.value}(msg.sender);
        emit FundsPledged(investors[msg.sender], msg.value);
    }

    function releaseFunds() external {
        require(currentStage <= totalProjectTime/stagePeriod, "Invalid Stage No.");
        Stage memory myStage = stages[currentStage - 1];
        escrow.releaseFundsToSeller(investorLUT, myStage.amountNeeded);
        currentStage++;
        emit FundsReleased(myStage);
    }

    function getStageDetail(uint stageNo) external view returns(Stage memory) {
        require(stageNo <= totalProjectTime/stagePeriod, "Invalid Stage No.");
        return stages[stageNo - 1];
    }

    function getInvestorProfile() external view returns(Escrow.Investment memory) {
        return escrow.getInvestorProfile(msg.sender);
    }

    function getInvestorRatio() external view returns(uint) {
        return escrow.getInvestmentRatio(msg.sender);
    }

    function refund() external {
        require(investors[msg.sender].isValid, "Only investors can call this function");
        escrow.refund(msg.sender);
        emit FundsPulledOut(investors[msg.sender]);
    }
}
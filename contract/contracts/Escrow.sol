//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.16;

contract Escrow {
    enum State {
        INITIATED,
        COMPLETED
    }

    struct Investment {
        uint256 amount;
        bool isValid;
    }

    State currState;
    mapping(address => Investment) investors;
    address payable public seller;
    address owner;

    constructor(address payable _seller) {
        currState = State.INITIATED;
        seller = _seller;
        owner = msg.sender;
    }

    modifier onlyInvestor(address _investor) {
        require(investors[_investor].isValid, "Only Investors can call the function");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owners can call the function");
        _;
    }

    function deposit(address _investor) external payable {
        require(currState != State.COMPLETED, "Already Paid");
        investors[_investor].amount += msg.value;
        investors[_investor].isValid = true;
    }

    function releaseFundsToSeller(address[] calldata cInvestors, uint256 amount) onlyOwner external {
        for (uint i = 0; i < cInvestors.length; i++) {
            uint ratio = investors[cInvestors[i]].amount*100 / address(this).balance;
            require(amount <= address(this).balance, "Amount exceeds balance");
            seller.transfer(amount);
            investors[cInvestors[i]].amount -= investors[cInvestors[i]].amount*ratio / 100;
        }
    }

    function refund(address _investor) onlyInvestor(_investor) external {
        uint ratio = investors[_investor].amount*100 / address(this).balance;
        payable(_investor).transfer(address(this).balance*ratio / 100);
        investors[_investor].amount = 0;
    }

    function getInvestmentRatio(address _investor) onlyInvestor(_investor) external view returns (uint) {
        return investors[_investor].amount*100 / address(this).balance;
    }

    function getInvestorProfile(address _investor) onlyInvestor(_investor) external view returns (Investment memory) {
        return investors[_investor];
    }

    function markAsComplete() onlyOwner external {
        if (address(this).balance > 0) {
            seller.transfer(address(this).balance); // Transfer all the remaining funds to the seller;
        }
        currState = State.COMPLETED; // Mark as complete
        require(address(this).balance == 0, "Balance is still left in the contract"); // Check if any balance remains
    }
}
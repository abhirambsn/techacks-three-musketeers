//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.16;

contract Escrow {
    enum State {
        INITIATED,
        COMPLETED
    }

    struct Investment {
        uint256 amount;
        uint ratio;
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
        require(
            investors[_investor].isValid,
            "Only Investors can call the function"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owners can call the function");
        _;
    }

    function deposit(
        address[] memory investorLUT,
        address _investor
    ) external payable {
        require(currState != State.COMPLETED, "Already Paid");
        investors[_investor].amount += msg.value;
        for (uint i = 0; i < investorLUT.length; i++) {
            if (address(this).balance <= 0) {
                investors[investorLUT[i]].ratio = 0;
            } else {
                investors[investorLUT[i]].ratio =
                    (investors[investorLUT[i]].amount * 100) /
                    address(this).balance;
                if (investors[investorLUT[i]].ratio >= 100) {
                    investors[investorLUT[i]].ratio = 100;
                }
            }
        }
        investors[_investor].isValid = true;
    }

    function releaseFundsToSeller(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Amount exceeds balance");
        seller.transfer(amount);
    }

    function refund(
        address[] memory investorLUT,
        address _investor
    ) external onlyInvestor(_investor) {
        uint ratio = investors[_investor].ratio;
        payable(_investor).transfer((address(this).balance * ratio) / 100);
        investors[_investor].amount = 0;
        investors[_investor].ratio = 0;
        for (uint i = 0; i < investorLUT.length; i++) {
            if (address(this).balance <= 0) {
                investors[investorLUT[i]].ratio = 0;
            } else {
                investors[investorLUT[i]].ratio =
                    (investors[investorLUT[i]].amount * 100) /
                    address(this).balance;
                if (investors[investorLUT[i]].ratio >= 100) {
                    investors[investorLUT[i]].ratio = 100;
                }
            }
        }
    }

    function getInvestmentRatio(
        address _investor
    ) external view onlyInvestor(_investor) returns (uint) {
        return investors[_investor].ratio;
    }

    function getInvestorProfile(
        address _investor
    ) external view onlyInvestor(_investor) returns (Investment memory) {
        return investors[_investor];
    }

    function markAsComplete() external onlyOwner {
        if (address(this).balance > 0) {
            seller.transfer(address(this).balance); // Transfer all the remaining funds to the seller;
        }
        currState = State.COMPLETED; // Mark as complete
        require(
            address(this).balance == 0,
            "Balance is still left in the contract"
        ); // Check if any balance remains
    }
}

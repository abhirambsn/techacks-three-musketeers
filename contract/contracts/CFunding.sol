//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.16;

import {Campaign} from "./Campaign.sol";

contract CFunding {
    string name; // Name of the Application
    struct CampaignData {
        Campaign[] campaigns;
        bool isValid;
        uint timestamp; // Created At
        uint userCampaignCount; // Number of campaigns raised by the user
    }
    mapping(address => CampaignData) userRegister;
    address[] public campaignLUT;
    uint public userCount; // Count of users registered
    uint public campaignCount; // Total Campaigns raised by all the users
    address payable owner;

    constructor(string memory _name) {
        name = _name;
        campaignCount = 0;
        userCount = 0;
        owner = payable(msg.sender);
    }

    function createCampaign(string memory _name, string memory _description, uint _sPeriod, uint _totalProjectTime, uint _totalAmountNeeded, uint[] memory _stages, string memory _coverImg, string memory _iOffering) external {
        if (!userRegister[msg.sender].isValid) {
            // New User
            userRegister[msg.sender].isValid = true;
            userRegister[msg.sender].timestamp = block.timestamp;
            userRegister[msg.sender].userCampaignCount = 0;
            campaignLUT.push(msg.sender);
            userCount++;
        }
        userRegister[msg.sender].campaigns.push(
            new Campaign(
                _name,
                _description,
                msg.sender,
                _sPeriod,
                _totalProjectTime,
                _totalAmountNeeded,
                _stages,
                _coverImg,
                _iOffering
            )
        );
        userRegister[msg.sender].userCampaignCount++; // Increase User CampaignCount
        campaignCount++; // Increase the Overall CampaignCount
    }

    function getAllCampaignsOfUser(address _user) external view returns(Campaign[] memory) {
        return userRegister[_user].campaigns;
    }

    function getUserProfile(address _user) external view returns(CampaignData memory) {
        return userRegister[_user];
    }
}
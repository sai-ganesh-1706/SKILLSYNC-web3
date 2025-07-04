// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SoulboundReputation.sol";
import "./SyncToken.sol";

contract DailyQuizManager is Ownable {
    IERC20 public syncToken;
    SoulboundReputation public soulboundNFT;

    uint256 public constant DAILY_REWARD = 10 * 1e18;

    mapping(address => uint256) public lastQuizCompleted;

    event DailyQuizCompleted(address indexed user, uint256 timestamp);

    constructor(address _syncToken, address _soulboundNFT, address initialOwner) Ownable(initialOwner) {
        syncToken = IERC20(_syncToken);
        soulboundNFT = SoulboundReputation(_soulboundNFT);
    }

    function completeDailyQuiz(address user) external onlyOwner {
        require(block.timestamp - lastQuizCompleted[user] >= 1 days, "Already claimed today");
        require(soulboundNFT.userToTokenId(user) != 0, "No reputation NFT");

        lastQuizCompleted[user] = block.timestamp;
        SyncToken(address(syncToken)).mint(user, DAILY_REWARD);

        emit DailyQuizCompleted(user, block.timestamp);
    }
}

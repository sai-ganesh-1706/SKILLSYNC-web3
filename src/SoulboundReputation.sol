// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "./Counters.sol";

contract SoulboundReputation is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    constructor(address initialOwner) ERC721("SkillSync Reputation", "SSR") Ownable(initialOwner) {}

    struct ReputationData {
        uint256 totalScore;
        uint256 tasksCompleted;
        uint256 endorsements;
        uint256 challenges;
        mapping(string => uint256) skillScores; // skill name => score
        string[] skillsList;
        uint256 createdAt;
        uint256 lastUpdated;
    }

    mapping(uint256 => ReputationData) public reputations;
    mapping(address => uint256) public userToTokenId;
    mapping(uint256 => address) public tokenIdToUser;

    event ScoreUpdated(uint256 indexed tokenId, string skill, uint256 newScore);
    event Endorsed(uint256 indexed tokenId, address endorser);
    event Challenged(uint256 indexed tokenId, address challenger);

    function createReputation(address user) external onlyOwner returns (uint256) {
        require(userToTokenId[user] == 0, "User already has reputation NFT");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(user, newTokenId);
        userToTokenId[user] = newTokenId;
        tokenIdToUser[newTokenId] = user;

        reputations[newTokenId].createdAt = block.timestamp;
        reputations[newTokenId].lastUpdated = block.timestamp;

        return newTokenId;
    }

    function updateSkillScore(address user, string memory skill, uint256 score) external onlyOwner {
        uint256 tokenId = userToTokenId[user];
        require(tokenId != 0, "User doesn't have reputation NFT");

        ReputationData storage rep = reputations[tokenId];

        if (rep.skillScores[skill] == 0) {
            rep.skillsList.push(skill);
        }

        rep.skillScores[skill] = score;
        rep.totalScore += score;
        rep.tasksCompleted++;
        rep.lastUpdated = block.timestamp;

        emit ScoreUpdated(tokenId, skill, score);
    }

    function endorse(uint256 tokenId) external {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        require(userToTokenId[msg.sender] != 0, "Endorser must have reputation NFT");

        reputations[tokenId].endorsements++;
        emit Endorsed(tokenId, msg.sender);
    }

    function challenge(uint256 tokenId) external {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        require(userToTokenId[msg.sender] != 0, "Challenger must have reputation NFT");

        reputations[tokenId].challenges++;
        emit Challenged(tokenId, msg.sender);
    }

    function getReputation(uint256 tokenId)
        external
        view
        returns (
            uint256 totalScore,
            uint256 tasksCompleted,
            uint256 endorsements,
            uint256 challenges,
            string[] memory skills,
            uint256 createdAt,
            uint256 lastUpdated
        )
    {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        ReputationData storage rep = reputations[tokenId];
        return (
            rep.totalScore,
            rep.tasksCompleted,
            rep.endorsements,
            rep.challenges,
            rep.skillsList,
            rep.createdAt,
            rep.lastUpdated
        );
    }

    function getSkillScore(uint256 tokenId, string memory skill) external view returns (uint256) {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        return reputations[tokenId].skillScores[skill];
    }

    // Override transfers to make it soulbound
    // Override transfer to make it soulbound (no super call needed)
    function _beforeTokenTransfer(address from, address to, uint256 /*tokenId*/ ) internal pure {
        require(from == address(0) || to == address(0), "Soulbound: Transfer not allowed");
    }

    function approve(address, uint256) public pure override {
        revert("Soulbound: Approval not allowed");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: Approval not allowed");
    }
}

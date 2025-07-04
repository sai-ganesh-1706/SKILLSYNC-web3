// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "./SyncToken.sol";

contract SkillSyncDAO is Ownable, ReentrancyGuard {
    SyncToken public syncToken;

    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        bool passed;
        address proposer;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    uint256 public constant VOTING_PERIOD = 3 days;
    uint256 public constant MIN_TOKENS_TO_PROPOSE = 100 * 10 ** 18; // 100 SYNC

    event ProposalCreated(uint256 indexed proposalId, string title, address proposer);
    event VoteCast(uint256 indexed proposalId, address voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId, bool passed);

    constructor(address _syncToken, address initialOwner) Ownable(initialOwner) {
        syncToken = SyncToken(_syncToken);
    }

    function createProposal(string memory title, string memory description) external {
        require(syncToken.balanceOf(msg.sender) >= MIN_TOKENS_TO_PROPOSE, "Insufficient tokens to propose");

        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];

        proposal.id = proposalCount;
        proposal.title = title;
        proposal.description = description;
        proposal.deadline = block.timestamp + VOTING_PERIOD;
        proposal.proposer = msg.sender;

        emit ProposalCreated(proposalCount, title, msg.sender);
    }

    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        uint256 weight = syncToken.balanceOf(msg.sender);
        require(weight > 0, "No voting power");

        proposal.hasVoted[msg.sender] = true;

        if (support) {
            proposal.votesFor += weight;
        } else {
            proposal.votesAgainst += weight;
        }

        emit VoteCast(proposalId, msg.sender, support, weight);
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.deadline, "Voting period not ended");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
        proposal.passed = proposal.votesFor > proposal.votesAgainst;

        emit ProposalExecuted(proposalId, proposal.passed);
    }

    function getProposal(uint256 proposalId)
        external
        view
        returns (
            uint256 id,
            string memory title,
            string memory description,
            uint256 votesFor,
            uint256 votesAgainst,
            uint256 deadline,
            bool executed,
            bool passed,
            address proposer
        )
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.deadline,
            proposal.executed,
            proposal.passed,
            proposal.proposer
        );
    }

    function hasVoted(uint256 proposalId, address voter) external view returns (bool) {
        return proposals[proposalId].hasVoted[voter];
    }
}

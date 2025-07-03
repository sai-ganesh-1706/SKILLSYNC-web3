// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./Counters.sol";
import "./SyncToken.sol";
import "./SoulboundReputation.sol";

contract TaskManager is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _taskIds;

    SyncToken public syncToken;
    SoulboundReputation public soulboundNFT;

    struct Task {
        uint256 id;
        string title;
        string description;
        string skillCategory;
        uint256 difficulty; // 1-10
        string ipfsHash;
        uint256 reward;
        bool isActive;
        uint256 createdAt;
        address creator;
    }

    struct TaskSubmission {
        uint256 taskId;
        address submitter;
        string ipfsHash;
        uint256 score;
        bool isEvaluated;
        uint256 submittedAt;
        uint256 evaluatedAt;
    }

    mapping(uint256 => Task) public tasks;
    mapping(bytes32 => TaskSubmission) public submissions;
    mapping(address => uint256[]) public userSubmissions;

    event TaskCreated(uint256 indexed taskId, string title, string skillCategory);
    event TaskSubmitted(uint256 indexed taskId, address indexed submitter, string ipfsHash);
    event TaskEvaluated(uint256 indexed taskId, address indexed submitter, uint256 score);

    constructor(
        address _syncToken,
        address _soulboundNFT,
        address initialOwner
    ) Ownable(initialOwner) {
        syncToken = SyncToken(_syncToken);
        soulboundNFT = SoulboundReputation(_soulboundNFT);
    }

    function createTask(
        string memory title,
        string memory description,
        string memory skillCategory,
        uint256 difficulty,
        string memory ipfsHash,
        uint256 reward
    ) external onlyOwner {
        _taskIds.increment();
        uint256 taskId = _taskIds.current();

        tasks[taskId] = Task({
            id: taskId,
            title: title,
            description: description,
            skillCategory: skillCategory,
            difficulty: difficulty,
            ipfsHash: ipfsHash,
            reward: reward,
            isActive: true,
            createdAt: block.timestamp,
            creator: msg.sender
        });

        emit TaskCreated(taskId, title, skillCategory);
    }

    function submitTask(uint256 taskId, string memory ipfsHash) external {
        require(tasks[taskId].isActive, "Task is not active");

        bytes32 submissionKey = keccak256(abi.encodePacked(taskId, msg.sender));
        require(submissions[submissionKey].submitter == address(0), "Already submitted");

        submissions[submissionKey] = TaskSubmission({
            taskId: taskId,
            submitter: msg.sender,
            ipfsHash: ipfsHash,
            score: 0,
            isEvaluated: false,
            submittedAt: block.timestamp,
            evaluatedAt: 0
        });

        userSubmissions[msg.sender].push(taskId);

        emit TaskSubmitted(taskId, msg.sender, ipfsHash);
    }

    function evaluateTask(uint256 taskId, address submitter, uint256 score) external onlyOwner {
        require(score <= 100, "Score must be <= 100");

        bytes32 submissionKey = keccak256(abi.encodePacked(taskId, submitter));
        TaskSubmission storage submission = submissions[submissionKey];

        require(submission.submitter != address(0), "Submission not found");
        require(!submission.isEvaluated, "Already evaluated");

        submission.score = score;
        submission.isEvaluated = true;
        submission.evaluatedAt = block.timestamp;

        if (score >= 60) {
            Task memory task = tasks[taskId];
            soulboundNFT.updateSkillScore(submitter, task.skillCategory, score);
            syncToken.mintTaskReward(submitter);
        }

        emit TaskEvaluated(taskId, submitter, score);
    }

    function getTask(uint256 taskId) external view returns (Task memory) {
        return tasks[taskId];
    }

    function getSubmission(uint256 taskId, address submitter) external view returns (TaskSubmission memory) {
        bytes32 submissionKey = keccak256(abi.encodePacked(taskId, submitter));
        return submissions[submissionKey];
    }

    function getUserSubmissions(address user) external view returns (uint256[] memory) {
        return userSubmissions[user];
    }

    function getTotalTasks() external view returns (uint256) {
        return _taskIds.current();
    }
}

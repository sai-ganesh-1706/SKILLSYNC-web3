// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SyncToken.sol";

contract CourseAccessManager is Ownable {
    SyncToken public syncToken;

    uint256 public constant PROJECT_REWARD = 10 * 10 ** 18;

    struct Course {
        uint256 id;
        string title;
        string description;
        string ipfsHash;
        uint256 price;
        bool isActive;
    }

    uint256 public courseCount;
    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint256 => bool)) public hasPurchased;
    mapping(address => mapping(uint256 => bool)) public projectSubmitted;
    mapping(address => mapping(uint256 => bool)) public projectRewardClaimed;
    mapping(address => bool) public isCreator;

    event CourseCreated(uint256 indexed courseId, string title, uint256 price);
    event CoursePurchased(address indexed user, uint256 indexed courseId);
    event ProjectRewardMinted(address indexed user, uint256 courseId, uint256 amount);

    constructor(address _syncToken, address initialOwner) Ownable(initialOwner) {
        syncToken = SyncToken(_syncToken);
    }

    // Only creator can create a course
    function createCourse(
        string memory title,
        string memory description,
        string memory ipfsHash,
        uint256 price
    ) external {
        require(isCreator[msg.sender], "Only approved creators can create courses");

        courseCount++;
        courses[courseCount] = Course({
            id: courseCount,
            title: title,
            description: description,
            ipfsHash: ipfsHash,
            price: price,
            isActive: true
        });

        emit CourseCreated(courseCount, title, price);
    }


    function purchaseCourse(uint256 courseId) external {
        Course memory course = courses[courseId];
        require(course.isActive, "Course is inactive");
        require(!hasPurchased[msg.sender][courseId], "Already purchased");
        require(syncToken.transferFrom(msg.sender, address(this), course.price), "Token transfer failed");

        hasPurchased[msg.sender][courseId] = true;
        emit CoursePurchased(msg.sender, courseId);
    }

    function submitProject(uint256 courseId, string memory /*ipfsHash*/) external {
        require(hasPurchased[msg.sender][courseId], "Course not purchased");
        require(!projectSubmitted[msg.sender][courseId], "Project already submitted");

        projectSubmitted[msg.sender][courseId] = true;
        // You could emit a ProjectSubmitted event here if needed
    }

    function mintProjectReward(address user, uint256 courseId) external {
        require(hasPurchased[user][courseId], "Course not purchased");
        require(projectSubmitted[user][courseId], "Project not submitted yet");
        require(!projectRewardClaimed[user][courseId], "Reward already claimed");
        require(syncToken.authorizedMinters(msg.sender), "Not authorized");

        projectRewardClaimed[user][courseId] = true;
        syncToken.mint(user, PROJECT_REWARD);

        emit ProjectRewardMinted(user, courseId, PROJECT_REWARD);
    }

    // Allow owner to authorize course creators
    function addCreator(address creator) external onlyOwner {
        isCreator[creator] = true;
    }
    function removeCreator(address creator) external onlyOwner {
    isCreator[creator] = false;
    }


    function getCourse(uint256 courseId) external view returns (
        string memory title,
        string memory description,
        uint256 price,
        bool isActive
    ) {
        Course memory course = courses[courseId];
        return (course.title, course.description, course.price, course.isActive);
    }

    function getCourseContent(uint256 courseId) external view returns (string memory ipfsHash) {
        require(hasPurchased[msg.sender][courseId], "You must purchase the course first");
        return courses[courseId].ipfsHash;
    }

    function setCourseActive(uint256 courseId, bool active) external onlyOwner {
        courses[courseId].isActive = active;
    }

    function withdrawTokens(address to) external onlyOwner {
        uint256 balance = syncToken.balanceOf(address(this));
        require(syncToken.transfer(to, balance), "Withdraw failed");
    }
}

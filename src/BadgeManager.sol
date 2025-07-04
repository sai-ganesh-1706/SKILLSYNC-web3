// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract BadgeManager is ERC1155, Ownable {
    uint256 public badgeCount;

    struct Badge {
        uint256 id;
        string name;
        string description;
        string uri;
    }

    mapping(uint256 => Badge) public badges;
    mapping(address => mapping(uint256 => bool)) public hasBadge;

    event BadgeCreated(uint256 indexed badgeId, string name);
    event BadgeMinted(address indexed user, uint256 indexed badgeId);

    // ✅ Fixed constructor to pass required baseURI and initialOwner
    constructor(string memory baseURI, address initialOwner) ERC1155(baseURI) Ownable(initialOwner) {}

    /// ✅ Admin can create a new badge with metadata
    function createBadge(
        string memory name,
        string memory description,
        string memory metadataURI
    ) external onlyOwner {
        badgeCount++;
        badges[badgeCount] = Badge({
            id: badgeCount,
            name: name,
            description: description,
            uri: metadataURI
        });

        emit BadgeCreated(badgeCount, name);
    }

    /// ✅ Admin mints a badge to a user
    function mintBadge(address user, uint256 badgeId) external onlyOwner {
        require(!hasBadge[user][badgeId], "User already has this badge");
        require(badgeId > 0 && badgeId <= badgeCount, "Invalid badge");

        hasBadge[user][badgeId] = true;
        _mint(user, badgeId, 1, "");

        emit BadgeMinted(user, badgeId);
    }

    /// ✅ Override `uri` to return badge metadata URI
    function uri(uint256 badgeId) public view override returns (string memory) {
        require(badgeId > 0 && badgeId <= badgeCount, "Invalid badge ID");
        return badges[badgeId].uri;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SyncToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10**18; // 1M tokens
    uint256 public constant TASK_REWARD = 10 * 10**18;       // 10 SYNC per task

    mapping(address => bool) public authorizedMinters;

    constructor() ERC20("SkillSync Token", "SYNC") Ownable(msg.sender) {
        _mint(msg.sender, 100_000 * 10**18); // Initial supply for governance
    }

    function addMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = true;
    }

    function removeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
    }

    function mint(address to, uint256 amount) external {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }

    function mintTaskReward(address to) external {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        require(totalSupply() + TASK_REWARD <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, TASK_REWARD);
    }
}

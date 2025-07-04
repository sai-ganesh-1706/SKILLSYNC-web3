// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {SyncToken} from "../src/SyncToken.sol";
import {SoulboundReputation} from "../src/SoulboundReputation.sol";
import {TaskManager} from "../src/TaskManager.sol";
import {SkillSyncDAO} from "../src/SkillSyncDAO.sol";

contract SkillSyncTest is Test {
    SyncToken syncToken;
    SoulboundReputation soulboundNFT;
    TaskManager taskManager;
    SkillSyncDAO dao;

    address user1 = vm.addr(1);
    address user2 = vm.addr(2);

    function setUp() public {
        syncToken = new SyncToken();
        soulboundNFT = new SoulboundReputation(address(this));
        dao = new SkillSyncDAO(address(syncToken), address(this)); // test contract is owner
        taskManager = new TaskManager(address(syncToken), address(soulboundNFT), address(this)); // <-- 👈 test contract is owner

        // allow minting
        syncToken.addMinter(address(this));
        syncToken.addMinter(address(taskManager));
    }

    function testMintAndCreateReputation() public {
        // Make this contract the caller to mint (since it’s now an authorized minter)
        vm.prank(address(this));
        syncToken.mint(user1, 100 * 10 ** 18);
        assertEq(syncToken.balanceOf(user1), 100 * 10 ** 18);

        // Create soulbound NFT as owner
        uint256 tokenId = soulboundNFT.createReputation(user1);
        assertEq(soulboundNFT.balanceOf(user1), 1);
        assertEq(soulboundNFT.userToTokenId(user1), tokenId);
    }

    function testCreateAndFetchTask() public {
        // this contract is the owner, so no need to prank
        taskManager.createTask("Task 1", "Description", "Solidity", 5, "Qm...abc", 10 * 10 ** 18);

        TaskManager.Task memory task = taskManager.getTask(1);
        assertEq(task.title, "Task 1");
        assertEq(task.skillCategory, "Solidity");
    }
}

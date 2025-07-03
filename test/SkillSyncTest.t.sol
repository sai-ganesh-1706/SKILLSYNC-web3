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
        soulboundNFT = new SoulboundReputation();
        taskManager = new TaskManager(address(syncToken), address(soulboundNFT));
        dao = new SkillSyncDAO(address(syncToken));
    }

    function testMintAndCreateReputation() public {
        vm.prank(user1);
        syncToken.mint(user1, 100 * 10**18);
        assertEq(syncToken.balanceOf(user1), 100 * 10**18);

        vm.prank(soulboundNFT.owner());
        uint256 tokenId = soulboundNFT.createReputation(user1);
        assertEq(soulboundNFT.balanceOf(user1), 1);
        assertEq(soulboundNFT.userToTokenId(user1), tokenId);
    }

    function testCreateTask() public {
        vm.prank(soulboundNFT.owner());
        taskManager.createTask("Task 1", "Description", "Skill", 5, "Qm...123", 10 * 10**18);
        (uint256 taskId, string memory title, , , , , , ,) = taskManager.getTask(1);
    }
}   
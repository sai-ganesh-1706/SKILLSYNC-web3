// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {SyncToken} from "../src/SyncToken.sol";
import {SoulboundReputation} from "../src/SoulboundReputation.sol";
import {TaskManager} from "../src/TaskManager.sol";
import {SkillSyncDAO} from "../src/SkillSyncDAO.sol";
import "forge-std/console.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        vm.startBroadcast(deployerKey);

        // Deploy contracts with msg.sender passed to Ownable
        SyncToken syncToken = new SyncToken(); // Ownable(msg.sender) is already passed inside
        SoulboundReputation soulboundNFT = new SoulboundReputation(deployer);
        TaskManager taskManager = new TaskManager(address(syncToken), address(soulboundNFT), deployer);
        SkillSyncDAO dao = new SkillSyncDAO(address(syncToken), deployer);

        // Set TaskManager as minter for rewards
        syncToken.addMinter(address(taskManager));

        vm.stopBroadcast();

        // Log addresses
        console.log("SyncToken deployed at:", address(syncToken));
        console.log("SoulboundReputation deployed at:", address(soulboundNFT));
        console.log("TaskManager deployed at:", address(taskManager));
        console.log("SkillSyncDAO deployed at:", address(dao));
    }
}

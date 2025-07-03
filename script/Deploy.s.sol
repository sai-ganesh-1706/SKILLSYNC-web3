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

        // Deploy core contracts
        SyncToken syncToken = new SyncToken();
        SoulboundReputation soulboundNFT = new SoulboundReputation(deployer);
        SkillSyncDAO dao = new SkillSyncDAO(address(syncToken), deployer);
        TaskManager taskManager = new TaskManager(address(syncToken), address(soulboundNFT), address(dao));

        // Authorize TaskManager and DAO to mint rewards
        syncToken.addMinter(address(taskManager));
        syncToken.addMinter(address(dao));

        vm.stopBroadcast();

        // Console logs for deployed contract addresses
        console.log(" SyncToken deployed at:", address(syncToken));
        console.log(" SoulboundReputation deployed at:", address(soulboundNFT));
        console.log(" SkillSyncDAO deployed at:", address(dao));
        console.log(" TaskManager deployed at:", address(taskManager));
    }
}

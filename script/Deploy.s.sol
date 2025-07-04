// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {SyncToken} from "../src/SyncToken.sol";
import {SoulboundReputation} from "../src/SoulboundReputation.sol";
import {TaskManager} from "../src/TaskManager.sol";
import {SkillSyncDAO} from "../src/SkillSyncDAO.sol";
import {CourseAccessManager} from "../src/CourseAccessManager.sol";
import {BadgeManager} from "../src/BadgeManager.sol";
import {DailyQuizManager} from "../src/DailyQuizManager.sol";
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
        CourseAccessManager courseAccess = new CourseAccessManager(address(syncToken), deployer);
        BadgeManager badgeManager = new BadgeManager("ipfs://base-uri/", deployer);
        DailyQuizManager dailyQuiz = new DailyQuizManager(address(syncToken), address(soulboundNFT), deployer);

        // Grant minting rights
        syncToken.addMinter(address(taskManager));
        syncToken.addMinter(address(dao));
        syncToken.addMinter(address(courseAccess));
        syncToken.addMinter(address(dailyQuiz));

        // Register deployer as course creator
        courseAccess.addCreator(deployer);

        vm.stopBroadcast();

        // Console log deployed addresses
        console.log("SyncToken deployed at:", address(syncToken));
        console.log("SoulboundReputation deployed at:", address(soulboundNFT));
        console.log("SkillSyncDAO deployed at:", address(dao));
        console.log("TaskManager deployed at:", address(taskManager));
        console.log("CourseAccessManager deployed at:", address(courseAccess));
        console.log("BadgeManager deployed at:", address(badgeManager));
        console.log("DailyQuizManager deployed at:", address(dailyQuiz));
    }
}

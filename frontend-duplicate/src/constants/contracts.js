import SyncToken from './abis/SyncToken.json';
import SoulboundReputation from './abis/SoulboundReputation.json';
import CourseAccessManager from './abis/CourseAccessManager.json';
import SkillSyncDAO from './abis/SkillSyncDAO.json';
import TaskManager from './abis/TaskManager.json';
import DailyQuizManager from './abis/DailyQuizManager.json';
import BadgeManager from './abis/BadgeManager.json';

export const CONTRACTS = {
  syncToken: {
    address: "0x0116686E2291dbd5e317F47faDBFb43B599786Ef", // Replace with actual address
    abi: SyncToken.abi,
  },
  soulboundReputation: {
    address: "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5", // Replace with actual address
    abi: SoulboundReputation.abi,
  },
  courseAccess: {
    address: "0x2706A171ECb68E0038378D40Dd1d136361d0cB7d", // Replace with actual address
    abi: CourseAccessManager.abi,
  },
  skillSyncDAO: {
    address: "0x1Eb835EB7BEEEE9E6bbFe08F16a2d2eF668204bd", // Replace with actual address
    abi: SkillSyncDAO.abi,
  },
  taskManager: {
    address: "0x31A65C6d4EB07ad51E7afc890aC3b7bE84dF2Ead", // Replace with actual address
    abi: TaskManager.abi,
  },
  dailyQuizManager: {
    address: "0xd771D7C0e1EBE89C9E9F663824851BB89b926d1a", // Replace with actual address
    abi: DailyQuizManager.abi,
  },
  badgeManager: {
    address: "0x993F00eb9C73e3E4eAe3d6Afb4Ba65A6b8B5E597", // Replace with actual address
    abi: BadgeManager.abi,
  },
};

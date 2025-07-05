export const CONTRACT_ADDRESSES = {
  SYNC_TOKEN: "0x0000000000000000000000000000000000000000",  // Replace with actual address
  COURSE_MANAGER: "0x0000000000000000000000000000000000000000",
  REPUTATION_NFT: "0x0000000000000000000000000000000000000000"
};

export const ABIS = {
  SYNC_TOKEN: [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function mint(address to, uint256 amount)"
  ],
  COURSE_MANAGER: [
    "function courseCount() view returns (uint256)",
    "function getCourse(uint256) view returns (tuple(string title, string description, uint256 price))",
    "function enrollInCourse(uint256 courseId)",
    "function submitTask(uint256 taskId, string ipfsHash)"
  ],
  REPUTATION_NFT: [
    "function getReputationScore(address user) view returns (uint256)",
    "function awardBadge(address to, string memory badgeType)"
  ]
};

# SkillSync

SkillSync is a decentralized learning and reputation platform built on the Ethereum blockchain. It integrates **Soulbound NFTs**, **ERC-20 token rewards**, **DAO governance**, and **IPFS** content storage to create a transparent and verifiable system for skill growth, task completion, and community participation.

---

## 🔧 Tech Stack

- **Solidity** (Smart Contracts)
- **Foundry** (Contract testing, scripting)
- **OpenZeppelin** (ERC standards, Ownable, ReentrancyGuard)
- **IPFS/Web3.storage** (Task and submission storage)
- **TypeScript + React** (Frontend, WIP)


---

## 🧩 Smart Contracts Overview

| Contract               | Description |
|------------------------|-------------|
| `SyncToken`            | ERC-20 token (`SYNC`) used for rewards and governance. |
| `SoulboundReputation`  | ERC-721 soulbound NFT storing skill scores and user reputation. |
| `TaskManager`          | Allows task creation, submission, evaluation, and reward minting. |
| `SkillSyncDAO`         | A basic governance contract for community proposals and voting. |

---

## 💡 Features

- 🎯 **Soulbound Skill NFTs** – Non-transferable NFTs that track user progress and skills.
- 🏆 **Task Rewards** – Users earn SYNC tokens by completing and passing evaluated tasks.
- 🧠 **AI-Compatible Evaluation** – Score fields for AI-based assessment (off-chain logic).
- 🗳️ **DAO Governance** – Token holders can propose and vote on system changes.
- 📦 **IPFS Integration** – Task content and submissions are stored in decentralized file storage.
-  🔓 **Token-Gated Learning** – Users can unlock exclusive learning courses if they hold a minimum amount of SYNC tokens.
---

## 📁 Project Structure
SkillSync/
├── script/ # Deployment and interaction scripts (Foundry)
├── src/ # Solidity contract sources
├── test/ # Test cases
├── lib/ # OpenZeppelin Contracts
├── foundry.toml # Foundry config
└── README.md

# 🚀 Getting Started (Foundry)

### 1. Install Dependencies
```bash
forge install
2. Compile Contracts

forge build
3. Run Deployment Script

forge script script/Deploy.s.sol \
  --rpc-url http://127.0.0.1:8545 \
  --private-key <YOUR_PRIVATE_KEY> \
  --broadcast
📝 Example Workflow
🔧 Task & Reputation Flow
Admin creates a task with skill type and IPFS content.

User submits their task solution (IPFS hash).

Owner evaluates the submission and assigns a score.

If score ≥ 60:

User earns SYNC tokens

User’s Soulbound NFT is updated with skill score

📚 Course Access Flow
If a user holds ≥ X SYNC tokens (e.g., 500), they can unlock token-gated learning content.

Course metadata is stored on IPFS, and access is verified via token balance on-chain or via frontend check.

Courses help users upskill and attempt higher-level tasks.

🔐 Environment Variables
Use .env to store keys and deployment values:
DEPLOYER_PRIVATE_KEY=your_private_key_here
RPC_URL=http://127.0.0.1:8545

🧠 Governance Logic
Users with at least 100 SYNC can:
Propose new ideas
Vote (For / Against)
After 3 days, proposals can be executed if approved

👨‍💻 Contributors
Sai Ganesh Bangaru – @saiganeshbangaru 
emailid: saiganesh.b24@iiits.in



## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

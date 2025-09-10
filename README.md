# Cipher Canvas Lab

A privacy-preserving collaborative canvas platform built with FHE (Fully Homomorphic Encryption) technology.

## Features

- **Encrypted Canvas Projects**: Create and manage canvas projects with FHE-encrypted data
- **Real-time Collaboration**: Work together on canvas projects with encrypted permissions
- **Version Control**: Track changes and maintain project history
- **Layer Management**: Organize canvas elements in encrypted layers
- **Wallet Integration**: Connect with various Web3 wallets (Rainbow, MetaMask, etc.)
- **Privacy-First**: All sensitive data is encrypted using FHE technology

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Blockchain**: Ethereum, Wagmi, RainbowKit
- **Encryption**: FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support
- **Development**: Hardhat, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ellaAdams97/cipher-canvas-lab.git
cd cipher-canvas-lab
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_infura_key
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Smart Contract Deployment

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/hardhat-plugin
```

2. Deploy to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

3. Update contract addresses in your `.env` file

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── App.tsx             # Main application component

contracts/
└── CipherCanvasLab.sol # Main smart contract with FHE support
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.

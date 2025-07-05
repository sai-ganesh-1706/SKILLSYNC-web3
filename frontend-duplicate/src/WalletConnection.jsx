import React from 'react';

const WalletConnection = ({ onConnect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">SkillSync DApp</h1>
          <p className="text-gray-600 mb-8">
            Connect your wallet to access the decentralized learning platform
          </p>
          <button
            onClick={onConnect}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
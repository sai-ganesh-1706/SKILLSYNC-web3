import React from 'react';
import './App.css'; // Make sure this path is correct
import { Diamond } from 'lucide-react';

const Reputation = ({ userReputation }) => {
  const {
    level,
    tokenId,
    totalScore,
    tasksCompleted,
    endorsements,
    skills,
    progressToNextLevel
  } = userReputation;

  return (
    <div className="reputation-card">
      <h3 className="reputation-heading">
        <Diamond className="w-5 h-5 mr-2 text-blue-600" />
        Your Reputation NFT
      </h3>

      <div className="flex items-center space-x-6">
        <div className="reputation-icon-box">
          {level?.icon && <level.icon />}
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-bold text-gray-800">{level?.name} Level</h4>
          <p className="text-gray-600 mb-4">Token ID: #{tokenId}</p>
          <div className="reputation-stats-grid">
            <div>
              <p className="reputation-stat-title">Total Score</p>
              <p className="reputation-stat-value">{totalScore}</p>
            </div>
            <div>
              <p className="reputation-stat-title">Tasks Completed</p>
              <p className="reputation-stat-value">{tasksCompleted}</p>
            </div>
            <div>
              <p className="reputation-stat-title">Endorsements</p>
              <p className="reputation-stat-value text-purple-600">{endorsements}</p>
            </div>
            <div>
              <p className="reputation-stat-title">Skills</p>
              <p className="reputation-stat-value">{skills?.length || 0}</p>
            </div>
          </div>
            <div>Blockchain</div>
          {/* Progress Bar */}
          <div className="progress-bar-container">
            
            <div
              className="progress-bar-fill"
              style={{ width: `${progressToNextLevel || 80}%` }}
            />
          </div>
          <p className="progress-bar-label">{progressToNextLevel?.toFixed(1) || 80}%</p>
        </div>
      </div>
      
    </div>
  );
};

export default Reputation;

import React from 'react';
import Reputation from './Reputation.jsx';
import {
  Wallet, BookOpen, Award, Brain, Zap, CheckCircle
} from 'lucide-react';

const StudentDashboard = ({
  connectedAccount,
  userBalance,
  userReputation,
  userStats,
  userBadges,
  dailyQuizAvailable,
  completeDailyQuiz,
  loading
}) => {
  return (
    <div className="space-y-6">

      {/* Wallet Address at Top Right */}
      <div className="flex justify-end">
        <div
          className="flex items-center space-x-2 bg-white border px-4 py-2 rounded-lg shadow text-sm font-mono text-gray-700"
          title={connectedAccount}
        >
          <Wallet className="w-4 h-4 text-gray-600" />
          <span>
            {connectedAccount?.slice(0, 6)}...{connectedAccount?.slice(-4)}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* SYNC Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">SYNC Balance</h3>
              <p className="text-3xl font-bold">{userBalance}</p>
            </div>
            <Wallet className="w-8 h-8 opacity-80" />
          </div>
        </div>

        {/* Reputation Score */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Reputation</h3>
              <p className="text-3xl font-bold">{userReputation?.totalScore || '0'}</p>
              <p className="text-sm opacity-80">{userReputation?.level?.name || 'Beginner'}</p>
            </div>
            {userReputation?.level?.icon && (
              <userReputation.level.icon className="w-8 h-8 opacity-80" />
            )}
          </div>
        </div>

        {/* Courses Owned */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Courses Owned</h3>
              <p className="text-3xl font-bold">{userStats.coursesPurchased}</p>
            </div>
            <BookOpen className="w-8 h-8 opacity-80" />
          </div>
        </div>

        {/* Badges Earned */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Badges Earned</h3>
              <p className="text-3xl font-bold">{userBadges.length}</p>
            </div>
            <Award className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Daily Quiz Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Daily Quiz
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="w-4 h-4 mr-1 text-yellow-500" />
            Earn 10 SYNC tokens
          </div>
        </div>
        {dailyQuizAvailable ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Test your knowledge and earn tokens!</p>
            <button
              onClick={completeDailyQuiz}
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Take Daily Quiz'}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-gray-600">Quiz completed for today! Come back tomorrow.</p>
          </div>
        )}
      </div>

      {/* Reputation NFT Section (Modular) */}
      {userReputation && <Reputation userReputation={userReputation} />}

      <footer className="text-center text-sm text-gray-500 mt-10 py-4 border-t">
        © {new Date().getFullYear()} SkillSync — Empowering Decentralized Learning
      </footer>
    </div>
  );
};

export default StudentDashboard;

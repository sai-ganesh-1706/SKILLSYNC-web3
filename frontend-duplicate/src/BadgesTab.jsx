import React from 'react';
import { BookOpen, Target, Brain, Users, Plus, Crown } from 'lucide-react';

const badgeData = [
  { id: 1, name: 'First Course', icon: BookOpen, description: 'Complete your first course', progress: 100 },
  { id: 2, name: 'Task Master', icon: Target, description: 'Complete 10 tasks', progress: 70 },
  { id: 3, name: 'Quiz Champion', icon: Brain, description: 'Win 5 daily quizzes', progress: 40 },
  { id: 4, name: 'Community Leader', icon: Users, description: 'Get 5 endorsements', progress: 20 },
  { id: 5, name: 'Creator', icon: Plus, description: 'Publish 3 courses', progress: 100 },
  { id: 6, name: 'Platinum Member', icon: Crown, description: 'Earn 500 SYNC tokens', progress: 90 },
];

const BadgesTab = ({ userBadges = [] }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-purple-700">🏅 Your Achievements</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {badgeData.map((badge) => {
        const owned = userBadges.some((b) => b.id === badge.id);
        const Icon = badge.icon;

        return (
          <div
            key={badge.id}
            className={`relative group text-center p-4 border-2 rounded-2xl shadow-md transition-transform duration-300 transform hover:-translate-y-1 ${
              owned
                ? 'border-yellow-400 bg-yellow-50 animate-pulse-glow'
                : 'border-gray-300 bg-white'
            }`}
          >
            <Icon
              className={`w-12 h-12 mx-auto mb-2 ${
                owned ? 'text-yellow-500' : 'text-gray-400'
              }`}
            />
            <p
              className={`text-md font-semibold ${
                owned ? 'text-yellow-800' : 'text-gray-600'
              }`}
            >
              {badge.name}
            </p>

            {/* Tooltip */}
            <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs px-2 py-1 rounded shadow z-10">
              {badge.description}
            </div>

            {owned ? (
              <div className="mt-2">
                <span className="inline-block bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                  ✅ Owned
                </span>
              </div>
            ) : (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{badge.progress}% to unlock</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default BadgesTab;

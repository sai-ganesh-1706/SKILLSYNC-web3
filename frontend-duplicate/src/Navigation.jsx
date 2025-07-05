import React from 'react';

const Navigation = ({ activeTab, setActiveTab, account }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'quiz', label: 'Quiz' },         // ✅ Added Quiz tab
    { id: 'dao', label: 'DAO' },
    { id: 'badges', label: 'Badges' }
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-purple-700">SkillSync</h1>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`${
                activeTab === item.id
                  ? 'font-bold text-purple-700'
                  : 'text-gray-600 hover:text-purple-600'
              } transition-colors duration-200`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

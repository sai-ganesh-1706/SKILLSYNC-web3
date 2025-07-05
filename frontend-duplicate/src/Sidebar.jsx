// Sidebar.jsx
import React from 'react';
import { LayoutDashboard, BookOpen, CheckSquare, Brain, Users, Award } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { key: 'quiz', label: 'Quiz', icon: <Brain className="w-5 h-5" /> },
    { key: 'dao', label: 'DAO', icon: <Users className="w-5 h-5" /> },
    { key: 'badges', label: 'Badges', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-full p-4 space-y-4">
      <h1 className="text-2xl font-bold text-purple-600 mb-6">SkillSync</h1>
      <nav className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition ${
              activeTab === item.key
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

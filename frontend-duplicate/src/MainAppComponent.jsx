import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Brain, Users, Plus, Crown } from 'lucide-react';
import Sidebar from './Sidebar.jsx';

// Component imports
import StudentDashboard from './StudentDashboard.jsx';
import CreatorDashboard from './CreatorDashboard.jsx';
import StudentCoursesTab from './StudentCourses.jsx';
import TasksTab from './TasksTab.jsx';
import DAOTab from './DAOTab.jsx';
import BadgesTab from './BadgesTab.jsx';
import Navigation from './Navigation.jsx';
import WalletConnection from './WalletConnection.jsx';
import DailyQuizTab from './DailyQuizTab.jsx';

// Constants and utilities

import { getBadgeFromReputation } from './utils/reputation';


const SkillSyncDApp = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contracts, setContracts] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userBalance, setUserBalance] = useState('0');
  const [userReputation, setUserReputation] = useState(null);
  const [userBadges, setUserBadges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [dailyQuizAvailable, setDailyQuizAvailable] = useState(true);
  const [userStats, setUserStats] = useState({
    coursesCreated: 0,
    totalEarnings: '0',
    studentsEnrolled: 0,
    coursesPurchased: 0,
    tasksCompleted: 0,
    quizStreak: 0
  });

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask not detected! Please install MetaMask.');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts[0]);
      
      // Mock data for demo purposes
      setUserBalance('125.50');

      setUserReputation({
        tokenId: '1',
        totalScore: '347',
        tasksCompleted: '15',
        endorsements: '8',
        challenges: '3',
        skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
        level: getBadgeFromReputation('347')
      });
      setUserBadges([
        { id: 1, owned: true },
        { id: 2, owned: true },
        { id: 3, owned: true }
      ]);
      setUserStats({
        coursesCreated: 2,
        totalEarnings: '450',
        studentsEnrolled: 67,
        coursesPurchased: 5,
        tasksCompleted: 15,
        quizStreak: 7
      });
      
      setProposals([
        {
          id: 1,
          title: 'Increase Task Rewards',
          description: 'Proposal to increase task completion rewards by 25%',
          votesFor: 1250,
          votesAgainst: 340,
          deadline: '2 days left'
        },
        {
          id: 2,
          title: 'Reduce Quiz Rewards to 1 Token',
          description: 'Proposal to cut down the daily quiz reward from 10 SYNC tokens to just 1 SYNC token to save token supply.',
          votesFor: 75,
          votesAgainst: 860,
          deadline: '4 days left'
        }

      ]);
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const purchaseCourse = async (courseId, price) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Course purchased successfully!');
      setUserStats(prev => ({ ...prev, coursesPurchased: prev.coursesPurchased + 1 }));
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Failed to purchase course');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (title, description, ipfsHash, price) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Course created successfully!');
      setUserStats(prev => ({ ...prev, coursesCreated: prev.coursesCreated + 1 }));
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const completeDailyQuiz = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Daily quiz completed! You earned 10 SYNC tokens!');
      setDailyQuizAvailable(false);
      setUserBalance(prev => (parseFloat(prev) + 10).toString());
    } catch (error) {
      console.error('Error completing daily quiz:', error);
      alert('Failed to complete daily quiz');
    } finally {
      setLoading(false);
    }
  };

  const submitTask = async (taskId, ipfsHash) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Task submitted successfully! Your reputation will be updated upon approval.');
      setUserStats(prev => ({ ...prev, tasksCompleted: prev.tasksCompleted + 1 }));
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to submit task');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load demo data
    setCourses([
      { id: 1, title: 'Blockchain Basics', description: 'Learn the fundamentals of blockchain technology', price: '50', isActive: true, students: 125 },
      { id: 2, title: 'Smart Contract Development', description: 'Master Solidity and smart contract programming', price: '100', isActive: true, students: 89 },
      { id: 3, title: 'DeFi Protocols', description: 'Understand decentralized finance protocols', price: '75', isActive: true, students: 67 }
    ]);

    setTasks([
      { id: 1, title: 'Build a Simple DApp', description: 'Create a basic decentralized application', skillCategory: 'Development', difficulty: 3, reward: '10', isActive: true },
      { id: 2, title: 'Write Smart Contract Tests', description: 'Test your smart contracts properly', skillCategory: 'Testing', difficulty: 2, reward: '5', isActive: true },
      { id: 3, title: 'Deploy to Mainnet', description: 'Deploy your contract to Ethereum mainnet', skillCategory: 'Deployment', difficulty: 4, reward: '15', isActive: true }
    ]);
  }, []);

  const voteOnProposal = async (proposalId, support) => {
  try {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async call
    alert(`You voted ${support ? "FOR" : "AGAINST"} proposal ${proposalId}`);
  } catch (error) {
    console.error("Error voting on proposal:", error);
    alert("Voting failed");
  } finally {
    setLoading(false);
  }
};


const renderContent = () => {
  if (!account) {
    return <WalletConnection onConnect={connectWallet} />;
  }

  // Show role selection after wallet connection
  if (!userRole) {
    return (
      <div className="text-center mt-24">
        <h2 className="text-3xl font-bold mb-4">Welcome to SkillSync</h2>
        <p className="text-lg mb-6">Please choose your role to proceed:</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setUserRole('student')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Student
          </button>
          <button
            onClick={() => setUserRole('creator')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Creator
          </button>
        </div>
      </div>
    );
  }

  const commonProps = {
    loading,
    userBalance,
    userReputation,
    userBadges,
    userStats,
    courses,
    tasks,
    proposals,
    dailyQuizAvailable,
    purchaseCourse,
    createCourse,
    completeDailyQuiz,
    submitTask,
    voteOnProposal
  };

  switch (activeTab) {
    case 'dashboard':
      return userRole === 'creator'
        ? <CreatorDashboard {...commonProps} />
        : <StudentDashboard {...commonProps} />;
    case 'courses':
      return <StudentCoursesTab {...commonProps} />;
    case 'tasks':
      return <TasksTab {...commonProps} />;
    case 'dao':
      return <DAOTab {...commonProps} voteOnProposal={voteOnProposal} />;
    case 'badges':
      return <BadgesTab {...commonProps} />;
    case 'quiz':
      return <DailyQuizTab completeDailyQuiz={completeDailyQuiz} dailyQuizAvailable={dailyQuizAvailable} loading={loading} />;
    default:
      return <StudentDashboard {...commonProps} />;
  }
};

return (
  <div className="min-h-screen bg-gray-50">
    <div className="flex min-h-screen bg-gray-50">
  {/* Sidebar */}
  {account && userRole && (
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  )}

  {/* Main content */}
  <main className="flex-1 p-6 overflow-auto">
    {renderContent()}
  </main>
</div>

  </div>
);

};

export default SkillSyncDApp;
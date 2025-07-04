import React, { useState, useEffect } from 'react';
import './SkillSyncDApp.css';
import { 
  User, BookOpen, Trophy, Vote, Target, Award, Wallet, Plus, Send, CheckCircle, 
  Clock, Star, GraduationCap, Users, TrendingUp, DollarSign, Brain, Zap,
  FileText, Settings, BarChart3, Crown, Diamond, Shield, Medal
} from 'lucide-react';

const SkillSyncDApp = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contracts, setContracts] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'student' or 'creator'
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

  // Contract addresses - update with your deployed addresses
  const CONTRACT_ADDRESSES = {
    syncToken: '0x...',
    courseAccessManager: '0x...',
    taskManager: '0x...',
    soulboundReputation: '0x...',
    badgeManager: '0x...',
    dailyQuizManager: '0x...',
    skillSyncDAO: '0x...'
  };

  // Simplified ABIs
  const SYNC_TOKEN_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function approve(address, uint256) returns (bool)",
    "function transfer(address, uint256) returns (bool)",
    "function mint(address, uint256)"
  ];

  const COURSE_MANAGER_ABI = [
    "function courseCount() view returns (uint256)",
    "function getCourse(uint256) view returns (string, string, uint256, bool)",
    "function purchaseCourse(uint256)",
    "function createCourse(string, string, string, uint256)",
    "function hasPurchased(address, uint256) view returns (bool)",
    "function isCreator(address) view returns (bool)"
  ];

  const DAILY_QUIZ_ABI = [
    "function lastQuizCompleted(address) view returns (uint256)",
    "function completeDailyQuiz(address)"
  ];

  const BADGE_MANAGER_ABI = [
    "function balanceOf(address, uint256) view returns (uint256)",
    "function badgeCount() view returns (uint256)",
    "function badges(uint256) view returns (tuple)"
  ];

  const SOULBOUND_ABI = [
    "function userToTokenId(address) view returns (uint256)",
    "function getReputation(uint256) view returns (uint256, uint256, uint256, uint256, string[], uint256, uint256)",
    "function createReputation(address)"
  ];

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
      
      // Mock data for demo purposes since we don't have actual contracts
      setUserBalance('125.50');
      setUserRole('student');
      setUserReputation({
        tokenId: '1',
        totalScore: '347',
        tasksCompleted: '15',
        endorsements: '8',
        challenges: '3',
        skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
        level: getReputationLevel('347')
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
      
      // Mock proposals
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
          title: 'Add New Skill Categories',
          description: 'Proposal to add AI/ML and Web3 Development as new skill categories',
          votesFor: 890,
          votesAgainst: 210,
          deadline: '5 days left'
        }
      ]);
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const getReputationLevel = (score) => {
    const numScore = parseInt(score);
    if (numScore >= 1000) return { name: 'Platinum', icon: Crown, color: 'text-purple-600' };
    if (numScore >= 500) return { name: 'Gold', icon: Medal, color: 'text-yellow-600' };
    if (numScore >= 250) return { name: 'Silver', icon: Shield, color: 'text-gray-600' };
    if (numScore >= 100) return { name: 'Bronze', icon: Award, color: 'text-orange-600' };
    return { name: 'Beginner', icon: Star, color: 'text-blue-600' };
  };

  const purchaseCourse = async (courseId, price) => {
    try {
      setLoading(true);
      // Simulate course purchase
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
      // Simulate course creation
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
      // Simulate quiz completion
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
      // Simulate task submission
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

  // Student Dashboard Components
  const StudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">SYNC Balance</h3>
              <p className="text-3xl font-bold">{userBalance}</p>
            </div>
            <Wallet className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Reputation</h3>
              <p className="text-3xl font-bold">{userReputation?.totalScore || '0'}</p>
              <p className="text-sm opacity-80">{userReputation?.level?.name || 'Beginner'}</p>
            </div>
            {userReputation?.level?.icon && <userReputation.level.icon className="w-8 h-8 opacity-80" />}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Courses Owned</h3>
              <p className="text-3xl font-bold">{userStats.coursesPurchased}</p>
            </div>
            <BookOpen className="w-8 h-8 opacity-80" />
          </div>
        </div>

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

      {/* Reputation NFT Section */}
      {userReputation && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Diamond className="w-5 h-5 mr-2 text-blue-600" />
            Your Reputation NFT
          </h3>
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              {userReputation.level?.icon && (
                <userReputation.level.icon className={`w-16 h-16 text-white`} />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-800">{userReputation.level?.name} Level</h4>
              <p className="text-gray-600 mb-4">Token ID: #{userReputation.tokenId}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Score</p>
                  <p className="text-xl font-bold">{userReputation.totalScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tasks Completed</p>
                  <p className="text-xl font-bold">{userReputation.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Endorsements</p>
                  <p className="text-xl font-bold">{userReputation.endorsements}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <p className="text-xl font-bold">{userReputation.skills?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Creator Dashboard Components
  const CreatorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">SYNC Balance</h3>
              <p className="text-3xl font-bold">{userBalance}</p>
            </div>
            <Wallet className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Courses Created</h3>
              <p className="text-3xl font-bold">{userStats.coursesCreated}</p>
            </div>
            <BookOpen className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Earnings</h3>
              <p className="text-3xl font-bold">{userStats.totalEarnings}</p>
            </div>
            <DollarSign className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Students Enrolled</h3>
              <p className="text-3xl font-bold">{userStats.studentsEnrolled}</p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Quick Course Creation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-blue-600" />
          Create New Course
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Course Title"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Price (SYNC)"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="Course Description"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent col-span-full"
            rows="3"
          />
          <input
            type="text"
            placeholder="IPFS Hash"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent col-span-full"
          />
          <button
            onClick={() => {
              // Get form values and create course
              const title = document.querySelector('input[placeholder="Course Title"]').value;
              const price = document.querySelector('input[placeholder="Price (SYNC)"]').value;
              const description = document.querySelector('textarea').value;
              const ipfsHash = document.querySelector('input[placeholder="IPFS Hash"]').value;
              
              if (title && price && description && ipfsHash) {
                createCourse(title, description, ipfsHash, price);
              }
            }}
            disabled={loading}
            className="col-span-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </div>

      {/* Course Analytics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
          Course Performance
        </h3>
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.students} students enrolled</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{course.price} SYNC</p>
                <p className="text-sm text-gray-500">Revenue: {course.price * course.students} SYNC</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const StudentCoursesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Courses</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">{course.students} students</span>
              <span className="text-2xl font-bold text-blue-600">{course.price} SYNC</span>
            </div>
            <button
              onClick={() => purchaseCourse(course.id, course.price)}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Purchase Course'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const TasksTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Tasks</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{task.title}</h3>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Level {task.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <p className="text-sm text-purple-600 mb-4">Skill: {task.skillCategory}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">{task.reward} SYNC</span>
              <button
                onClick={() => {
                  const ipfsHash = prompt('Enter IPFS hash for your submission:');
                  if (ipfsHash) submitTask(task.id, ipfsHash);
                }}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Task'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DAOTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">DAO Governance</h2>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
          Voting Power: {userBalance} SYNC
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Active Proposals</h3>
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No active proposals</p>
          ) : (
            proposals.map(proposal => (
              <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{proposal.title}</h4>
                  <span className="text-sm text-gray-500">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {proposal.deadline}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{proposal.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <span className="text-green-600">For: {proposal.votesFor}</span>
                    <span className="text-red-600">Against: {proposal.votesAgainst}</span>
                  </div>
                  <div className="space-x-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Vote For
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                      Vote Against
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const BadgesTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Achievement Badges (ERC1155)</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Your Badge Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { id: 1, name: 'First Course', icon: BookOpen, owned: userBadges.some(b => b.id === 1) },
            { id: 2, name: 'Task Master', icon: Target, owned: userBadges.some(b => b.id === 2) },
            { id: 3, name: 'Quiz Champion', icon: Brain, owned: userBadges.some(b => b.id === 3) },
            { id: 4, name: 'Community Leader', icon: Users, owned: userBadges.some(b => b.id === 4) },
            { id: 5, name: 'Creator', icon: Plus, owned: userBadges.some(b => b.id === 5) },
            { id: 6, name: 'Platinum Member', icon: Crown, owned: userBadges.some(b => b.id === 6) }
          ].map(badge => (
            <div key={badge.id} className={`text-center p-4 border-2 rounded-lg ${
              badge.owned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <badge.icon className={`w-12 h-12 mx-auto mb-2 ${
                badge.owned ? 'text-yellow-500' : 'text-gray-400'
              }`} />
              <p className={`text-sm font-medium ${
                badge.owned ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {badge.name}
              </p>
              {badge.owned && (
                <div className="mt-2">
                  <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    Owned
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!account) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">SkillSync DApp</h1>
              <p className="text-gray-600 mb-8">
                Connect your wallet to access the decentralized learning platform
              </p>
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return userRole === 'creator' ? <CreatorDashboard /> : <StudentDashboard />;
      case 'courses':
        return <StudentCoursesTab />;
      case 'tasks':
        return <TasksTab />;
      case 'dao':
        return <DAOTab />;
      case 'badges':
        return <BadgesTab />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      {account && (
        <nav className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-bold text-purple-700">SkillSync</h1>
              <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'font-bold text-purple-700' : 'text-gray-600'}>Dashboard</button>
              <button onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'font-bold text-purple-700' : 'text-gray-600'}>Courses</button>
              <button onClick={() => setActiveTab('tasks')} className={activeTab === 'tasks' ? 'font-bold text-purple-700' : 'text-gray-600'}>Tasks</button>
              <button onClick={() => setActiveTab('dao')} className={activeTab === 'dao' ? 'font-bold text-purple-700' : 'text-gray-600'}>DAO</button>
              <button onClick={() => setActiveTab('badges')} className={activeTab === 'badges' ? 'font-bold text-purple-700' : 'text-gray-600'}>Badges</button>
            </div>
            <div className="text-sm text-gray-600">{account.slice(0, 6)}...{account.slice(-4)}</div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default SkillSyncDApp;

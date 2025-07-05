import React from 'react';
import { 
  Wallet, BookOpen, DollarSign, Users, Plus, BarChart3
} from 'lucide-react';

const CreatorDashboard = ({ 
  userBalance, 
  userStats, 
  courses, 
  createCourse, 
  loading 
}) => {
  const handleCreateCourse = () => {
    const title = document.querySelector('input[placeholder="Course Title"]').value;
    const price = document.querySelector('input[placeholder="Price (SYNC)"]').value;
    const description = document.querySelector('textarea').value;
    const ipfsHash = document.querySelector('input[placeholder="IPFS Hash"]').value;
    
    if (title && price && description && ipfsHash) {
      createCourse(title, description, ipfsHash, price);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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
            onClick={handleCreateCourse}
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
};

export default CreatorDashboard;
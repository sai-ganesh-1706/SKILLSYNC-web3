import React from 'react';

const StudentCoursesTab = ({ courses, purchaseCourse, loading }) => {
  return (
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
};

export default StudentCoursesTab;
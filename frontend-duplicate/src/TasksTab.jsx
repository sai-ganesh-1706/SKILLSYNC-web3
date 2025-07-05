import React from 'react';

const TasksTab = ({ tasks, submitTask, loading }) => {
  const handleSubmitTask = (taskId) => {
    const ipfsHash = prompt('Enter IPFS hash for your submission:');
    if (ipfsHash) {
      submitTask(taskId, ipfsHash);
    }
  };

  return (
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
                onClick={() => handleSubmitTask(task.id)}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksTab;

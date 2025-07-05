import React, { useState } from 'react';

const DAOTab = ({ proposals, voteOnProposal, loading }) => {
  const [votedProposals, setVotedProposals] = useState({}); // Track votes per proposal

  const handleVote = async (proposalId, support) => {
    await voteOnProposal(proposalId, support);
    setVotedProposals(prev => ({
      ...prev,
      [proposalId]: support ? 'approved' : 'rejected'
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🗳️ DAO Proposals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.length === 0 ? (
          <p className="text-gray-500">No proposals available.</p>
        ) : (
          proposals.map(proposal => {
            const voteStatus = votedProposals[proposal.id];

            return (
              <div key={proposal.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
                <p className="text-gray-600 mb-4">{proposal.description}</p>
                <p className="text-sm text-gray-400 mb-2">🕒 {proposal.deadline}</p>

                {!voteStatus ? (
                  <div className="flex justify-between items-center gap-2">
                    <button
                      onClick={() => handleVote(proposal.id, true)}
                      disabled={loading}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      👍 Approve
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, false)}
                      disabled={loading}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      👎 Reject
                    </button>
                  </div>
                ) : (
                  <p className={`mt-4 font-semibold ${voteStatus === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                    ✅ You voted to {voteStatus} this proposal.
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DAOTab;

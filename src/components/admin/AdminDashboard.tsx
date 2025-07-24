import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Vote, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { state } = useApp();

  if (state.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  const totalVotes = state.votes.length;
  const totalCandidates = state.candidates.length;
  const activeElections = state.elections.filter(e => e.isActive).length;

  const votesByPosition = state.currentElection?.positions.map(position => {
    const positionVotes = state.votes.filter(v => v.position === position).length;
    return { position, votes: positionVotes };
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor election activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Vote className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Total Votes</h3>
                <p className="text-2xl font-bold text-gray-900">{totalVotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Candidates</h3>
                <p className="text-2xl font-bold text-gray-900">{totalCandidates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Active Elections</h3>
                <p className="text-2xl font-bold text-gray-900">{activeElections}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Turnout Rate</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {state.currentElection ? Math.round((totalVotes / 1000) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Election */}
        {state.currentElection && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Election</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{state.currentElection.title}</h3>
                <p className="text-gray-600 mb-4">{state.currentElection.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Start Date: </span>
                    <span className="text-sm text-gray-900">
                      {new Date(state.currentElection.startDate).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">End Date: </span>
                    <span className="text-sm text-gray-900">
                      {new Date(state.currentElection.endDate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Votes by Position</h4>
                <div className="space-y-2">
                  {votesByPosition.map((item) => (
                    <div key={item.position} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-700">{item.position}</span>
                      <span className="text-sm font-bold text-gray-900">{item.votes} votes</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Voting Activity</h2>
          <div className="space-y-3">
            {state.votes.slice(-10).reverse().map((vote) => {
              const candidate = state.candidates.find(c => c.id === vote.candidateId);
              return (
                <div key={vote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Vote cast for {candidate?.name || 'Unknown Candidate'}
                      </p>
                      <p className="text-xs text-gray-600">{vote.position}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(vote.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              );
            })}
            {state.votes.length === 0 && (
              <p className="text-gray-500 text-center py-4">No votes cast yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, TrendingUp, Users, Award } from 'lucide-react';

const ResultsDisplay: React.FC = () => {
  const { state } = useApp();
  
  if (!state.currentElection) {
    return <div>No active election</div>;
  }

  const positions = state.currentElection.positions;
  const totalVotes = state.currentElection.totalVotes;

  const getResultsForPosition = (position: string) => {
    const candidates = state.candidates.filter(c => c.position === position);
    const positionTotalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    
    return candidates
      .sort((a, b) => b.votes - a.votes)
      .map(candidate => ({
        ...candidate,
        percentage: positionTotalVotes > 0 ? (candidate.votes / positionTotalVotes) * 100 : 0
      }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Election Results</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Votes</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">{totalVotes.toLocaleString()}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Positions</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">{positions.length}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Candidates</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-1">{state.candidates.length}</p>
            </div>
          </div>
        </div>

        {/* Results by Position */}
        {positions.map((position) => {
          const results = getResultsForPosition(position);
          const winner = results[0];
          
          return (
            <div key={position} className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{position}</h2>
              
              <div className="space-y-4">
                {results.map((candidate, index) => (
                  <div key={candidate.id} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={candidate.photo}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{candidate.name}</span>
                            {index === 0 && winner.votes > 0 && (
                              <Award className="h-4 w-4 text-yellow-500" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">{candidate.votes.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{candidate.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          index === 0 && winner.votes > 0
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : 'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}
                        style={{ width: `${candidate.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {winner && winner.votes > 0 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">
                      Leading: {winner.name} with {winner.votes.toLocaleString()} votes ({winner.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsDisplay;
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CandidateCard from './CandidateCard';
import VoteConfirmation from './VoteConfirmation';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const VotingInterface: React.FC = () => {
  const { state, castVote } = useApp();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const hasVoted = state.user?.voter?.hasVoted || false;
  const positions = state.currentElection?.positions || [];
  const [currentPosition, setCurrentPosition] = useState(positions[0] || '');

  const candidatesForPosition = state.candidates.filter(
    candidate => candidate.position === currentPosition
  );

  const handleVoteClick = (candidateId: string) => {
    if (hasVoted) return;
    
    setSelectedCandidate(candidateId);
    setSelectedPosition(currentPosition);
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidate || !selectedPosition) return;
    
    const success = await castVote(selectedCandidate, selectedPosition);
    if (success) {
      setShowConfirmation(false);
      setSelectedCandidate(null);
    }
  };

  const handleCancelVote = () => {
    setShowConfirmation(false);
    setSelectedCandidate(null);
    setSelectedPosition('');
  };

  if (!state.currentElection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Election</h2>
          <p className="text-gray-600">There are currently no active elections.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Election Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {state.currentElection.title}
              </h1>
              <p className="text-gray-600 mb-4">{state.currentElection.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Ends: {new Date(state.currentElection.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            {hasVoted && (
              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Vote Submitted</span>
              </div>
            )}
          </div>
        </div>

        {/* Position Selector */}
        {positions.length > 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Position</h2>
            <div className="flex flex-wrap gap-3">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => setCurrentPosition(position)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentPosition === position
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {position}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Voting Status */}
        {hasVoted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">Thank You for Voting!</h3>
                <p className="text-green-700">Your vote has been successfully recorded and secured.</p>
              </div>
            </div>
          </div>
        )}

        {/* Candidates Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Candidates for {currentPosition}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidatesForPosition.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onVote={handleVoteClick}
                hasVoted={hasVoted}
                isVotingDisabled={state.isLoading}
              />
            ))}
          </div>
        </div>

        {/* Vote Confirmation Modal */}
        {showConfirmation && selectedCandidate && (
          <VoteConfirmation
            candidate={state.candidates.find(c => c.id === selectedCandidate)!}
            position={selectedPosition}
            onConfirm={handleConfirmVote}
            onCancel={handleCancelVote}
            isLoading={state.isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default VotingInterface;
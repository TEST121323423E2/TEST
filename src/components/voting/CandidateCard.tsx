import React from 'react';
import { User, Award, MapPin } from 'lucide-react';
import { Candidate } from '../../types';

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidateId: string) => void;
  hasVoted: boolean;
  isVotingDisabled: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onVote, 
  hasVoted, 
  isVotingDisabled 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="relative">
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-700">{candidate.party}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{candidate.name}</h3>
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">{candidate.position}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{candidate.bio}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Platform Points:</h4>
          <ul className="space-y-1">
            {candidate.platform.slice(0, 3).map((point, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="h-4 w-4" />
            <span className="text-sm">{candidate.experience}</span>
          </div>
        </div>

        <button
          onClick={() => onVote(candidate.id)}
          disabled={hasVoted || isVotingDisabled}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            hasVoted || isVotingDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105'
          }`}
        >
          {hasVoted ? 'Vote Cast' : 'Vote for Candidate'}
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
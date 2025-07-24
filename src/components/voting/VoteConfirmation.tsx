import React from 'react';
import { X, CheckCircle, Loader } from 'lucide-react';
import { Candidate } from '../../types';

interface VoteConfirmationProps {
  candidate: Candidate;
  position: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const VoteConfirmation: React.FC<VoteConfirmationProps> = ({
  candidate,
  position,
  onConfirm,
  onCancel,
  isLoading
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Confirm Your Vote</h2>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
          <p className="text-gray-600 mb-1">{candidate.party}</p>
          <p className="text-blue-600 font-medium">{position}</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Important Notice</h4>
              <p className="text-sm text-yellow-800 mt-1">
                Once you confirm your vote, it cannot be changed. Please review your selection carefully.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Confirm Vote</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmation;
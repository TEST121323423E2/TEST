import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Candidate, Election, Vote } from '../types';
import { mockCandidates, mockElections, mockUsers } from '../data/mockData';

interface AppState {
  user: User | null;
  candidates: Candidate[];
  elections: Election[];
  votes: Vote[];
  currentElection: Election | null;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CANDIDATES'; payload: Candidate[] }
  | { type: 'SET_ELECTIONS'; payload: Election[] }
  | { type: 'SET_VOTES'; payload: Vote[] }
  | { type: 'ADD_VOTE'; payload: Vote }
  | { type: 'SET_CURRENT_ELECTION'; payload: Election | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_CANDIDATE_VOTES'; payload: { candidateId: string; votes: number } };

const initialState: AppState = {
  user: null,
  candidates: mockCandidates,
  elections: mockElections,
  votes: [],
  currentElection: null,
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CANDIDATES':
      return { ...state, candidates: action.payload };
    case 'SET_ELECTIONS':
      return { ...state, elections: action.payload };
    case 'SET_VOTES':
      return { ...state, votes: action.payload };
    case 'ADD_VOTE':
      return { ...state, votes: [...state.votes, action.payload] };
    case 'SET_CURRENT_ELECTION':
      return { ...state, currentElection: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_CANDIDATE_VOTES':
      return {
        ...state,
        candidates: state.candidates.map(candidate =>
          candidate.id === action.payload.candidateId
            ? { ...candidate, votes: action.payload.votes }
            : candidate
        ),
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  castVote: (candidateId: string, position: string) => Promise<boolean>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Set the first active election as current
    const activeElection = state.elections.find(e => e.isActive);
    if (activeElection && !state.currentElection) {
      dispatch({ type: 'SET_CURRENT_ELECTION', payload: activeElection });
    }
  }, [state.elections, state.currentElection]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
    return false;
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  const castVote = async (candidateId: string, position: string): Promise<boolean> => {
    if (!state.user || !state.currentElection) return false;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const vote: Vote = {
      id: Date.now().toString(),
      voterId: state.user.id,
      candidateId,
      position,
      timestamp: new Date().toISOString(),
      electionId: state.currentElection.id,
    };
    
    dispatch({ type: 'ADD_VOTE', payload: vote });
    
    // Update candidate vote count
    const candidate = state.candidates.find(c => c.id === candidateId);
    if (candidate) {
      dispatch({
        type: 'UPDATE_CANDIDATE_VOTES',
        payload: { candidateId, votes: candidate.votes + 1 },
      });
    }
    
    // Mark voter as having voted
    if (state.user.voter) {
      const updatedUser = {
        ...state.user,
        voter: { ...state.user.voter, hasVoted: true },
      };
      dispatch({ type: 'SET_USER', payload: updatedUser });
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
    return true;
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, logout, castVote }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
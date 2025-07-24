export interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  photo: string;
  bio: string;
  platform: string[];
  experience: string;
  votes: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  positions: string[];
  isActive: boolean;
  totalVotes: number;
}

export interface Voter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  voterId: string;
  hasVoted: boolean;
  ward: string;
}

export interface Vote {
  id: string;
  voterId: string;
  candidateId: string;
  position: string;
  timestamp: string;
  electionId: string;
}

export interface User {
  id: string;
  email: string;
  role: 'voter' | 'admin';
  voter?: Voter;
}
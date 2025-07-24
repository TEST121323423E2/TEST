import { Candidate, Election, User, Voter } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    party: 'Progressive Alliance',
    position: 'Mayor',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Sarah Johnson is a dedicated public servant with over 15 years of experience in municipal governance. She has served as a city councilor for the past 8 years and has been instrumental in developing sustainable urban planning initiatives.',
    platform: [
      'Sustainable urban development',
      'Affordable housing initiatives',
      'Public transportation expansion',
      'Green energy adoption',
      'Economic development programs'
    ],
    experience: 'Former City Councilor (8 years), Urban Planning Commission Chair (3 years)',
    votes: 1247
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    party: 'Citizens First',
    position: 'Mayor',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Michael Rodriguez brings a fresh perspective to municipal leadership with his background in business development and community organizing. He has successfully launched several local business incubators and community programs.',
    platform: [
      'Small business support',
      'Infrastructure modernization',
      'Public safety enhancement',
      'Digital governance initiatives',
      'Youth development programs'
    ],
    experience: 'Business Development Director (10 years), Community Organizer (5 years)',
    votes: 1089
  },
  {
    id: '3',
    name: 'Jennifer Chen',
    party: 'Unity Party',
    position: 'City Council Ward 1',
    photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Jennifer Chen is an environmental lawyer and community advocate who has been fighting for residents\' rights for over a decade. She specializes in environmental policy and sustainable development.',
    platform: [
      'Environmental protection',
      'Community health initiatives',
      'Transparent governance',
      'Parks and recreation expansion',
      'Climate action plans'
    ],
    experience: 'Environmental Lawyer (12 years), Community Board Member (6 years)',
    votes: 892
  },
  {
    id: '4',
    name: 'David Thompson',
    party: 'Independent',
    position: 'City Council Ward 1',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'David Thompson is a retired police officer and veteran who has dedicated his life to serving the community. He brings valuable experience in public safety and emergency management.',
    platform: [
      'Community policing initiatives',
      'Veterans support programs',
      'Emergency preparedness',
      'Neighborhood watch programs',
      'Senior citizen services'
    ],
    experience: 'Police Officer (25 years), Emergency Management Coordinator (5 years)',
    votes: 756
  },
  {
    id: '5',
    name: 'Lisa Patel',
    party: 'Democratic Reform',
    position: 'School Board',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Lisa Patel is an educator with 18 years of teaching experience and a Master\'s in Educational Administration. She has been a parent advocate and PTA president for multiple schools.',
    platform: [
      'Educational excellence',
      'Teacher support and training',
      'Technology integration',
      'Special needs programs',
      'Parent engagement initiatives'
    ],
    experience: 'High School Principal (8 years), Teacher (18 years), PTA President (4 years)',
    votes: 1156
  },
  {
    id: '6',
    name: 'Robert Martinez',
    party: 'Education First',
    position: 'School Board',
    photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Robert Martinez is a former school administrator and current education consultant who has worked to improve educational outcomes across multiple districts.',
    platform: [
      'STEM program expansion',
      'Career readiness programs',
      'Mental health support',
      'Arts and music education',
      'School infrastructure improvements'
    ],
    experience: 'School Superintendent (12 years), Education Consultant (6 years)',
    votes: 967
  }
];

export const mockElections: Election[] = [
  {
    id: '1',
    title: '2024 Municipal General Election',
    description: 'General election for municipal positions including Mayor, City Council, and School Board.',
    startDate: '2024-03-15T08:00:00Z',
    endDate: '2024-03-15T20:00:00Z',
    positions: ['Mayor', 'City Council Ward 1', 'School Board'],
    isActive: true,
    totalVotes: 6107
  },
  {
    id: '2',
    title: '2024 Budget Referendum',
    description: 'Special election to approve the municipal budget and infrastructure improvements.',
    startDate: '2024-05-20T08:00:00Z',
    endDate: '2024-05-20T20:00:00Z',
    positions: ['Budget Approval'],
    isActive: false,
    totalVotes: 0
  }
];

const mockVoters: Voter[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    voterId: 'V001234',
    hasVoted: false,
    ward: 'Ward 1'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    voterId: 'V001235',
    hasVoted: true,
    ward: 'Ward 2'
  },
  {
    id: '3',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@municipality.gov',
    voterId: 'A000001',
    hasVoted: false,
    ward: 'Ward 1'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@email.com',
    role: 'voter',
    voter: mockVoters[0]
  },
  {
    id: '2',
    email: 'jane.smith@email.com',
    role: 'voter',
    voter: mockVoters[1]
  },
  {
    id: '3',
    email: 'admin@municipality.gov',
    role: 'admin',
    voter: mockVoters[2]
  }
];
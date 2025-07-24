import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/common/Header';
import Navigation from './components/navigation/Navigation';
import LoginForm from './components/auth/LoginForm';
import VotingInterface from './components/voting/VotingInterface';
import ResultsDisplay from './components/results/ResultsDisplay';
import AdminDashboard from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { state } = useApp();
  const [currentView, setCurrentView] = useState<'voting' | 'results' | 'admin'>('voting');

  if (!state.user) {
    return <LoginForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'voting':
        return <VotingInterface />;
      case 'results':
        return <ResultsDisplay />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <VotingInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
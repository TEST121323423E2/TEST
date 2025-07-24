import React from 'react';
import { Vote, BarChart3, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavigationProps {
  currentView: 'voting' | 'results' | 'admin';
  onViewChange: (view: 'voting' | 'results' | 'admin') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { state } = useApp();

  const navItems = [
    {
      id: 'voting' as const,
      label: 'Vote',
      icon: Vote,
      description: 'Cast your ballot'
    },
    {
      id: 'results' as const,
      label: 'Results',
      icon: BarChart3,
      description: 'View election results'
    }
  ];

  if (state.user?.role === 'admin') {
    navItems.push({
      id: 'admin' as const,
      label: 'Admin',
      icon: Settings,
      description: 'Election management'
    });
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-2 transition-all duration-200 ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
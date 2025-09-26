import React from 'react';
import { Home, CheckSquare, Users, Wallet, MapPin, MessageCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasSelectedEvent: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, hasSelectedEvent }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', alwaysShow: true },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks', alwaysShow: false },
    { id: 'guests', icon: Users, label: 'Guests', alwaysShow: false },
    { id: 'budget', icon: Wallet, label: 'Budget', alwaysShow: false },
    { id: 'venues', icon: MapPin, label: 'Venues', alwaysShow: true },
    { id: 'chatbot', icon: MessageCircle, label: 'Chatbot', alwaysShow: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-40">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map(({ id, icon: Icon, label, alwaysShow }) => {
          const shouldShow = alwaysShow || hasSelectedEvent;
          
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`nav-link flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                activeTab === id 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              } ${shouldShow ? '' : 'hidden'}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
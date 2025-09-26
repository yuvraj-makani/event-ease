import React from 'react';
import { Info } from 'lucide-react';
import { Event } from '../types';

interface HeaderProps {
  selectedEvent: Event | undefined;
}

const Header: React.FC<HeaderProps> = ({ selectedEvent }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-40">
      <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-teal-900">EventEase</h1>
        
        {selectedEvent && (
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
            <Info className="w-4 h-4" />
            <span>Event: {selectedEvent.id.substring(0, 5)}...</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Plus, X, Star, CheckCircle } from 'lucide-react';
import { Guest } from '../types';

interface GuestsProps {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
  selectedEventId: string;
}

const Guests: React.FC<GuestsProps> = ({ guests, setGuests, selectedEventId }) => {
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showDigitalPass, setShowDigitalPass] = useState<Guest | null>(null);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    rsvp: 'Pending' as 'Pending' | 'Confirmed' | 'Declined',
    specialRequests: '',
    isVIP: false
  });

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGuest.name && newGuest.email) {
      const guest: Guest = {
        id: Date.now().toString(),
        eventId: selectedEventId,
        name: newGuest.name,
        email: newGuest.email,
        rsvp: newGuest.rsvp,
        specialRequests: newGuest.specialRequests,
        isVIP: newGuest.isVIP,
        isCheckedIn: false
      };
      
      setGuests(prev => [...prev, guest]);
      setNewGuest({ name: '', email: '', rsvp: 'Pending', specialRequests: '', isVIP: false });
      setShowAddGuest(false);
    }
  };

  const checkInGuest = (guestId: string) => {
    setGuests(prev => prev.map(guest => 
      guest.id === guestId ? { ...guest, isCheckedIn: true } : guest
    ));
  };

  const deleteGuest = (guestId: string) => {
    setGuests(prev => prev.filter(guest => guest.id !== guestId));
  };

  const sendInvite = (guestName: string) => {
    alert(`Mock invite sent to ${guestName}! (Feature needs backend integration)`);
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Guest Management</h2>
        <button
          onClick={() => setShowAddGuest(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add
        </button>
      </div>

      {guests.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">No guests added yet. Add a new guest!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {guests.map(guest => (
            <div key={guest.id} className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">{guest.name}</h3>
                <div className="flex items-center space-x-2">
                  {guest.isCheckedIn && (
                    <span className="text-xs bg-green-200 text-green-800 font-semibold px-2 py-1 rounded-full">
                      Checked In
                    </span>
                  )}
                  {guest.isVIP && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 font-semibold px-2 py-1 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      VIP
                    </span>
                  )}
                  <button
                    onClick={() => deleteGuest(guest.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Email: {guest.email}</p>
                <p>RSVP: <span className={`font-semibold ${
                  guest.rsvp === 'Confirmed' ? 'text-green-600' : 
                  guest.rsvp === 'Declined' ? 'text-red-600' : 'text-yellow-600'
                }`}>{guest.rsvp}</span></p>
                {guest.specialRequests && <p>Requests: {guest.specialRequests}</p>}
              </div>
              
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => sendInvite(guest.name)}
                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors"
                >
                  Send Invite
                </button>
                {!guest.isCheckedIn && (
                  <button
                    onClick={() => checkInGuest(guest.id)}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors flex items-center"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Check In
                  </button>
                )}
                <button
                  onClick={() => setShowDigitalPass(guest)}
                  className="px-3 py-1 bg-rose-500 text-white text-sm rounded-full hover:bg-rose-600 transition-colors"
                >
                  Digital Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Guest Modal */}
      {showAddGuest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Guest</h3>
              <button 
                onClick={() => setShowAddGuest(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">RSVP Status</label>
                <select
                  value={newGuest.rsvp}
                  onChange={(e) => setNewGuest(prev => ({ ...prev, rsvp: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Special Requests</label>
                <textarea
                  value={newGuest.specialRequests}
                  onChange={(e) => setNewGuest(prev => ({ ...prev, specialRequests: e.target.value }))}
                  placeholder="Vegetarian meal, wheelchair access, etc."
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVIP"
                  checked={newGuest.isVIP}
                  onChange={(e) => setNewGuest(prev => ({ ...prev, isVIP: e.target.checked }))}
                  className="mr-2 text-rose-500 focus:ring-rose-500"
                />
                <label htmlFor="isVIP" className="text-sm text-gray-700">Mark as VIP Guest</label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all"
              >
                Add Guest
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Digital Pass Modal */}
      {showDigitalPass && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center space-y-4">
            <div className={`p-6 rounded-3xl ${
              showDigitalPass.isVIP 
                ? 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-amber-300' 
                : 'bg-gradient-to-br from-teal-100 to-pink-100'
            }`}>
              <h3 className="text-xl font-bold text-gray-800 mb-2">DIGITAL PASS</h3>
              
              <div className="w-32 h-32 mx-auto mb-4 p-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                  QR Code
                </div>
              </div>
              
              <h4 className="text-2xl font-extrabold text-teal-900 mb-1">{showDigitalPass.name}</h4>
              <p className="text-lg text-gray-700">Event Pass</p>
              
              {showDigitalPass.isVIP && (
                <div className="flex items-center justify-center space-x-2 text-yellow-700 font-semibold mt-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span>VIP Guest</span>
                </div>
              )}
              
              <div className="mt-4 text-left text-sm">
                <p className="text-gray-600"><strong>RSVP:</strong> {showDigitalPass.rsvp}</p>
                <p className="text-gray-600"><strong>Email:</strong> {showDigitalPass.email}</p>
                {showDigitalPass.specialRequests && (
                  <p className="text-gray-600"><strong>Requests:</strong> {showDigitalPass.specialRequests}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setShowDigitalPass(null)}
              className="w-full py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guests;
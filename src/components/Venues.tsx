import React from 'react';
import { Star, MapPin } from 'lucide-react';

const Venues: React.FC = () => {
  const venues = [
    {
      id: '1',
      name: 'The Grand Ballroom',
      type: 'Banquet Hall',
      rating: 4.8,
      price: '₹50,000+',
      location: 'Green Park, Delhi'
    },
    {
      id: '2',
      name: 'Skyline Rooftop',
      type: 'Rooftop Lounge',
      rating: 4.5,
      price: '₹35,000+',
      location: 'Hauz Khas, Delhi'
    },
    {
      id: '3',
      name: 'Royal Garden Retreat',
      type: 'Lawn & Garden',
      rating: 4.9,
      price: '₹70,000+',
      location: 'Gurgaon'
    },
    {
      id: '4',
      name: 'The Urban Bistro',
      type: 'Restaurant',
      rating: 4.2,
      price: '₹20,000+',
      location: 'Connaught Place, Delhi'
    },
  ];

  const handleContactVenue = (venueName: string) => {
    alert(`Contact form for ${venueName} would open here. (Feature needs backend integration)`);
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Nearby Venues</h2>
        <p className="text-sm text-gray-500 mt-1">Explore popular options in your area</p>
      </div>

      <div className="space-y-4">
        {venues.map(venue => (
          <div key={venue.id} className="bg-white rounded-xl shadow-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{venue.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-semibold">
                    {venue.type}
                  </span>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{venue.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="text-sm font-semibold text-yellow-700">{venue.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <p className="text-lg font-bold text-rose-600">{venue.price}</p>
                <p className="text-xs text-gray-500">Starting price</p>
              </div>
              
              <button
                onClick={() => handleContactVenue(venue.name)}
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg text-sm font-semibold hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Venue
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Air Conditioned
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Parking Available
              </span>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                Catering Allowed
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200">
        <h3 className="font-semibold text-rose-800 mb-2">Need Help Finding the Perfect Venue?</h3>
        <p className="text-sm text-rose-700 mb-3">
          Our venue experts can help you find and book the perfect location for your event.
        </p>
        <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600 transition-colors">
          Get Expert Help
        </button>
      </div>
    </div>
  );
};

export default Venues;
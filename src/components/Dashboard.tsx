import React from 'react';
import { Plus, Users, CheckSquare, Wallet, Calendar, ChevronRight, XCircle } from 'lucide-react';
import { Event, Task, Guest, Expense } from '../types';

interface DashboardProps {
  events: Event[];
  selectedEvent: Event | undefined;
  tasks: Task[];
  guests: Guest[];
  expenses: Expense[];
  onSelectEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onShowEventModal: () => void;
  onQuickAction: (action: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  events,
  selectedEvent,
  tasks,
  guests,
  expenses,
  onSelectEvent,
  onDeleteEvent,
  onShowEventModal,
  onQuickAction,
}) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const confirmedGuests = guests.filter(g => g.rsvp === 'Confirmed').length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  
  const timeToEvent = selectedEvent 
    ? Math.ceil((new Date(selectedEvent.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const quickActions = [
    { id: 'tasks', icon: CheckSquare, label: 'Add Task', color: 'fuchsia' },
    { id: 'guests', icon: Users, label: 'Add Guest', color: 'teal' },
    { id: 'budget', icon: Wallet, label: 'Add Budget', color: 'amber' },
    { id: 'analytics', icon: Calendar, label: 'Analytics', color: 'indigo' },
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-rose-50 to-white min-h-full">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-teal-900 leading-tight">
          EventEase
        </h1>
        <p className="text-xl text-rose-600 mt-1">Smart Event Management</p>
      </div>

      {events.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Your Events</h2>
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event.id}
                className={`flex items-center justify-between p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                  selectedEvent?.id === event.id
                    ? 'bg-pink-200 border-l-4 border-pink-600 scale-105'
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => onSelectEvent(event.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700">{event.name}</h3>
                  <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="text-red-500 hover:text-red-700 z-10"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {!selectedEvent ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No events selected. Let's create one!</p>
          <button
            onClick={onShowEventModal}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Create New Event
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-teal-800">{selectedEvent.name} Dashboard</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="dashboard-card bg-rose-100 p-4 rounded-lg flex items-center space-x-3">
              <Users className="w-6 h-6 text-pink-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Guests</p>
                <p className="text-xs text-gray-500">{confirmedGuests}/{guests.length} confirmed</p>
              </div>
            </div>
            
            <div className="dashboard-card bg-emerald-100 p-4 rounded-lg flex items-center space-x-3">
              <CheckSquare className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Tasks</p>
                <p className="text-xs text-gray-500">{pendingTasks} pending</p>
              </div>
            </div>
            
            <div className="dashboard-card bg-amber-100 p-4 rounded-lg flex items-center space-x-3">
              <Wallet className="w-6 h-6 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Expenses</p>
                <p className="text-xs text-gray-500">₹{totalExpenses} used</p>
              </div>
            </div>
            
            <div className="dashboard-card bg-purple-100 p-4 rounded-lg flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Countdown</p>
                <p className="text-xs text-gray-500">
                  {timeToEvent !== null ? `${timeToEvent} days left` : 'Today!'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map(({ id, icon: Icon, label, color }) => (
                <button
                  key={id}
                  onClick={() => onQuickAction(id)}
                  className={`quick-action-btn bg-${color}-50 hover:bg-${color}-100 p-4 rounded-xl flex flex-col items-center space-y-2 transition-all hover:scale-105`}
                >
                  <Icon className={`w-6 h-6 text-${color}-600`} />
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
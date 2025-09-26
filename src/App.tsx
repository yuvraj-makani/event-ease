import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Guests from './components/Guests';
import Budget from './components/Budget';
import Analytics from './components/Analytics';
import Venues from './components/Venues';
import Chatbot from './components/Chatbot';
import EventModal from './components/EventModal';
import { Event, Task, Guest, Budget as BudgetType, Expense } from './types';
import { eventTemplates } from './data/templates';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  
  // Mock data - in a real app, this would come from your backend
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleCreateEvent = (eventData: any) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      name: eventData.name,
      date: eventData.date,
      time: eventData.time,
      template: eventData.template
    };

    setEvents(prev => [...prev, newEvent]);
    setSelectedEventId(newEvent.id);
    
    // Add template data if selected
    if (eventData.template && eventTemplates[eventData.template]) {
      const template = eventTemplates[eventData.template];
      
      // Add template tasks
      const templateTasks = template.tasks.map((task, index) => ({
        id: `${newEvent.id}-task-${index}`,
        eventId: newEvent.id,
        title: task.title,
        description: task.description,
        deadline: eventData.date,
        completed: false
      }));
      setTasks(prev => [...prev, ...templateTasks]);

      // Add template budgets
      const templateBudgets = template.budgets.map((budget, index) => ({
        id: `${newEvent.id}-budget-${index}`,
        eventId: newEvent.id,
        category: budget.category,
        amount: budget.amount
      }));
      setBudgets(prev => [...prev, ...templateBudgets]);
    }

    setShowEventModal(false);
    setActiveTab('home');
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setTasks(prev => prev.filter(t => t.eventId !== eventId));
    setGuests(prev => prev.filter(g => g.eventId !== eventId));
    setBudgets(prev => prev.filter(b => b.eventId !== eventId));
    setExpenses(prev => prev.filter(e => e.eventId !== eventId));
    
    if (selectedEventId === eventId) {
      setSelectedEventId(null);
    }
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const filteredTasks = tasks.filter(t => t.eventId === selectedEventId);
  const filteredGuests = guests.filter(g => g.eventId === selectedEventId);
  const filteredBudgets = budgets.filter(b => b.eventId === selectedEventId);
  const filteredExpenses = expenses.filter(e => e.eventId === selectedEventId);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard
            events={events}
            selectedEvent={selectedEvent}
            tasks={filteredTasks}
            guests={filteredGuests}
            expenses={filteredExpenses}
            onSelectEvent={setSelectedEventId}
            onDeleteEvent={handleDeleteEvent}
            onShowEventModal={() => setShowEventModal(true)}
            onQuickAction={setActiveTab}
          />
        );
      case 'tasks':
        return (
          <Tasks
            tasks={filteredTasks}
            setTasks={setTasks}
            selectedEventId={selectedEventId!}
          />
        );
      case 'guests':
        return (
          <Guests
            guests={filteredGuests}
            setGuests={setGuests}
            selectedEventId={selectedEventId!}
          />
        );
      case 'budget':
        return (
          <Budget
            budgets={filteredBudgets}
            expenses={filteredExpenses}
            setBudgets={setBudgets}
            setExpenses={setExpenses}
            selectedEventId={selectedEventId!}
          />
        );
      case 'analytics':
        return (
          <Analytics
            budgets={filteredBudgets}
            expenses={filteredExpenses}
            guests={filteredGuests}
          />
        );
      case 'venues':
        return <Venues />;
      case 'chatbot':
        return (
          <Chatbot
            selectedEvent={selectedEvent}
            tasks={filteredTasks}
            guests={filteredGuests}
            budgets={filteredBudgets}
            expenses={filteredExpenses}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header selectedEvent={selectedEvent} />
      
      <main className="flex-1 overflow-y-auto pt-16 pb-20 max-w-md mx-auto w-full">
        {renderContent()}
      </main>

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasSelectedEvent={!!selectedEventId}
      />

      {showEventModal && (
        <EventModal
          onClose={() => setShowEventModal(false)}
          onCreate={handleCreateEvent}
        />
      )}
    </div>
  );
}

export default App;
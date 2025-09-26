import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Event, Task, Guest, Budget, Expense } from '../types';
import { eventTemplates } from '../data/templates';

interface ChatbotProps {
  selectedEvent: Event | undefined;
  tasks: Task[];
  guests: Guest[];
  budgets: Budget[];
  expenses: Expense[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC<ChatbotProps> = ({ selectedEvent, tasks, guests, budgets, expenses }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your EventEase AI assistant. How can I help you manage your event today?",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const generateResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (!selectedEvent) {
      return "Please select an event first to ask questions about its status, tasks, or budget.";
    }

    if (lowerMessage.includes('task')) {
      const pendingTasks = tasks.filter(t => !t.completed).length;
      return pendingTasks > 0 
        ? `You have ${pendingTasks} tasks pending. Time to get them done! The most urgent one is: "${tasks.find(t => !t.completed)?.title}"`
        : "All your tasks are complete! Great job!";
    }

    if (lowerMessage.includes('budget')) {
      const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
      const remainingBudget = totalBudget - totalExpenses;
      return `Your total budget is ₹${totalBudget.toLocaleString()}. You've spent ₹${totalExpenses.toLocaleString()}, leaving ₹${remainingBudget.toLocaleString()} remaining.`;
    }

    if (lowerMessage.includes('guest')) {
      const confirmedGuests = guests.filter(g => g.rsvp === 'Confirmed').length;
      const vipGuests = guests.filter(g => g.isVIP).length;
      return `${confirmedGuests} guests have confirmed out of ${guests.length} total guests. You have ${vipGuests} VIP guests.`;
    }

    if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
      if (selectedEvent.template && eventTemplates[selectedEvent.template]) {
        return eventTemplates[selectedEvent.template].tips;
      }
      return "Focus on efficient delegation and clear communication for smooth event management. Don't forget to have backup plans!";
    }

    if (lowerMessage.includes('status') || lowerMessage.includes('summary')) {
      const pendingTasks = tasks.filter(t => !t.completed).length;
      const confirmedGuests = guests.filter(g => g.rsvp === 'Confirmed').length;
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
      const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

      return `Here's your ${selectedEvent.name} summary:\n• ${pendingTasks} tasks pending\n• ${confirmedGuests}/${guests.length} guests confirmed\n• ₹${totalExpenses.toLocaleString()} spent of ₹${totalBudget.toLocaleString()} budget\n• ${Math.ceil((new Date(selectedEvent.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`;
    }

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return `Hello! I'm here to help with your ${selectedEvent.name} event. You can ask me about tasks, budget, guests, or get general tips!`;
    }

    return "I can help you with tasks, budget, guests, and event status. Try asking 'What's my event status?' or 'How's my budget?'";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const quickQuestions = [
    'Event status',
    'Tasks',
    'Budget',
    'Guests',
    'Tips'
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(question),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800">EventEase Assistant</h2>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-xl bg-white shadow-lg">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-xl max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-rose-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? 'mt-1' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map(question => (
              <button
                key={question}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 p-2 bg-white rounded-full shadow-lg">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-3 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-110"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
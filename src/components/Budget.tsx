import React, { useState } from 'react';
import { Plus, X, TrendingDown } from 'lucide-react';
import { Budget as BudgetType, Expense } from '../types';

interface BudgetProps {
  budgets: BudgetType[];
  expenses: Expense[];
  setBudgets: React.Dispatch<React.SetStateAction<BudgetType[]>>;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  selectedEventId: string;
}

const Budget: React.FC<BudgetProps> = ({ budgets, expenses, setBudgets, setExpenses, selectedEventId }) => {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '' });
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBudget.category && newBudget.amount) {
      const budget: BudgetType = {
        id: Date.now().toString(),
        eventId: selectedEventId,
        category: newBudget.category,
        amount: parseFloat(newBudget.amount)
      };
      setBudgets(prev => [...prev, budget]);
      setNewBudget({ category: '', amount: '' });
      setShowAddBudget(false);
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now().toString(),
        eventId: selectedEventId,
        category: newExpense.category,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount)
      };
      setExpenses(prev => [...prev, expense]);
      setNewExpense({ description: '', amount: '', category: '' });
      setShowAddExpense(false);
    }
  };

  const deleteBudget = (budgetId: string) => {
    setBudgets(prev => prev.filter(b => b.id !== budgetId));
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full">
      <h2 className="text-2xl font-bold text-gray-800">Budget & Expense Tracker</h2>
      
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-bold text-gray-800">Total Budget: ₹{totalBudget.toLocaleString()}</h3>
        <p className="text-sm text-gray-500">Total Expenses: ₹{totalExpenses.toLocaleString()}</p>
        <p className={`text-md font-semibold ${
          totalBudget - totalExpenses < 0 ? 'text-red-500' : 'text-green-500'
        }`}>
          Remaining: ₹{(totalBudget - totalExpenses).toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setShowAddBudget(true)}
          className="px-4 py-2 bg-white text-gray-700 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Add Budget
        </button>
        <button
          onClick={() => setShowAddExpense(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          <TrendingDown className="w-4 h-4 mr-1" />
          Add Expense
        </button>
      </div>

      <h3 className="text-lg font-bold text-gray-800">Budget Breakdown</h3>
      
      {budgets.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">No budgets added yet. Add a budget category!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.map(budget => {
            const categoryExpenses = expenses.filter(exp => exp.category === budget.category);
            const categoryExpenseTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            const isOverBudget = categoryExpenseTotal > budget.amount;
            
            return (
              <div
                key={budget.id}
                className={`bg-white rounded-xl shadow-lg p-4 space-y-1 border-l-4 ${
                  isOverBudget ? 'border-red-500' : 'border-green-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-bold text-gray-800">{budget.category}</h4>
                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-600">
                  <p>Budget: ₹{budget.amount.toLocaleString()}</p>
                  <p>Used: ₹{categoryExpenseTotal.toLocaleString()}</p>
                  <p className={isOverBudget ? 'text-red-500' : 'text-green-500'}>
                    Remaining: ₹{(budget.amount - categoryExpenseTotal).toLocaleString()}
                  </p>
                </div>
                
                {categoryExpenses.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700">Recent Expenses:</p>
                    {categoryExpenses.slice(-2).map(expense => (
                      <div key={expense.id} className="text-xs text-gray-600 flex justify-between">
                        <span>{expense.description}</span>
                        <span>₹{expense.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Budget Modal */}
      {showAddBudget && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Set New Budget</h3>
              <button 
                onClick={() => setShowAddBudget(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Venue"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Budget Amount (₹)</label>
                <input
                  type="number"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="100000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all"
              >
                Set Budget
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Expense</h3>
              <button 
                onClick={() => setShowAddExpense(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Flower decoration"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="5000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {budgets.map(budget => (
                    <option key={budget.id} value={budget.category}>{budget.category}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all"
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Budget, Expense, Guest } from '../types';

interface AnalyticsProps {
  budgets: Budget[];
  expenses: Expense[];
  guests: Guest[];
}

const Analytics: React.FC<AnalyticsProps> = ({ budgets, expenses, guests }) => {
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalAttendance = guests.filter(g => g.isCheckedIn).length;
  const attendanceRate = guests.length > 0 ? ((totalAttendance / guests.length) * 100).toFixed(1) : '0';
  
  const overspentCategories = budgets.filter(budget => {
    const categoryExpenses = expenses
      .filter(expense => expense.category === budget.category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return categoryExpenses > budget.amount;
  }).length;

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full">
      <h2 className="text-2xl font-bold text-gray-800">Event Analytics</h2>
      
      {budgets.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">Add budgets and expenses to view analytics.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Budget vs Expenses</h3>
            <div className="space-y-4">
              {budgets.map(budget => {
                const categoryExpenses = expenses
                  .filter(expense => expense.category === budget.category)
                  .reduce((sum, expense) => sum + expense.amount, 0);
                const percentage = budget.amount > 0 ? (categoryExpenses / budget.amount) * 100 : 0;
                const isOverBudget = categoryExpenses > budget.amount;

                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">{budget.category}</span>
                      <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                        ₹{categoryExpenses.toLocaleString()} / ₹{budget.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-rose-500 to-pink-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Performance Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{attendanceRate}%</p>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-xs text-gray-500">
                  {totalAttendance} of {guests.length} guests
                </p>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">{overspentCategories}</p>
                <p className="text-sm text-gray-600">Overspent Categories</p>
                <p className="text-xs text-gray-500">
                  Out of {budgets.length} total
                </p>
              </div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-800">Budget Utilization</p>
              <p className="text-3xl font-bold text-blue-600">
                {totalBudget > 0 ? ((totalExpenses / totalBudget) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-sm text-gray-600">
                ₹{totalExpenses.toLocaleString()} of ₹{totalBudget.toLocaleString()} used
              </p>
            </div>

            <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2">Insights:</p>
              <ul className="space-y-1 text-xs">
                <li>• Track attendance patterns to optimize future guest estimates</li>
                <li>• Monitor overspent categories to improve budget allocation</li>
                <li>• Use this data to plan similar events more effectively</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;

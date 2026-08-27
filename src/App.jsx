import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? saved : '';
  });

  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetNum = parseFloat(budget) || 0;
  const remaining = budgetNum - totalSpent;
  const isOverBudget = remaining < 0;

  return (
    <div className="app-container">
      <h1 className="app-title">💰 Smart Expense Tracker</h1>

      <div className="card">
        <div className="form-group">
          <label>Monthly Budget (Rs.)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. 20000"
          />
        </div>
      </div>

      <div className="card">
        <ExpenseForm
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          editingExpense={editingExpense}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <div className={`budget-card ${isOverBudget ? 'danger' : 'safe'}`}>
        <div className="budget-row">
          <span>Total Spent</span>
          <span>Rs. {totalSpent}</span>
        </div>
        <div className="budget-row">
          <span>Budget</span>
          <span>Rs. {budgetNum}</span>
        </div>
        <div className="budget-remaining">
          {isOverBudget
            ? `⚠️ Over Budget by Rs. ${Math.abs(remaining)}`
            : `✅ Remaining: Rs. ${remaining}`}
        </div>
      </div>

      <h3 style={{ marginBottom: '12px', color: '#b0b0d0' }}>Expenses</h3>
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses added yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div>
                <div className="expense-amount">Rs. {expense.amount}</div>
                <div className="expense-category">{expense.category}</div>
                <div className="expense-meta">
                  {expense.date} {expense.note && `• ${expense.note}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn"
                  style={{ width: 'auto', padding: '6px 14px', fontSize: '0.85rem' }}
                  onClick={() => handleEditClick(expense)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
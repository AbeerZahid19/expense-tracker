import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import Login from './components/Login';
import Signup from './components/Signup';
import CategoryBudgets from './components/CategoryBudgets';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authView, setAuthView] = useState('login');
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? saved : '';
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/expenses`, getAuthHeaders());
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    setLoading(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setExpenses([]);
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, newExpense, getAuthHeaders());
      setExpenses([response.data, ...expenses]);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const response = await axios.put(
        `${API_URL}/expenses/${updatedExpense._id}`,
        updatedExpense,
        getAuthHeaders()
      );
      setExpenses(expenses.map((exp) => (exp._id === updatedExpense._id ? response.data : exp)));
      setEditingExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`, getAuthHeaders());
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
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

  if (!user) {
    return (
      <div className="app-container">
        <h1 className="app-title">💰 Smart Expense Tracker</h1>
        {authView === 'login' ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setAuthView('signup')}
          />
        ) : (
          <Signup onSwitchToLogin={() => setAuthView('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="app-title" style={{ marginBottom: 0 }}>💰 Smart Expense Tracker</h1>
        <button
          onClick={handleLogout}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ color: '#a0a0c0', marginBottom: '20px' }}>
        Welcome, {user.name}!
      </p>

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

      <CategoryBudgets expenses={expenses} />

      <h3 style={{ marginBottom: '12px', color: '#b0b0d0' }}>Expenses</h3>
      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="empty-state">No expenses added yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense._id} className="expense-item">
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
                  onClick={() => handleDeleteExpense(expense._id)}
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

 
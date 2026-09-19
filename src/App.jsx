import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import Login from './components/Login';
import Signup from './components/Signup';
import CategoryBudgets from './components/CategoryBudgets';
import Toast from './components/Toast';
import CategoryPieChart from './components/CategoryPieChart';
import MonthlyBarChart from './components/MonthlyBarChart';
import './App.css';

const API_URL = 'https://expense-tracker-api-woad.vercel.app/api';

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
  const [toast, setToast] = useState({ message: '', type: '' });

  const wasOverBudget = useRef(false);
  const wasNearBudget = useRef(false);

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

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
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

  const handleAddRecurringAgain = async (recurringExpense) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.post(
        `${API_URL}/expenses`,
        {
          amount: recurringExpense.amount,
          category: recurringExpense.category,
          date: today,
          note: recurringExpense.note,
          isRecurring: true,
        },
        getAuthHeaders()
      );
      setExpenses([response.data, ...expenses]);
      showToast('Recurring expense added for this month!', 'warning');
    } catch (error) {
      console.error('Error adding recurring expense:', error);
      alert('Failed to add recurring expense');
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetNum = parseFloat(budget) || 0;
  const remaining = budgetNum - totalSpent;
  const isOverBudget = remaining < 0;
  const isNearBudget = totalSpent >= budgetNum * 0.8 && budgetNum > 0;

  useEffect(() => {
    if (isOverBudget && !wasOverBudget.current) {
      showToast(`⚠️ You've exceeded your monthly budget by Rs. ${Math.abs(remaining)}!`, 'danger');
    } else if (isNearBudget && !isOverBudget && !wasNearBudget.current) {
      showToast(`⚡ Heads up! You've used ${Math.round((totalSpent / budgetNum) * 100)}% of your budget.`, 'warning');
    }
    wasOverBudget.current = isOverBudget;
    wasNearBudget.current = isNearBudget;
  }, [isOverBudget, isNearBudget]);

  const recurringTemplates = [];
  const seen = new Set();
  expenses
    .filter((exp) => exp.isRecurring)
    .forEach((exp) => {
      const key = `${exp.category}-${exp.amount}-${exp.note}`;
      if (!seen.has(key)) {
        seen.add(key);
        recurringTemplates.push(exp);
      }
    });

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
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />

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

      <div className={`budget-card ${isOverBudget ? 'danger' : isNearBudget ? 'warning' : 'safe'}`}>
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
            : isNearBudget
            ? `⚡ Caution: ${Math.round((totalSpent / budgetNum) * 100)}% of budget used`
            : `✅ Remaining: Rs. ${remaining}`}
        </div>
      </div>

      <CategoryBudgets expenses={expenses} />

      <CategoryPieChart expenses={expenses} />
      <MonthlyBarChart expenses={expenses} />

      {recurringTemplates.length > 0 && (
        <div className="card">
          <h2>🔁 Recurring Expenses</h2>
          {recurringTemplates.map((item) => (
            <div
              key={item._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #444460',
              }}
            >
              <div>
                <strong>Rs. {item.amount}</strong> — {item.category}
                {item.note && <div style={{ fontSize: '0.8rem', color: '#7a7a9a' }}>{item.note}</div>}
              </div>
              <button
                className="btn"
                style={{ width: 'auto', padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => handleAddRecurringAgain(item)}
              >
                Add this month
              </button>
            </div>
          ))}
        </div>
      )}

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
                <div className="expense-amount">
                  Rs. {expense.amount} {expense.isRecurring && '🔁'}
                </div>
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
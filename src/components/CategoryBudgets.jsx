import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://expense-tracker-api-woad.vercel.app/api';
const CATEGORIES = ['Food', 'Rent', 'Transport', 'Utilities', 'Entertainment', 'Other'];

function CategoryBudgets({ expenses }) {
  const [limits, setLimits] = useState({});
  const [editing, setEditing] = useState(false);
  const [tempLimits, setTempLimits] = useState({});

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await axios.get(`${API_URL}/budget`, getAuthHeaders());
      const categoryLimits = response.data.categoryLimits || {};
      setLimits(categoryLimits);
      setTempLimits(categoryLimits);
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/budget`,
        { categoryLimits: tempLimits },
        getAuthHeaders()
      );
      setLimits(response.data.categoryLimits);
      setEditing(false);
    } catch (error) {
      console.error('Error saving budget:', error);
      alert('Failed to save budget');
    }
  };

  const getSpentForCategory = (category) => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Category Budgets</h2>
        <button
          className="btn"
          style={{ width: 'auto', padding: '6px 14px', fontSize: '0.85rem' }}
          onClick={() => {
            if (editing) {
              handleSave();
            } else {
              setTempLimits(limits);
              setEditing(true);
            }
          }}
        >
          {editing ? 'Save' : 'Edit Limits'}
        </button>
      </div>

      {CATEGORIES.map((category) => {
        const spent = getSpentForCategory(category);
        const limit = parseFloat(limits[category]) || 0;
        const isOver = limit > 0 && spent > limit;
        const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

        return (
          <div key={category} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>{category}</span>
              {editing ? (
                <input
                  type="number"
                  value={tempLimits[category] || ''}
                  onChange={(e) =>
                    setTempLimits({ ...tempLimits, [category]: e.target.value })
                  }
                  placeholder="e.g. 5000"
                  style={{
                    width: '100px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #444460',
                    background: '#1e1e2f',
                    color: '#eaeaea',
                    fontSize: '0.85rem',
                  }}
                />
              ) : (
                <span style={{ fontSize: '0.85rem', color: isOver ? '#e74c3c' : '#a0a0c0' }}>
                  Rs. {spent} {limit > 0 && `/ Rs. ${limit}`}
                </span>
              )}
            </div>

            {!editing && limit > 0 && (
              <div
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  background: '#1e1e2f',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: isOver ? '#e74c3c' : '#2ecc71',
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            )}

            {!editing && isOver && (
              <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '4px 0 0' }}>
                ⚠️ Over budget by Rs. {spent - limit}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryBudgets;
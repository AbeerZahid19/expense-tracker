import { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setNote(editingExpense.note);
      setIsRecurring(editingExpense.isRecurring || false);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date) {
      alert('Please fill amount and date');
      return;
    }

    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        amount: parseFloat(amount),
        category,
        date,
        note,
        isRecurring,
      });
    } else {
      onAddExpense({
        amount: parseFloat(amount),
        category,
        date,
        note,
        isRecurring,
      });
    }

    setAmount('');
    setDate('');
    setNote('');
    setCategory('Food');
    setIsRecurring(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 500"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="optional"
        />
      </div>

      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          id="recurring"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          style={{ width: 'auto' }}
        />
        <label htmlFor="recurring" style={{ margin: 0, cursor: 'pointer' }}>
          Mark as recurring (e.g. rent, subscriptions)
        </label>
      </div>

      <button type="submit" className="btn">
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>

      {editingExpense && (
        <button
          type="button"
          onClick={onCancelEdit}
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '10px',
            background: '#444460',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ExpenseForm;
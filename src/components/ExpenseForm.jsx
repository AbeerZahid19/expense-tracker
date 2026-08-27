import { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  // Jab editingExpense set ho, form ko us data se bhar do
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setNote(editingExpense.note);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date) {
      alert('Please fill amount and date');
      return;
    }

    if (editingExpense) {
      // Update existing expense
      onUpdateExpense({
        ...editingExpense,
        amount: parseFloat(amount),
        category,
        date,
        note,
      });
    } else {
      // Add new expense
      onAddExpense({
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        date,
        note,
      });
    }

    setAmount('');
    setDate('');
    setNote('');
    setCategory('Food');
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
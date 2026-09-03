const express = require('express');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET all expenses (sirf logged-in user ke)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST - naya expense add karo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    const newExpense = new Expense({
      userId: req.userId,
      amount,
      category,
      date,
      note,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT - expense update karo
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.note = note;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE - expense delete karo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
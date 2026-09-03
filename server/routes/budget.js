const express = require('express');
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET - user ka budget fetch karo
router.get('/', authMiddleware, async (req, res) => {
  try {
    let budget = await Budget.findOne({ userId: req.userId });

    if (!budget) {
      // Agar pehli baar hai, khali budget bana do
      budget = new Budget({ userId: req.userId, categoryLimits: {} });
      await budget.save();
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT - budget update karo
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { categoryLimits } = req.body;

    let budget = await Budget.findOne({ userId: req.userId });

    if (!budget) {
      budget = new Budget({ userId: req.userId, categoryLimits });
    } else {
      budget.categoryLimits = categoryLimits;
    }

    await budget.save();
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
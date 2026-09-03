const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  categoryLimits: {
    type: Map,
    of: Number,
    default: {},
  },
});

module.exports = mongoose.model('Budget', budgetSchema);
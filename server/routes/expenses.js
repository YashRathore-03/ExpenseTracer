const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenses');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getExpenses)
  .post(protect, addExpense);

router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

  module.exports = router;

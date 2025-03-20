const Expense = require('../models/Exxpense');

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
      date: date || Date.now(),
      description,
      user: req.user.id
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Expense.findByIdAndDelete(req.params.id);



    res.json({ message: 'Expense removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
};

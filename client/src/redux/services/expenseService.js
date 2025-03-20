// client/src/redux/services/expenseService.js
import axios from 'axios';

const API_URL = '/api/expenses/';

// Create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, expenseData, config);

  return response.data;
};

// Get user expenses
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update expense
const updateExpense = async (id, expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, expenseData, config);

  return response.data;
};

// Delete expense
const deleteExpense = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const expenseService = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};

export default expenseService;

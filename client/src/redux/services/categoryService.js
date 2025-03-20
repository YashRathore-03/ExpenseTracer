// client/src/redux/services/categoryService.js
import axios from 'axios';

const API_URL = '/api/categories/';

// Create new category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, categoryData, config);

  return response.data;
};

// Get user categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete category
const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const categoryService = {
  createCategory,
  getCategories,
  deleteCategory,
};

export default categoryService;

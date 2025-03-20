// server/routes/categories.js
const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory
} = require('../controllers/categories');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getCategories)
  .post(protect, createCategory);

router.route('/:id')
  .delete(protect, deleteCategory);

  module.exports = router;

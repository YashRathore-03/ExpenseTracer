// server/controllers/categories.js
const Category = require('../models/Category');

// @desc    Get all categories for a user
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    // Check if category already exists for this user
    const existingCategory = await Category.findOne({ 
      user: req.user.id,
      name: name 
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({
      name,
      color: color || '#000000',
      user: req.user.id
    });

    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Make sure user owns category
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await category.remove();

    res.json({ id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory
};

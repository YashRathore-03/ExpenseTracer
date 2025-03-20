// server/models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    trim: true
  },
  color: {
    type: String,
    default: '#000000'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Category routes
router.post('/add', categoryController.addCategory);
router.get('/getAll', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.editCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

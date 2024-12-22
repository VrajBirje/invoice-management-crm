const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticationToken');

// Category routes
router.post('/add',authenticateToken, categoryController.addCategory);
router.get('/getAll',authenticateToken, categoryController.getAllCategories);
router.get('/:id',authenticateToken, categoryController.getCategoryById);
router.put('/:id',authenticateToken, categoryController.editCategory);
router.delete('/:id',authenticateToken, categoryController.deleteCategory);

module.exports = router;

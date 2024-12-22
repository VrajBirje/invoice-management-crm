const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const authenticateToken = require('../middleware/authenticationToken');

// Subcategory routes
router.post('/add',authenticateToken, subCategoryController.addSubCategory);
router.delete('/:id',authenticateToken, subCategoryController.deleteSubCategory);
router.put('/:id',authenticateToken, subCategoryController.editSubCategory);
router.get('/getAll',authenticateToken, subCategoryController.getAllSubCategories);
router.get('/:categoryId',authenticateToken, subCategoryController.getSubCategoriesByCategoryId);

module.exports = router;

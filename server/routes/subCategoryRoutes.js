const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

// Subcategory routes
router.post('/add', subCategoryController.addSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);
router.put('/:id', subCategoryController.editSubCategory);
router.get('/getAll', subCategoryController.getAllSubCategories);
router.get('/:categoryId', subCategoryController.getSubCategoriesByCategoryId);

module.exports = router;

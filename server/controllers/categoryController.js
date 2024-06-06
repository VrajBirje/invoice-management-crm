const categoryModel = require('../models/categoryModel');

exports.addCategory = (req, res) => {
    const { createdId, updatedId, createdDate, categoryName } = req.body;
    const pool = req.app.get('pool');

    // Check if the category name already exists
    categoryModel.getCategoryByName(pool, categoryName, (err, existingCategory) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (existingCategory) {
            return res.status(400).json({ error: 'Category name already exists' });
        }

        // If the category name does not exist, add the new category
        categoryModel.addCategory(pool, { createdId, updatedId, createdDate, categoryName }, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Category added successfully' });
        });
    });
};


exports.getAllCategories = (req, res) => {
    const pool = req.app.get('pool');

    categoryModel.getAllCategories(pool, (err, categories) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(categories);
    });
};

exports.getCategoryById = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    categoryModel.getCategoryById(pool, id, (err, category) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    });
};

exports.editCategory = (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;
    const pool = req.app.get('pool');

    categoryModel.editCategory(pool, id, categoryName, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    });
};

exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    categoryModel.deleteCategory(pool, id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    });
};

const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');

exports.addSubCategory = (req, res) => {
    const { subCategoryName, categoryId, createdDate, createdId, updatedId } = req.body;
    const pool = req.app.get('pool');

    categoryModel.getCategoryById(pool, categoryId, (err, category) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!category) {
            return res.status(400).json({ error: 'CategoryId does not exist' });
        }

        subCategoryModel.getSubCategoryByNameAndCategoryId(pool, subCategoryName, categoryId, (err, existingSubCategory) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (existingSubCategory) {
                return res.status(400).json({ error: 'Subcategory with the same name already exists in the provided category' });
            }

            subCategoryModel.addSubCategory(pool, { subCategoryName, categoryId, createdDate, createdId, updatedId }, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(201).json({ message: 'Subcategory added successfully' });
            });
        })
    });
};

exports.editSubCategory = (req, res) => {
    const { id } = req.params;
    const { subCategoryName, categoryId } = req.body;
    const pool = req.app.get('pool');

    categoryModel.getCategoryById(pool, categoryId, (err, category) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!category) {
            return res.status(400).json({ error: 'CategoryId does not exist' });
        }
        subCategoryModel.getSubCategoryByNameAndCategoryId(pool, subCategoryName, categoryId, (err, existingSubCategory) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (existingSubCategory) {
                return res.status(400).json({ error: 'Subcategory with the same name already exists in the provided category' });
            }

            subCategoryModel.editSubCategory(pool, id, subCategoryName, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(200).json({ message: 'Subcategory updated successfully' });
            });
        });
    });
};


exports.deleteSubCategory = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    subCategoryModel.deleteSubCategory(pool, id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        res.status(200).json({ message: 'Subcategory deleted successfully' });
    });
};


exports.getAllSubCategories = (req, res) => {
    const pool = req.app.get('pool');

    subCategoryModel.getAllSubCategories(pool, (err, subCategories) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(subCategories);
    });
};

exports.getSubCategoriesByCategoryId = (req, res) => {
    const { categoryId } = req.params;
    const pool = req.app.get('pool');

    subCategoryModel.getSubCategoriesByCategoryId(pool, categoryId, (err, subCategories) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(subCategories);
    });
};

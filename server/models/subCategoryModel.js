const subCategoryModel = {};

subCategoryModel.getSubCategoryByNameAndCategoryId = (pool, subCategoryName, categoryId, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_sub_category WHERE subCategoryName = ? AND categoryId = ?', [subCategoryName, categoryId], (err, rows) => {
            connection.release();
            if (err) return callback(err);

            if (rows.length > 0) {
                callback(null, rows[0]);
            } else {
                callback(null, null);
            }
        });
    });
};

subCategoryModel.addSubCategory = (pool, { subCategoryName, categoryId, createdDate, createdId, updatedId }, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('INSERT INTO tbl_sub_category (subCategoryName, categoryId, createdDate, createdId, updatedId) VALUES (?, ?, ?, ?, ?)', [subCategoryName, categoryId, createdDate, createdId, updatedId], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

subCategoryModel.deleteSubCategory = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('DELETE FROM tbl_sub_category WHERE id = ?', [id], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

subCategoryModel.editSubCategory = (pool, id, subCategoryName, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('UPDATE tbl_sub_category SET subCategoryName = ? WHERE id = ?', [subCategoryName, id], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

subCategoryModel.getAllSubCategories = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_sub_category', (err, rows) => {
            connection.release();
            if (err) return callback(err);

            const groupedByCategory = rows.reduce((acc, subCategory) => {
                if (!acc[subCategory.categoryId]) {
                    acc[subCategory.categoryId] = [];
                }
                acc[subCategory.categoryId].push(subCategory);
                return acc;
            }, {});

            callback(null, groupedByCategory);
        });
    });
};

subCategoryModel.getSubCategoriesByCategoryId = (pool, categoryId, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_sub_category WHERE categoryId = ?', [categoryId], (err, rows) => {
            connection.release();
            if (err) return callback(err);

            callback(null, rows);
        });
    });
};

module.exports = subCategoryModel;

exports.addCategory = (pool, categoryData, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'INSERT INTO tbl_category (createdId, updatedId, createdDate, categoryName) VALUES (?, ?, ?, ?)';
        const params = [categoryData.createdId, categoryData.updatedId, categoryData.createdDate, categoryData.categoryName];

        connection.query(query, params, (err, result) => {
            connection.release();
            if (err) return callback(err);
            callback(null, result);
        });
    });
};

exports.getAllCategories = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_category', (err, rows) => {
            connection.release();
            if (err) return callback(err);
            callback(null, rows);
        });
    });
};

exports.getCategoryById = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_category WHERE Id = ?', [id], (err, rows) => {
            connection.release();
            if (err) return callback(err);

            if (rows.length === 1) {
                callback(null, rows[0]);
            } else {
                callback(null, null);
            }
        });
    });
};

exports.editCategory = (pool, id, categoryName, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'UPDATE tbl_category SET categoryName = ? WHERE Id = ?';
        connection.query(query, [categoryName, id], (err, result) => {
            connection.release();
            if (err) return callback(err);
            callback(null, result);
        });
    });
};

exports.getCategoryByName = (pool, categoryName, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_category WHERE categoryName = ?', [categoryName], (err, rows) => {
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


exports.deleteCategory = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction((err) => {
            if (err) {
                connection.release();
                return callback(err);
            }

            const deleteSubCategoriesQuery = 'DELETE FROM tbl_sub_category WHERE categoryId = ?';
            connection.query(deleteSubCategoriesQuery, [id], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        callback(err);
                    });
                }

                const deleteCategoryQuery = 'DELETE FROM tbl_category WHERE Id = ?';
                connection.query(deleteCategoryQuery, [id], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err);
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }
                        connection.release();
                        callback(null, result);
                    });
                });
            });
        });
    });
};

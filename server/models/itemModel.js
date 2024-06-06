exports.createItem = (pool, itemName, itemType, unit, description, sellingPrice, createdDate, createdId, updatedId, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'INSERT INTO tbl_items (itemName, itemType, unit, description, sellingPrice, createdDate, createdId, updatedId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [itemName, itemType, unit, description, sellingPrice, createdDate, createdId, updatedId];

        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.updateItem = (pool, id, updatedItem, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'UPDATE tbl_items SET itemName = ?, itemType = ?, unit = ?, description = ?, sellingPrice = ?, updatedId = ? WHERE id = ?';
        const values = [updatedItem.itemName, updatedItem.itemType, updatedItem.unit, updatedItem.description, updatedItem.sellingPrice, updatedItem.updatedId, id];

        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.deleteItem = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'DELETE FROM tbl_items WHERE id = ?';
        connection.query(query, [id], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.getAllItems = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'SELECT * FROM tbl_items';
        connection.query(query, (err, rows) => {
            connection.release();
            if (err) return callback(err);

            callback(null, rows);
        });
    });
};

exports.getItemById = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = 'SELECT * FROM tbl_items WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
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

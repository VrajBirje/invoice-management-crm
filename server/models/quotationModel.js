exports.addQuotation = (pool, quotationData, items, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                console.error(err);
                return callback(err);
            }

            connection.query('INSERT INTO tbl_quote SET ?', quotationData, (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        console.error(err);
                        callback(err);
                    });
                }

                const quoteId = result.insertId;

                // Add quotation items
                const itemValues = items.map(item => [quoteId, item.itemId, item.quantity, item.rate, item.discount, item.discountType, item.Amount, quotationData.createdId, quotationData.createdDate, quotationData.updatedId]);
                connection.query('INSERT INTO tbl_quote_items (quoteId, itemId, quantity, rate, discount, discountType, Amount, createdId, createdDate, updatedId) VALUES ?', [itemValues], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            console.error(err);
                            callback(err);
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                console.error(err);
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

// Other quotation model methods...

exports.createCustomer = (
    pool, type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
    b_address, b_country, b_city, b_pincode, b_state,
    s_address, s_country, s_city, s_pincode, s_state,
    createdId, createdDate, updatedId, callback
) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = `
            INSERT INTO tbl_customers (
                type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
                b_address, b_country, b_city, b_pincode, b_state,
                s_address, s_country, s_city, s_pincode, s_state,
                createdId, createdDate, updatedId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
            b_address, b_country, b_city, b_pincode, b_state,
            s_address, s_country, s_city, s_pincode, s_state,
            createdId, createdDate, updatedId
        ];

        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.getCustomerByEmailOrPhoneExcludingId = (pool, emailId, phoneNo, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query(
            'SELECT * FROM tbl_customers WHERE (emailId = ? OR phoneNo = ?) AND id != ?',
            [emailId, phoneNo, id],
            (err, rows) => {
                connection.release();
                if (err) return callback(err);

                if (rows.length > 0) {
                    callback(null, rows[0]);
                } else {
                    callback(null, null);
                }
            }
        );
    });
};


exports.updateCustomer = (pool, id, updateData, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const setClauses = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(updateData), id];

        const query = `UPDATE tbl_customers SET ${setClauses} WHERE id = ?`;

        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};


exports.deleteCustomer = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = `DELETE FROM tbl_customers WHERE id = ?`;

        connection.query(query, [id], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.getAllCustomers = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const query = `SELECT * FROM tbl_customers`;

        connection.query(query, (err, rows) => {
            connection.release();
            if (err) return callback(err);

            callback(null, rows);
        });
    });
};

exports.getCustomerByEmailOrPhone = (pool, emailId, phoneNo, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        const query = `SELECT * FROM tbl_customers WHERE emailId = ? OR phoneNo = ?`;
        connection.query(query, [emailId, phoneNo], (err, rows) => {
            connection.release();
            if (err) return callback(err, null);

            if (rows.length > 0) {
                callback(null, rows[0]);
            } else {
                callback(null, null);
            }
        });
    });
};

exports.getCustomerById = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        const query = `SELECT * FROM tbl_customers WHERE id = ?`;
        connection.query(query, [id], (err, rows) => {
            connection.release();
            if (err) return callback(err, null);

            if (rows.length === 1) {
                callback(null, rows[0]);
            } else {
                callback(null, null);
            }
        });
    });
};

exports.getCustomerByEmail = (pool, emailId, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_customers WHERE emailId = ?', [emailId], (err, rows) => {
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

exports.getCustomerByPhone = (pool, phoneNo, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('SELECT * FROM tbl_customers WHERE phoneNo = ?', [phoneNo], (err, rows) => {
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

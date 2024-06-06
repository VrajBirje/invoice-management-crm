exports.getUser = (pool, emailId, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        connection.query('SELECT * FROM tbl_users WHERE emailId = ?', [emailId], (err, rows) => {
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
exports.getRoleById = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        connection.query('SELECT roleName FROM tbl_roles WHERE Id = ?', [id], (err, rows) => {
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

exports.createUser = (pool, emailId, password , lastName, firstName, createdDate, createdId, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('INSERT INTO tbl_users (emailId, password , lastName, firstName, createdDate, createdId, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [emailId, password , lastName, firstName, createdDate, createdId, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName ], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.updateUser = (pool, id, updatedUser, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        const { lastName, firstName, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName } = updatedUser;

        connection.query('UPDATE tbl_users SET lastName = ?, firstName = ?, updatedId = ?, pincode = ?, address = ?, remark = ?, city = ?, state = ?, country = ?, phoneNo = ?, roleId = ?, companyName = ? WHERE id = ?', [lastName, firstName, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName, id], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.deleteUser = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.query('DELETE FROM tbl_users WHERE id = ?', [id], (err, result) => {
            connection.release();
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.getAllUsers = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        connection.query('SELECT * FROM tbl_users', (err, rows) => {
            connection.release();
            if (err) return callback(err, null);

            callback(null, rows);
        });
    });
};

exports.getUserById = (pool, id, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        connection.query('SELECT * FROM tbl_users WHERE id = ?', [id], (err, rows) => {
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
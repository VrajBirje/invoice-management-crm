exports.getRoleByName = (connection, roleName, callback) => {
    connection.query('SELECT * FROM tbl_roles WHERE roleName = ?', [roleName], (err, rows) => {
        if (err) return callback(err, null);

        if (rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    });
};

exports.getRoleById = (connection, roleId, callback) => {
    connection.query('SELECT * FROM tbl_roles WHERE id = ?', [roleId], (err, rows) => {
        if (err) return callback(err, null);

        if (rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    });
};

exports.getAllRolePermisssions = (connection, roleId, callback) => {
    connection.query('SELECT * FROM tbl_roles_permission WHERE roleId = ?', [roleId], (err, rows) => {
        if (err) return callback(err, null);

        if (rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    });
};

exports.createRole = (connection, roleName, callback) => {
    connection.query('INSERT INTO tbl_roles (roleName) VALUES (?)', [roleName], (err, result) => {
        if (err) return callback(err);

        const roleId = result.insertId;
        callback(null, roleId);
    });
};

exports.addRolePermissions = (connection, roleId, permissions, callback) => {
    const values = permissions.map(permission => [
        roleId,
        permission.menuId,
        permission.actionEdit,
        permission.actionView,
        permission.actionAdd,
        permission.actionDelete
    ]);

    connection.query('INSERT INTO tbl_roles_permission (roleId, menuId, actionEdit, actionView, actionAdd, actionDelete) VALUES ?', [values], (err, result) => {
        if (err) return callback(err);

        callback(null, result);
    });
};

exports.getRoleById2 = (pool, id, callback) => {
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


exports.updateRolePermissions = (connection, roleId, permissions, callback) => {
    connection.query('DELETE FROM tbl_roles_permission WHERE roleId = ?', [roleId], (err) => {
        if (err) return callback(err);

        const values = permissions.map(permission => [
            roleId,
            permission.menuId,
            permission.actionEdit,
            permission.actionView,
            permission.actionAdd,
            permission.actionDelete
        ]);

        connection.query('INSERT INTO tbl_roles_permission (roleId, menuId, actionEdit, actionView, actionAdd, actionDelete) VALUES ?', [values], (err, result) => {
            if (err) return callback(err);

            callback(null, result);
        });
    });
};

exports.deleteRolePermissions = (connection, roleId, callback) => {
    connection.query('DELETE FROM tbl_roles_permission WHERE roleId = ?', [roleId], (err) => {
        if (err) return callback(err);

        callback(null);
    });
};

exports.deleteRole = (connection, roleId, callback) => {
    connection.query('DELETE FROM tbl_roles WHERE id = ?', [roleId], (err) => {
        if (err) return callback(err);

        callback(null);
    });
};

exports.getAllRoles = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        connection.query('SELECT * FROM tbl_roles', (err, rows) => {
            connection.release();
            if (err) return callback(err, null);

            callback(null, rows);
        });
    });
};

exports.getAllRolesMenu = (pool, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return callback(err, null);

        connection.query('SELECT * FROM tbl_menu_master', (err, rows) => {
            connection.release();
            if (err) return callback(err, null);

            callback(null, rows);
        });
    });
};

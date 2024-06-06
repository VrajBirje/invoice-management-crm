const roleModel = require('../models/roleModel');
const userModel = require('../models/userModel');

exports.addRole = (req, res) => {
    const { roleName, permissions } = req.body;
    const pool = req.app.get('pool');

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        roleModel.getRoleByName(connection, roleName, (err, existingRole) => {
            if (err) {
                connection.release();
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (existingRole) {
                connection.release();
                return res.status(400).json({ error: 'Role already exists' });
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                roleModel.createRole(connection, roleName, (err, roleId) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            console.error(err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                    }

                    roleModel.addRolePermissions(connection, roleId, permissions, err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                console.error(err);
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                        }

                        connection.commit(err => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    console.error(err);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                });
                            }

                            connection.release();
                            res.status(201).json({ message: 'Role added successfully' });
                        });
                    });
                });
            });
        });
    });
};


exports.editRolePermissions = (req, res) => {
    const { roleId, permissions } = req.body;
    const pool = req.app.get('pool');

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        roleModel.getRoleById(connection, roleId, (err, existingRole) => {
            if (err) {
                connection.release();
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (!existingRole) {
                connection.release();
                return res.status(400).json({ error: 'Role does not exist' });
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                roleModel.updateRolePermissions(connection, roleId, permissions, err => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            console.error(err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                console.error(err);
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                        }

                        connection.release();
                        res.status(200).json({ message: 'Role permissions updated successfully' });
                    });
                });
            });
        });
    });
};

exports.deleteRole = (req, res) => {
    const { roleId } = req.body;
    const pool = req.app.get('pool');

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        roleModel.getRoleById(connection, roleId, (err, existingRole) => {
            if (err) {
                connection.release();
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (!existingRole) {
                connection.release();
                return res.status(400).json({ error: 'Role does not exist' });
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                roleModel.deleteRolePermissions(connection, roleId, err => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            console.error(err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                    }

                    roleModel.deleteRole(connection, roleId, err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                console.error(err);
                                res.status(500).json({ error: 'Internal Server Error' });
                            });
                        }

                        connection.commit(err => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    console.error(err);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                });
                            }

                            connection.release();
                            res.status(200).json({ message: 'Role deleted successfully' });
                        });
                    });
                });
            });
        });
    });
};

exports.getAllRoles = (req, res) => {
    const pool = req.app.get('pool');

    roleModel.getAllRoles(pool, (err, roles) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ roles });
    });
};

exports.getRoleById = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    userModel.getRoleById(pool, id, (err, role) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (role) {
            res.status(200).json({ roleName: role.roleName });
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    });
};


exports.getAllRolesMenu = (req, res) => {
    const pool = req.app.get('pool');

    roleModel.getAllRolesMenu(pool, (err, roles) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ roles });
    });
};


exports.getAllRolePermisssions = (req, res) => {
    const pool = req.app.get('pool');
    const { roleId } = req.body;
    userModel.getRoleById(pool, roleId, (err, role) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (role) {
            // res.status(200).json({ roleName: role.roleName });
            roleModel.getAllRolePermisssions(pool,roleId, (err, roles) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
        
                res.status(200).json({ roleName: role.roleName, roles });
            });
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    });

    
};
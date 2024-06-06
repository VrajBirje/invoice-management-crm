const userModel = require('../models/userModel');
const authHelper = require('../helpers/authHelper');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { emailId, password } = req.body;
    const pool = req.app.get('pool');

    userModel.getUser(pool, emailId, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (user) {
            
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err, password: password });
                }

                if (isMatch) {
                    authHelper.generateToken({ emailId: user.emailId }, (err, token) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Internal Server Error2' });
                        }
                        res.status(200).json({ message: 'Login successful', token: token });
                    });
                } else {
                    res.status(401).json({ error:  user.phone, pass: password });
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials2' });
        }
    });
};

exports.register = (req, res) => {
    const { emailId, password , lastName, firstName, createdDate, createdId, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName } = req.body;
    const pool = req.app.get('pool');

    userModel.getUser(pool, emailId, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (user) {
            return res.status(400).json({ error: 'User already exists with this email id' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            userModel.createUser(pool, emailId, hashedPassword , lastName, firstName, createdDate, createdId, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
};

exports.emailCheck = (req, res) => {
    const { emailId } = req.body;
    const pool = req.app.get('pool');

    userModel.getUser(pool, emailId, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (user) {
            return res.status(200).json({ message: 'User already exists with this email id' });
        }
        else{
            return res.status(400).json({ error: 'Email Id does not exists'})
        }
    });
};

exports.editUser = (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, updatedId, pincode, address, remark, city, state, country, phoneNo, roleId, companyName } = req.body;
    const pool = req.app.get('pool');

    userModel.getUserById(pool, id, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = {
            lastName: lastName || user.lastName,
            firstName: firstName || user.firstName,
            updatedId: updatedId || user.updatedId,
            pincode: pincode || user.pincode,
            address: address || user.address,
            remark: remark || user.remark,
            city: city || user.city,
            state: state || user.state,
            country: country || user.country,
            phoneNo: phoneNo || user.phoneNo,
            roleId: roleId || user.roleId,
            companyName: companyName || user.companyName
        };

        userModel.updateUser(pool, id, updatedUser, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'User updated successfully' });
        });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    userModel.deleteUser(pool, id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    });
};

exports.getUsers = (req, res) => {
    const pool = req.app.get('pool');

    userModel.getAllUsers(pool, (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    userModel.getUserById(pool, id, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    });
};
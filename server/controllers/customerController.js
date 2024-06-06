const customerModel = require('../models/customerModel');

exports.addCustomer = (req, res) => {
    const {
        type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
        b_address, b_country, b_city, b_pincode, b_state,
        s_address, s_country, s_city, s_pincode, s_state,
        createdId, createdDate, updatedId
    } = req.body;
    const pool = req.app.get('pool');

    customerModel.getCustomerByEmailOrPhone(pool, emailId, phoneNo, (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (customer) {
            return res.status(400).json({ error: 'Customer with the same email or phone number already exists' });
        }

        customerModel.createCustomer(
            pool, type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
            b_address, b_country, b_city, b_pincode, b_state,
            s_address, s_country, s_city, s_pincode, s_state,
            createdId, createdDate, updatedId, 
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(201).json({ message: 'Customer added successfully' });
            }
        );
    });
};


exports.editCustomer = (req, res) => {
    const { id } = req.params;
    const {
        type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
        b_address, b_country, b_city, b_pincode, b_state,
        s_address, s_country, s_city, s_pincode, s_state,
        createdId, createdDate, updatedId
    } = req.body;
    const pool = req.app.get('pool');

    const updateData = {
        type, firstName, lastName, companyName, emailId, phoneNo, gstNo, paymentTerms,
        b_address, b_country, b_city, b_pincode, b_state,
        s_address, s_country, s_city, s_pincode, s_state,
        createdId, createdDate, updatedId
    };

    // Remove undefined or null values
    Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined || updateData[key] === null) {
            delete updateData[key];
        }
    });

    // Check if customer with given id exists
    customerModel.getCustomerById(pool, id, (err, existingCustomer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Check if emailId or phoneNo already exists for another customer
        customerModel.getCustomerByEmailOrPhoneExcludingId(pool, emailId, phoneNo, id, (err, customer) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (customer) {
                return res.status(400).json({ error: 'Customer with the same email or phone number already exists' });
            }

            // Update customer
            customerModel.updateCustomer(pool, id, updateData, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(200).json({ message: 'Customer updated successfully' });
            });
        });
    });
};

exports.deleteCustomer = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    customerModel.deleteCustomer(pool, id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    });
};

exports.getAllCustomers = (req, res) => {
    const pool = req.app.get('pool');

    customerModel.getAllCustomers(pool, (err, customers) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json(customers);
    });
};

exports.checkCustomerByEmail = (req, res) => {
    const { emailId } = req.body;
    const pool = req.app.get('pool');

    customerModel.getCustomerByEmail(pool, emailId, (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (customer) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    });
};

exports.checkCustomerByPhone = (req, res) => {
    const { phoneNo } = req.body;
    const pool = req.app.get('pool');

    customerModel.getCustomerByPhone(pool, phoneNo, (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (customer) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    });
};

exports.getCustomerById = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    customerModel.getCustomerById(pool, id, (err, customer) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json({ customer });
    });
};
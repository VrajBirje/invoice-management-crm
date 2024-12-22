const quotationModel = require('../models/quotationModel');

exports.addQuotation = (req, res) => {
    const { customerId, quoteDate, expiryDate, salesPerson, subject, description, terms_conditions, subTotal, adjustment, tax, totalAmount, createdId, createdDate, updatedId, items } = req.body;
    const pool = req.app.get('pool');

    quotationModel.addQuotation(pool, { customerId, quoteDate, expiryDate, salesPerson, subject, description, terms_conditions, subTotal, adjustment, tax, totalAmount, createdId, createdDate, updatedId }, items, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'Quotation added successfully' });
    });
};

// Other quotation controller methods...

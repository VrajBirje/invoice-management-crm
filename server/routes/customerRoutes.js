const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer routes
router.post('/add', customerController.addCustomer);
router.put('/edit/:id', customerController.editCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);
router.get('/all', customerController.getAllCustomers);
router.post('/check-email', customerController.checkCustomerByEmail);
router.post('/check-phone', customerController.checkCustomerByPhone);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
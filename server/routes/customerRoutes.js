const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require('../middleware/authenticationToken');

// Customer routes
router.post('/add', authenticateToken,customerController.addCustomer);
router.put('/edit/:id',authenticateToken, customerController.editCustomer);
router.delete('/delete/:id',authenticateToken, customerController.deleteCustomer);
router.get('/all', authenticateToken,customerController.getAllCustomers);
router.post('/check-email',authenticateToken, customerController.checkCustomerByEmail);
router.post('/check-phone',authenticateToken, customerController.checkCustomerByPhone);
router.get('/:id',authenticateToken, customerController.getCustomerById);

module.exports = router;
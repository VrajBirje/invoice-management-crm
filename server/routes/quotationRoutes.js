const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const authenticateToken = require('../middleware/authenticationToken');

// Add other quotation routes here...

// Add quotation
router.post('/add',authenticateToken, quotationController.addQuotation);

module.exports = router;

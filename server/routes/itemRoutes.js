const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticateToken = require('../middleware/authenticationToken');

// Item routes
router.post('/add',authenticateToken, itemController.addItem);
router.put('/:id',authenticateToken, itemController.editItem);
router.delete('/:id',authenticateToken, itemController.deleteItem);
router.get('/:id',authenticateToken, itemController.getItemById);
router.get('/',authenticateToken, itemController.getAllItems);

module.exports = router;

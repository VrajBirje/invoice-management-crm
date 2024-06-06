const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Item routes
router.post('/add', itemController.addItem);
router.put('/:id', itemController.editItem);
router.delete('/:id', itemController.deleteItem);
router.get('/:id', itemController.getItemById);
router.get('/', itemController.getAllItems);

module.exports = router;

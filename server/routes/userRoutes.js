const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticationToken');

// User routes
router.put('/edit/:id',authenticateToken, userController.editUser);
router.delete('/delete/:id',authenticateToken, userController.deleteUser);
router.get('/getAll', authenticateToken,userController.getUsers);
router.get('/get/:id',authenticateToken, userController.getUserById);
router.post('/emailCheck',authenticateToken, userController.emailCheck)

module.exports = router;
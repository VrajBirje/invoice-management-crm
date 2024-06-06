const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/getAll', userController.getUsers);
router.get('/get/:id', userController.getUserById);
router.post('/emailCheck', userController.emailCheck)

module.exports = router;
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authenticateToken = require('../middleware/authenticationToken');

// Role routes
router.post('/add',authenticateToken, roleController.addRole);
router.put('/edit',authenticateToken, roleController.editRolePermissions); 
router.delete('/delete',authenticateToken, roleController.deleteRole);
router.get('/', authenticateToken,roleController.getAllRoles);
router.get('/menu',authenticateToken, roleController.getAllRolesMenu);
router.post('/permissions',authenticateToken, roleController.getAllRolePermisssions);
router.get('/:id',authenticateToken, roleController.getRoleById);
module.exports = router;

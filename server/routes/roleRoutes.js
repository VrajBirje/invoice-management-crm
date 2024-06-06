const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Role routes
router.post('/add', roleController.addRole);
router.put('/edit', roleController.editRolePermissions); 
router.delete('/delete', roleController.deleteRole);
router.get('/', roleController.getAllRoles);
router.get('/menu', roleController.getAllRolesMenu);
router.post('/permissions', roleController.getAllRolePermisssions);
router.get('/:id', roleController.getRoleById);
module.exports = router;

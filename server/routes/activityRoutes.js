const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Activity routes
router.post('/log', activityController.logActivity);
router.get('/logs', activityController.getLogs);

module.exports = router;

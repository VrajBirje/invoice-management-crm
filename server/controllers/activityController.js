const activityModel = require('../models/activityModel');

exports.logActivity = (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).send('Missing userId or action');
  }

  activityModel.logActivity(userId, action, (err, result) => {
    if (err) {
      console.error('Error logging activity:', err);
      return res.status(500).send('Internal server error');
    }

    res.send('Activity logged successfully');
  });
};

exports.getLogs = (req, res) => {
  activityModel.getLogs((err, logs) => {
    if (err) {
      console.error('Error retrieving logs:', err);
      return res.status(500).send('Internal server error');
    }

    res.json(logs);
  });
};

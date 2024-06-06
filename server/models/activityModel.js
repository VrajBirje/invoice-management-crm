// const redisClient = require('redis').createClient();
const redis = require('redis');
const redisClient = redis.createClient();

exports.logActivity = (userId, action, callback) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId,
    action,
  };

  redisClient.lpush('activity_logs', JSON.stringify(logEntry), (err, reply) => {
    if (err) {
      console.error('Error logging activity:', err);
      return callback(err, null);
    }

    callback(null, 'Activity logged successfully');
  });
};

exports.getLogs = (callback) => {
  redisClient.lrange('activity_logs', 0, -1, (err, logs) => {
    if (err) {
      console.error('Error retrieving logs:', err);
      return callback(err, null);
    }

    const parsedLogs = logs.map(log => JSON.parse(log));
    callback(null, parsedLogs);
  });
};

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes')
const activityRoutes = require('./routes/activityRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const customerRoutes = require('./routes/customerRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const redis = require('redis');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

// Create a Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

app.use(cors(
  // {origin:"http://localhost:3000/"}
));

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '#Barcelona2015',
  database: 'hoarwaycrm'
});

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make the pool available to the application
app.set('pool', pool);

// Routes
app.use('/auth', authRoutes);
app.use('/activity', activityRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes)
app.use('/category', categoryRoutes)
app.use('/subcategory', subCategoryRoutes);
app.use('/item', itemRoutes);
app.use('/customer', customerRoutes);
app.use('/quote', quotationRoutes); 

// Listen on env port or 5000
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));


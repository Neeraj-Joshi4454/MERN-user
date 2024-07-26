const dotenv = require('dotenv');
const express = require('express');
const { dbConnect } = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const app = express();

dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;
const hostname = process.env.HOSTNAME || 'localhost';

dbConnect();

// Routes
app.use('/api/v1', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});

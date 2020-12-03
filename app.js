const express = require('express');
const app = express();
require("express-async-errors"); //To throw error in execution time
const cors = require('cors');

app.use(cors());

// Routes
const {
    IoTRoutes,
    UsersRoutes
} = require('./routes');

app.use(express.json());

// Set routes
app.use('/v1/api', IoTRoutes);
app.use('/v1/api', UsersRoutes);

module.exports = app;
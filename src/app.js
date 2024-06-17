const express = require('express');
const cors = require('cors');

const api = require('./routes/api');

// Create App
const app = express();

// Global Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api', api);

// Running App
app.get('/', (req, res) => {
  res.send('<h1>Hello Todo Server!</h1>');
});

module.exports = app;

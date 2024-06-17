const express = require('express');

const usersRouter = require('./user.router');

const api = express.Router();

api.use('/users', usersRouter);

module.exports = api;

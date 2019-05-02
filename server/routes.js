const express = require('express');
const UserController = require('./src/app/controllers/UserController');
const routes = express.Router();

routes.get('/users', UserController.getUsers);
routes.post('/users', UserController.createUser);

module.exports = routes;

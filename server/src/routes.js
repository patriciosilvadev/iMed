const express = require('express');
const controllers = require('./app/controllers');
const routes = express.Router();
const path = require('path');

routes.get('/create', (req, res) => {
  res.sendFile('create.html', {
    root: path.join(__dirname, './app/views')
  });
});

routes.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, './app/views')
  });
});

routes.get('/users', controllers.UserController.getUsers);
routes.post('/users', controllers.UserController.createUser);

module.exports = routes;

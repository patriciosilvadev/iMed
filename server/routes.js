const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  console.log(req);
  res.send('hello world');
});

module.exports = routes;
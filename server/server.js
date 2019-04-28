const express = require('express');
// const path = require('path')
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {}

  views() {}

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;

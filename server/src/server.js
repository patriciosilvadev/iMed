const express = require('express');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.express.use(
      express.urlencoded({
        extended: true
      })
    );
    this.express.use(express.json());
  }

  views() {}

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;

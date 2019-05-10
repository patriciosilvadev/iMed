const express = require('express');
const routes = require('./routes');
const cors = require('cors');

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
    this.express.use(cors());
  }

  views() {}

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;

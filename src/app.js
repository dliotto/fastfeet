import express from 'express';
import routes from './routes';

//import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

//pode utilizar tambem export default new App().server;
//module.exports = new App().server;
export default new App().server;

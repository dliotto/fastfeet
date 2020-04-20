import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

//pode utilizar tambem export default new App().server;
//module.exports = new App().server;
export default new App().server;

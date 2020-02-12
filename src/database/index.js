import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Entregador from '../app/models/Entregadores';
import File from '../app/models/File';
import Encomenda from '../app/models/Encomendas';
import DeliveryProblem from '../app/models/Delivery_Problem';

import databaseConfig from '../config/database';

const models = [ User, Recipient, Entregador, File, Encomenda, DeliveryProblem ];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection))
          .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

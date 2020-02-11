import Sequelize, { Model } from 'sequelize';

class Entregadores extends Model{
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id : Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }


  static associate(models) {
    this.belongsTo(models.File, { foreingKey: 'avatar_id', as: 'avatar' });
  }

}

export default Entregadores;

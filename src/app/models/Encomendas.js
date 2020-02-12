import Sequelize, { Model } from 'sequelize';

class Encomendas extends Model{
  static init(sequelize) {
    super.init(
      {
        recipient_id : Sequelize.INTEGER,
        deliveryman_id : Sequelize.INTEGER,
        signature_id : Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
        start_date : Sequelize.DATE,
        end_date : Sequelize.DATE,
        product : Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }


  static associate(models) {
    this.belongsTo(models.Recipient, { foreingKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.Entregadores, { foreingKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.File, { foreingKey: 'signature_id', as: 'signature' });
  }

}

export default Encomendas;

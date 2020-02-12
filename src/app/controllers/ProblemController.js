import DeliveryProblem from '../models/Delivery_Problem';
import Encomenda from '../models/Encomendas';
import Mail from '../../lib/Mail';
import Entregador from '../models/Entregadores';

class ProblemController {
  async store(req, res) {

    const problema = await DeliveryProblem.create({
      description :  req.body.description,
      delivery_id : req.params.id
    });


    return res.json({
      problema
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query.page;

    const problemas = await DeliveryProblem.findAll({
      where: { delivery_id : req.params.id },
      order: ['created_at'],
      attributes: ['description', 'created_at' ],
      limit: 12,
      offset: (page - 1) * 12,
      include: [
        {
          model: Encomenda,
          as: 'delivery',
          attributes: ['start_date'],
        },
      ],
    });

    return res.json(problemas);
  }


  async destroy(req, res){
      const problema = await DeliveryProblem.findByPk(req.params.id);

      const encomenda = await Encomenda.findByPk(problema.delivery_id, {
        include: [
          {
            model: Entregador,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
        ],
      });


      encomenda.canceled_at = new Date();

      await encomenda.save();

      await Mail.sendMail({
        to: `${encomenda.deliveryman.name} <${encomenda.deliveryman.email}>`,
        subject: 'Encomenda cancelada',
        template: 'cancelada',
        context: {
          entregador: encomenda.deliveryman.name,
          produto: encomenda.product,
        },
      });

      return res.json({ message : "Cancelado com sucesso!", encomenda : encomenda });
  }

}

export default new ProblemController();

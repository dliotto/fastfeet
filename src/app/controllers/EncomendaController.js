import Encomenda from '../models/Encomendas';
//import { parseISO, isBefore, format, isAfter } from 'date-fns';
import Mail from '../../lib/Mail';
import Entregador from '../models/Entregadores';
import Recipient from '../models/Recipient';

class EncomendaController {
  async store(req, res) {
    const { recipient_id, deliveryman_id, product  } = req.body;

    if (!recipient_id) {
      return res.status(400).json({ error: 'Invallid recipient' });
    }

    if (!deliveryman_id) {
      return res.status(400).json({ error: 'Invallid deliveryman' });
    }

    if (!product) {
      return res.status(400).json({ error: 'Invallid product' });
    }

    //vai para a controller de entrega
    /*const parseDate = parseISO(start_date);
    const dataComparacaoBefore = parseISO(format(new Date(), "yyyy-MM-dd'T'06:00:00"));
    const dataComparacaoAfter = parseISO(format(new Date(), "yyyy-MM-dd'T'14:00:00"));


    if( isAfter(parseDate, dataComparacaoAfter) || isBefore(parseDate, dataComparacaoBefore) ){
      return res.status(400).json({ error: 'Date out of range, permited is 08:00 at 18:00 hours' });
    }*/


    const encomenda = await Encomenda.create(req.body);

    const entregador = await Entregador.findByPk( encomenda.deliveryman_id );


    await Mail.sendMail({
      to: `${entregador.name} <${entregador.email}>`,
      subject: 'Registered order',
      template: 'info',
      context: {
        entregador: entregador.name,
        produto: encomenda.product,
      },
    });

    return res.json({
      encomenda
    });
  }

  async update(req, res) {
    const { recipient_id, deliveryman_id, product  } = req.body;

    if (!recipient_id) {
      return res.status(400).json({ error: 'Invallid recipient' });
    }

    if (!deliveryman_id) {
      return res.status(400).json({ error: 'Invallid deliveryman' });
    }

    if (!product) {
      return res.status(400).json({ error: 'Invallid product' });
    }

    const encomenda = await Encomenda.findByPk( req.params.id );

    const retorno = await encomenda.update(req.body);


    return res.json({
      retorno
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query.page;

    const encomendas = await Encomenda.findAll({
      where: {},
      order: ['created_at'],
      attributes: ['product', 'start_date', 'canceled_at', 'signature_id', 'id', 'deliveryman_id', 'recipient_id' ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'cidade', 'estado'],
        },
        {
          model: Entregador,
          as: 'deliveryman',
          attributes: ['name'],
        },
      ],
    });

    return res.json(encomendas);
  }


  async show(req, res){
    try{
      const encomenda = await Encomenda.findByPk(req.params.id, {
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['name'],
          },
          {
            model: Entregador,
            as: 'deliveryman',
            attributes: ['name'],
          },
        ],
      });


      return res.json({
        encomenda
      });
    }catch( err ){
      return res.json({ message : err.message });
    }
  }

  async destroy(req, res){
    try{
      const encomenda = await Encomenda.findByPk(req.params.id);

      encomenda.destroy();

      return res.json({ message : "Deleted with success!"});
    }catch( err ){
      return res.json({ message : err.message });
    }
  }

}

export default new EncomendaController();

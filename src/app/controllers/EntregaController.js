import Encomenda from '../models/Encomendas';
import { parseISO, isBefore, format, isAfter, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import File from '../models/File';
import Entregador from '../models/Entregadores';
import Recipient from '../models/Recipient';

class EntregaController {
  async update(req, res) {
    const { start_date, end_date, signature_id } = req.body;
    const encomenda = await Encomenda.findByPk( req.params.id );

    if(!end_date){
      if( !start_date ){
        return res.status(400).json({ error: 'Start date not informad' });
      }

      const parseDate = parseISO(start_date);
      const dataComparacaoBefore = parseISO(format(new Date(), "yyyy-MM-dd'T'06:00:00"));
      const dataComparacaoAfter = parseISO(format(new Date(), "yyyy-MM-dd'T'14:00:00"));


      const encomendas = await Encomenda.findAll({
        where: {
          deliveryman_id: encomenda.deliveryman_id,
          canceled_at: null,
          end_date: null,
          start_date: {
            [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
          },
        },
      });

      if( encomendas.length > 5){
        return res.status(400).json({ error: 'Not permited alocate more than five delivery for you' });
      }


      if( start_date && (isAfter(parseDate, dataComparacaoAfter) || isBefore(parseDate, dataComparacaoBefore)) ){
        return res.status(400).json({ error: 'Date out of range, permited is 08:00 at 18:00 hours' });
      }
    }else if(end_date){
      if( !signature_id){
        return res.status(400).json({ error: 'Necessery signature' });
      }
    }

    const retorno = await encomenda.update(req.body);

    return res.json({
      retorno
    });
  }


  async index(req, res) {
    const { page = 1 } = req.query.page;

    const encomendas = await Encomenda.findAll({
      where: { canceled_at : null, deliveryman_id : req.params.id },
      order: ['created_at'],
      attributes: ['product', 'start_date' ],
      limit: 12,
      offset: (page - 1) * 12,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['nome'],
        },
        {
          model: Entregador,
          as: 'deliveryman',
          attributes: ['name'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url','path'],
        },
      ],
    });

    return res.json(encomendas);
  }
}

export default new EntregaController();

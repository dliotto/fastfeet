import * as Yup from 'yup';
import Encomenda from '../models/Encomendas';
import { parseISO, isBefore, format, isAfter } from 'date-fns';
import File from '../models/File';

class EncomendaController {
  async store(req, res) {
    const { recipient_id, deliveryman_id, product, start_date  } = req.body;

    if (!recipient_id) {
      return res.status(400).json({ error: 'Invallid recipient' });
    }

    if (!deliveryman_id) {
      return res.status(400).json({ error: 'Invallid deliveryman' });
    }

    if (!product) {
      return res.status(400).json({ error: 'Invallid product' });
    }

    const parseDate = parseISO(start_date);
    const dataComparacaoBefore = parseISO(format(new Date(), "yyyy-MM-dd'T'06:00:00"));
    const dataComparacaoAfter = parseISO(format(new Date(), "yyyy-MM-dd'T'14:00:00"));

    console.log('-------------');
    console.log(parseDate);
    console.log('***************');
    console.log(dataComparacaoBefore);
    console.log('#################');

    if( isAfter(parseDate, dataComparacaoAfter) || isBefore(parseDate, dataComparacaoBefore) ){
      return res.status(400).json({ error: 'Date out of range, permited is 08:00 at 18:00 hours' });
    }


    const encomenda = await Encomenda.create(req.body);

    return res.json({
      encomenda
    });
  }

  /*async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha nas validações' });
    }

    const entregador = await Entregador.findByPk( req.query.idEntregador );

    const { id, name, avatar_id, email } = await entregador.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query.page;

    const entregador = await Entregador.findAll({
      where: { email: req.query.email },
      order: ['email'],
      attributes: ['id', 'name', 'email'],
      limit: 2,
      offset: (page - 1) * 2,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(entregador);
  }


  async show(req, res){
    try{
      const entregador = await Entregador.findByPk(req.query.entregador, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });


      return res.json({
        entregador
      });
    }catch( err ){
      return res.json({ message : err.message });
    }
  }

  async destroy(req, res){
    try{
      const entregador = await Entregador.findByPk(req.query.entregador);

      entregador.destroy();

      return res.json({ message : "Deletado com sucesso!"});
    }catch( err ){
      return res.json({ message : err.message });
    }
  }*/

}

export default new EncomendaController();

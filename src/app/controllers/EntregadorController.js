import * as Yup from 'yup';
import Entregador from '../models/Entregadores';
import File from '../models/File';

class EntregadorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail!' });
    }

    const userExists = await Entregador.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (userExists) {
      return res.status(400).json({ error: 'Existing user!' });
    }

    const { id, name, email, avatar_id } = await Entregador.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail!' });
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

      return res.json({ message : "Deleted with success!"});
    }catch( err ){
      return res.json({ message : err.message });
    }
  }

}

export default new EntregadorController();

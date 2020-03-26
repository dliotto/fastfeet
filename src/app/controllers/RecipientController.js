import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController{
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string()
        .required(),
      numero: Yup.number()
        .required(),
      complemento: Yup.string(),
      estado: Yup.string()
        .required(),
      cidade: Yup.string()
        .required(),
      cep: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail!' });
    }

    const { id, nome, rua, numero, complemento, estado, cidade, cep } = await Recipient.create(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string()
        .required(),
      numero: Yup.number()
        .required(),
      complemento: Yup.string(),
      estado: Yup.string()
        .required(),
      cidade: Yup.string()
        .required(),
      cep: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail!' });
    }

    const recipient = await Recipient.findByPk(req.body.id);

    // eslint-disable-next-line no-undef
    //console.log(recipient);

    const { id, nome, rua, numero, complemento, estado, cidade, cep } = await recipient.update(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async index(req, res){
    const { id, nome, rua, numero, complemento, estado, cidade, cep } = await Recipient.findAll();

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async show(req, res){
    try{
      const { id, nome, rua, numero, complemento, estado, cidade, cep } = await Recipient.findByPk(req.query.recipient);

      return res.json({
        id,
        nome,
        rua,
        numero,
        complemento,
        estado,
        cidade,
        cep,
      });
    }catch( err ){
      return res.json({ message : err.message });
    }
  }

  async destroy(req, res){
    try{
      const recipient = await Recipient.findByPk(req.query.recipient);

      recipient.destroy();

      return res.json({ message : "Deleted with success!"});
    }catch( err ){
      return res.json({ message : err.message });
    }
  }
}

export default new RecipientController();

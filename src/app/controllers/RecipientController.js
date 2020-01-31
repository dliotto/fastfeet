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
      return res.status(400).json({ error: 'Falha nas validações' });
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
      return res.status(400).json({ error: 'Falha nas validações' });
    }

    const recipient = await Recipient.findByPk(req.recipientId);


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
    const { id, nome, rua, numero, complemento, estado, cidade, cep } = await Recipient.findByPk(req.recipientId);

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

  async destroy(req, res){
    const recipient = await Recipient.findByPk(req.recipientId);

    recipient.destroy();

    return res.json({ message : "Deletado com sucesso!"});
  }
}

export default new RecipientController();

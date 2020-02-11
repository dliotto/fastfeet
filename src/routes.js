import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserControllers from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import EntregadorController from './app/controllers/EntregadorController';
import FileController from './app/controllers/FileController';
import EncomendaController from './app/controllers/EncomendaController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/**Create Usuários**/
routes.post('/users', UserControllers.store);

/**Retornar aglo**/
routes.get('/fast', (req, res) => {
  return res.json({ message: "Helo world"});
});

/**Iniciar sessão**/
routes.post('/sessions', SessionController.store);

/**Middleware para validação de token de usuário, para todas as rotas que estão a baixo dele**/
routes.use(authMiddleware);

/** CRIAR ROTAS ENTREGADORES**/


/**Update Usuários**/
routes.put('/users', UserControllers.update);

/**Create Recipient**/
routes.post('/recipients', RecipientController.store);

/**Alter Recipient**/
routes.put('/recipients', RecipientController.update);

/**Get Recipient**/
routes.get('/recipients', RecipientController.show);

/**Delete Recipient**/
routes.delete('/recipients', RecipientController.destroy);

/**Get All Recipient**/
routes.get('/recipientsAll', RecipientController.index);


/**CRUD entregadores**/
routes.post('/entregador', EntregadorController.store);
routes.put('/entregador', EntregadorController.update);
routes.get('/entregador', EntregadorController.show);
routes.delete('/entregador', EntregadorController.destroy);
routes.get('/entregadores', EntregadorController.index);
/**CRUD entregadores**/

/**Upload de arquivo**/
routes.post('/files', upload.single('file'), FileController.store);

/**CRUD encomendas**/
routes.post('/encomenda', EncomendaController.store);
/**CRUD encomendas**/



//pode utilizar tambem export default routes;
//module.exports = routes;
export default routes;

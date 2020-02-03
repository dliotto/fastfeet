import { Router } from 'express';

import UserControllers from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

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



//pode utilizar tambem export default routes;
//module.exports = routes;
export default routes;

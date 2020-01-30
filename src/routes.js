import { Router } from 'express';

import UserControllers from './app/controllers/UserController';

const routes = new Router();


/**Create Usuários**/
routes.post('/users', UserControllers.store);

/**Retornar aglo**/
routes.get('/fast', (req, res) => {
  return res.json({ message: "Helo world"});
});

//pode utilizar tambem export default routes;
//module.exports = routes;
export default routes;

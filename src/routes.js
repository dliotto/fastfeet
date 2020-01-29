import { Router } from 'express';

const routes = new Router();

/**Retornar aglo**/
routes.get('/fast', (req, res) => {
  return res.json({ message: "Helo word"});
});

//pode utilizar tambem export default routes;
//module.exports = routes;
export default routes;

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // eslint-disable-next-line no-undef
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    // eslint-disable-next-line no-undef
    //console.log(decoded);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

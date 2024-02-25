import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  // console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //   console.log('token', token);
  if (token == null) {
    console.log('Token was null');
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token was correct');
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export {authenticateToken};

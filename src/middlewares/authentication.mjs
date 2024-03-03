import jwt from 'jsonwebtoken';
import 'dotenv/config';


// Check for bearer token in the request
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // There is a empty space between the key and token
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // CASE: There was no token in the request
    console.log('Token was null');
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    // CASE: There was a correct token
    console.log('Token was correct');
    next();
  } catch (err) {
    // CASE: There was a invalid token
    res.status(403).send({message: 'invalid token'});
  }
};

export {authenticateToken};

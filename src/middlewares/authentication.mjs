import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Check for bearer token in the request
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // There is a empty space between the key and token
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // There was no token in the request
    const missingToken = new Error('Bearer token null');
    missingToken.status = 401;
    return next(missingToken);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    // There was a correct token
    console.log(
        `Request passed token validation - user_level = ${req.user.user_level}`,
    );
    next();
  } catch (err) {
    // There was a invalid token
    const invalidToken = new Error('invalid token');
    invalidToken.status = 403;
    return next(invalidToken);
  }
};

export {authenticateToken};

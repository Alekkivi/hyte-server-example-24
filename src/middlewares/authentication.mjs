import {customError} from '../middlewares/error-handler.mjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Check for bearer token in the request
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Seperate the token with a empty space between the key and token
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // There was no bearer token in the request
    next(customError('Invalid Bearer token', 403));
  } else {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      // There was a correct token
      console.log(`Passed token validation, user_level=${req.user.user_level}`);
      next();
    } catch (err) {
      // There was a invalid token
      next(customError('Invalid signature', 403));
    }
  }
};

export {authenticateToken};

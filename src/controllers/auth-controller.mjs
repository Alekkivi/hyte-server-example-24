import {selectUserByUsername} from '../models/user-model.mjs';
import {validationResult} from 'express-validator';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Check login credentials from request body
const postLogin = async (req, res, next) => {
  // Make sure that the request body meets expectations
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const {username, password} = req.body;
    const user = await selectUserByUsername(username);
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Make sure we dont return password publically
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
      // CASE: Credentials from the request body match database credentials
      return res.json({message: 'logged in successfully', user, token});
    } else {
      // CASE: Incorrect login credentials.
      const error = new Error('invalid username or password');
      error.status = 401;
      error.errors = validationErrors.errors;
      return next(error);
    }
  } else {
    // CASE: Request body didnt pass validation
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};

// Return user information based on bearer token.
const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};

import {selectUserByUsername} from '../models/user-model.mjs';
import {validationResult} from 'express-validator';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// TODO VALIDATION
// Check login credentials from request body
const postLogin = async (req, res, next) => {
  const {username, password} = req.body;
  console.log('login', req.body);
  const user = await selectUserByUsername(username);

  if (user.error) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  }
  // compare password and hash, if match, login successful
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
    return res.json({message: 'logged in successfully', user, token});
  } else {
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  }
};

// Return user information based on bearer token.
const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};

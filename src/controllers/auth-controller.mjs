import {selectUserByUsername} from '../models/user-model.mjs';
import {customError} from '../middlewares/error-handler.mjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Check login credentials from request body
const postLogin = async (req, res, next) => {
  const {username, password} = req.body;
  console.log('login', req.body);
  const user = await selectUserByUsername(username);
  if (user.error) {
    return res.status(user.error).json(user);
  }
  // compare password and hash, if match, login successful
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return res.json({message: 'Logged in successfully', user, token});
  } else {
    return next(customError('Invalid username or password', 401));
  }
};
// Return user information based on bearer token.
const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};

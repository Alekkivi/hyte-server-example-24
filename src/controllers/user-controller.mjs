import bcrypt from 'bcryptjs';
/* eslint-disable camelcase */
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';

// GET all users - FOR ADMIN
const getUsers = async (req, res) => {
  if (req.user.user_level === 'admin') {
    const result = await listAllUsers();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(401).json({error: 401, message: 'Unauthorized'});
  }
};

// GET specific user - FOR BOTH
const getUserById = async (req, res) => {
  if (req.user.user_level === 'admin' || req.user.user_id == req.params.id) {
    const result = await selectUserById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(401).json({error: 401, message: 'Unauthorized'});
  }
};


// POST create a new user - FOR BOTH
const postUser = async (req, res) => {
  const {username, password, email} = req.body;

  // check that all needed fields are included in request
  if (username && password && email) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser({
      username,
      email,
      password: hashedPassword,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

// PUT, update existing user - FOR BOTH
const putUser = async (req, res) => {
  const user_id = req.user.user_id;
  const {username, password, email} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // check that all needed fields are included in request
  if (user_id && username && password && email) {
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

// DELETE user - FOR BOTH
const deleteUser = async (req, res) => {
  if (req.user.user_level === 'admin' || req.user.user_id == req.params.id) {
    const result = await deleteUserById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(401).json({error: 401, message: 'Unauthorized'});
  }
};


// Used for login
const selectUserByNameAndPassword = async (username, password) => {
  try {
    const sql = 'SELECT * FROM Users WHERE username=? AND password=?';
    const params = [username, password];
    const [rows] = await promisePool.query(sql, params);
    // if nothing is found with the username and password
    if (rows.length === 0) {
      return {error: 401, message: 'invalid username or password'};
    }
    // remove password property from the result and return the user object
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('selectUserByNameAndPassword', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  getUsers,
  selectUserByNameAndPassword,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};

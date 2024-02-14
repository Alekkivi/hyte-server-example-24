/* eslint-disable camelcase */
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';

// GET all users
const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// GET specific user
const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// POST create a new user
const postUser = async (req, res) => {
  const {username, password, email} = req.body;

  // check that all needed fields are included in request
  if (username && password && email) {
    const result = await insertUser(req.body);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

// PUT, update existing user
const putUser = async (req, res) => {
  const user_id = req.params.id;
  const {username, password, email} = req.body;
  // check that all needed fields are included in request
  if (user_id && username && password && email) {
    const result = await updateUserById({user_id, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
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

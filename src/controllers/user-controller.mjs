import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';
/* eslint-disable camelcase */


// GET all users
const getUsers = async (req, res, next) => {
  // Check if token is linked to admin user_level
  if (req.user.user_level === 'admin') {
    const result = await listAllUsers();
    if (result.error) {
      // CASE: db error
      const error = new Error(result.error);
      error.status = 500;
      return next(error);
    }
    // CASE: Request ok
    return res.json(result);
  } else {
    // CASE: Unauthorized user
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
};

// GET specific user
const getUserById = async (req, res, next) => {
  // Admin can see every user by id
  if (req.user.user_level === 'admin') {
    const result = await selectUserById(req.params.id);
    if (result.error) {
      // CASE: db error
      const error = new Error(result.error);
      error.status = 500;
      return next(error);
    }
    // CASE: Request ok
    return res.json(result);
  } else {
    // CASE: Unauthorized user
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
};

// POST create a new user - FOR BOTH
const postUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  const validationErrors = validationResult(req);
  console.log('user validation errors', validationErrors);
  // check that all needed fields are included in request
  if (validationErrors.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser(
        {
          username,
          email,
          password: hashedPassword,
        },
        next);
    return res.status(201).json(result);
  } else {
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};

// PUT, update existing user - FOR BOTH
const putUser = async (req, res, next) => {
  const validationErrors = validationResult(req);
  // check that all needed fields are included in request
  if (validationErrors.isEmpty()) {
    const user_id = req.user.user_id;
    const {username, password, email} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await updateUserById(
        {
          user_id,
          username,
          password: hashedPassword,
          email,
        },
        next);
    // CASE: User update successful
    return res.status(201).json(result);
  } else {
    // CASE: Validation error in request body
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};

// DELETE user - FOR BOTH
const deleteUser = async (req, res, next) => {
  try {
    if (req.user.user_level === 'admin' || req.user.user_id == req.params.id) {
      const result = await deleteUserById(req.params.id);
      if (result.error) {
        // CASE: Deletion error
        const error = new Error('Deletion failed.');
        error.status = 401;
        error.errors = result.error;
        return next(error);
      }
      // CASE: User deleted successfully
      return res.json(result);
    } else {
      // CASE: Unauthorized user
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }
  } catch (error) {
    // CASE: Server error
    const error2 = new Error('Server error.');
    error2.status = 500;
    return next(error2);
  }
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};

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

// Get a list of all users
const getUsers = async (req, res, next) => {
  // Check if token is linked to admin user_level
  if (req.user.user_level === 'admin') {
    const result = await listAllUsers();
    // Check for error in db
    if (result.error) {
      const error = new Error(result.message);
      error.status = result.error;
      return next(error);
    }
    // Request ok
    return res.json(result);
  } else {
    // Unauthorized user
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
};

// Get specific user using request params
const getUserById = async (req, res, next) => {
  // Admin can see every user by id
  if (req.user.user_level === 'admin') {
    const result = await selectUserById(req.params.id);
    // Check for error in db
    if (result.error) {
      const error = new Error(result.message);
      error.status = result.error;
      return next(error);
    }
    // Request ok
    return res.json(result);
  } else {
    // Unauthorized user
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
};

// Create a new user using request body
const postUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  // Check for validation errors in request body
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    // Hash the password for storage
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser({
      username,
      email,
      password: hashedPassword,
    });
    // Check for error in db
    if (result.error) {
      const error = new Error(result.message);
      error.status = result.error;
      return next(error);
    }
    // Request ok
    return res.status(201).json(result);
  } else {
    // Request body didnt pass validation
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
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });
    // Check for error in db
    if (result.error) {
      const error = new Error(result.message);
      error.status = result.error;
      return next(error);
    }
    // User update successful
    return res.status(201).json(result);
  } else {
    // Validation error in request body
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};

// Delete user using request params
const deleteUser = async (req, res, next) => {
  if (req.user.user_level === 'admin') {
    const result = await deleteUserById(req.params.id);
    // Check for error in db
    if (result.error) {
      const error = new Error(result.message);
      error.status = result.error;
      return next(error);
    }
    // User deleted successfully
    return res.json(result);
  } else {
    // Unauthorized user
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};

/* eslint-disable camelcase */
import {
  addEntry,
  listAllEntries,
  selectEntryById,
  updateEntryById,
  deleteEntryByIdUser,
  deleteEntryByIdAdmin,
  listAllEntriesByUserId,
} from '../models/entry-models.mjs';
import {validationResult} from 'express-validator';

// GET all entries - FOR USERS
const getEntries = async (req, res, next) => {
  let result = '';
  if (req.user.user_level === 'admin') {
    console.log('Admin user accessing all entries');
    result = await listAllEntries();
  } else {
    console.log('Regular user accessing all available entries');
    result = await listAllEntriesByUserId(req.user.user_id);
  }
  if (!result.error) {
    res.json(result);
  } else {
    const error = new Error(result.error);
    error.status = 500;
    return next(error);
  }
};

// GET specific entries - FOR ADMIN
const getEntryById = async (req, res, next) => {
  try {
    if (req.user.user_level === 'admin') {
      const result = await selectEntryById(req.params.id);
      return res.json(result);
    } else {
      // CASE: Unauthorized user
      const error = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    }
  } catch (error) {
    // CASE: Server error
    const error2 = new Error(error);
    error2.status = 500;
    return next(error2);
  }
};

const postEntry = async (req, res, next) => {
  const validationErrors = validationResult(req);
  // check that all needed fields are included in request
  if (validationErrors.isEmpty()) {
    // Destruct properties from req.body to separate variables,
    const {
      entry_date: entryDate,
      mood,
      weight,
      sleep_hours: sleepHours,
      notes,
    } = req.body;
    if (entryDate && (weight || mood || sleepHours || notes)) {
      const result = await addEntry(req.user, req.body, next);
      if (result.entry_id) {
        res.status(201);
        res.json({message: 'New entry added.', ...result});
      }
    } else {
      res.sendStatus(400);
    }
  } else {
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};
// PUT, update existing entry - FOR USER
const putEntry = async (req, res) => {
  const userId = req.user.user_id;
  if (req.params.id == userId) {
    const {entry_date, mood, weight, sleep_hours, notes} = req.body;
    // Check that all needed fields are included in the request
    if (entry_date && mood && weight && sleep_hours && notes) {
      const result = await updateEntryById({userId, ...req.body});
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  } else {
    return res.status(401).json({error: 401, message: 'Unauthorized'});
  }
};

// DELETE entry - FOR USER AND ADMIN
const deleteEntry = async (req, res) => {
  let result = '';
  if (req.user.user_level === 'admin') {
    console.log('admin delete');
    result = await deleteEntryByIdAdmin(req.params.id);
  } else {
    console.log('User delete');
    result = await deleteEntryByIdUser(req.user.user_id, req.params.id);
  }

  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getEntries, getEntryById, putEntry, deleteEntry, postEntry};

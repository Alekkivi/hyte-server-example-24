/* eslint-disable camelcase */
import {
  listAllEntries,
  selectEntryById,
  updateEntryById,
  deleteEntryByIdUser,
  deleteEntryByIdAdmin,
  listAllEntriesByUserId,
} from '../models/entry-models.mjs';

// GET all entries - FOR USERS
const getEntries = async (req, res) => {
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
    res.status(500);
    res.json(result);
  }
};

// GET specific entries - FOR ADMIN
const getEntryById = async (req, res) => {
  try {
    if (req.user.user_level === 'admin') {
      const result = await selectEntryById(req.params.id);
      return res.json(result);
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    return res.status(500).json({error: 'Internal server error'});
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

export {getEntries, getEntryById, putEntry, deleteEntry};

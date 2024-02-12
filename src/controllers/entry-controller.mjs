/* eslint-disable camelcase */
import {
  listAllEntries,
  selectEntryById,
  updateEntryById,
  deleteEntryById,
} from '../models/entry-models.mjs';

// GET all entries
const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// GET specific entries
const getEntryById = async (req, res) => {
  const result = await selectEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// PUT, update existing entry
const putEntry = async (req, res) => {
  const userId = req.params.id;
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  // check that all needed fields are included in request
  if (entry_date && mood && weight && sleep_hours && notes) {
    const result = await updateEntryById({userId, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};
// DELETE entry
const deleteEntry = async (req, res) => {
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getEntries, getEntryById, putEntry, deleteEntry};

import express from 'express';
import {
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';

// eslint-disable-next-line new-cap
const entryRouter = express.Router();

// /entries endpoint
entryRouter
    .route('/')
    .get(getEntries);

// /entries/:id endpoint
entryRouter
    .route('/:id')
    .get(getEntryById)
    .put(putEntry)
    .delete(deleteEntry);

export default entryRouter;

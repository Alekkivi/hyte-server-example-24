import express from 'express';
import {
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

// eslint-disable-next-line new-cap
const entryRouter = express.Router();

// TODO Post entry

// /entries endpoint
entryRouter.route('/').get(authenticateToken, getEntries);

// /entries/:id endpoint
entryRouter
    .route('/:id')
    .get(authenticateToken, getEntryById)
    .put(authenticateToken, putEntry)
    .delete(authenticateToken, deleteEntry);

export default entryRouter;

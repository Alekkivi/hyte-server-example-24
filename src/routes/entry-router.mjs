import express from 'express';
import {body} from 'express-validator';
import {
  postEntry,
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

// eslint-disable-next-line new-cap
const entryRouter = express.Router();


// /entries endpoint
entryRouter.route('/').get(authenticateToken, getEntries)
    .post(authenticateToken,
        body('entry_date').isDate(),
        body('mood').isString(),
        body('weight').isFloat(),
        body('sleep_hours').isFloat(),
        body('notes').isString(),
        postEntry);


// /entries/:id endpoint
entryRouter
    .route('/:id')
    .get(authenticateToken, getEntryById)
    .put(authenticateToken, putEntry)
    .delete(authenticateToken, deleteEntry);

export default entryRouter;

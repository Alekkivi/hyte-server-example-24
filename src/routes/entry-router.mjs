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
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

// eslint-disable-next-line new-cap
const entryRouter = express.Router();


// /entries endpoint
entryRouter.route('/').get(authenticateToken, getEntries)
    .post(authenticateToken,
        body('entry_date').isDate(),
        body('mood_color').isString(),
        body('weight').isFloat(),
        body('sleep_hours').isInt({min: 0, max: 24}),
        body('notes').isString(),
        validationErrorHandler,
        postEntry)
    .put(authenticateToken,
        body('entry_id').isInt(),
        body('entry_date').isDate(),
        body('mood_color').isString(),
        body('weight').isFloat(),
        body('sleep_hours').isFloat(),
        body('notes').isString(),
        validationErrorHandler,
        putEntry)
    .delete(authenticateToken,
        body('entry_id').isInt(),
        validationErrorHandler,
        deleteEntry);


// /entries/:id endpoint
entryRouter.route('/:id').get(authenticateToken, getEntryById);


export default entryRouter;

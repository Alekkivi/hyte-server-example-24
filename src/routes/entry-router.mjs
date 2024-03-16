import express from 'express';
import {body, param} from 'express-validator';
import {
  postEntry,
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
  deleteAllEntries,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

// eslint-disable-next-line new-cap
const entryRouter = express.Router();


// /entries endpoint
entryRouter.route('/').get(authenticateToken, getEntries);

entryRouter.route('/').post(authenticateToken,
    body('entry_date').isDate(),
    body('mood_color').isString(),
    body('weight').isFloat({min: 0, max: 1000}),
    body('sleep_hours').isFloat({min: 0, max: 24}),
    body('notes').isString(),
    validationErrorHandler,
    postEntry);

entryRouter.route('/').put(authenticateToken,
    body('entry_id').isInt(),
    body('entry_date').isDate(),
    body('mood_color').isString(),
    body('weight').isFloat({min: 0, max: 1000}),
    body('sleep_hours').isFloat({min: 0, max: 24}),
    body('notes').isString(),
    validationErrorHandler,
    putEntry);

entryRouter.route('/').delete(authenticateToken,
    body('entry_id').isInt(),
    validationErrorHandler,
    deleteEntry);


// /entries/:id endpoint
entryRouter
    .route('/:id')
    .get(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        getEntryById,
    )
    .delete(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        deleteAllEntries,
    );

export default entryRouter;

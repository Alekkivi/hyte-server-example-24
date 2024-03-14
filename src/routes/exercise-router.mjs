import express from 'express';
import {body} from 'express-validator';
// eslint-disable-next-line max-len
import {getAllExercises, PostExercise, putExercise, deleteExercise, deleteAll} from '../controllers/exercise-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

// eslint-disable-next-line new-cap
const exerciseRouter = express.Router();

// /Exercises endpoint

exerciseRouter.route('/').get(authenticateToken, getAllExercises)
    .post(authenticateToken,
        body('entry_date').isDate(),
        body('duration').isInt(),
        body('activity').isString(),
        PostExercise)
    .put(authenticateToken,
        body('entry_date').isDate(),
        body('duration').isFloat(),
        body('type').isString(),
        putExercise)
    .delete(authenticateToken,
        deleteExercise);

// /exercises/:id endpoint
exerciseRouter.route('/:id').delete(authenticateToken, deleteAll);


export default exerciseRouter;

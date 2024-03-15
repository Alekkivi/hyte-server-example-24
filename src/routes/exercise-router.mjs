import express from 'express';
import {body, param} from 'express-validator';
import {
  getAllExercises,
  PostExercise,
  deleteExercise,
  deleteAllExercises,
} from '../controllers/exercise-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';


// eslint-disable-next-line new-cap
const exerciseRouter = express.Router();

// /Exercises endpoint
exerciseRouter
    .route('/')
    .get(authenticateToken, getAllExercises)
    .post(
        authenticateToken,
        body('entry_date').isDate(),
        body('duration').isInt(),
        body('activity').isString(),
        body('intensity').isString(),
        validationErrorHandler,
        PostExercise)
    .delete(authenticateToken,
        body('exercise_id').isInt(),
        validationErrorHandler,
        deleteExercise);

// /exercises/:id endpoint
exerciseRouter.route('/:id').delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteAllExercises,
);


export default exerciseRouter;

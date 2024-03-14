/* eslint-disable linebreak-style */
import {validationResult} from 'express-validator';
import {
  getAllExercisesWithUserId,
  addExercise,
  updateExerciseById,
  deleteExerciseByUser,
  deleteAllExercises,
} from '../models/exercise-model.mjs';

const getAllExercises = async (req, res, next) => {
  console.log('User accessing all available exercises');
  const result = await getAllExercisesWithUserId(req.user.user_id);
  if (!result.error) {
    return res.json(result);
  }
  const test = new Error('asdfasdfasdf');
  test.status = 404;
  return next(test);
};

const PostExercise = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty) {
    const test = new Error('asdfasdfasdf');
    test.status = 404;
    return next(test);
  }
  const result = await addExercise(req.user.user_id, req.body);
  if (!result.error) {
    console.log(result);
    // eslint-disable-next-line max-len
    res
        .status(201)
        .json({message: 'Exercise added', entry_id: result.insertId});
  } else {
    const test = new Error('asdfasdfasdf');
    test.status = 404;
    return next(test);
  }
};

const putExercise = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    // Request didnt pass validation
    const error = new Error('Bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
  // Request passed the validation
  const userId = req.user.user_id;
  const result = await updateExerciseById({userId, ...req.body});
  if (result.error) {
    // There was a error
    const error = new Error(result.message);
    error.status = result.error;
    return next(error);
  } else {
    // Request ok
    return res.status(201).json(result);
  }
};

// Delete exercise
const deleteExercise = async (req, res, next) => {
  let result = '';
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    // Request didnt pass validation
    const error = new Error('Bad requsjadfhasdhfest');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
  console.log('User deleting exercises');
  console.log(req.body)
  result = await deleteExerciseByUser(req.body.exercise_id, req.user.user_id);
  if (result.error) {
    // There was a error
    const error = new Error(result.message);
    error.status = result.error;
    return next(error);
  } else {
    // Request ok
    return res.json(result);
  }
};

const deleteAll = async (req, res, next) => {
  // Make sure that the request contains admin token
  if (req.user.user_level === 'admin') {
    const result = await deleteAllExercises(req.params.id);
    if (result.error) {
      // There was a error
      const error = new Error(result.message);
      error.status = result.error;
      return next(error);
    } else {
      // return found entries
      return res.json(result);
    }
  } else {
    // Unauthorized user
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
};
export {
  getAllExercises,
  PostExercise,
  putExercise,
  deleteExercise,
  deleteAll,
};

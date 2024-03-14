import {
  getAllExercisesWithUserId,
  addExercise,
  deleteExerciseByUser,
  deleteAllExercises,
} from '../models/exercise-model.mjs';
import {customError} from '../middlewares/error-handler.mjs';

// Get all exercises - For regular users
const getAllExercises = async (req, res, next) => {
  const result = await getAllExercisesWithUserId(req.user.user_id);
  // Check if the result contains a error
  if (!result.error) {
    // Return found entries, if no errors occured
    return res.json(result);
  } else {
    // There was a error
    next(customError(result.message, result.error));
  }
};

// Add a new exercise entry
const PostExercise = async (req, res, next) => {
  const result = await addExercise(req.user.user_id, req.body);
  // Check if the result contains a error
  if (!result.error) {
    // Return OK-status, if no error occurred
    res
        .status(201)
        .json({message: 'Exercise added', entry_id: result.insertId});
  } else {
    // There was a error
    next(customError(result.message, result.error));
  }
};

// Delete exercises using exercise_id - For regular users
const deleteExercise = async (req, res, next) => {
  // Check if admin user is trying to access this function
  if (req.user.user_level === 'admin') {
    // Notify the admin, that this is not for them
    next(customError('This service is only for regular users', 401));
  } else {
    // The request was linked to regular token so proceed to query
    const result = await deleteExerciseByUser(
        req.body.exercise_id,
        req.user.user_id);
    // Check if there is a error in the result
    if (result.error) {
      // There was a error
      next(customError(result.message, result.error));
    } else {
      // Return OK-status, if no error occurred
      return res.json(result);
    }
  }
};

// Delete all exercises using user_id - For admin
const deleteAll = async (req, res, next) => {
  // Make sure that the request contains admin token
  if (req.user.user_level === 'admin') {
    const result = await deleteAllExercises(req.params.id);
    // Check if there is a error in the result
    if (result.error) {
      // There was a error
      next(customError(result.message, result.error));
    } else {
      // Return OK-status, if no error occurred
      return res.json(result);
    }
  } else {
    // Unauthorized user trying to access the function
    next(customError('Unauthorized', 401));
  }
};

export {getAllExercises, PostExercise, deleteExercise, deleteAll};

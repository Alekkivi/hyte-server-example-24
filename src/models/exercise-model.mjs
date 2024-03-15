/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import promisePool from '../utils/database.mjs';

// Get all the exercises using user_id
const getAllExercisesWithUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM Exercises WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // Returns a empty array, if no entries found
    return rows;
  } catch (error) {
    console.error('getAllExercisesWithUserId', error);
    return {error: 500, message: 'db error'};
  }
};

// Add a new exercise
const addExercise = async (id, body) => {
  try {
    const sql =
      `INSERT INTO Exercises (user_id, activity, duration, intensity, entry_date)` +
      ' VALUES (?,?,?,?, ?)';
    const params = [id, body.activity, body.duration, body.intensity, body.entry_date];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('addExercise', error);
    return {error: 500, message: 'db error'};
  }
};


// delete entries in db using exercise_id and user_id
const deleteExerciseByUser = async (exerciseId, userId) => {
  try {
    const sql = 'DELETE FROM Exercises WHERE exercise_id=? and user_id=?';
    const params = [exerciseId, userId];
    const [result] = await promisePool.query(sql, params);
    // See if any rows very affected
    if (result.affectedRows === 0) {
      // 0 affected rows means that the exercise entry was not found
      return {error: 404, message: 'exercise not found'};
    } else {
      // Return OK status, if exercise was found and deleted
      return {message: 'exercise deleted', user_id: userId};
    }
  } catch (error) {
    console.error('deleteExerciseByUser', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteAllExercisesAdmin = async (id) => {
  try {
    const sql = 'DELETE FROM Exercises WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // See if any rows very affected
    if (rows.affectedRows === 0) {
      // 0 affected rows means that no exercise entries was found
      return {error: 404, message: `No exercises found with user_id=${id}`};
    } else {
      return rows;
    }
  } catch (error) {
    console.error('deleteAllExercises', error);
    return {error: 500, message: 'db error'};
  }
};


export {getAllExercisesWithUserId, addExercise, deleteExerciseByUser, deleteAllExercisesAdmin};

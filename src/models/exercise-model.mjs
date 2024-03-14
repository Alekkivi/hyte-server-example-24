/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import promisePool from '../utils/database.mjs';

const getAllExercisesWithUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM exercises WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('getAllExercisesWithUserId', error);
    return {error: 500, message: 'db error'};
  }
};

const addExercise = async (id, body) => {
  try {
    const sql =
      `INSERT INTO exercises (user_id, activity, duration, intensity, entry_date) VALUES (?,?,?,?, ?)`;
    const params = [id, body.activity, body.duration, body.intensity, body.entry_date];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('addExercise', error);
    return {error: 500, message: 'db error'};
  }
};

// update entry in db usint entry_date
const updateExerciseById = async (user) => {
  try {
    const sql =
      // eslint-disable-next-line max-len
      'UPDATE exercises SET entry_date=?, type=?, duration=? WHERE user_id=? AND entry_date=?';
    const params = [
      user.entry_date,
      user.type,
      user.duration,
      user.userId,
      user.entry_date,
    ];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    // Make sure to return ok only if a row was affected
    if (result.affectedRows) {
      return {message: 'Exercise updated', user_id: user.userId};
    } else {
      // Entry was not found and/or affected
      return {error: 404, message: 'Exercise not found'};
    }
  } catch (error) {
    // Catch possible database errors
    console.error('updateExerciseById', error);
    return {error: 500, message: 'db error'};
  }
};

// delete entries in db using entry_date
const deleteExerciseByUser = async (exerciseId, userId) => {
  try {
    const sql = 'DELETE FROM exercises WHERE exercise_id=? and user_id=?';
    const params = [exerciseId, userId];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'exercise not found'};
    }
    return {message: 'exercise deleted', user_id: userId};
  } catch (error) {
    console.error('deleteExerciseByUser', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteAllExercises = async (id) => {
  try {
    const sql = 'DELETE FROM exercises WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('getAllExercisesWithUserId', error);
    return {error: 500, message: 'db error'};
  }
};


export {getAllExercisesWithUserId, addExercise, updateExerciseById, deleteExerciseByUser, deleteAllExercises};

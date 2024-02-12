import promisePool from '../utils/database.mjs';

// Get all entries in db
const listAllEntries = async () => {
  try {
    // if nothing is found, result array is empty []
    const sql =
      'SELECT user_id,entry_date, weight, sleep_hours, notes FROM diaryentries';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.error('listAllEntries', error);
    return {error: 500, message: 'db error'};
  }
};

// Get specific entry in db
const selectEntryById = async (id) => {
  try {
    const sql = 'SELECT * FROM diaryentries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    return rows;
  } catch (error) {
    console.error('selectUserById', error);
    return {error: 500, message: 'db error'};
  }
};

// update entry in db
const updateEntryById = async (user) => {
  try {
    const sql =
      // eslint-disable-next-line max-len
      'UPDATE diaryentries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE user_id=?';
    const params = [
      user.entry_date,
      user.mood,
      user.weight,
      user.sleep_hours,
      user.notes,
      user.userId,
    ];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    return {message: 'user data updated', user_id: user.user_id};
  } catch (error) {
    console.error('updateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};


// delete entries in db
const deleteEntryById = async (id) => {
  try {
    const sql = 'DELETE FROM diaryentries WHERE user_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'user not found'};
    }
    return {message: 'All entries deleted', user_id: id};
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    console.error('deleteUserById', error);
    return {error: 500, message: 'db error'};
  }
};


export {listAllEntries, selectEntryById, updateEntryById, deleteEntryById};

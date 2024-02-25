import promisePool from '../utils/database.mjs';

// Get all entries in db - FOR ADMIN
const listAllEntries = async () => {
  try {
    // if nothing is found, result array is empty []
    const sql = 'SELECT * FROM diaryentries';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.error('listAllEntries', error);
    return {error: 500, message: 'db error'};
  }
};

// Get all entries in db - FOR USER
const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
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
      'UPDATE diaryentries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE user_id=? AND entry_date=?';
    const params = [
      user.entry_date,
      user.mood,
      user.weight,
      user.sleep_hours,
      user.notes,
      user.userId,
      user.entry_date,
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
const deleteEntryByIdUser = async (userId, entryId) => {
  try {
    console.log(userId);
    console.log(entryId);
    const sql = 'DELETE FROM diaryentries WHERE entry_id=? and user_id=?';
    const params = [entryId, userId];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'Entry deleted', user_id: userId};
  } catch (error) {
    // note that users with other data (FK constraint) can't be deleted directly
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteEntryByIdAdmin = async (entryId) => {
  try {
    const sql = 'DELETE FROM diaryentries WHERE entry_id=?';
    const params = [entryId];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'Entry deleted', entry_id: entryId};
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllEntries,
  deleteEntryByIdAdmin,
  selectEntryById,
  updateEntryById,
  deleteEntryByIdUser,
  listAllEntriesByUserId,
};

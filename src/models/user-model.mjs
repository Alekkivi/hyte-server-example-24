import promisePool from '../utils/database.mjs';

// Get all users in database - For admin
const listAllUsers = async () => {
  try {
    // Get user data, exercise count and diary entry count.
    const sql = `
        SELECT
        u.user_id,
        u.username,
        u.email,
        u.created_at,
        u.user_level,
        COUNT(DISTINCT de.entry_id) AS diary_entry_count,
        COUNT(DISTINCT ex.exercise_id) AS exercise_count
    FROM
        Users u
    LEFT JOIN
        DiaryEntries de ON u.user_id = de.user_id
    LEFT JOIN
        Exercises ex ON u.user_id = ex.user_id
    GROUP BY
        u.user_id,
        u.username,
        u.email,
        u.created_at,
        u.user_level;
    `;
    // Returns a empty list if no users found
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: error};
  }
};
// Get specific user in db
const selectUserById = async (id) => {
  try {
    const sql =
      // eslint-disable-next-line max-len
      'SELECT username, user_id, email, created_at, user_level from Users where user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    // Remove password property from result
    return rows[0];
  } catch (error) {
    console.error('selectUserById', error);
    return {error: 500, message: 'db error'};
  }
};

// create new user in db
const insertUser = async (user) => {
  try {
    const sql =
      'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
    const params = [user.username, user.password, user.email];
    const [result] = await promisePool.query(sql, params);
    return {message: 'new user created', user_id: result.insertId};
  } catch (error) {
    console.error('insertUser', error);
    if (error.errno == 1062) {
      return {error: 409, message: 'Username taken or email'};
    } else {
      return {error: 500, message: 'db error'};
    }
  }
};

// update user in db
const updateUserById = async (user) => {
  try {
    const sql =
      'UPDATE Users SET username=?, password=?, email=? WHERE user_id=?';
    const params = [user.username, user.password, user.email, user.user_id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    // Check were any rows affected
    if (result.affectedRows === 0) {
      // 0 Affected rows mean that matching user_id was not found
      return {error: 404, message: 'User id not found in the database.'};
    } else {
      // Request ok
      return {message: 'user data updated', user_id: user.user_id};
    }
  } catch (error) {
    console.log('updateUserById', error);
    // Lack of username/email uniqueness will raise a error
    if (error.errno === 1062) {
      // If username/email was not unique, return conflict response
      return {error: 409, message: 'Username or email taken'};
    } else {
      // Return generic database error
      return {error: 500, message: 'db error'};
    }
  }
};

// delete user in db
const deleteUserById = async (id) => {
  try {
    const sql = 'DELETE FROM Users WHERE user_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);

    // User id not found
    if (result.affectedRows === 0) {
      return {error: 404, message: 'user not found'};
    }
    return {message: 'user deleted', user_id: id};
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    if (error.errno === 1451) {
      return {error: 500, message: 'FK constraint'};
    } else {
      return {error: 500, message: 'db error'};
    }
  }
};

const selectUserByUsername = async (username) => {
  try {
    const sql = 'SELECT * FROM Users WHERE username=?';
    const params = [username];
    const [rows] = await promisePool.query(sql, params);
    // if nothing is found with the username and password
    if (rows.length === 0) {
      return {error: 401, message: 'invalid username or password'};
    }
    return rows[0];
  } catch (error) {
    console.error('selectByUsername', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  selectUserByUsername,
  listAllUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById,
};

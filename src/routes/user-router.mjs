import express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

// /user endpoint
userRouter
    .route('/')
    // list users
    .get(authenticateToken, getUsers)
    // user registration
    .post(postUser)
    // update user
    .put(authenticateToken, putUser);
// /user/:id endpoint
userRouter
    .route('/:id')
    // get info of a user
    .get(authenticateToken, getUserById)
    // delete user based on id
    .delete(authenticateToken, deleteUser);


export default userRouter;

import express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

// /user endpoint
userRouter
    .route('/')
    // list users
    .get(getUsers)
    // user registration
    .post(postUser);
// /user/:id endpoint
userRouter
    .route('/:id')
    // get info of a user
    .get(getUserById)
    // update user
    .put(putUser)
    // delete user based on id
    .delete(deleteUser);


export default userRouter;

/* eslint-disable max-len */
import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';
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

/**
 * @api {get} api/users Get all users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission adminToken
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email address.
 * @apiSuccess {String} users.created_at Creation timestamp.
 * @apiSuccess {String} users.user_level User level.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *       {
 *           "user_id": 1,
 *           "username": "johndoe",
 *           "email": "johndoe@example.com",
 *           "created_at": "2024-01-01T07:00:00.000Z",
 *           "user_level": "regular"
 *       },
 *       {
 *           "user_id": 2,
 *           "username": "janeDoe",
 *           "email": "janeDoe@example.FI",
 *           "created_at": "2024-01-02T08:00:00.000Z",
 *           "user_level": "regular"
 *       }
 *   ]
 *
 * @apiSuccessExample Success-Response (Empty list):
 *    HTTP/1.1 200 OK
 *    []
 *
 * @apiError Unauthorized Only admin token linked users are authorized.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": {
 *          "message": "Unauthorized",
 *          "status": 401
 *      }
 *    }
 */
/**
 * @api {get} api/users Get all users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission adminToken
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email address.
 * @apiSuccess {String} users.created_at Creation timestamp.
 * @apiSuccess {String} users.user_level User level.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *       {
 *           "user_id": 1,
 *           "username": "johndoe",
 *           "email": "johndoe@example.com",
 *           "created_at": "2024-01-01T07:00:00.000Z",
 *           "user_level": "regular"
 *       },
 *       {
 *           "user_id": 2,
 *           "username": "janeDoe",
 *           "email": "janeDoe@example.FI",
 *           "created_at": "2024-01-02T08:00:00.000Z",
 *           "user_level": "regular"
 *       }
 *   ]
 *
 * @apiSuccessExample Success-Response (Empty list):
 *    HTTP/1.1 200 OK
 *    []
 *
 * @apiError Unauthorized Only admin token linked users are authorized.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": {
 *          "message": "Unauthorized",
 *          "status": 401
 *      }
 *    }
 */

/**
 * @api {put} api/users Update user information
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiHeader {String} Authorization Bearer token.
 * @apiPermission token
 *
 * @apiParam {String} username New username for the user.
 * @apiParam {String} password New password for the user.
 * @apiParam {String} email New email address for the user.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} user_id ID of the updated user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "User data updated",
 *      "user_id": 85
 *    }
 *
 * @apiError Conflict The provided email or username is already taken.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 409 Conflict
 *    {
 *      "error": {
 *          "message": "Username or email taken",
 *          "status": 409
 *      }
 *    }
 *
 * @apiError BadRequest Invalid request format or parameters.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": {
 *          "message": "Bad Request",
 *          "status": 400,
 *          "errors": [
 *              {
 *                 "field": "username",
 *                 "message": "Username is alphanumeric between 3-20 characters"
 *              }
 *          ]
 *      }
 *    }
 */
/**
 * @api {post} api/users Create a new user
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {String} username Username for the new user (alphanumeric between 3-20 characters).
 * @apiParam {String} password Password for the new user (between 3-128 characters).
 * @apiParam {String} email Email address for the new user.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} user_id ID of the created user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "User created",
 *      "user_id": 85
 *    }
 *
 * @apiError Conflict The provided email or username is already taken.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 409 Conflict
 *    {
 *      "error": {
 *          "message": "Username or email taken",
 *          "status": 409
 *      }
 *    }
 *
 * @apiError BadRequest Invalid request format or parameters.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": {
 *          "message": "Bad Request",
 *          "status": 400,
 *          "errors": [
 *              {
 *                  "field": "username",
 *                  "message": "Username is alphanumeric between 3-20 characters"
 *              }
 *          ]
 *      }
 *    }
 */

userRouter
    .route('/')
    // list users
    .get(authenticateToken, getUsers)
    // update user
    .put(authenticateToken,
        body('username', 'Username is alphanumeric between 3-20 characters')
            .trim().isLength({min: 3, max: 20}).isAlphanumeric(),
        body('password', 'Password should be between 3-128 characters')
            .trim().isLength({min: 3, max: 128}),
        body('email', 'Invalid email address').trim().isEmail(),
        validationErrorHandler,
        putUser)
    // user registration with validation
    .post(
        body('username', 'Username is alphanumeric between 3-20 characters')
            .trim().isLength({min: 3, max: 20}).isAlphanumeric(),
        body('password', 'Password should be between 3-128 characters')
            .trim().isLength({min: 3, max: 128}),
        body('email', 'Invalid email address').trim().isEmail(),
        validationErrorHandler,
        postUser,
    );

// "/user/:id" endpoint
userRouter
    .route('/:id')
    // get info of a user
    .get(authenticateToken, getUserById)
    // delete user based on id
    .delete(authenticateToken, deleteUser);

export default userRouter;

import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import {postLogin, getMe} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';
import express from 'express';

// eslint-disable-next-line new-cap
const authRouter = express.Router();
/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**

 * @apiDefine invalidTokenError
 * @apiError Bearer token missing from the request
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbitten
 *
 *     {
 *       "error": {
 *           "message": "Invalid Bearer token",
 *           "status": 403
 *           }
 *       }
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError invalidTokenError Username or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": {
 *          "message": "Invalid username or password",
 *          "status": 401
 *       }
 *     }
 *
 */

authRouter;
/**
 * @api {post} api/login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "JohnDoe",
 *      "password": "Secret"
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Logged in successfully",
 *      "user": {
 *        "user_id": 7,
 *        "username": "JohnDoe",
 *        "email": "JohnDoe@example.com",
 *        "user_level": "regular"
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
 *                XNlcm5hsdfbasdujfhasudfhausdhfuasdhdXVzaTFAZXhhbXBsZS5jb20
 *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
 *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
 *    }
 *
 * @apiUse UnauthorizedError
 */

authRouter.post(
    '/login',
    // Check login with creation parameters.
    body('username').trim(),
    body('password').trim(),
    validationErrorHandler, postLogin);

/**
 * @api {get} api/auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {String} user.created_at created at timestamp.
 * @apiSuccess {string} user.user_level User level of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 * @apiSuccess {Number} user.exp Token experiation timestamp.

 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *     "user": {
 *       "user_id": 21,
 *       "username": "johnDoe",
 *       "email": "johnDoe@example.com",
 *       "created_at": "YYYY-MM-DDTHH:MM:SS.SSSZ"
 *       "user_level_id": regular,
 *       "iat": 1701279021,
 *       "exp": 1701279121
 *     }
 *   }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid signature",
 *       "status": 403
 *     }
 */
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;

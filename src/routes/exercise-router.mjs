import express from 'express';
import {body, param} from 'express-validator';
import {
  getAllExercises,
  PostExercise,
  deleteExercise,
  deleteAllExercises,
} from '../controllers/exercise-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const exerciseRouter = express.Router();
/**
 * @api {get} api/exercises Get all exercises
 * @apiVersion 1.0.0
 * @apiName GetExercises
 * @apiGroup Exercises
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} exercises List of exercises.
 * @apiSuccess {Number} exercises.exercise_id Exercise ID.
 * @apiSuccess {Number} exercises.user_id User ID associated with the exercise.
 * @apiSuccess {String} exercises.activity Name of the activity.
 * @apiSuccess {String} exercises.intensity Intensity level of the activity.
 * @apiSuccess {Number} exercises.duration Duration of the activity in minutes.
 * @apiSuccess {String} exercises.entry_date Date of the exercise entry.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *       {
 *           "exercise_id": 59,
 *           "user_id": 85,
 *           "activity": "Running",
 *           "intensity": "High",
 *           "duration": 30,
 *           "entry_date": "2024-03-17T22:00:00.000Z"
 *       },
 *       {
 *           "exercise_id": 61,
 *           "user_id": 85,
 *           "activity": "Yoga",
 *           "intensity": "Low",
 *           "duration": 60,
 *           "entry_date": "2024-03-16T22:00:00.000Z"
 *       }
 *   ]
 *
 * @apiSuccessExample Success-Response (Empty list):
 *    HTTP/1.1 200 OK
 *    []
 *
 * @apiError Forbidden Invalid or expired token provided.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "error": {
 *          "message": "Invalid signature",
 *          "status": 403
 *      }
 *    }
 */

/**
 * @api {post} api/exercises Add new exercise
 * @apiVersion 1.0.0
 * @apiName AddExercise
 * @apiGroup Exercises
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} entry_date Date of the exercise entry (format: yyyy-mm-dd)
 * @apiParam {Number} duration Duration of the exercise in minutes.
 * @apiParam {String} activity Name of the activity.
 * @apiParam {String} intensity Intensity level of the activity.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} entry_id ID of the added exercise.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "Exercise added",
 *      "entry_id": 62
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
 *                  "field": "entry_date",
 *                  "message": "Invalid value"
 *              }
 *          ]
 *      }
 *    }
 *
 * @apiError Forbidden Invalid or expired token provided.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "error": {
 *          "message": "Invalid signature",
 *          "status": 403
 *      }
 *    }
 */

/**
 * @api {delete} api/exercises Delete an exercise by exercise ID
 * @apiVersion 1.0.0
 * @apiName DeleteExercise
 * @apiGroup Exercises
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} exercise_id ID of the exercise to be deleted.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} user_id ID of the user associated with the deleted exercise
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Exercise deleted",
 *      "user_id": 85
 *    }
 *
 * @apiError Unauthorized This service is only for regular users.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": {
 *          "message": "This service is only for regular users",
 *          "status": 401
 *      }
 *    }
 *
 * @apiError NotFound The exercise with the provided ID was not found.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": {
 *          "message": "Exercise not found",
 *          "status": 404
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
 *                  "field": "exercise_id",
 *                  "message": "Invalid value"
 *              }
 *          ]
 *      }
 *    }
 *
 * @apiError Forbidden Invalid or expired token provided.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "error": {
 *          "message": "Invalid signature",
 *          "status": 403
 *      }
 *    }
 */


exerciseRouter
    .route('/')
    .get(authenticateToken, getAllExercises)
    .post(
        authenticateToken,
        body('entry_date').isDate(),
        body('duration').isInt(),
        body('activity').isString(),
        body('intensity').isString(),
        validationErrorHandler,
        PostExercise)
    .delete(authenticateToken,
        body('exercise_id').isInt(),
        validationErrorHandler,
        deleteExercise);
/**
 * @api {delete} /exercises/:id Delete all exercises by user ID
 * @apiVersion 1.0.0
 * @apiName DeleteAllExercisesByUserId
 * @apiGroup Exercises
 * @apiPermission adminToken
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id ID of the user whose exercises are to be deleted.
 *
 * @apiSuccess {Number} affectedRows Number of exercises deleted.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "fieldCount": 0,
 *      "affectedRows": 5,
 *      "insertId": 0,
 *      "info": "",
 *      "serverStatus": 34,
 *      "warningStatus": 0,
 *      "changedRows": 0
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
 *                  "field": "id",
 *                  "message": "must be integer"
 *              }
 *          ]
 *      }
 *    }
 *
 * @apiError NotFound No exercises found with the provided user ID.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": {
 *          "message": "No exercises found with user_id=22",
 *          "status": 404
 *      }
 *    }
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
 *
 * @apiError Forbidden Invalid or expired token provided.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "error": {
 *          "message": "Invalid signature",
 *          "status": 403
 *      }
 *    }
 */

exerciseRouter.route('/:id').delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteAllExercises,
);

export default exerciseRouter;

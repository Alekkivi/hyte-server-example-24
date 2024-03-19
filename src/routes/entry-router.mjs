import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body, param} from 'express-validator';
import express from 'express';
import {
  postEntry,
  getEntries,
  getEntryById,
  putEntry,
  deleteEntry,
  deleteAllEntries,
} from '../controllers/entry-controller.mjs';

// eslint-disable-next-line new-cap
const entryRouter = express.Router();

/**
 * @apiDefine All authentication needed.
 */

/**
 * @apiDefine admin Admin users only.
 * Valid admin authentication token must be provided within request.
 */

/**
 * @apiDefine token Logged in regular user access only
 * Valid regular authentication token must be provided within request.
 */

/**
 * @apiDefine InvalidTokenError
 * @apiError InvalidToken Authentication token was invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token",
 *       "status": 401
 *     }
 */

/**
 * @api {get} api/entries Get all available entries
 * @apiVersion 1.0.0
 * @apiName GetEntries
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} entry All entries.
 * @apiSuccess {Number} entry.entry_id Entry ID of the Specific entry.
 * @apiSuccess {Number} entry.user_id User ID of the entry owner.
 * @apiSuccess {String} entry.entry_date Entry date of the entry.
 * @apiSuccess {String} entry.mood_color Color to represent mood.
 * @apiSuccess {Number} entry.weight Weight measurement.
 * @apiSuccess {Number} entry.sleep_hours Sleep duration measurement.
 * @apiSuccess {String} entry.notes Notes.
 * @apiSuccess {String} entry.created_at Created at timestamp.

 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *    [
 *       {
 *           "entry_id": 100,
 *           "user_id": 21,
 *           "entry_date": "YYYY-MM-DDTHH:MM:SS.SSSZ",
 *           "mood_color": "Green",
 *           "weight": "72.00",
 *           "sleep_hours": 7,
 *           "notes": "Feeling good!",
 *           "created_at": "YYYY-MM-DDTHH:MM:SS.SSSZ"
 *       }
 *   ]
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *      {
 *      "error": {
 *          "message": "Invalid Bearer token",
 *          "status": 403
 *          }
 *      }
 */
entryRouter.route('/').get(authenticateToken, getEntries);
/**
 * @api {post} api/entries Post entry
 * @apiVersion 1.0.0
 * @apiName PostEntry
 * @apiGroup Entries
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} entry_date Date of the entry in "YYYY-MM-DD" format.
 * @apiParam {String} mood_color Color representing mood.
 * @apiParam {String} notes Additional notes.
 * @apiParam {Number} sleep_hours Duration of sleep in hours (0-24).
 * @apiParam {Number} weight Weight measurement (0-1000).
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "entry_date": "2024-01-01",
 *      "mood_color": "Green",
 *      "notes": "Feeling good!",
 *      "sleep_hours": 7,
 *      "weight": 72
 *    }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} entry_id ID of the added entry.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Entry added",
 *      "entry_id": 76
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "error": {
 *          "message": "Invalid signature",
 *          "status": 403
 *      }
 *    }
 *
 * @apiError BadSyntax Request syntax was incorrect.
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
 *                  "message": "Date should be in yyyy-mm-dd format"
 *              }
 *          ]
 *      }
 *    }
 */

entryRouter.route('/').post(authenticateToken,
    body('entry_date', 'Date should be in yyyy-mm-dd format').isDate(),
    body('mood_color').isString(),
    body('weight').isFloat({min: 0, max: 1000}),
    body('sleep_hours', 'Sleep duration must be between 0-24')
        .isFloat({min: 0, max: 24}),
    body('notes').isString(),
    validationErrorHandler,
    postEntry);
/**
 * @api {put} api/entries Update entry
 * @apiVersion 1.0.0
 * @apiName PutEntry
 * @apiGroup Entries
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} entry_id ID of the entry to update.
 * @apiParam {String} entry_date Date of the entry in "YYYY-MM-DD" format.
 * @apiParam {String} mood_color Color representing mood.
 * @apiParam {String} notes Additional notes.
 * @apiParam {Number} sleep_hours Duration of sleep in hours (0-24).
 * @apiParam {Number} weight Weight measurement (0-1000).
 *
 * @apiParamExample {json} Put request-Example:
 *    {
 *      "entry_id": 76,
 *      "entry_date": "2024-01-01",
 *      "mood_color": "Green",
 *      "notes": "Feeling good!",
 *      "sleep_hours": 7,
 *      "weight": 72
 *    }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} user_id ID of the user who updated the entry.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Entry updated",
 *      "user_id": 85
 *    }
 *
 * @apiError EntryNotFound The provided entry ID was incorrect, no entry found.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": {
 *          "message": "Entry not found",
 *          "status": 404
 *      }
 *    }
 *
 * @apiError BadSyntax Request syntax was incorrect.
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
 *                  "message": "Date should be in yyyy-mm-dd format"
 *              }
 *          ]
 *      }
 *    }
 */
entryRouter.route('/').put(authenticateToken,
    body('entry_id').isInt(),
    body('entry_date', 'Date should be in yyyy-mm-dd format').isDate(),
    body('mood_color').isString(),
    body('weight').isFloat({min: 0, max: 1000}),
    body('sleep_hours', 'Sleep duration must be between 0-24')
        .isFloat({min: 0, max: 24}),
    body('notes').isString(),
    validationErrorHandler,
    putEntry);

/**
 * @api {delete} api/entries Delete entry
 * @apiVersion 1.0.0
 * @apiName DeleteEntry
 * @apiGroup Entries
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} entry_id ID of the entry to be deleted.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "entry_id": 76
 *    }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} user_id ID of the user associated with the deleted entry
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Entry deleted",
 *      "user_id": 85
 *    }
 *
 * @apiError EntryNotFound The specified entry could not be found.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": {
 *          "message": "Entry not found",
 *          "status": 404
 *      }
 *    }
 *
 * @apiError BadRequest The request is invalid or missing required parameters.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": {
 *          "message": "Bad Request",
 *          "status": 400,
 *          "errors": [
 *              {
 *                  "field": "entry_id",
 *                  "message": "Invalid value"
 *              }
 *          ]
 *      }
 *    }
 */
entryRouter.route('/').delete(authenticateToken,
    body('entry_id').isInt(),
    validationErrorHandler,
    deleteEntry);

/**
 * @api {get} api/entries/:id Get entries by user ID
 * @apiVersion 1.0.0
 * @apiName GetEntriesByUserId
 * @apiGroup Entries
 * @apiPermission adminToken
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id ID of the user whose entries are to be retrieved.
 *
 * @apiSuccess {Object[]} entries List of entries.
 * @apiSuccess {Number} entries.entry_id Entry ID.
 * @apiSuccess {Number} entries.user_id User ID.
 * @apiSuccess {String} entries.entry_date Date of the entry.
 * @apiSuccess {String} entries.mood_color Mood color.
 * @apiSuccess {Number} entries.weight Weight.
 * @apiSuccess {Number} entries.sleep_hours Sleep duration.
 * @apiSuccess {String} entries.notes Notes.
 * @apiSuccess {String} entries.created_at Creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *       {
 *           "entry_id": 14,
 *           "user_id": 2,
 *           "entry_date": "2024-02-29T22:00:00.000Z",
 *           "mood_color": "Red",
 *           "weight": "70.00",
 *           "sleep_hours": 6,
 *           "notes": "Had a rough day.",
 *           "created_at": "2024-03-08T11:07:18.000Z"
 *       }
 *   ]
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
 * @apiError EntryNotFound No entries found for the provided user ID.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": {
 *          "message": "Entry not found",
 *          "status": 404
 *      }
 *    }
 */

/**
 * @api {delete} api/entries/:id Delete entries by user ID
 * @apiVersion 1.0.0
 * @apiName DeleteEntriesByUserId
 * @apiGroup Entries
 * @apiPermission adminToken
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id ID of the user whose entries are to be deleted.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Entries deleted"
 *    }
 *
 * @apiError NotFound No entries found for the provided user ID.
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": {
 *          "message": "Entries not found",
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
 *                  "field": "id",
 *                  "message": "must be integer"
 *              }
 *          ]
 *      }
 *    }
 */

entryRouter
    .route('/:id')
    .get(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        getEntryById,
    )
    .delete(
        authenticateToken,
        param('id', 'must be integer').isInt(),
        validationErrorHandler,
        deleteAllEntries,
    );

export default entryRouter;

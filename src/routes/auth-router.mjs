import express from 'express';
import {postLogin, getMe} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';


// eslint-disable-next-line new-cap
const authRouter = express.Router();

// "/auth/login" endpoint
authRouter.post(
    '/login',
    // Check login with creation parameters.
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 3, max: 128}),
    postLogin);

// "/auth/me" endpoint
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;

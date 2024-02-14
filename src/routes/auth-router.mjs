import express from 'express';
import {postLogin, getMe} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

// eslint-disable-next-line new-cap
const authRouter = express.Router();

authRouter.post('/login', postLogin).get('/me', authenticateToken, getMe);

export default authRouter;

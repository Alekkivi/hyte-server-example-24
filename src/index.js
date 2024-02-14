// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import itemRouter from './routes/item-router.mjs';
import userRouter from './routes/user-router.mjs';
import entryRouter from './routes/entry-router.mjs';
import logger from './middlewares/logger.mjs';
import authRouter from './routes/auth-router.mjs';

// Define the host
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Staattinen sivusto palvelimen juureen
app.use(express.static('public'));

// staattinen sivusto ali-url-osoitteessa
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tarjoiltava kansio määritellään ns. Relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// Logger middleware
app.use(logger);
app.use('/items', itemRouter);

app.use('/api/users', userRouter);

app.use('/api/entries', entryRouter);

app.use('/api/auth', authRouter);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

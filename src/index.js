// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  deleteItem,
  getItemById,
  getItems,
  postItem,
  putItem,
  showRoot,
} from './items.mjs';
// import exp from 'constants';
import {getUserById, getUsers, postLogIn, postUser, putUser} from './users.mjs';

// Define the host
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
app.use(express.json());

// Staattinen sivusto palvelimen juureen
app.use(express.static('public'));

// staattinen sivusto ali-url-osoitteessa
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tarjoiltava kansio määritellään ns. Relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// ---------- Items resource ------------ //

// Root
app.get('/', showRoot);

// List items - GET http://127.0.0.1:3000/items
app.get('/items', getItems);

// Get specific item - GET http://127.0.0.1:3000/items/<id>
app.get('/items/:id', getItemById);

// Add item - POST http://127.0.0.1:3000/items
app.post('/items', postItem);

// Update item - PUT http://127.0.0.1:3000/items/<id>
app.put('/items/:id', putItem);

// Delete item - DELELTE http://127.0.0.1:3000/items/<id>
app.delete('/items/:id', deleteItem);

// ---------- Users resource ------------ //

// List user - GET http://127.0.0.1:3000/users
app.get('/users', getUsers);

// Get specific user - GET http://127.0.0.1:3000/users/<id>
app.get('/users/:id', getUserById);

// Register user - POST http://127.0.0.1:3000/users
app.post('/users', postUser);

// Update user - PUT http://127.0.0.1:3000/users/<id>
app.put('/users/:id', putUser);

// Login user - POST http://127.0.0.1:3000/users/login
app.post('/users/login', postLogIn);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

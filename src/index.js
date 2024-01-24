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
} from './items.mjs';

// Define the host
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// Staattinen sivusto palvelimen juureen
app.use(express.static('public'));

// staattinen sivusto ali-url-osoitteessa
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tarjoiltava kansio määritellään ns. Relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// RECOURCE /item endpoints

// So called homepage for the API
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

// Get all items in the items-list: GET http://127.0.0.1:3000/items
app.get('/items', getItems);

// Add a new item to the items-list: POST http://127.0.0.1:3000/items/<newItemName>
app.post('/items/:newItemName', postItem);

// Return a specific item name based on requested id number: GET http://127.0.0.1:3000/items/<id>
app.get('/items/:id', getItemById);

// PUT
app.put('/items/:id', putItem);

// DELELTE
app.delete('/items/:id/', deleteItem);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

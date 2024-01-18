// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

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

// List of all the items
const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
  {id: 3, name: 'Item3'},
  {id: 4, name: 'Item4'},
];

// So called homepage for the API
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});


// Get all items in the items-list: GET http://127.0.0.1:3000/items
app.get('/items', (req, res) => {
  res.json(items);
});

// Add a new item to the items-list: POST http://127.0.0.1:3000/items/<newItemName>
app.post('/items/:newItemName', (req, res) => {
  const nameFromUrl = req.params.newItemName;
  const newIdNumber = items.length + 1;
  const newItem = {id: newIdNumber, name: nameFromUrl};

  res.send('POST Request Called');
  items.push(newItem);
  console.log('New item added: ', newItem);
  console.log(items);
});


// Return a specific item name based on requested id number: GET http://127.0.0.1:3000/items/<id>
app.get('/items/:id', (req, res) => {
  // Parse the URL for the number of the item
  const requestedItemId = parseInt(req.params.id);
  let result = 'There is no item with that ID';

  for (let i = 0; i < items.length; i++) {
    // Define every id based on the iteration
    const itemId = items[i]['id'];

    if (requestedItemId === itemId) {
      result = items[i]['name'];
    }
  }
  res.json({name: result});
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

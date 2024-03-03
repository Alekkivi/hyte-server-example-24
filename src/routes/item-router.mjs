import express from 'express';

import {
  deleteItem,
  getItemById,
  getItems,
  postItem,
  putItem,
} from '../controllers/item-controller.mjs';


// eslint-disable-next-line new-cap
const itemRouter = express.Router();

// List items - GET http://127.0.0.1:3000/items
itemRouter.get('/', getItems);

// Get specific item - GET http://127.0.0.1:3000/items/<id>
itemRouter.get('/:id', getItemById);

// Add item - POST http://127.0.0.1:3000/items
itemRouter.post('/', postItem);

// Update item - PUT http://127.0.0.1:3000/items/<id>
itemRouter.put('/:id', putItem);

// Delete item - DELELTE http://127.0.0.1:3000/items/<id>
itemRouter.delete('/:id', deleteItem);

export default itemRouter;

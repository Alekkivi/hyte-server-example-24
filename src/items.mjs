// List of all the items
const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
  {id: 3, name: 'Item3'},
  {id: 4, name: 'Item4'},
];

// Root
const showRoot = (req, res) => {
  res.send('Welcome to my REST api!');
};

// List items
const getItems = (req, res) => {
  res.json(items);
};

// Get specific item
const getItemById = (req, res) => {
  const requestedItemId = req.params.id;
  const foundItem = items.find(({id}) => id == requestedItemId);
  if (foundItem) {
    // Case: Request OK
    res.json(foundItem);
  } else {
    // Case: Id not found
    res.status(404).json({error: 'Item not found'});
  }
};

// Add item
const postItem = (req, res) => {
  // Case: Bad request
  if (!req.body.name) {
    return res.status(400).json({error: 'Item name missing'});
  }
  // Case: Request OK - Use rolling ID counter
  const newId = items[items.length-1].id + 1;
  const newItem = {name: req.body.name, id: newId};
  items.push(newItem);
  res.status(201).json({message: 'item created'});
};

// Update item
const putItem = (req, res) => {
  const index = items.findIndex((item) => item.id == req.params.id);
  // Case: id not found
  if (index === -1) {
    return res.sendStatus(404).json({message: 'No item found'});
  }
  // Case: bad request
  if (!req.body.name) {
    return res.status(400).json({error: 'Item name missing'});
  }
  // Case: Request OK
  items[index].name = req.body.name;
  res.json({message: items[index]});
};

// Delete item
const deleteItem = (req, res) => {
  const index = items.findIndex((item) => item.id == req.params.id);

  // Case: Id not found
  if (index === -1) {
    return res.sendStatus(404).json({message: 'No item found'});
  }
  // Case: Request OK
  const deletedItems = items.splice(index, 1);
  console.log('deleted item: ', deletedItems);
  res.sendStatus(204);
};


export {showRoot, getItems, getItemById, postItem, deleteItem, putItem};

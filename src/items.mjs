// List of all the items
const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
  {id: 3, name: 'Item3'},
  {id: 4, name: 'Item4'},
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  // Parse the URL for the number of the item
  const requestedItemId = parseInt(req.params.id);
  const foundItem = items.find(({id}) => id === requestedItemId);

  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({error: 'Item not found'});
  }
};

const postItem = (req, res) => {
  const nameFromUrl = req.params.newItemName;
  const newIdNumber = items.length + 1;
  const newItem = {id: newIdNumber, name: nameFromUrl};

  res.status(200).send('New item id: ' + newItem['id']);
  items.push(newItem);
  console.log('New item added: ', newItem);
};

const deleteItem = (req, res) => {
  // TODO implement delete
  res.json({message: 'DELETE placeholder'});
};

const putItem = (req, res) => {
  // TODO implement put
  res.json({message: 'PUT placeholder'});
};

export {getItems, getItemById, postItem, deleteItem, putItem};

// Main JS file
import express from 'express';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.get('/items', (req, res) => {
  res.json([
    {id: 1, name: 'Item1'},
    {id: 2, name: 'Item2'},
  ]);
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

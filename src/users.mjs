const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

// List users
const getUsers = (req, res) => {
  res.json(users);
};

// Get specific user
const getUserById = (req, res) => {
  const requestedUserId = req.params.id;
  const foundUser = users.find(({id}) => id == requestedUserId);
  if (foundUser) {
    // Case: Request OK
    res.json(foundUser);
  } else {
    // Case: Id not found
    res.status(404).json({error: 'User not found'});
  }
};

// Register user
const postUser = (req, res) => {
  // Case: Bad request
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({error: 'User information missing'});
  }
  // Case: Request OK - Use rolling ID counter
  const newId = users[users.length - 1].id + 1;
  const newUser = {
    id: newId,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json({message: 'User created', new_user: newUser});
};

// Update user
const putUser = (req, res) => {
  const index = users.findIndex((user) => user.id == req.params.id);
  // Case: id not found
  if (index === -1) {
    console.log('meni');
    return res.status(404).json({message: 'No user found'});
  }

  // Case: bad request
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({
      error: 'Username, password, or email is missing in the request body',
    });
  }
  // Case: Request Ok
  users[index].username = req.body.username;
  users[index].password = req.body.password;
  users[index].email = req.body.email;
  res.json({message: users[index]});
};

// Login user - Dummy
const postLogIn = (req, res) => {
  const userCreds = req.body;
  // Case: Bad request
  if (!userCreds.username || !userCreds.password) {
    return res.sendStatus(400);
  }
  const userFound = users.find((user) => user.username == userCreds.username);
  // Case: User not found
  if (!userFound) {
    return res.status(403).json({Error: 'Username or password incorrect'});
  }
  if (userFound.password === userCreds.password) {
    // Case: Request Ok
    res.json({message: 'Logged in successfully', user: userFound});
  } else {
    // Case: Incorrect password
    return res.status(403).json({Error: 'Username or password incorrect'});
  }
};

export {getUsers, getUserById, postUser, putUser, postLogIn};

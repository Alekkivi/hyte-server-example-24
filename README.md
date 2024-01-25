# Hyte example backend server

## Description
This is a server made with Node.Js and Express

start dev server: `npm run dev` / `npm start`


| Endpoint      | Method | Description                                        | Request Body (Example)            | Response Body (Example)        | Status Codes                         |
|---------------|--------|----------------------------------------------------|----------------------------------|--------------------------------|-------------------------------------|
| `/items`      | GET    | Retrieve a list of all items                       | N/A                              | `[{ "id": 1, "name": "Item1" }, { "id": 2, "name": "Item2" }]` | `200 OK`, `404 Not Found`           |
| `/items`      | POST   | Create a new item                                  | `{ "name": "New Item" }`         | `{ "id": 3, "name": "New Item" }` | `201 Created`, `400 Bad Request`    |
| `/items/:id`  | GET    | Retrieve details of a specific item by its ID      | N/A                              | `{ "id": 1, "name": "Item1" }`  | `200 OK`, `404 Not Found`           |
| `/items/:id`  | PUT    | Update details of a specific item by its ID        | `{ "name": "Updated Item" }`     | `{ "id": 1, "name": "Updated Item" }` | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `/items/:id`  | DELETE | Delete a specific item by its ID                   | N/A                              | N/A                            | `204 No Content`, `404 Not Found`    |


| Endpoint      | Method | Description                                        | Request Body (Example)            | Response Body (Example)        | Status Codes                         |
|---------------|--------|----------------------------------------------------|----------------------------------|--------------------------------|-------------------------------------|
| `/users`      | GET    | Retrieve a list of all users                       | N/A                              | `[{ "id": 1, "name": "Item1" }, { "id": 2, "name": "Item2" }]` | `200 OK`, `404 Not Found`           |
| `/users`      | POST   | Create a new user                                  | `{ "username": "uname" }, {"password":" "pword" } , {"email": "email@api.org"}`         | `{"message": 'User created', "new_user": newUser}` | `201 Created`, `400 Bad Request`    |
| `/users/:id`  | GET    | Retrieve details of a specific user by its ID      | N/A                              | `{ "id": 1, "username": "uname" , "password": "pword", "email":"email@api.org"}`  | `200 OK`, `404 Not Found`           |
| `/users/:id`  | PUT    | Update details of a specific user by its ID        | `{ "name": "Updated Item" }`     | `{ "message":{ "id": 1, "username": "uname" , "password": "pword", "email":"email@api.org"}  }` | `200 OK`, `400 Bad Request`, `404 Not Found` |

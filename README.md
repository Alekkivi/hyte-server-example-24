
# MoodMate API

Welcome to the backend server for MoodMate, developed as part of the Web Development course at Metropolia University of Applied Sciences. MoodMate is a web application designed to help users track their mood and overall well-being.

Node.js + Express application.

## Purpose
The primary goal of this backend server is to provide a reliable and efficient infrastructure to support the MoodMate application and provide insight into full-stack web Development.

## Usage
- Clone, download or copy repository
- Run `npm i` inside project folder
- Install necessary packages
- Run database script from `db/` folder
- Use `.env-sample` as a base for your `.env` file
- Start dev server with `npm run dev` or `npm start`


## Features
This API supports two user levels: Regular and Admin. The server's features depend on the user level.

Only users with the regular user level have restricted access. Admin users have unrestricted access and can perform any action that regular users can.

## Resources and endpoints
All queries and responses are detailed in the API documentation
You can access this documentation by two ways:
- When the server is running, documentation can be found [here](https://hyte-server-aleksi.northeurope.cloudapp.azure.com/docs).


## Endpoint `api/auth`

### Login
```
POST http://localhost:3000/api/auth/login
content-type: application/json
{
  "username": "johnDoe",
  "password": "Secret"
}
```

### Get information about me (Token needed)
```
GET http://localhost:3000/api/auth/me
Authorization: Bearer <token>
```

## Endpoint `api/users`

### Create user / Registeration
```
POST http://localhost:3000/api/users
content-type: application/json
{
  "username": "johnDoe",
  "password": "secret",
  "email":" john@doe.com
}
```

### Get all users (requires admin token)
```
GET http://localhost:3000/api/users
Authorization: Bearer <token>
```

### Get user via user ID (requires admin token)
```
GET http://localhost:3000/api/users/2
Authorization: Bearer <token>
```

### Delete user via user ID (requires admin token)
```
DELETE http://localhost:3000/api/users/2
Authorization: Bearer <token>
```

### Update user information
```
PUT http://localhost:3000/api/users
content-type: application/json
Authorization: Bearer <token>
{
  "username": "johnDoe2",
  "password": "secret23",
  "email":" john2@doe.com
}
```

### Get all users (requires admin token)
```
GET http://localhost:3000/api/users
Authorization: Bearer <token>
```

### Get user via user ID (requires admin token)
```
GET http://localhost:3000/api/users/2
Authorization: Bearer <token>
```

## Endpoint `api/entries`

### Get all entries from the server (requires admin token)
```
GET http://localhost:3000/api/entries
Authorization: Bearer <token>
```

### Get all own entries (Regular token)
```
GET http://localhost:3000/api/entries
Authorization: Bearer <token>
```

### Get all entries from specific user via user ID (requires admin token)
```
GET http://localhost:3000/api/entries/:id
Authorization: Bearer <token>
```

### Add entry (Requires any token)
```
POST http://localhost:3000/api/entries
content-type: application/json
Authorization: Bearer <token>
{
  "entry_date": "2024-02-12",
  "mood_color": "green",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day"
}
```

### Modify entry (Requires any token)
```
PUT http://localhost:3000/api/entries
content-type: application/json
Authorization: Bearer <token>
{
  "entry_id": 5.
  "entry_date": "2024-02-12",
  "mood_color": "Green",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day"
}
```

### Delete entry via entry ID (Requires any token)
```
DELETE http://localhost:3000/api/entries
content-type: application/json
Authorization: Bearer <token>
{
  "entry_id": 5.
}
```

### Delete all entries via user ID (Requires admin token)
```
DELETE http://localhost:3000/api/entries/:id
Authorization: Bearer <token>
```

## Endpoint `api/exercises`

### Get all own exercises (Regular token)
```
GET http://localhost:3000/api/exercises
Authorization: Bearer <token>
```

### Add exercise (Requires any token)
```
POST http://localhost:3000/api/exercises
content-type: application/json
Authorization: Bearer <token>
{
  "entry_date": "2024-02-12",
  "duration": 20,
  "intensity": "demanding",
  "activity": "Hiking"
}
```

### Delete all exercises via user ID (Requires admin token)
```
DELETE http://localhost:3000/api/exercises/:id
Authorization: Bearer <token>
```

### Delete any exercise via exercise ID (Requires admin token)
```
DELETE http://localhost:3000/api/exercises/
content-type: application/json
Authorization: Bearer <token>
{
    "exercise_id": 6
}
```

### Delete own exercises via exercise ID (Requires any token)
```
DELETE http://localhost:3000/api/exercises/
content-type: application/json
Authorization: Bearer <token>
{
    "exercise_id": 6
}
```

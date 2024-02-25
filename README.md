# Hyte example backend server

## Description
This is a server made with Node.Js and Express
start dev server: `npm run dev` / `npm start`


## Users
### Create a new user
POST http://127.0.0.1:3000/api/users
Example request formatting:
{
    "username":"example_username",
    "password":"example_password",
    "email":"example@email.com"
}

### Log in to a existing user
POST http://127.0.0.1:3000/api/auth/login
Example request formatting:
{
    "username":"example_username",
    "password":"example_password"
}
Successfull login will return information about the user. Including the token.

### Get user info with token (Requires token)
GET http://127.0.0.1:3000/api/auth/me

### Get all users (requires admin token)
GET http://127.0.0.1:3000/api/users

### Update user information (requires regular token)
POST http://127.0.0.1:3000/api/users
{
    "username":"new_username",
    "password":"new_password",
    "email":"new@email.com"
}

### Delete user (requires token)
With regular token you can only delete your own user profile
With admin token you can delete any user


## Entries
### Get all entries (Requires regular token)
GET http://127.0.0.1:3000/api/entries

Returned data varies based on user level
If the token is attached to a admin user
--> All entries in db are returned

else
--> All entries belonging to the user are returned

### Get specific user entires (Requires admin token)
GET http://127.0.0.1:3000/api/entries/id
where id is the user_id of a specific user

### Update a specific entry using entry_date (requires regular token)
PUT http://127.0.0.1:3000/api/entries/id
Example request formatting:
{
    "entry_date":"2012-12-12",
    "mood":"Hopefull",
    "weight":"55",
    "sleep_hours": "6",
    "notes":"This actually works??"
}
The example request will update the diary entry with corresponding entry_date

### Delete a specific entry using entry_id (requires token)
DELETE http://127.0.0.1:3000/api/entries/id
Where id is the entry_id of a specific entry

Regular user can only remove diary entries that they have made
With admin token you can delete any diary entry based on id from the URL

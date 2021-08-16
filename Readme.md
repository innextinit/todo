## About this work

This is a NodeJS based Todo API list. This is to keep trace of the things which needs to be done.

I used [Express](https://expressjs.com) with [NodeJS]() and [MongoDB](https://mongodb.com) for database. Other dependencies used include [Mongoose](https://mongoosejs.com) to communicate with MongoDB driver, [Bcrypt]() to encode the password gotten from the user during registration and [JWT]() to sign a token that gets sent for authorization

## Installation

Install with [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locall)

## Usage

Update [.envExample]("./.envExample") with the needed details and change the name to [.env]()


```bash
$ node app.js
```

Method | Route | Description
-----------|-------------|------------
GET     | {{userURL}}                       | Welcome note
POST    | {{userURL}}/register              | firstName, lastName, email, password -- body key
POST    | {{userURL}}/login                 | email, password -- body key
PUT     | {{userURL}}                       | firstName, lastName -- body key
DELETE  | {{userURL}}/:id                   | delete user
GET     | {{todoURL}}                       | get all users todo
POST    | {{todoURL}}                       | todoName -- body key
GET     | {{todoURL}}/:todoID/              | get a todo
POST    | {{todoURL}}/:todoID/              | taskName -- body key
DELETE  | {{todoURL}}/:todoID/              | remove a todo list
DELETE  | {{todoURL}}/:todoID/:taskID       | remove task in a todo
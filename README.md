# Social Net API 

![License: MIT](https://img.shields.io/badge/MIT-blue.svg) 

## Description 

Making a backend social network API with mongoDB, mongoose, and express. 

## Installation 

To start this application, clone and open this repository in your Visual Studio code and have Insomnia and MongoDB Compass installed and opened. With Insomnia opened, have four folders named Users, Thoughts, Friends, and Reactions. For Users and Thoughts create HTTP requests of GET one, GET all, POST, PUT, and DELETE. For Friends and Reactions, create HTTP requests of POST and DELETE. Then, have MongoDB connected to your localhost(default). Finally, within the terminal of your Visual Studio Code enter 'node server' to run the server.


## Sample NoSQL Code

```js
// Importing the connect and connection methods from mongoose
const { connect, connection } = require('mongoose');

// The connection string to the database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetDB';

// Connect to the database
connect(connectionString);

// Export the connection
module.exports = connection;
```
This establishes a connection with mongoDB with the mongoose package and naming the database as 'socialNetDB'.

```js
// A schema for the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);
```
A schema for User, that has fields of username, email, thoughts, and friends. Username and email being unique and required fields. Thought and friends being referenced to thought models and self-referenced to itself. Then converted into a model with its schema using mongoose's package.

```js
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
```
A virtual for the userSchema to return the number of friends the user has within it's friends array.

```js
const dbUserData = await User.find({})
            .select('-__v')
            .sort({ _id: -1 });
        res.status(200).json(dbUserData);
```
Used within the GET route in userRoutes, this finds and sorts all the users and responds to the client with the data(dbUserData).

```js
 const oneUser = await User.findOne({ _id: new ObjectId(req.params.id)})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
```
In userRoutes, this searches for a user by id and then populating/showing the associated thoughts and friends this user has.

```js
const newUser = await User.create(req.body);
        if (!newUser) {
            return res.status(404).json({ message: 'Creation unsuccessful' });
        }
        return res.status(200).json(newUser);
```
In userRoutes, this POST route creates a new user for the database and responds to the client with the created data(newUser) otherwise says 'Creation unsuccessful'.

```js
const updateUser = await User.findOneAndUpdate({_id: new ObjectId(req.params.id)}, {$set: req.body}, { new: true, runValidators: true });
```
This PUT route updates the user by id and then setting the contents(username and email field).

```js
 const addFriend = await User.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $addToSet: { friends: new ObjectId(req.params.friendId) }},
            { new: true, runValidators: true }
```
Within the POST route this finds user by id and then updates the user's friends field with the id of the other user's id(friendId).


## Author Info 

#### Anthony Nguyen

* [https://github.com/Blackswan1010](https://github.com/Blackswan1010) 

## License

https://api.github.com/licenses/MIT 


# 18 NoSQL: Social Network API
1. Set up config - (make sure MONGOOSE connection are good).
2. Set up route directory with CONTROLLERS and ROUTES in it.
3. Set up Model directory
4. Set up Utils directory
5. Set up NPM - express , mongoose, nodemon --watch
6. Create Server.js
Model User
- username
- email
- thoughts ( ref 'thought')
- friends ( ref 'User')
- virtual friendCount - going to have a function to calculate length of the FRIEND array.
Model Thought
- thoughtText
- createdAt
- username ( ref 'userId' )
- reaction ( array of reactionId references )
(doesn't have to be a model, has to be a schema)
- virtual reactionCount - going to have a function
to get the length of REACTIONS array
Schema Reaction
- Id
- body
- username
- createdAt
This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
API Routes
User route
- get 1 findOne({ })
- get all find({ })
- put findOneAndUpdate({ })
- create create(req.body)
- delete findOneAndDelete({ })
- POST findOneAndUpdate {$AddtoSet { }}
- DELETE for friend request findOneAndUpdate {$pull} {new True}
Thought route
- get 1
- get all
- put
- create
- delete
- ADD / DELETE Reaction
CONTROLLER
Interact with the model
modules.export = findAll(user)
ROUTES interact with the Database
render user
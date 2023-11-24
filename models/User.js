// Importing the Scehma and model from mongoose
const { Schema, model } = require('mongoose');

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

// A virtual for the User model's friendCount field
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);


// Export the User model
module.exports = User;
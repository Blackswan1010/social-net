const router = require('express').Router();
const { User, Thought } = require('../../models');
const { ObjectId } = require('mongodb');


// Get all users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.find({})
            .select('-__v')
            .sort({ _id: -1 });
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Get one user by id
router.get('/:id', async (req, res) => {
    try {
        const oneUser = await User.findOne({ _id: new ObjectId(req.params.id)})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        if (!oneUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.status(200).json(oneUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Create a user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (!newUser) {
            return res.status(404).json({ message: 'Creation unsuccessful' });
        }
        return res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Update a user by id
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({_id: ObjectId(req.params.id)}, {$set: req.body}, { new: true, runValidators: true });
        if (!updateUser) {
            return res.status(404).json({ message: 'Update unsuccessful' });
        } else {
            return res.status(200).json(updateUser);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

// Delete a user by id
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({_id: new ObjectId(req.params.id)});
        if (!deleteUser) {
            return res.status(404).json({ message: 'Delete unsuccessful' });
        }
        const deleteThoughts = await Thought.deleteMany({ _id: { $in: deleteUser.thoughts } });
        if (!deleteThoughts) {
            return res.status(404).json({ message: 'Deleting thoughts unsuccessful' });
        } else {
            return res.status(200).json("User and thoughts deleted");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

// Add a friend to a user
router.post('/:id/friends/:friendId', async (req, res) => {
    try {
        const addFriend = await User.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $addToSet: { friends: new ObjectId(req.params.friendId) }},
            { new: true, runValidators: true }
        );
        if (!addFriend) {
            return res.status(404).json({ message: 'Adding friend was unsuccessful' });
        }
        return res.status(200).json(addFriend);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

// Remove a friend from a user
router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
        const removeFriend = await User.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $pull: { friends: new ObjectId(req.params.friendId)} },
            { new: true }
        );
        if (!removeFriend) {
            return res.status(404).json({ message: 'Removing friend was unsuccessful' });
        }
        return res.status(200).json(removeFriend);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

/*
// Import all of the API routes from /api/index.js
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
    } = require('../../controllers/userController');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend);
*/

module.exports = router;


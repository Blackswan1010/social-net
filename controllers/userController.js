const { User, Thought } = require('../models');

// A controller for the User model
module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // get one user by id
    async getUserbyId(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.id })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // create user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            if (!dbUserData) {
                return res.status(404).json({ message: 'Creation unsuccessful' });
            }
            return res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // update user by id
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.id }, body, { new: true, runValidators: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'Update unsuccessful' });
            }
            return res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // delete user
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // add friend
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true }
            )
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // remove friend
    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId } },
                { new: true }
            )
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json(dbUserData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    }
};


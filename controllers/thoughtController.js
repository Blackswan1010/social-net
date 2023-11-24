const { User, Thought } = require('../models');

// A controller for the Thought model
module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({})
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.id })
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v');
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },
    // create thought
    async addThought({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Creation unsuccessful' });
            }
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            return res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // update thought by id
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.id }, body, { new: true, runValidators: true });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // delete thought by id
    async removeThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // add reaction to thought
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    },

    // remove reaction from thought
    async removeReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        };
    }
};

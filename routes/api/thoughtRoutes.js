const router = require('express').Router();
const { User, Thought } = require('../../models');
const { ObjectId } = require('mongodb');

// Get all thoughts
router.get('/', async (req, res) => {
    try {
        const dbThoughtData = await Thought.find({})
            .select('-__v')
            .sort({ _id: -1 });
        res.status(200).json(dbThoughtData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Get one thought by id
router.get('/:id', async (req, res) => {
    try {
        const oneThought = await Thought.findOne({ _id: new ObjectId(req.params.id) })
            .select('-__v');
        if (!oneThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        return res.status(200).json(oneThought);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Create a thought
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const userThought = await User.findOneAndUpdate(
            { _id: new ObjectId(req.body.userId) },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );
        if (!newThought) {
            return res.status(404).json({ message: 'Creation unsuccessful' });
        }
        return res.status(200).json(newThought);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Update a thought by id
router.put('/:id', async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updateThought) {
            return res.status(404).json({ message: 'Update unsuccessful' });
        }
        return res.status(200).json(updateThought);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});



// Delete a thought by id
router.delete('/:id', async (req, res) => {
    try {
        const deleteThought = await Thought.findOneAndDelete(
            { _id: new ObjectId(req.params.id) }
        );
        if (!deleteThought) {
            return res.status(404).json({ message: 'Delete unsuccessful' });
        }
        await User.findOneAndUpdate(
            { username: deleteThought.username },
            { $pull: { thoughts: req.params._id } },
            { new: true }
        );
        return res.status(200).json(deleteThought, { message: 'Thought deleted' });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const addReaction = await Thought.findOneAndUpdate(
            { _id: new ObjectId(req.params.thoughtId) },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!addReaction) {
            return res.status(404).json({ message: 'Add reaction unsuccessful' });
        }
        return res.status(200).json(addReaction);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

// Delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const deleteReaction = await Thought.findOneAndUpdate(
            { _id: new ObjectId(req.params.thoughtId) },
            { $pull: { reactions: { reactionId: new ObjectId(req.params.reactionId) } } },
            { new: true, runValidators: true }
        );
        if (!deleteReaction) {
            return res.status(404).json({ message: 'Delete reaction unsuccessful' });
        }
        return res.status(200).json(deleteReaction);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    };
});

module.exports = router;
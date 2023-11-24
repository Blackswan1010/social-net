const router = require('express').Router();

// Import all of the API routes from /api/index.js
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
    } = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

// /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);

// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

// /api/thoughts/:userId/:thoughtId/:reactionId
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
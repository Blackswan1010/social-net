// Importing the routes from the routes folder
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Adding the routes to the router
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Exporting the router
module.exports = router;

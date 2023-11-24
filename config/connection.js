// Importing the connect and connection methods from mongoose
const { connect, connection } = require('mongoose');

// The connection string to the database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetDB';

// Connect to the database
connect(connectionString);

// Export the connection
module.exports = connection;

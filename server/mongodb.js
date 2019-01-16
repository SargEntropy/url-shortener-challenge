const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Use JavaScript promises
const { Mongo } = require('../environment');

// const uri = `mongodb://${Mongo.HOST}:${Mongo.PORT}/${Mongo.NAME}`;
const uri = `mongodb://localhost:27017/shortener`;

/**
 , {
  auth: { authSource: Mongo.AUTH },
  user: Mongo.USER,
  pass: Mongo.PASS
}
 */
const db = mongoose.createConnection(uri);

module.exports = db;

const mongo = require('../../server/mongodb');
const mongoose = require('mongoose');

module.exports = mongo.model('Url', new mongoose.Schema({
  url: {
    type: String,
    required: true
  },

  user: mongoose.Schema.Types.ObjectId,

  hash: {
    type: String,
    required: true,
    unique: true
  },
  isCustom: {
    type: Boolean,
    required: true
  },

  removeToken: {
    type: String,
    required: true
  },

  protocol: String,
  domain: String,
  path: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  removedAt: {
    type: Date,
    default: null
  },

  active: {
    type: Boolean,
    required: true,
    default: true
  },

  clicks: {
    type: Number,
    default: 0
  }
}));

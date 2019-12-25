const mongoose = require('mongoose');


const partySchema = new mongoose.Schema({
  title: String,
  body: String,
  startsAt: Date,
  author: String,
});

module.exports = mongoose.model('Party', partySchema);

const mongoose = require('mongoose');
const User = require('./mongoUser');
const Schema = mongoose.Schema;

const roomSchema = mongoose.model('Room', new Schema({
  number: Integer,
  name: String,
  player1: User,
  player2: User,
}))

module.exports = roomSchema;
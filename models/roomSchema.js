const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = mongoose.model('Room', new Schema({
  number: String,
  name: String,
  player1: String,
  player2: String,
}))

module.exports = roomSchema;
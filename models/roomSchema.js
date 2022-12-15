const mongoose = require('mongoose');
const userSchema = require('./userSchema')
const Schema = mongoose.Schema;

const roomSchema = mongoose.model('Room', new Schema({
  number: Number,
  name: String,
  player1: String,
  player2: String,
}))

module.exports = roomSchema;
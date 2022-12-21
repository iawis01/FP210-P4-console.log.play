const express = require("express");
const routerRoom = express.Router();
const roomSchema = require('../models/roomSchema');

//Creat a room
routerRoom.post('/rooms', (req, res) =>{
  const room = roomSchema(req.body);
  room.save()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});


//Get all rooms
routerRoom.get('/rooms', (req, res) =>{
  roomSchema
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get a room
routerRoom.get('/room/:id', (req, res) =>{
  const {id } = req.params;
  roomSchema
  .findById(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get a room
routerRoom.get('/rooms/:number', (req, res) =>{
  const { number } = req.params;
  roomSchema
  .findOne({number})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Edit a room by id
routerRoom.put('/room/:id', (req, res) =>{
  const {id } = req.params;
  const {number, name, player1, player2} = req.body;
  roomSchema
  .updateOne({_id: id}, {$set:{number, name, player1, player2}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Edit a room by number
routerRoom.put('/rooms/:number', (req, res) =>{
  const {number } = req.params;
  const {name, player1, player2} = req.body;
  roomSchema
  .updateOne({number: number}, {$set:{number, name, player1, player2}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Delete a room
routerRoom.delete('/rooms/:id', (req, res) =>{
  const {id } = req.params;
  roomSchema
  .remove({_id: id})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

module.exports = routerRoom;
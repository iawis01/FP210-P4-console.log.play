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

async function getRooms(){
  await roomSchema
  .find()
  .then()
  .catch((error) => console.log(error)
  )
}

//Get all rooms
routerRoom.get('/rooms', (req, res) =>{
  roomSchema
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get a room
routerRoom.get('/rooms/:id', (req, res) =>{
  const {id } = req.params;
  roomSchema
  .findById(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Edit a room
routerRoom.put('/rooms/:id', (req, res) =>{
  const {id } = req.params;
  const {name, roomname, password} = req.body;
  roomSchema
  .updateOne({_id: id}, {$set:{name, roomname, password}})
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
module.exports = getRooms;
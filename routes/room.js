const express = require("express");
const routerRoom = express.Router();
const roomSchema = require('../models/roomSchema');


//La ruta buena sería /validated-register
//Creat an user
routerRoom.post('/rooms', (req, res) =>{
  const user = roomSchema(req.body);
  user.save()
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

//Get an room
routerRoom.get('/rooms/:id', (req, res) =>{
  const {id } = req.params;
  roomSchema
  .findById(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Edit an room
routerRoom.put('/rooms/:id', (req, res) =>{
  const {id } = req.params;
  const {name, username, password} = req.body;
  roomSchema
  .updateOne({_id: id}, {$set:{name, username, password}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get an room
routerRoom.delete('/rooms/:id', (req, res) =>{
  const {id } = req.params;
  roomSchema
  .remove({_id: id})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

module.exports = routerRoom;
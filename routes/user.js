const express = require("express");
const routerUser = express.Router();
const userSchema = require('../models/userSchema');


//La ruta buena sería /validated-register
//Creat an user
routerUser.post('/users', (req, res) =>{
  const user = userSchema(req.body);
  user.save()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get all users
routerUser.get('/users', (req, res) =>{
  userSchema
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get an user by ID
routerUser.get('/user/:id', (req, res) =>{
  const {id } = req.params;
  userSchema
  .findById(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get an user by email
routerUser.get('/users/:username', (req, res) =>{
  const {username} = req.params;
  userSchema
  .findOne({username})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Edit an user
routerUser.put('/users/:id', (req, res) =>{
  const {id } = req.params;
  const {name, username, password} = req.body;

  userSchema
  .updateOne({_id: id}, {$set:{name, username, password}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

//Get an user
routerUser.delete('/users/:id', (req, res) =>{
  const {id } = req.params;
  userSchema
  .remove({_id: id})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});

routerUser.get('/login', (req, res) =>{
  const {username} = req.params;
  userSchema
  .findOne({username})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});



module.exports = routerUser;
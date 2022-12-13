const express = require("express");
const routerUser = express.Router();
const userSchema = require('../models/userSchema');

//Create user
//La ruta buena sería /validated-register
routerUser.post('/users', (req, res) =>{
  const user = userSchema(req.body);
  user.save()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error})
  )
});



module.exports = routerUser;
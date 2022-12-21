//const { rooms } = require('../models/RoomData');
const roomSchema = require("../models/roomSchema");
const userSchema = require("../models/userSchema");

async function gameApp(request, response) {
  requestUsername = request.body.username;
  const user = await userSchema.findOne({requestUsername})

  response.render("game-app", { name: "game-app.css", userLogged: user  });
  response.end();
}

async function disconnect(request, response) {
  const rooms = await roomSchema.find();

  //console.log(rooms);
  var chosen_room = await rooms.find((room) => room.number === request.query.room);
  //console.log(chosen_room);
  if (chosen_room !== undefined) {
    //TODO Aqui explota porque me llega la room vacia, no se está actualizando con el ocupation
    if (chosen_room.player1 === request.query.user) {
      chosen_room.player1 = "";
      response.writeHead(200, { "Content-Type": "text/html" });
    } else if (chosen_room.player2 === request.query.user) {
      chosen_room.player2 = "";
      response.writeHead(200, { "Content-Type": "text/html" });
    } else {
      response.writeHead(404, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

async function ocupationcheck(request, response) {
  const rooms = await roomSchema.find();
  let chosen_room = await rooms.find(
    (room) => room.number === request.query.room
  );
  if (chosen_room !== undefined && chosen_room !== null) {
    if (chosen_room.player1 != "" && chosen_room.player2 != "") {
      response.writeHead(401, { "Content-Type": "text/html" });
    } else if (chosen_room.player1 == "" && chosen_room.player2 == "") {
      response.writeHead(200, { "Content-Type": "text/html" });
    } else {
      response.writeHead(201, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }

  response.end();
}
async function ocupation(request, response) {
  const rooms = await roomSchema.find();
  //let chosen_room = await roomSchema.findOne({number: request.body.room});
  var chosen_room = rooms.find((room) => room.number === request.query.room);

  console.log("function ocupation. PRIMERA CHOSEN_ROOM");
  console.log(chosen_room);
  if (chosen_room != undefined && chosen_room != null) {
    if (chosen_room.player1 != "" && chosen_room.player2 != "") {
      response.writeHead(404, { "Content-Type": "text/html" });
    } else {
      if (chosen_room.player1 === "") {
        chosen_room.player1 = request.query.user;
        console.log("function ocupation");
        console.log(chosen_room);

      } else {
        chosen_room.player2 = request.query.user;
      }
      response.writeHead(200, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

exports.gameApp = gameApp;
exports.ocupation = ocupation;
exports.ocupationcheck = ocupationcheck;
exports.disconnect = disconnect;

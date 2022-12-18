//const { rooms } = require('../models/RoomData');
const roomSchema = require('../models/roomSchema');

function gameApp(request, response) {
  response.render('game-app', { name: 'game-app.css' });
  response.end();
}

async function disconnect(request, response) {
  let chosen_room = await roomSchema.findOne({number: request.body.room});
  //var chosen_room = rooms.find(room => room.number === request.query.room);

  if (chosen_room !== undefined) {
    if (chosen_room.player1 === request.query.user) {
      chosen_room.player1 = '';
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player2 === request.query.user) {
      chosen_room.player2 = '';
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      response.writeHead(404, { "Content-Type": "text/html" });
    }

  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

async function ocupationcheck(request, response) {
  let rooms = await roomSchema.find();
  let chosen_room = rooms.find(room => room.number === request.query.room);
  if (chosen_room != undefined) {
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(401, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player1 == '' && chosen_room.player2 == '') {
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      response.writeHead(201, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }

  response.end();

}
async function ocupation(request, response) {
   let rooms = await roomSchema.find();
  //let chosen_room = await roomSchema.findOne({number: request.body.room});
  //let user_in_room = await roomSchema.findOne({player1: request.body.user});
  //let user2_in_room = await roomSchema.findOne({player2: request.body.user});
  var chosen_room = rooms.find(room => room.number === request.query.room);
  var user_in_room = rooms.find(room => room.player1 === request.query.user);
  var user2_in_room = rooms.find(room => room.player2 === request.query.user);
  if (chosen_room != undefined) {
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(404, { "Content-Type": "text/html" });
    }
    else {
      if (chosen_room.player1 === '') {
        chosen_room.player1 = request.query.user
      } else {
        chosen_room.player2 = request.query.user
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
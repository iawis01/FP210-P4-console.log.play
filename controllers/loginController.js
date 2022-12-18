//const users = require('../models/UserRegisters').usersDB;
//const rooms = require('../models/RoomData').rooms;
const userSchema = require('../models/userSchema');



async function login(request, response) {
    //await búsqueda en mongoDB
    //let item = users.find(item => item.username === request.body.username);

    let item = await userSchema.findOne({username: request.body.username});

    if (item !== undefined) {
        if (item.username === request.body.username && item.password === request.body.password) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end();
        }

        if (item.username === request.body.username && item.password !== request.body.password) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end();
        }
    }

    if (item === undefined) {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end();
    }

    response.end()
}

async function logOut(request, response) {

    var userNameLogOut = request.query.user

    let rooms = await userSchema.find();

    rooms.forEach(room => {
        for (const key in room) {
            if (key === 'player1') {
                var value = room[key];
                if (value === userNameLogOut) {
                    room[key] = '';
                }
            }
            if (key === 'player2') {
                var value = room[key];
                if (value === userNameLogOut) {
                    room[key] = '';
                }
            }
        }

    });

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end();
}


exports.login = login;
exports.logOut = logOut;
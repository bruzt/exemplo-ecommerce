const { Server } = require('http');
const socketio = require('socket.io');

/** @type {SocketIO.Server} sock */
let sock;

/** @param {Server} server */
function socketConnection(server) {

    const io = socketio(server, {
        transports: ['websocket']
    });

    /*io.on('connection', (socket) => {

        console.log(socket.id);
    });*/

    sock = io;
}

function emitNewOrder(newOrder){

    sock.emit('newOrder', newOrder);
}

module.exports = {
    socketConnection,
    emitNewOrder
}

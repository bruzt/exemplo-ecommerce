const { Server: HttpServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

/** @type {SocketIO.Server} sock */
let sock;

/** @param {HttpServer} server */
function socketConnection(server) {

    const io = new Server(server, {
        transports: ['websocket']
    });

    io.on('connection', (socket) => {

        try {
            const auth = socket.request._query['authorization'];

            if(auth == null) throw new Error();
            
            jwt.verify(auth, process.env.APP_SECRET);

            const tokenData = jwt.decode(auth);

            if(tokenData.admin == false) throw new Error();
            
            //console.log('connected')

        } catch (error) {
            socket.disconnect();

            //console.log('disconnected')
        }
    });

    sock = io;
}

function socketEmitNewOrder(newOrder){

    sock.emit('newOrder', newOrder);
}

module.exports = {
    socketConnection,
    socketEmitNewOrder
}


let sock;

/** @param {SocketIO.Server} io */
function socketConnection(io) {

    io.on('connection', (socket) => {

        //console.log(socket.id);

        sock = socket;
    });
}

function emitNewOrder(newOrder){

    sock.emit('newOrder', newOrder);
}

module.exports = {
    socketConnection,
    emitNewOrder
}

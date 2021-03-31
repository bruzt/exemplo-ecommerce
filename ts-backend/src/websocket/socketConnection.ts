import socketIo from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';

import OrderModel from '../models/OrderModel';

let sock: Server;

function socketConnection(server: Server) {
    //@ts-ignore
    const io = socketIo(server, {
        transports: ['websocket']
    });

    io.on('connection', (socket: socketIo.Socket) => {

        try {
            //@ts-ignore
            const auth = socket.request._query['authorization'];

            if(auth == null) throw new Error();
            
            jwt.verify(auth, process.env.APP_SECRET as string);

            const tokenData = jwt.decode(auth) as ITokenPayload;

            if(tokenData.admin == false) throw new Error();
            
            //console.log('connected')

        } catch (error) {
            socket.disconnect();

            //console.log('disconnected')
        }
    });

    sock = io;
}

function emitNewOrder(newOrder: OrderModel){

    sock.emit('newOrder', newOrder);
}

export default {
    socketConnection,
    emitNewOrder,
}

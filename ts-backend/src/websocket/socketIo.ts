//@ts-nocheck
import socketIo, { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';

import OrderModel from '../models/OrderModel';

let sock: Server;

function socketConnection(server: HTTPServer) {

    const io = socketIo(server, {
        transports: ['websocket']
    });

    /*const io = new Server({
        transports: ['websocket'],
    });*/

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

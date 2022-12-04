import socketIo from 'socket.io';
import { getAllMessages, addMessage } from '../controller/messages';

let io;

export const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', async (socket) => {
    console.log('Connection');

    let msges = await getAllMessages();
    socket.emit('receiveMessages', msges);

    socket.on('newMessage', (obj) => {
      console.log('New Message');
      console.log(obj)
      addMessage(obj);
      io.emit('newMessage', obj);
    });
  });

  return io;
};
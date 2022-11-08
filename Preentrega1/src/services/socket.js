const socketIo = require('socket.io');
const { BooksController } = require('../controller/books');

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New Connection');
    console.log(new Date());

    socket.on('allBooks', async () => {
      const books = await BooksController.getAll();

      books.forEach((aBook) => {
        socket.emit('book', aBook);
      });
    });
  });

  return io;
};

const socketEmit = (eventName, message) => {
  io.emit(eventName, message);
};

module.exports = {
  initWsServer,
  socketEmit,
};
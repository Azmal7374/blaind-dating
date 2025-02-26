const socketio = require('socket.io');

const setupSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinChat', (matchId) => {
      socket.join(matchId);
      console.log(`User ${socket.id} joined chat ${matchId}`);
    });

    socket.on('sendMessage', ({ matchId, sender, content }) => {
      io.to(matchId).emit('receiveMessage', { sender, content });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = { setupSocket };
/**
 * Use the settings from: https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
 * Except that related with logging
 */

module.exports = function socketConfig(io, sessionSockets) {

  sessionSockets.on('connection', function(err, socket, session) {
    //When a new user connects, send it its name (if known) or ask it (if unknown)
    socket.emit('register', {
      userName: session.userName
    });

    //Register the user in a room
    socket.on('register', function(data) {
      var roomName = data.roomName;
      var userName = data.userName;

      Rhapsody.log.info(userName + ' joined ' + roomName);

      //If the user wasn't registeres yet, save its name
      if(!session.userName) {
        session.userName = userName;
        session.save();
      }

      socket.join(roomName);

      //Send to everybody when a new user connects
      io.sockets.in(roomName).emit('message', {
        from: userName,
        message: 'joined the room'
      });
    });

    //Broadscasts the message to the room
    socket.on('message', function(data) {
      var message = data.message;
      var from = data.from;
      var room = data.room;

      socket.broadcast.to(room).emit('message', {
        from: from,
        message: message
      });
    });
  });
};
var ChatController = {
  mainView: 'index',
  
  views: {
    index: {
      action: function(req, res) {
        res.view({
          name: 'index.ejs',
          locals: {
            rooms: Rhapsody.sockets.http.rooms
          }
        });
      }
    },

    room: {
      action: function(req, res) {
        res.view({
          name: 'room.ejs',
          locals: {
            roomName: req.params.room
          }
        });
      },

      params: [':room']
    }
  }
};

module.exports = ChatController;
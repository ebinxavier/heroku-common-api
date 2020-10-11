const DB = {
  "1f63d20f-02cf-4cd6-97e4-41e9e1371716": {
    name: "Public Group",
    lastMessage: "Hello",
    lastMessageStatus: "seen",
    count: 20,
    time: "1:45 PM",
  },
};

const express = require("express");
const router = express.Router();

const handleSocketConnectionWhatsapp = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected");
    socket.on("disconnect", function () {
      if (DB[socket.id]) {
        socket.broadcast.emit("disconnected", { roomId: socket.id });
        delete DB[socket.id];
      }
    });

    // a request from a client to join the application
    socket.on("join", (data, cb) => {
      const roomId = socket.id;
      // Populate users DB, data will be {name, ...}
      data.roomId = roomId;
      DB[roomId] = data;
      console.log("Sending socket.id");
      cb({ roomId });
      socket.broadcast.emit("joined", data);
    });

    // Messaging
    socket.on("message", ({ message, roomId }) => {
      console.log("Received:", { message, roomId });
      const data = {
        name: roomId,
        message,
        time: "1:45 PM",
      };
      socket.broadcast.emit("messaged", data);
    });
  });
};

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/get-users", (req, res) => {
  res.send({ users: DB });
});

module.exports = {
  handleSocketConnectionWhatsapp,
  DB,
  apis: router,
};

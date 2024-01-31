import express from "express";
import http from "http";

const PORT = 4000;

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server); // instance of socket.io Server class mounted on express server

// listener for user connection
io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);
  socket.emit("messageResponse", { text: `Welcome to the chatroom` });

  // listener for message event logs data to console
  socket.on("message", (data) => {
    console.log(data);
  });

  // listener for message event from ChatFooter and emits messageResponse to ChatPage
  socket.on("message", (data) => {
    io.to(data.room).emit("messageResponse", data);
  });

  // sends typing message based on typingstatus
  socket.on("typingStatus", (data) =>
    socket
      .to(data.room)
      .emit("typingResponse", data.name ? `${data.name} is typing` : "")
  );

  // updates active userlist upon typing activity in ChatFooter

  socket.on("typingStatus", (data) =>
    data.name ? socket.to(data.room).emit("updateUserList", data.name) : ""
  );

  //Listens when a new user joins server
  socket.on("newUser", (data) => {
    console.log(data);

    socket.join(data.roomName);
    //Adds the new user to the list of users

    //Sends the list of users to the client
    io.to(data.roomName).emit("newUserResponse", data.userName);
  });

  // listens for disconnect updates userlist
  socket.on("disconnect", (data) => {
    console.log("A user disconnected");
    io.to(data.roomName).emit("disconnectResponse", data.userName);
    socket.disconnect();
  });

  // listens for logout to update user list
  socket.on("logout", (data) => {
    io.to(data.roomName).emit("disconnectResponse", data.userName);
  });

  socket.on("connect_failed", function () {
    document.write("Sorry, there seems to be an issue with the connection!");
  });
});

server.listen(PORT, () => {
  //IMPORTANT LISTEN TO server not app
  console.log(`Server listening on ${PORT}`);
});

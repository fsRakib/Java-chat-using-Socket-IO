const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.write(`<h1>Socket IO start on port : ${PORT}</h1>`);
  res.end();
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (ms) => {
    io.emit("message", ms);
  });
});

server.listen(PORT, () => {
  console.log("server running at http://localhost:3000");
});

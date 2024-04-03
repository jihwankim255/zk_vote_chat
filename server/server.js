const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // CORS 문제 해결을 위해 사용
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 모든 도메인에서의 접근을 허용
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // 모든 클라이언트에 메시지 방송
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

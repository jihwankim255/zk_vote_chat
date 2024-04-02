// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const cors = require("cors");
// app.use(cors());

// app.use(express.static("public"));

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// server.listen(3000, () => {
//   console.log("listening on *:3000");
// });

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

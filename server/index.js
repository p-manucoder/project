const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const postRouter = require("./routes/postRoutes");
const messageRouter = require("./routes/messageRoutes");
const chatRouter = require("./routes/chatRoutes");
const { Server } = require("socket.io");
const http = require("http");
const { sendMessage } = require("./controllers/messageController");
//DB CONNECTIONS AND SERVER START
const db_URI =
  "mongodb+srv://n2=:nas2@cluster0.omidf.mongodb.net/khoj?retryWrites=true&w=majority";
app.use(cors({ origin: "*" }));
var server = app.listen(process.env.PORT || 3001, (err) => {
  if (err) console.log(err);
  else console.log("Successfully Connnected toServer!", process.env.PORT);
});

mongoose.connect(db_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// .catch((err) => console.log(err));
// .then((e) => console.log(e));
//socket io implementation
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  // transports: ["websocket"],
  // upgrade: false,
});

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/post", postRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chats", chatRouter);

// socket functions
io.on("connection", function (socket) {
  console.log("Made socket connection with ", socket.id);

  // if (socket.rooms.has(socket.id)) console.log("in the room");
  socket.on("join-room", (roomId) => {
    console.log("user joined room ", roomId);
    socket.join(roomId);
  });
  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });
  socket.on("send-message", (data) => {
    // data will contain sentBy receivedBy message date roomId
    console.log(data);
    // io.in(data.roomId).emit("message", data);
    // io.in(data.roomId).emit("message", data);
    // socket.broadcast.to(data.roomId).emit("message", data);
    io.sockets.in(data.roomId).emit("message", data);
  });
  socket.on("disconnect", () => {
    socket.removeAllListeners();
    console.log("disconnecting");
  });
});

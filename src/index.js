const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Tambahkan ini
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose.connect("mongodb://localhost/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Periksa dan buat direktori 'uploads' jika tidak ada
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.use("/api", require("./routes/api"));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", (room, username) => {
    socket.join(room);
    socket
      .to(room)
      .emit("message", {
        username: "System",
        text: `${username} has joined the room`,
      });
    socket.emit("message", {
      username: "System",
      text: `Welcome to the room: ${room}`,
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      socket
        .to(room)
        .emit("message", {
          username: "System",
          text: `${username} has left the room`,
        });
    });
  });

  socket.on("chatMessage", (msg) => {
    const message = new Message(msg);
    message.save().then(() => {
      io.to(msg.room).emit("message", msg);
    });
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

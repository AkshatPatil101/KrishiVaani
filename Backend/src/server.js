import http from 'http';
import express from "express";
import { Server } from 'socket.io';
import cors from "cors";
import { connectDB } from "./config/db.js";
import onBoardingRoutes from "./routes/onBoardingRoutes.js";
import expertRouter from "./routes/expertRouter.js";
// I'm assuming you will have database models like these
// import Message from './models/Message.js';
// import User from './models/User.js';

const app = express();
connectDB();

// --- DYNAMIC CORS CONFIGURATION ---


// If a production URL is specified in the environment, add it to the list

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions)); // Use the dynamic CORS options for Express
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[Node Backend Log] Request received for: ${req.method} ${req.originalUrl}`);
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions, // Use the same dynamic CORS options for Socket.io
});


// --- Your API and Socket.io Logic ---
// I'm leaving the logic in place as a placeholder. You should replace this
// with the database-driven logic we discussed earlier.

const farmers = [{ email: "alice@farm.com", name: "Alice Farmer" }];
const experts = [{ email: "rohanmache71@gmail.com", name: "Dr. Ramesh Kumar" }];
const messages = [];

// This endpoint should be updated to use your database
app.get("/inbox/:expertEmail", (req, res) => {
  const expertEmail = req.params.expertEmail;
  const related = messages.filter(m => m.roomId.includes(expertEmail));
  const map = {};
  related.forEach(m => {
    const participants = m.roomId.split("-");
    const farmerEmail = participants.find(p => p !== expertEmail);
    const existing = map[farmerEmail];
    if (!existing || new Date(m.timestamp) > new Date(existing.lastTimestamp)) {
      const farmerObj = farmers.find(f => f.email === farmerEmail) || {};
      map[farmerEmail] = {
        farmerEmail,
        farmerName: farmerObj.name || farmerEmail,
        lastMessage: m.message,
        lastTimestamp: m.timestamp,
      };
    }
  });
  res.json(Object.values(map));
});

// This endpoint should be updated to use your database
app.get("history/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const roomMessages = messages.filter(m => m.roomId === roomId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  res.json(roomMessages);
});

io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    const history = messages.filter(m => m.roomId === roomId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    socket.emit("chatHistory", history);
  });

  socket.on("sendMessage", (msgData) => {
    const newMsg = {
      roomId: msgData.roomId,
      sender: msgData.sender,
      message: msgData.message,
      timestamp: new Date().toISOString(),
    };
    messages.push(newMsg);
    io.to(msgData.roomId).emit("receiveMessage", newMsg);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected", socket.id);
  });
});

app.use("/api/KrishiVaani", onBoardingRoutes);
app.use("/experts", expertRouter);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
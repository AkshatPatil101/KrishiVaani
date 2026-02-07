// src/socket.js
import { io } from "socket.io-client";

// With no URL, Socket.io automatically connects to the server that the page is on.
// The proxy will handle routing the /socket.io path correctly.
const socket = io({
  autoConnect: false,
});

export default socket;
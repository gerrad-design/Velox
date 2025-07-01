import { io } from "socket.io-client";

const socket = io("https://78c0-102-217-167-34.ngrok-free.app/", {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true, 
});

export default socket;
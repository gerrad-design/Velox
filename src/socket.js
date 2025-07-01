import { io } from "socket.io-client";

const socket = io("https://a2ae-102-217-167-34.ngrok-free.app/", {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true, 
});

export default socket;
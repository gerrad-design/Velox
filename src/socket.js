import { io } from "socket.io-client";

const socket = io("https://08cc-102-217-167-34.ngrok-free.app", {
  transports: ["websocket", "polling"],
});

export default socket;
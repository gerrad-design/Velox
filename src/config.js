export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5050"
    : "https://a5c5-102-217-167-34.ngrok-free.app";
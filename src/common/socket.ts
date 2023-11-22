import { io } from "socket.io-client";
const { token } = localStorage;

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:6001";
export const socket = io.connect(URL, {
  query: { token },
});

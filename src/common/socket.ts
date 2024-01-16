import Echo from "laravel-echo";
// @ts-ignore
import io from "socket.io-client";

const socketConfig = {
  broadcaster: "socket.io",
  client: io,
  host: import.meta.env.VITE_SOCKET_URL,
  transports: ["websocket"],
  authEndpoint: "/broadcasting/auth",
  auth: {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  },
};
export let socketConnection = new Echo(socketConfig);

export const socketReset = () => {
  socketConfig.auth.headers.Authorization = `Bearer ${localStorage.token}`;
  socketConnection.disconnect();
  socketConnection = new Echo(socketConfig);
};

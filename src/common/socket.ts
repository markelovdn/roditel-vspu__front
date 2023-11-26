import Echo from "laravel-echo";
// @ts-ignore
import io from "socket.io-client";

export const socketConnection = new Echo({
  broadcaster: "socket.io",
  client: io,
  host: "https://markelovdn.ru:6001",
  transports: ["websocket"],
  authEndpoint: "/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
});

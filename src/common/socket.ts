import Echo from "laravel-echo";
// @ts-ignore
import io from "socket.io-client";

import { useAuthStore } from "@/stores/authStore";

const token = useAuthStore().token;

export const socketConnection = new Echo({
  broadcaster: "socket.io",
  client: io,
  host: import.meta.env.VITE_SOCKET_URL,
  transports: ["websocket"],
  authEndpoint: "/broadcasting/auth",
  auth: {
    headers: { Authorization: `Bearer ${token}` },
  },
});

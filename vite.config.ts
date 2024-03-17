import { fileURLToPath, URL } from "node:url";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
        script: {
          defineModel: true,
        },
      }),
      quasar({
        sassVariables: "src/quasar-variables.sass",
      }),
      eslint({ cache: false }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@img": fileURLToPath(new URL("./public/img", import.meta.url)),
      },
    },
  };
});

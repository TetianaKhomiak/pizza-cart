import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore - plugin doesn't have types
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
  base: "/pizza-cart/",
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        // @ts-ignore
        nodePolyfills(),
      ],
    },
  },
  resolve: {
    alias: {
      // add only what you need — keep it minimal
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
});

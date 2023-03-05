import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  build: {
    rollupOptions: {
      input: {
        index: "./src/main.js"
      },
      // inlineDynamicImports: true,
      output: {
        file: 'bundle.js',
        format: 'cjs',
      }
    },
    // rollupOptions: {
    //   input: {
    //     index: "./src/index.js"
    //   },
    //   /* single
    //   output: {
    //       format: "umd",
    //       strict: false,
    //       chunkFileNames: `[name].[hash].js`,
    //       entryFileNames: "[name].bundle.umd.js",
    //       dir: "dist"
    //   },
    //   */
    //   // array config example
    //   // from rollup: export type InternalModuleFormat = 'amd' | 'cjs' | 'es' | 'iife' | 'system' | 'umd';
    //   output: [
    //     {
    //       format: 'cjs',
    //       entryFileNames: "[name].bundle.[format].js",
    //     },
    //     {
    //       format: 'es',
    //       entryFileNames: "[name].bundle.[format].js",
    //     },
    //     {
    //       format: 'umd',
    //       entryFileNames: "[name].bundle.[format].js",
    //     },
    //   ]
    // }
  },
});

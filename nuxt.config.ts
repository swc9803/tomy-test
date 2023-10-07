import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  build: {
    transpile: ["swiper", "gsap", "vue-i18n"],
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://192.168.1.37:8000/",
        changeOrigin: true,
      },
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.scss", "~/assets/css/swiper.scss"],
});

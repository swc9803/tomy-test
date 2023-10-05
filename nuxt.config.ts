export default defineNuxtConfig({
  build: {
    transpile: ["swiper", "gsap"],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://192.168.1.37:8000/",
        changeOrigin: true,
      },
    },
  },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.scss", "~/assets/css/swiper.scss"],
});

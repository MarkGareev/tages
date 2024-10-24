// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/styles/main.scss", "~/assets/fonts/style.scss"],
  modules: ["@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: '@use "~/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      api_route: process.env.API_ROUTE,
    },
  },

  app: {
    head: {
      title: "Tages",
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "description",
          name: "description",
          content: "Тестовое задание для компании Tages",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
});

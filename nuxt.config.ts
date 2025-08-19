import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl : process.env.BASE_URL
    }
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ["@pinia/nuxt"],
});
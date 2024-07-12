// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-swiper",
        "@nuxt/icon",
        "@nuxt/content",
        "@nuxt/image",
    ],
    css: ["@/assets/css/tailwind.css"],
    app: {
        head: {
            charset: "utf-16",
            viewport: "width=device-width,initial-scale=1",
        },
        pageTransition: { name: "page", mode: "out-in" },
        layoutTransition: { name: "layout", mode: "out-in" },
    },
});

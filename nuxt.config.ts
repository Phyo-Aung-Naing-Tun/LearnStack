// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    preset: 'vercel',
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      titleTemplate: '%s — LearnStack',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'LearnStack — Step-by-step tutorials and in-depth blog posts to level up your development skills.' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'LearnStack' },
        { property: 'og:title', content: 'LearnStack — Learn by Building' },
        { property: 'og:description', content: 'Step-by-step tutorials and in-depth blog posts to level up your development skills.' },
        { property: 'og:image', content: '/api/og-image' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'LearnStack — Learn by Building' },
        { name: 'twitter:description', content: 'Step-by-step tutorials and in-depth blog posts to level up your development skills.' },
        { name: 'twitter:image', content: '/api/og-image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
    },
  },
})

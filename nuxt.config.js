export default {
  // Global private environment variables: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config
  publicRuntimeConfig: {
    apiKey: process.env.POKEMON_TCG_KEY || '',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pokémon TCG Viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios', '~/plugins/api'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
  ],

  // Style Resources module configuration: https://github.com/nuxt-community/style-resources-module
  styleResources: {
    hoistUseStatements: true,
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_functions.scss',
      '~/assets/scss/_mixins.scss',
    ],
  },

  // Font Awesome module configuration: https://github.com/nuxt-community/fontawesome-module
  fontawesome: {
    icons: {
      solid: ['faSearch', 'faLongArrowAltUp'],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // Doc: https://i18n.nuxtjs.org
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.pokemontcg.io/v2/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // i18n module configuration (https://i18n.nuxtjs.org/setup)
  i18n: {
    vuex: false,
    defaultLocale: 'en',
    vueI18nLoader: true,
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        name: 'Português',
      },
    ],
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

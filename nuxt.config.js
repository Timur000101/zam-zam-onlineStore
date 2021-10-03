export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  generate: {
    fallback: true
  },
  head: {
    title: 'ИГРУШКИ КАРАГАНДА Zam-Zam',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Zam-zam порадует детей игрушками, а родителей ценами' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', integrity: 'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==', crossorigin: 'anonymous',  referrerpolicy: "no-referrer" }
    ],
    script: [
      {
        src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/main.scss',
    '~/assets/styles/fonts.scss'
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/swiper.js' },
    { src: '~/plugins/functions.js' },
    { src: '~/plugins/vuelidate.js' },
    { src: '~/plugins/paginate.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/yandex-metrika',
  ],
  yandexMetrika: {
    id: '85731514',
    webvisor: true,
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['paginate']
  }
}

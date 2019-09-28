const axios = require('axios');
const storyblokToken = '1IsgW07t4t5sm0UzdHAD6gtt';

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'GRAND GARAGE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'GRAND GARAGE webapp' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto+Mono'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Chakra+Petch'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed'
      },
      {
        rel: 'stylesheet',
        href:'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.4.1.min.js',
        integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
        crossorigin: 'anonymous'
      },
      {
        src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
        id: 'snipcart',
        'data-api-key': 'MjNlN2M1ZjYtZTIyOC00MTg4LTg2MjUtMGFlOGViM2YyMWY0NjM3MDUyNzIzNTYxNjQ2MzQ3'
      }
    ]
  },
  proxy: {
    '/.netlify': {
      target: 'http://localhost:9000',
      pathRewrite: {'^/.netlify/functions': ''},
    },
  },
  modules: [
    ['storyblok-nuxt', { accessToken: storyblokToken, cacheProvider: 'memory' }],
    '@nuxtjs/proxy',
    ['@nuxtjs/google-analytics', {
      id: 'UA-106370674-4'
    }]
  ],
  plugins: [
    '~/plugins/init',
    '~/plugins/components',
    '~/plugins/helper',
    '~/plugins/map',
    '~/plugins/libs',
    '~/plugins/routersync',
    { src: '~/plugins/components-nossr', ssr: false },
  ],
  router: {
    middleware: 'router'
  },
  generate: {
    routes: function (callback) {
      const token = storyblokToken;
      const per_page = 100;
      const version = process.env.NODE_ENV == 'development' ? 'draft' : 'published';
      const time = new Date().getTime();

      let page = 1
      let routes = []

      // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
      axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}&ts=${time}`).then((res) => {

        Object.keys(res.data.links).forEach((key) => {
          if (res.data.links[key].slug != 'home') {
            routes.push('/' + res.data.links[key].slug)
          }
        })

        // Check if there are more pages available otherwise execute callback with current routes.
        const total = res.headers.total
        const maxPage = Math.ceil(total / per_page)
        if(maxPage <= 1) {
          callback(null, routes)
        }

        // Since we know the total we now can pregenerate all requests we need to get all Links
        let contentRequests = []
        for (let page = 2; page <= maxPage; page++) {
          contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`))
        }

        // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
        axios.all(contentRequests).then(axios.spread((...requests) => {
          requests.forEach((request) => {
            Object.keys(request.data.links).forEach((key) => {
              if (request.data.links[key].slug != 'home') {
                routes.push('/' + request.data.links[key].slug)
              }
            })
          })

          callback(null, routes)
        })).catch(callback)
    })
  }
},
  css: [
    '@/assets/scss/styles.scss',
    '@/assets/scss/vueDatePick.scss',
    'swiper/dist/css/swiper.css',
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#ff6f00' },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  }
}

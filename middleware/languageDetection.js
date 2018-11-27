export default function ({ app, route, store, isDev, redirect }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published'
  let language = route.params.language || 'de'
  let languages = ['de', 'en'];

  if (process.server) {
    store.commit('setCacheVersion', app.$storyapi.cacheVersion)
  }

  if (!store.state.settings._uid || language !== store.state.language) {
    store.commit('setLanguage', language)
    return store.dispatch('loadSettings', {version: version, language: language});
  }
}

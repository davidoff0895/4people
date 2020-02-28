import Vue from 'vue'

import AppEntry from '@/app.entry'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

AppEntry({
  router,
  store
})

const vue = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
